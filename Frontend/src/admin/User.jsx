import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const initialForm = {
  name: "",
  email: "",
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

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) {
      setUsers([]);
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
    try {
      if (editingId) {
        // Không gửi password nếu không thay đổi
        const { password, ...rest } = form;
        await axios.put(`${API_URL}/${editingId}`, password ? form : rest);
      } else {
        await axios.post(API_URL, form);
      }
      setShowPopup(false);
      setEditingId(null);
      setForm(initialForm);
      fetchUsers();
    } catch (err) {
      alert("Có lỗi xảy ra khi lưu thông tin tài khoản.");
    }
  };

  const handleEdit = (user) => {
    setForm({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "staff",
      password: "",
    });
    setEditingId(user.id);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xoá tài khoản này?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch {
      alert("Có lỗi khi xoá tài khoản.");
    }
  };

  return (
    <div className="p-8 bg-gradient-to-tr from-gray-100 via-blue-50 to-cyan-50 min-h-screen">
      <h1 className="text-2xl font-extrabold mb-6 text-blue-800 tracking-tight">
        Quản lý tài khoản nhân viên & admin
      </h1>
      <button
        onClick={() => {
          setEditingId(null);
          setForm(initialForm);
          setShowPopup(true);
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4 font-medium"
      >
        + Thêm tài khoản
      </button>
      <div className="overflow-auto rounded-lg border border-gray-100 bg-white shadow mb-6">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-blue-50 text-slate-700 font-bold">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Họ tên</th>
              <th className="p-2">Email</th>
              <th className="p-2">Vai trò</th>
              <th className="p-2">Ngày tạo</th>
              <th className="p-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={u.id} className={idx % 2 === 0 ? "bg-white" : "bg-blue-50 hover:bg-blue-100"}>
                <td className="p-2 border-b">{u.id}</td>
                <td className="p-2 border-b font-medium">{u.name}</td>
                <td className="p-2 border-b">{u.email}</td>
                <td className="p-2 border-b">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${u.role === "admin" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                    {u.role === "admin" ? "Admin" : "Nhân viên"}
                  </span>
                </td>
                <td className="p-2 border-b">{u.created_at ? new Date(u.created_at).toLocaleDateString() : ""}</td>
                <td className="p-2 border-b space-x-2">
                  <button
                    onClick={() => handleEdit(u)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded transition"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-400">
                  Không có tài khoản nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Popup thêm/sửa tài khoản */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[95%] max-w-md shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              {editingId ? "Cập nhật tài khoản" : "Thêm tài khoản mới"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="border w-full p-2 rounded"
                placeholder="Họ và tên"
                value={form.name}
                onChange={e => handleInputChange("name", e.target.value)}
                required
              />
              <input
                className="border w-full p-2 rounded"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={e => handleInputChange("email", e.target.value)}
                required
              />
              <select
                className="border w-full p-2 rounded"
                value={form.role}
                onChange={e => handleInputChange("role", e.target.value)}
              >
                {roles.map(r => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
              <input
                className="border w-full p-2 rounded"
                placeholder={editingId ? "Đổi mật khẩu (bỏ qua nếu giữ nguyên)" : "Mật khẩu"}
                type="password"
                value={form.password}
                onChange={e => handleInputChange("password", e.target.value)}
                required={!editingId}
                autoComplete="new-password"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowPopup(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">Huỷ</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">{editingId ? "Lưu" : "Thêm"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManager;