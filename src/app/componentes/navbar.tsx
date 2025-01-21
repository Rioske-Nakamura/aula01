"use client"
import Link from "@/node_modules/next/link";
import { useRouter } from "@/node_modules/next/navigation";
import React, { useState, useEffect } from "react";
import Styles from "../page.module.css";
import { parseCookies, destroyCookie } from "@/node_modules/nookies";

const Navbar = () => {

  const router = useRouter();
  interface User {
    tipo: string;
  
  }
  
  const [user, setUser] = useState<User | false>(false);
  
  
  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies["restaurant-token"];
    if (token) {
      // Supondo que o token inclua as informações do usuário em JSON (ou outro armazenamento separado)
      const userData = JSON.parse(atob(token.split(".")[1])); // Decodifica payload JWT
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    destroyCookie(undefined, "restaurant-token");
    setUser(false);
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <nav className={Styles.navbar}>
      <ul className={Styles.links}>
        <li><Link href="/" legacyBehavior><a>HOME</a></Link></li>
        <li><Link href="/menus" legacyBehavior><a>MENUS</a></Link></li>
        <li><Link href="/contatos" legacyBehavior><a>CONTATOS</a></Link></li>
        {user ? (
          <div className={Styles.links}>
            {user.tipo === "ADM" && (
              <>
                <li><Link href="/cadastrar-mesa" legacyBehavior><a>Cadastrar Mesa</a></Link></li>
                <li><Link href="/excluir-mesa" legacyBehavior><a>Excluir Mesa</a></Link></li>
                <li><Link href="/excluir-usuario" legacyBehavior><a>Excluir Usuário</a></Link></li>
              </>
            )}
            <li>
              <Link href="/Reservar" legacyBehavior>
                <a>RESERVAR</a>
              </Link>
            </li>
            <li>
              <Link href="/MyReservas" legacyBehavior>
                <a>MINHAS RESERVAS</a>
              </Link>
            </li>
            <li>
              <a onClick={handleLogout} style={{ cursor: "pointer" }}>
                LOGOUT
              </a>
            </li>
          </div>
        ) : (
          <div className={Styles.links}>
            <li>
              <a href="/login">RESERVAS</a>
            </li>
            <li>
              <a onClick={handleLogin} style={{ cursor: "pointer" }}>
                LOGIN
              </a>
            </li>
          </div>
        )}
      </ul>

      <div className={Styles.icons}>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://static.wixstatic.com/media/0fdef751204647a3bbd7eaa2827ed4f9.png"
            width="30"
            height="30"
            alt="Facebook Icon"
          />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://static.wixstatic.com/media/c7d035ba85f6486680c2facedecdcf4d.png"
            width="30"
            height="30"
            alt="Twitter Icon"
          />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://static.wixstatic.com/media/01c3aff52f2a4dffa526d7a9843d46ea.png"
            width="30"
            height="30"
            alt="Instagram Icon"
          />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;