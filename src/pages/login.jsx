import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "../styles/components.css";

const Login = ({ onLogin, isAuthenticated }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Connexion</h2>
          <p>Accédez à votre espace professionnel</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              placeholder="votre@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Votre mot de passe"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            Se Connecter
          </button>
        </form>

        <div className="login-demo">
          <p className="demo-info">
            💡 <strong>Info démo :</strong> Utilisez n'importe quel email/mot de passe
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;