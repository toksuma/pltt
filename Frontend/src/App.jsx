import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import AdminArticleManager from './admin/AdminArticleManager';  
import AdminBannerManager from './admin/AdminBannerManager';  
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingButtons from './components/AddOn';
import './components/floating.css';

import ArticleDetail from "./Pages/Main/ArticleDetail";
import Home from './Pages/Main/Home';
import Interface from './Pages/Main/Interface';
import Contact from './Pages/Main/Contact';
import News from './Pages/Main/News';
import PriceList from './Pages/Main/PriceList';
import Services from './Pages/Main/Services';
import Collab from './Pages/Main/Collab';
import Login from './Pages/Main/Login';

import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ContactManager from './admin/ContactManager';
import BannerPopup from './components/BannerPopup';
import AdminLogin from "./Pages/Main/AdminLogin";

import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './admin/Unauthorized';

function AppContent() {
  const location = useLocation();

  // ✅ Ẩn footer và floating nếu là trang admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ✅ Luôn luôn hiển thị Header */}
      <Header />

      {/* ✅ BannerPopup chỉ hiển thị nếu KHÔNG phải admin */}
      {!isAdminRoute && <BannerPopup />}

      <main className="flex-grow min-h-[calc(100vh-250px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Interface" element={<Interface />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<ArticleDetail />} />
          <Route path="/PriceList" element={<PriceList />} />
          <Route path="/Service" element={<Services />} />
          <Route path="/Collab" element={<Collab />} />
          <Route path="/Login" element={<Login />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin", "staff"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="articles" element={<AdminArticleManager />} />
            <Route path="contacts" element={<ContactManager />} />
            <Route path="banners" element={<AdminBannerManager />} />
          </Route>

          <Route path="/admin/unauthorized" element={<Unauthorized />} />
        </Routes>
      </main>

      {/* ✅ Footer & FloatingButtons chỉ hiển thị nếu không phải admin */}
      {!isAdminRoute && (
        <>
          <FloatingButtons />
          <Footer />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
