import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import FloatingButtons from './components/AddOn'; // ⬅️ Thêm dòng này

import './components/floating.css';


import Home from './Pages/Main/Home';
import Interface from './Pages/Main/Interface';
import Contact from './Pages/Main/Contact';
import News from './Pages/Main/News';
import PriceList from './Pages/Main/PriceList';
import Services from './Pages/Main/Services';
import Collab from './Pages/Main/Collab';
import Login from './Pages/Main/Login';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Interface" element={<Interface />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/News" element={<News />} />
        <Route path="/PriceList" element={<PriceList />} />
        <Route path="/Service" element={<Services />} />
        <Route path="/Collab" element={<Collab />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <FloatingButtons /> {/* ⬅️ Thêm dòng này để hiện 2 nút nổi */}
      <Footer />
    </Router>
  );
}

export default App;
