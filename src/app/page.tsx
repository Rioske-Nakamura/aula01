"use client";
import { useState, useEffect } from "react";
import Button from "./componentes/button";
import { useRouter } from "next/navigation";
import Styles from "./page.module.css";

export default function Home() {
  const [user, setUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    if (email && password) {
      setUser(true);
    }
    else {
      router.push("/atividade1");
    }
  }, []);



  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    setUser(false);
    router.push("/atividade1");
  };

  if (user) {
    return (
      <div>
        <a href="/rota">my route</a>
        <h1>hello</h1>
        <button onClick={handleLogout}>Logout</button>
        <Button name="Informatica 6" />
      </div>
    );
  } 


  return null;
}
