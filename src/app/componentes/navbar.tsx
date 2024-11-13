import React from "react"
import Styles from "../page.module.css"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
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

    return (
        <nav className={Styles.navbar}>
      <ul className={Styles.links}>
                <li><a href="#">HOME</a></li>
                <li><a href="#">MENUS</a></li>
                <li><a href="#">RESERVAS</a></li>
                <li><a href="#">CONTATOS</a></li>
                {user ? (
                <li><a className={Styles.links} onClick={handleLogout} >LOGOUT</a></li>           
            ) : (
                <li><a className={Styles.links} onClick={handleLogout} >LOGIN</a></li>
            )}
                </ul>

            <div className={Styles.icons}>
                <a href="#"></a>
                <a href="#"></a>
                <a href="#"></a>
            </div>
      <div>
      </div>
    </nav>
    )
};

export default Navbar