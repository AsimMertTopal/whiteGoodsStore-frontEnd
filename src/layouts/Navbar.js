// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../images/Asım mert.png';
import SearchBar from '../components/SearchBar';
import Category from '../components/Category';

function Navbar() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('userToken');
      const userId = localStorage.getItem('userId');
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="custom-navbar-container">
      <nav className="navbar custom-navbar" data-bs-theme="dark">
        <Link to="/" className="navbar-brand mb-0 h1">
          <img src={logo} alt="Logo" className="logo-img" />
        </Link>
        <div className="mx-auto">
          <SearchBar />
        </div>
        <div>
          {isLoading ? (
            // Eğer hala yükleniyorsa bir loading durumu göster
            <span>Loading...</span>
          ) : isAuthenticated ? (
            <>
              <Link to="/profile" className="btn btn-warning me-2">
                <i className="bi bi-person"></i>
              </Link>
              <Link to="/cart" className="btn btn-warning me-2">
                <i className="bi bi-cart"></i>
              </Link>
              <button onClick={handleLogout} className="btn btn-danger me-2">
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="btn btn-warning me-2">
                Kayıt Ol
              </Link>
              <Link to="/login" className="btn btn-dark me-2">
                Giriş Yap
              </Link>
              {location.pathname === '/' && (
                <Link to="/signupSeller" className="btn btn-light">
                  Satıcı Olmak İster misiniz?
                </Link>
              )}
            </>
          )}
        </div>
      </nav>
      <Category />
    </div>
  );
}

export default Navbar;
