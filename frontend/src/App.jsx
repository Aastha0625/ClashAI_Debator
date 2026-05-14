import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SetupPage from './pages/SetupPage';
import ArenaPage from './pages/ArenaPage';
import VerdictPage from './pages/VerdictPage';
import HistoryPage from './pages/HistoryPage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Arena Routes */}
            <Route path="/setup" element={<ProtectedRoute><SetupPage /></ProtectedRoute>} />
            <Route path="/arena" element={<ProtectedRoute><ArenaPage /></ProtectedRoute>} />
            <Route path="/verdict" element={<ProtectedRoute><VerdictPage /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
          </Routes>
        </Router>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
