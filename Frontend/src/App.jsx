import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import AdminArticleManager from './admin/AdminArticleManager';  
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
import BannerManager from './admin/BannerManager';

// 👉 Tạo component wrapper để dùng useLocation
function AppContent() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

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

          {/* ✅ Bọc toàn bộ các trang admin trong AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="articles" element={<AdminArticleManager />} />
            <Route path="contacts" element={<ContactManager />} />
            <Route path="banners" element={<BannerManager />} />
          </Route>
        </Routes>
      </main>

      {/* Ẩn Footer & nút nổi nếu ở trang admin */}
      {location.pathname !== "/admin/articles" && (
        <>
          <FloatingButtons />
          <Footer />
        </>
      )}
    </div>
  );
}

// Bọc AppContent trong Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
