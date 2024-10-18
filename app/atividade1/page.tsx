"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "../componentes/input";
import Button from "../componentes/butto"; 

export default function Rota() {
  const [error, setError] = useState("");
  const [usuarios, setUsuarios] = useState<{ email: string; password: string }[]>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    fetch("/usuarios.json")
      .then((response) => response.json())
      .then((data) => setUsuarios(data.usuarios))
      .catch((error) => console.error("Erro ao carregar os usuários:", error));
  }, []);

  const Verifica = () => {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    let usuarioValido = false;
    for (let i = 0; i < usuarios.length; i++) {
      if (email === usuarios[i].email && password === usuarios[i].password) {
        usuarioValido = true;
        break;
      }
    }

    if (usuarioValido) {
      setError("Usuário válido");
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
