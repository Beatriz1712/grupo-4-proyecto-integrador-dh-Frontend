/*import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Inicio de sesión exitoso", data);
        localStorage.setItem("token", data.token); // Guarda el token 
        navigate("/");
      } else {
        setError(data.message || "Correo o contraseña incorrectos");
      }
    } catch (err) {
        console.error("Error en la solicitud:", err); // error en la consola
        setError(err.message || "Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        {error && (
          <p className="error-message"> 
            {error} <Link to="/register" className="register-link">Regístrate aquí</Link>
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe">Recordarme</label>
          </div>
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
       {/*} <div className="extra-links">
          <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
        </div>*/
    /*  </div>
    </div>
  );
};

export default Login;

*/

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Simulación de usuarios 
      const fakeUsers = [
        { name: "Andres", lastName: "Pérez", email: "andres@example.com", password: "123456" },
        { name: "Ana", lastName: "García", email: "ana@example.com", password: "654321" },
      ];

      const user = fakeUsers.find((u) => u.email === email && u.password === password);

      if (user) {
        console.log("Inicio de sesión exitoso", user);
        localStorage.setItem("user", JSON.stringify(user)); // Guardar en localStorage
        localStorage.setItem("userLoggedIn", "true"); // Guardar variable en localStorage para la sesion
        window.dispatchEvent(new Event("storage")); //  cambio global
        navigate("/");
      } else {
        setError("Correo o contraseña incorrectos. Verifica tus datos.");
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      setError("Hubo un problema al conectar con el servidor. Intenta de nuevo.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>

        {/* Mensaje de error  */}
        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
            <br />
            <Link to="/register" className="register-link">Regístrate aquí</Link>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Ingresa tu correo"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe">Recordarme</label>
          </div>
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>

        <div className="extra-links">
          <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

