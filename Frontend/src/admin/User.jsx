import { useEffect, useState } from "react";
import axios from "../axios"; // Use configured axios instance
import { 
  FaUser, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSort, 
  FaSortUp, 
  FaSortDown,
  FaUserCircle,
  FaEnvelope,
  FaShieldAlt,
  FaCalendarAlt
} from "react-icons/fa";

const API_URL = "/api/users"; // Use relative URL since baseURL is configured

const initialForm = {
  username: "",
  email: "",
  full_name: "",
  role: "staff",
  password: "",
};

const roles = [
  { value: "admin", label: "Admin" },
  { value: "staff", label: "Nhân viên" },
];

const AdminUserManager = () => {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
      if (err.response?.status === 401) {
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        // Don't send password if not changed
        const { password, ...rest } = form;
        await axios.put(`${API_URL}/${editingId}`, password ? form : rest);
      } else {
        await axios.post(API_URL, form);
      }
      setShowPopup(false);
      setEditingId(null);
      setForm(initialForm);
      fetchUsers();
      alert(editingId ? "Cập nhật tài khoản thành công!" : "Tạo tài khoản thành công!");
    } catch (err) {
      console.error("Error saving user:", err);
      alert(err.response?.data?.error || "Có lỗi xảy ra khi lưu thông tin tài khoản.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setForm({
      username: user.username || "",
      email: user.email || "",
      full_name: user.full_name || "",
      role: user.role || "staff",
      password: "",
    });
    setEditingId(user.id);
    setShowPopup(true);
  };

  const handleDelete = async (id, username) => {
    if (!window.confirm(`Bạn chắc chắn muốn xóa tài khoản "${username}"?`)) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
      alert("Xóa tài khoản thành công!");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert(err.response?.data?.error || "Có lỗi khi xóa tài khoản.");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
  };

  const sortedUsers = [...users].sort((a, b) => {
    const aVal = a[sortField] || '';
    const bVal = b[sortField] || '';
    
    if (sortDirection === 'asc') {
      return aVal.toString().localeCompare(bVal.toString());
    } else {
      return bVal.toString().localeCompare(aVal.toString());
    }
  });

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="text-gray-400" />;
    return sortDirection === 'asc' ? <FaSortUp className="text-blue-600" /> : <FaSortDown className="text-blue-600" />;
  };

  const getRoleBadge = (role) => {
    const isAdmin = role === "admin";
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
        isAdmin 
          ? "bg-red-100 text-red-800 border border-red-200" 
          : "bg-green-100 text-green-800 border border-green-200"
      }`}>
        <FaShieldAlt className="mr-1" />
        {isAdmin ? "Admin" : "Nhân viên"}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
          <FaUser className="mr-3 text-blue-600" />
          Quản lý tài khoản người dùng
        </h1>
        <p className="text-gray-600">Quản lý thông tin tài khoản nhân viên và admin trong hệ thống</p>
      </div>

      {/* Action Bar */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <button
          onClick={() => {
            setEditingId(null);
            setForm(initialForm);
            setShowPopup(true);
          }}
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                   text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-all 
                   transform hover:scale-105 shadow-lg disabled:opacity-50"
        >
          <FaPlus className="mr-2" />
          Thêm tài khoản mới
        </button>
        
        <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow">
          Tổng cộng: <span className="font-semibold text-blue-600">{users.length}</span> tài khoản
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <button onClick={() => handleSort('id')} className="flex items-center hover:text-blue-600">
                    ID {getSortIcon('id')}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ảnh đại diện
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <button onClick={() => handleSort('username')} className="flex items-center hover:text-blue-600">
                    Tên đăng nhập {getSortIcon('username')}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <button onClick={() => handleSort('full_name')} className="flex items-center hover:text-blue-600">
                    Họ và tên {getSortIcon('full_name')}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <button onClick={() => handleSort('email')} className="flex items-center hover:text-blue-600">
                    Email {getSortIcon('email')}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <button onClick={() => handleSort('role')} className="flex items-center hover:text-blue-600">
                    Vai trò {getSortIcon('role')}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <button onClick={() => handleSort('created_at')} className="flex items-center hover:text-blue-600">
                    Ngày tạo {getSortIcon('created_at')}
                  </button>
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedUsers.map((user, idx) => (
                <tr key={user.id} className={`hover:bg-gray-50 transition-colors ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                }`}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    #{user.id}
                  </td>
                  <td className="px-6 py-4">
                    {user.profile_image ? (
                      <img 
                        src={user.profile_image} 
                        alt={user.full_name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 
                                    flex items-center justify-center text-white font-semibold text-lg">
                        <FaUserCircle />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{user.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{user.full_name || 'Chưa cập nhật'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaEnvelope className="mr-2 text-gray-400" />
                      {user.email || 'Chưa cập nhật'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-gray-400" />
                      {user.created_at ? new Date(user.created_at).toLocaleDateString('vi-VN') : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        disabled={loading}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg 
                                 transition-all transform hover:scale-105 disabled:opacity-50"
                        title="Chỉnh sửa"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id, user.username)}
                        disabled={loading}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg 
                                 transition-all transform hover:scale-105 disabled:opacity-50"
                        title="Xóa"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && !loading && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    <FaUser className="mx-auto mb-4 text-4xl text-gray-300" />
                    <p className="text-lg">Chưa có tài khoản nào trong hệ thống</p>
                    <p className="text-sm">Hãy thêm tài khoản đầu tiên!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <FaUser className="mr-3 text-blue-600" />
                {editingId ? "Cập nhật tài khoản" : "Thêm tài khoản mới"}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên đăng nhập *
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Nhập tên đăng nhập"
                    value={form.username}
                    onChange={e => handleInputChange("username", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Nhập địa chỉ email"
                    type="email"
                    value={form.email}
                    onChange={e => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Nhập họ và tên đầy đủ"
                    value={form.full_name}
                    onChange={e => handleInputChange("full_name", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vai trò *
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-blue-500 focus:border-transparent transition-all"
                    value={form.role}
                    onChange={e => handleInputChange("role", e.target.value)}
                  >
                    {roles.map(r => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {editingId ? "Mật khẩu mới (bỏ trống nếu không đổi)" : "Mật khẩu *"}
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={editingId ? "Nhập mật khẩu mới" : "Nhập mật khẩu"}
                    type="password"
                    value={form.password}
                    onChange={e => handleInputChange("password", e.target.value)}
                    required={!editingId}
                    autoComplete="new-password"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowPopup(false)}
                    disabled={loading}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 
                             transition-all disabled:opacity-50"
                  >
                    Hủy
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                             rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all 
                             disabled:opacity-50 flex items-center"
                  >
                    {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                    {editingId ? "Cập nhật" : "Thêm mới"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManager;