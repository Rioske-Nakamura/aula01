"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import Styles from "../page.module.css";
import Navbar from "../componentes/navbar";
import { ApiURL } from "../config";
const EditProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ nome: string; email: string; password: string }>({
    nome: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies["restaurant-token"];
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodifica o payload do JWT
        setUser({
          nome: decodedToken.nome,
          email: decodedToken.email,
          password: "", // A senha pode ser deixada vazia ou preenchida conforme necessário
        });
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
        router.push("/login");
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const cookies = parseCookies();
    const token = cookies["restaurant-token"];
    const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;

    if (decodedToken) {
      try {
        const response = await fetch(`${ApiURL}/perfil/update-profile/${decodedToken.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        });

        const data = await response.json();
        if (response.ok) {
          console.log("Perfil atualizado:", data);
          router.push("/"); // Redireciona para a página inicial
        } else {
          console.error("Erro ao atualizar perfil:", data.msg);
        }
      } catch (error) {
        console.error("Erro ao enviar a requisição:", error);
      }
    }
    setLoading(false);
  };

  return (
    <div className={Styles.reservar}>
      <Navbar />
      <div className={Styles.formulario}>
        <h1>Editar Perfil</h1>
        <form onSubmit={handleSubmit}>
          <p>
            Nome:
            <input
              type="text"
              className={Styles.input}
              value={user.nome}
              onChange={(e) => setUser({ ...user, nome: e.target.value })}
            />
          </p>
          <p>
            Email:
            <input
              type="email"
              className={Styles.input}
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </p>
          <p>
            Nova Senha:
            <input
              type="password"
              className={Styles.input}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </p>
          <button type="submit" className={Styles.button} disabled={loading}>
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
