"use client"
import Image from "next/image";
import { useState } from "react";
import Button from "./componentes/butto";

export default function Home() {
  const [user, setUser] = useState(false)
  if (user){
    return(
      <div>
        <a href="/rota">my route</a>
        <h1>hello</h1>
        <button onClick={() => setUser(false)}>Logout</button>
        <Button name="Informatica 6" />
      </div>
    )
  }
  else{
    return(
      <div>
        <a href="/atividade1">Atividade de Sabado </a>
        <h1>bye</h1>
        <button onClick={() => setUser(true)}>Login</button>
      </div>
    )
  }
 
}
