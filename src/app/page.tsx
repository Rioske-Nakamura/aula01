"use client";
import { useState, useEffect } from "react";
import Button from "./componentes/button";
import { useRouter } from "next/navigation";
import Styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    if (email && password) {
      setUser(true);
    }
   
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    setUser(false);
    router.push("/atividade1");
  };



 // if (user) {
  return (
    //navbar
    <nav style={navbarStyles}>
      <Link href="/" style={linkStyles}>
        Home
      </Link>
      <Link href="/about" style={linkStyles}>
        About
      </Link>
      <Link href="/contact" style={linkStyles}>
        Contact
      </Link>

      <div style={authButtonContainer}>
        {user ? (
          <button onClick={handleLogout} style={buttonStyles}>
            Logout
          </button>
        ) : (
            <button onClick={handleLogout} style={buttonStyles}>Login</button>
        )}
      </div>
    </nav>
  );
}

// Estilos simples para o Navbar
const navbarStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 20px",
  backgroundColor: "#4b0082",
};

const linkStyles = {
  color: "white",
  textDecoration: "none",
  margin: "0 15px",
};

const authButtonContainer = {
  display: "flex",
  alignItems: "center",
};

const buttonStyles = {
  backgroundColor: "white",
  color: "#4b0082",
  padding: "8px 16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};