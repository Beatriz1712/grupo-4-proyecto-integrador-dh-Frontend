import "../Styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "/media/svg/logo-svg.svg";

const Header = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedRol = localStorage.getItem("rol");
  
      if (!storedUser || !storedRol) {
        setUser(null);
        return;
      }
  
      const userData = JSON.parse(storedUser);
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/usuarios/${userData.id}`);
      
      if (!response.ok) throw new Error("Error al obtener usuario");
  
      const data = await response.json();
      setUser({ ...data, rol: storedRol });
    } catch (error) {
      console.error("Error obteniendo usuario:", error);
      setUser(null);
    }
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchUser();
    setMenuOpen(false);
  }, [localStorage.getItem("user")]); 
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("rol");
    localStorage.removeItem("token");
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith('favorito_')) {
        sessionStorage.removeItem(key);
      }
    });
    window.dispatchEvent(new Event("storage"));
    setUser(null);
    navigate("/");
    setMenuOpen(false);
  };
  
  const handleProfileClick = () => {
    navigate("/perfil");
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="brand">
          <Link className="brand-link" to="/">
            <img src={logo} alt="Huellitas Logo" className="logo-img" />
            <span className="nav-text">Un hogar para tu mascota</span>
          </Link>
        </div>

        {/* Botón del menú responsive */}
        <button 
          className="menu-toggle" 
          onClick={() => {
          setIsMobileMenuOpen(!isMobileMenuOpen);
          setMenuOpen(!menuOpen);
        }}
        >
         ☰
        </button>

        {/* Contenedor de enlaces y usuario */}
        <div className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
          {user ? (
            <div className="user-info" ref={menuRef}>
              <div className="avatar" onClick={() => setMenuOpen(!menuOpen)}>
                {user.nombre ? user.nombre.charAt(0).toUpperCase() : ""}
                {user.apellido ? user.apellido.charAt(0).toUpperCase() : ""}
              </div>
              {menuOpen && (
                <div className="user-menu">
                  <p>{user.nombre} {user.apellido}</p>
                  <p>{user.email}</p>
                  <button className="profile-btn" onClick={handleProfileClick}>Mi Perfil</button>
                  <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
                </div>
              )}
            </div>
          ):(
            <div className="auth-buttons">
              <button
                className="crear-cuenta-button"
                onClick={() => navigate("/registro")}
              >
                Crear Cuenta
              </button>
              <Link to="/login" className="btn">Iniciar Sesión</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;