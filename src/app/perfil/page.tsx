"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "@/node_modules/next/navigation";
import { parseCookies } from "@/node_modules/nookies";
import Styles from "../page.module.css";
import Navbar from "../componentes/navbar";

const EditProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState({ nome: "", email: "" });

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies["restaurant-token"];
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodifica o payload do JWT
        setUser({ nome: decodedToken.nome, email: decodedToken.email });
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
        router.push("/login");
      }
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Perfil atualizado:", user);
    router.push("/"); // Redireciona para a página inicial
  };

  return (
    <div className={Styles.formulario}>
        <Navbar/>
      <h1>Editar Perfil</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={user.nome}
            onChange={(e) => setUser({ ...user, nome: e.target.value })}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </label>
        <button type="submit" className={Styles.button}>
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
