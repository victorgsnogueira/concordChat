import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Channels from './pages/Channels';
import Welcome from './pages/Welcome';
import { auth } from './firebase';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/channels" /> : <Welcome />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/channels" /> : <Register />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/channels" /> : <Login />} />
        <Route path="/channels" element={isAuthenticated ? <Channels /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
