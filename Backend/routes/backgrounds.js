const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all backgrounds, sorted by order
router.get("/", (req, res) => {
  db.query("SELECT * FROM backgrounds ORDER BY display_order ASC", (err, results) => {
    if (err) return res.status(500).json({ error: "Error fetching backgrounds" });
    res.json(results);
  });
});

// Get active backgrounds for landing page
router.get("/active", (req, res) => {
  db.query("SELECT * FROM backgrounds WHERE active = 1 ORDER BY display_order ASC", (err, results) => {
    if (err) return res.status(500).json({ error: "Error fetching active backgrounds" });
    res.json(results);
  });
});

// Add new background
router.post("/", (req, res) => {
  const { url, active = 0 } = req.body;
  
  // Get the highest order value to append new background at the end
  db.query("SELECT MAX(display_order) as max_order FROM backgrounds", (err, result) => {
    if (err) return res.status(500).json({ error: "Error getting max order" });
    
    const nextOrder = (result[0].max_order || 0) + 1;
    
    db.query(
      "INSERT INTO backgrounds (url, active, display_order) VALUES (?, ?, ?)",
      [url, active, nextOrder],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Error adding background" });
        res.json({ 
          success: true, 
          id: result.insertId,
          url,
          active,
          display_order: nextOrder
        });
      }
    );
  });
});

// Update background order (for drag and drop)
router.put("/reorder", (req, res) => {
  const { backgroundIds } = req.body; // Array of IDs in new order
  
  if (!Array.isArray(backgroundIds) || backgroundIds.length === 0) {
    return res.status(400).json({ error: "Invalid backgroundIds array" });
  }
  
  // Update each background's display_order
  const updatePromises = backgroundIds.map((id, index) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE backgrounds SET display_order = ? WHERE id = ?",
        [index + 1, id],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  });
  
  Promise.all(updatePromises)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(500).json({ error: "Error updating order" }));
});

// Update background
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { url, active } = req.body;
  
  db.query(
    "UPDATE backgrounds SET url = ?, active = ? WHERE id = ?",
    [url, active, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error updating background" });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Background not found" });
      res.json({ success: true });
    }
  );
});

// Delete background
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  
  db.query("DELETE FROM backgrounds WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error deleting background" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Background not found" });
    res.json({ success: true });
  });
});

// Toggle background active status
router.put("/:id/toggle", (req, res) => {
  const { id } = req.params;
  
  db.query("UPDATE backgrounds SET active = NOT active WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error toggling background status" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Background not found" });
    res.json({ success: true });
  });
});

module.exports = router;