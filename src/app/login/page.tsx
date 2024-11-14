"use client";
import { useState, FormEvent, useEffect } from "react";

import { ApiURL } from "../config";
import styles from './page.module.css';

import { useRouter } from "@/node_modules/next/navigation";
import { setCookie } from "@/node_modules/nookies/dist/index";
interface ResponseSignin {
  erro: boolean,
  mensagem: string,
  token?: string
}

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const Verifica = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ApiURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      console.log(response)
      if (response) {
        const data: ResponseSignin = await response.json()
        const { erro, mensagem, token = '' } = data;
        console.log(data)
        if (erro) {
          setError(mensagem)
        } else {
          // npm i nookies setCookie
          setCookie(undefined, 'restaurant-token', token, {
            maxAge: 60 * 60 * 1 // 1 hora
          })

          router.push('/')

        }
      } else {

      }
    }

    catch (error) {
      console.error('Erro na requisicao', error)
    };
  }
  return (
    <div className={styles.center}>
    <div  className={styles.loginContainer}>
       <img src="https://static.wixstatic.com/media/9fbf96_0fbf26014a794c87b00f0ad557394ad1~mv2.png/v1/fill/w_382,h_382,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo-red-bamboo-17-0120.png" alt="WordPress Logo" className={styles.logo} ></img>
      <form onSubmit={Verifica} className={styles.form}>
      <label>Digite seu endereço de e-mail</label>
        <input type="text" className={styles.input} value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="email" />
        <label>Digite sua senha</label>
        <input type="password" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="senha" />
        <button className={styles.Button2} type="submit">Verifica</button>
      </form>
      <p id="error" style={{ color: "red" }} >{error}</p>
      <a className={styles.link}href="/cadastro" >não possui cadastro? Cadastrar</a>

      <a className={styles.link} href="/">Home</a>
    </div>
    </div>
  );
}