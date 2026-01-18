import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Submit from './pages/Submit';
import { LanguageProvider } from './context/LanguageContext';
import { ArticleProvider } from './context/ArticleContext';

// --- LAYOUTS ---

// 1. Public Layout: Standard view with Navbar and Footer
const PublicLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// 2. Admin Layout: Completely separate shell (No Navbar, No Footer)
const AdminLayout = () => (
  <div className="min-h-screen bg-gray-100">
    <main>
      <Outlet />
    </main>
  </div>
);

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ArticleProvider>
        <Router>
          <Routes>

            {/* GROUP 1: PUBLIC PAGES */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/submit" element={<Submit />} />
            </Route>

            {/* GROUP 2: HIDDEN ADMIN PORTAL */}
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Admin />} />
            </Route>

            {/* CATCH-ALL */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </Router>
      </ArticleProvider>
    </LanguageProvider>
  );
};

export default App;
