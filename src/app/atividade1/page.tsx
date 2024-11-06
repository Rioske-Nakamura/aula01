"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "../componentes/input";
import Button from "../componentes/button";
import Usuario from "../interfaces/usuario";

export default function Rota() {
  const [error, setError] = useState("");
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: 1,
      nome: "Rioske Nakamura",
      email: "rioskenakamura@gmail.com",
      password: "123456",
      tipo: "admin"
    },
    {
      id: 2,
      nome: "Maryah",
      email: "maryah@gmail.com",
      password: "123456",
      tipo: "ajudante"
    }
  ]);

  const router = useRouter();


  const Verifica = () => {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    console.log(email, password);

    const usuarioValido = usuarios.find(
      (usuario) => usuario.email === email && usuario.password === password
    );

    if (usuarioValido) {
      setError("Usuário válido");
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      router.push("/");
    } else {
      setError("Usuário ou senha inválidos");
    }
  };

  return (
    <div>
      <h1>Rota</h1>
      <div>
        <Input name="email" tipo="text" id="email" />
        <Input name="senha" tipo="password" id="password" />
        <Button name="Login" onClick={Verifica} />
      </div>
      <p id="error">{error}</p>
      <a href="/">Home</a>
    </div>
  );
}


