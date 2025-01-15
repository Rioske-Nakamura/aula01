"use client";
import { FormEvent, useState, useEffect } from "react";
import Usuario from "../interfaces/usuario";
import { ApiURL } from "../config";
import styles from '../login/page.module.css';
import { useRouter } from "@/node_modules/next/navigation";
import { parseCookies, destroyCookie } from "@/node_modules/nookies";




export default function Cadastro() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario>({
    nome: "",
    email: "",
    password: "",
    tipo: "cliente"
  });

  const [erroCadastro, setErroCadastro] = useState<string>("");

  const handleChange = (field: keyof Usuario, value: string) => {
    setUsuario((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!usuario.nome || !usuario.email || !usuario.password) {
      setErroCadastro("Por favor, preencha todos os campos.");
      return;
    }
    console.log("Dados enviados:", usuario); 
    try {
      const response = await fetch(`${ApiURL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
      });

      const data: { erro: boolean; msg: string } = await response.json();

      if (data.erro) {
        setErroCadastro(data.msg);
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setErroCadastro("Ocorreu um erro. Tente novamente mais tarde.");
    }
  };

  useEffect(() => {
    const {'restaurant-token': token} = parseCookies();
    if (token){
      router.push("/")
    }
  }, []);

  return (
    <div className={styles.center}>
    <div  className={styles.loginContainer}>
    <img src="https://static.wixstatic.com/media/9fbf96_0fbf26014a794c87b00f0ad557394ad1~mv2.png/v1/fill/w_382,h_382,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo-red-bamboo-17-0120.png" alt="WordPress Logo" className={styles.logo} ></img>
      <form onSubmit={handleSubmit} className={styles.form}>
      <label>Digite seu nome de usuário</label>
        <input className={styles.input}
          name="nome"
          type="text"
          value={usuario.nome}
          onChange={(e) => handleChange("nome", e.target.value)}
        />
        <label>Digite seu endereço de e-mail</label>
        <input className={styles.input}
          name="email"
          type="email"
          value={usuario.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <label>Digite uma senha forte</label>
        <input className={styles.input}
          name="password"
          type="password"
          value={usuario.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <button className={styles.Button2} type="submit" >Cadastrar</button>
      </form>
      {erroCadastro && <p style={{ color: "red" }}>{erroCadastro}</p>}

      <a className={styles.link}href="/login" >já possui cadastro? Login </a>

      <a className={styles.link} href="/">Home</a>

    </div>
    </div>
  );
}
