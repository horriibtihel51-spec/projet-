import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/home";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import "./styles/main.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation de chargement des données
    const loadData = async () => {
      try {
        setTimeout(() => {
          setPatients([
            { id: 1, name: "Jean Dupont", age: 45, condition: "Stable", lastVisit: "2024-01-15" },
            { id: 2, name: "Marie Martin", age: 32, condition: "Amélioration", lastVisit: "2024-01-10" },
            { id: 3, name: "Pierre Lambert", age: 67, condition: "Critique", lastVisit: "2024-01-05" }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Erreur chargement données:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLogin = (credentials) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="app">
      <Navigation 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout} 
      />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={
              <Login 
                onLogin={handleLogin} 
                isAuthenticated={isAuthenticated} 
              />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <Dashboard 
                patients={patients} 
                loading={loading} 
                isAuthenticated={isAuthenticated} 
              />
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;