import { useEffect, useState } from "react";
import axios from "../axios"; // Use configured axios instance
import { 
  FaUser, 
  FaEnvelope, 
  FaShieldAlt, 
  FaCamera, 
  FaKey, 
  FaEye, 
  FaEyeSlash,
  FaInfoCircle,
  FaSave,
  FaUserCircle
} from "react-icons/fa";

const API_URL = "/api/users"; // Use relative URL since baseURL is configured

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: ""
  });
  const [imageUrl, setImageUrl] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/profile`);
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      if (err.response?.status === 401) {
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        // Redirect to login or handle auth error
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    if (passwordForm.new_password.length < 6) {
      alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`${API_URL}/profile`, {
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password
      });
      
      alert("Đổi mật khẩu thành công!");
      setShowPasswordModal(false);
      setPasswordForm({ current_password: "", new_password: "", confirm_password: "" });
    } catch (err) {
      console.error("Error changing password:", err);
      alert(err.response?.data?.error || "Có lỗi xảy ra khi đổi mật khẩu.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpdate = async (e) => {
    e.preventDefault();
    
    if (!imageUrl.trim()) {
      alert("Vui lòng nhập URL ảnh!");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`${API_URL}/profile`, {
        profile_image: imageUrl
      });
      
      alert("Cập nhật ảnh đại diện thành công!");
      setShowImageModal(false);
      setImageUrl("");
      fetchProfile(); // Refresh profile data
    } catch (err) {
      console.error("Error updating image:", err);
      alert(err.response?.data?.error || "Có lỗi xảy ra khi cập nhật ảnh.");
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role) => {
    const isAdmin = role === "admin";
    return (
      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
        isAdmin 
          ? "bg-red-100 text-red-800 border border-red-200" 
          : "bg-green-100 text-green-800 border border-green-200"
      }`}>
        <FaShieldAlt className="mr-2" />
        {isAdmin ? "Quản trị viên" : "Nhân viên"}
      </span>
    );
  };

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <FaUser className="mr-3 text-blue-600" />
            Thông tin cá nhân
          </h1>
          <p className="text-gray-600">Quản lý thông tin tài khoản của bạn</p>
        </div>

        {profile && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                {/* Profile Image */}
                <div className="relative">
                  {profile.profile_image ? (
                    <img 
                      src={profile.profile_image} 
                      alt={profile.full_name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-white bg-opacity-20 flex items-center justify-center border-4 border-white shadow-lg">
                      <FaUserCircle className="text-4xl text-white" />
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setImageUrl(profile.profile_image || "");
                      setShowImageModal(true);
                    }}
                    className="absolute -bottom-2 -right-2 bg-white text-blue-600 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                    title="Đổi ảnh đại diện"
                  >
                    <FaCamera />
                  </button>
                </div>

                {/* Profile Info */}
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold">{profile.full_name || 'Chưa cập nhật'}</h2>
                  <p className="text-blue-100 mb-2">@{profile.username}</p>
                  <div className="flex justify-center md:justify-start">
                    {getRoleBadge(profile.role)}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <FaEnvelope className="mr-2 text-blue-600" />
                    Địa chỉ Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={profile.email || 'Chưa cập nhật'}
                      disabled
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
                    />
                    <div className="absolute right-3 top-3 group">
                      <FaInfoCircle className="text-gray-400 cursor-help" />
                      <div className="invisible group-hover:visible absolute right-0 top-6 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                        Liên hệ admin để thay đổi email
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full Name Field */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <FaUser className="mr-2 text-blue-600" />
                    Họ và tên
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={profile.full_name || 'Chưa cập nhật'}
                      disabled
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
                    />
                    <div className="absolute right-3 top-3 group">
                      <FaInfoCircle className="text-gray-400 cursor-help" />
                      <div className="invisible group-hover:visible absolute right-0 top-6 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                        Liên hệ admin để thay đổi họ tên
                      </div>
                    </div>
                  </div>
                </div>

                {/* Username Field */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <FaUserCircle className="mr-2 text-blue-600" />
                    Tên đăng nhập
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={profile.username}
                      disabled
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
                    />
                    <div className="absolute right-3 top-3 group">
                      <FaInfoCircle className="text-gray-400 cursor-help" />
                      <div className="invisible group-hover:visible absolute right-0 top-6 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                        Liên hệ admin để thay đổi tên đăng nhập
                      </div>
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <FaKey className="mr-2 text-blue-600" />
                    Mật khẩu
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="password"
                      value="••••••••"
                      disabled
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
                    />
                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      title="Đổi mật khẩu"
                    >
                      <FaKey className="mr-2" />
                      Đổi
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Admin Notice */}
              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <FaInfoCircle className="text-blue-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-1">Lưu ý quan trọng</h4>
                    <p className="text-blue-700 text-sm">
                      Để thay đổi thông tin cá nhân như email, họ tên, hoặc tên đăng nhập, 
                      vui lòng liên hệ với quản trị viên hệ thống. Bạn chỉ có thể tự thay đổi 
                      ảnh đại diện và mật khẩu.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                  <FaKey className="mr-2 text-blue-600" />
                  Đổi mật khẩu
                </h3>
                
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mật khẩu hiện tại *
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordForm.current_password}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, current_password: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                        placeholder="Nhập mật khẩu hiện tại"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mật khẩu mới *
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={passwordForm.new_password}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, new_password: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                        placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Xác nhận mật khẩu mới *
                    </label>
                    <input
                      type="password"
                      value={passwordForm.confirm_password}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm_password: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nhập lại mật khẩu mới"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button 
                      type="button" 
                      onClick={() => {
                        setShowPasswordModal(false);
                        setPasswordForm({ current_password: "", new_password: "", confirm_password: "" });
                      }}
                      disabled={loading}
                      className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all disabled:opacity-50"
                    >
                      Hủy
                    </button>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center"
                    >
                      {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                      <FaSave className="mr-2" />
                      Lưu thay đổi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Change Image Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                  <FaCamera className="mr-2 text-blue-600" />
                  Cập nhật ảnh đại diện
                </h3>
                
                <form onSubmit={handleImageUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      URL ảnh đại diện
                    </label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/avatar.jpg"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Nhập URL ảnh từ internet hoặc để trống để xóa ảnh đại diện
                    </p>
                  </div>

                  {imageUrl && (
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Xem trước:</p>
                      <img 
                        src={imageUrl} 
                        alt="Preview"
                        className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-gray-200"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-4">
                    <button 
                      type="button" 
                      onClick={() => {
                        setShowImageModal(false);
                        setImageUrl("");
                      }}
                      disabled={loading}
                      className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all disabled:opacity-50"
                    >
                      Hủy
                    </button>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center"
                    >
                      {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                      <FaSave className="mr-2" />
                      Cập nhật
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;