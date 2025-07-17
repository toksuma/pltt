// routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const { authorize } = require('../middleware/auth');

// Get all users (admin only)
router.get('/', authorize('admin'), (req, res) => {
  db.query(
    'SELECT id, username, email, full_name, role, profile_image, created_at FROM users ORDER BY created_at DESC', 
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// Create new user (admin only)
router.post('/', authorize('admin'), async (req, res) => {
  const { username, email, full_name, password, role = 'staff' } = req.body;
  
  if (!username || !email || !full_name || !password) {
    return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.query(
      'INSERT INTO users (username, email, full_name, password, role) VALUES (?, ?, ?, ?, ?)',
      [username, email, full_name, hashedPassword, role],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Username hoặc email đã tồn tại' });
          }
          return res.status(500).json({ error: err.message });
        }
        res.json({ 
          id: result.insertId, 
          username, 
          email, 
          full_name, 
          role,
          message: 'Tạo tài khoản thành công' 
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Lỗi mã hóa mật khẩu' });
  }
});

// Update user (admin only)
router.put('/:id', authorize('admin'), async (req, res) => {
  const { id } = req.params;
  const { username, email, full_name, password, role } = req.body;
  
  if (!username || !email || !full_name || !role) {
    return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
  }

  try {
    let updateQuery = 'UPDATE users SET username = ?, email = ?, full_name = ?, role = ? WHERE id = ?';
    let updateParams = [username, email, full_name, role, id];

    // If password is provided, hash and include it
    if (password && password.trim()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateQuery = 'UPDATE users SET username = ?, email = ?, full_name = ?, password = ?, role = ? WHERE id = ?';
      updateParams = [username, email, full_name, hashedPassword, role, id];
    }

    db.query(updateQuery, updateParams, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Username hoặc email đã tồn tại' });
        }
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }
      res.json({ message: 'Cập nhật thành công' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi mã hóa mật khẩu' });
  }
});

// Delete user (admin only)
router.delete('/:id', authorize('admin'), (req, res) => {
  const { id } = req.params;
  
  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }
    res.json({ message: 'Xóa tài khoản thành công' });
  });
});

// Get current user profile (all authenticated users)
router.get('/profile', (req, res) => {
  const userId = req.user?.id;
  
  if (!userId) {
    return res.status(401).json({ error: 'Không xác định được người dùng' });
  }

  db.query(
    'SELECT id, username, email, full_name, role, profile_image FROM users WHERE id = ?',
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }
      res.json(results[0]);
    }
  );
});

// Update current user profile (limited fields - all authenticated users)
router.put('/profile', async (req, res) => {
  const userId = req.user?.id;
  const { profile_image, current_password, new_password } = req.body;
  
  if (!userId) {
    return res.status(401).json({ error: 'Không xác định được người dùng' });
  }

  try {
    // If changing password, verify current password first
    if (new_password) {
      if (!current_password) {
        return res.status(400).json({ error: 'Cần nhập mật khẩu hiện tại' });
      }

      // Get current user data to verify password
      const userResult = await new Promise((resolve, reject) => {
        db.query('SELECT password FROM users WHERE id = ?', [userId], (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      if (userResult.length === 0) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }

      const isValidPassword = await bcrypt.compare(current_password, userResult[0].password);
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Mật khẩu hiện tại không đúng' });
      }

      // Hash new password and update both profile_image and password
      const hashedNewPassword = await bcrypt.hash(new_password, 10);
      const updateQuery = profile_image !== undefined
        ? 'UPDATE users SET profile_image = ?, password = ? WHERE id = ?'
        : 'UPDATE users SET password = ? WHERE id = ?';
      const updateParams = profile_image !== undefined
        ? [profile_image, hashedNewPassword, userId]
        : [hashedNewPassword, userId];

      db.query(updateQuery, updateParams, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cập nhật thông tin thành công' });
      });
    } else if (profile_image !== undefined) {
      // Only update profile image
      db.query(
        'UPDATE users SET profile_image = ? WHERE id = ?',
        [profile_image, userId],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: 'Cập nhật ảnh đại diện thành công' });
        }
      );
    } else {
      res.status(400).json({ error: 'Không có thông tin để cập nhật' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Lỗi xử lý yêu cầu' });
  }
});

module.exports = router;