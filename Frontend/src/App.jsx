import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import AdminArticleManager from './admin/AdminArticleManager';  
import AdminBannerManager from './admin/AdminBannerManager';  
import AdminInterfaceManager from './admin/AdminInterfaceManager';

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
import AdminUserManager from "./admin/User";
import Profile from './admin/Profile'; 

import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ContactManager from './admin/ContactManager';
import BannerPopup from './components/BannerPopup';
import AdminLogin from "./Pages/Main/AdminLogin";

import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './admin/unauthorized'; 
import NotExits from './admin/NotExits'; // ✅ Sử dụng trang 404 mới



function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
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
            <Route path="interfaces" element={<AdminInterfaceManager />} />
            <Route path="users" element={<AdminUserManager />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/admin/unauthorized" element={<Unauthorized />} />

          {/* ✅ Trang 404 - sử dụng NotExits */}
          <Route path="*" element={<NotExits />} />
        </Routes>
      </main>

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