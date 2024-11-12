"use client";
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ApiURL } from "../config";
import styles from './page.module.css';
import { setCookie } from "nookies";
interface ResponseSignin {
  erro: boolean,
  mensagem: string,
  token?: string
}

export default function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();
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

        }
      } else {

      }
    }

    catch (error) {
      console.error('Erro na requisicao', error)
    };
  }
  return (
    <div>
      <h1>Rota</h1>
      <form onSubmit={Verifica}>
        <input type="text" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <input type="password" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="senha" />
        <button type="submit">aaaaaaaaaaaaaaaaa</button>
      </form>
      <p id="error">{error}</p>
      <a href="/">Home</a>
    </div>
  );
}