"use client";
import Link from "@/node_modules/next/link";
import { useRouter } from "@/node_modules/next/navigation";
import React, { useState, useEffect } from "react";
import Styles from "../page.module.css";
import { parseCookies, destroyCookie } from "@/node_modules/nookies";

const Navbar = () => {
  const router = useRouter();

  interface User {
    id: string;
    tipo: string;
  }

  const [user, setUser] = useState<User | false>(false);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies["restaurant-token"];
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodifica o payload do JWT
        setUser(decodedToken); // Decodificado deve conter { id, tipo }
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
        setUser(false);
      }
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
                <li><Link href="/addTable" legacyBehavior><a>Adicionar Mesa</a></Link></li>
                <li><Link href="/deletetable" legacyBehavior><a>Excluir Mesa</a></Link></li>
                <li><Link href="/excluiruser" legacyBehavior><a>Excluir Usuário</a></Link></li>
                <li><Link href="/cancelar" legacyBehavior><a>Cancelar</a></Link></li>
              </>
            )}
            <li>
              <Link href="/Reservar" legacyBehavior>
                <a>
                  RESERVAR
                  <ul className={Styles.submenu}>
                    <li>
                      <Link href="/MyReservas" legacyBehavior>
                        <a>MINHAS RESERVAS</a>
                      </Link>
                    </li>
                  </ul>
                </a>
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
    </nav>
  );
};

export default Navbar;
