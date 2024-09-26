"use client"
import { useState } from "react"



export default function Rota() {
    const [error, setError] = useState("")
    const [usuarios, setUsuarios] = useState([{email: "rioskenakamura@gmail.com", password: "123456"}])
  

    const Verifica = () => {
        const email = (document.getElementById("email") as HTMLInputElement).value
        const password = (document.getElementById("password") as HTMLInputElement).value

        let usuarioValido = false;
        for (let i = 0; i < usuarios.length; i++) {
            if (email === usuarios[i].email && password === usuarios[i].password) {
                usuarioValido = true;
                break; 
            } 
        }

        if (usuarioValido) {
            setError("Usuario valido")
            window.location.href = "/" //não funciona o Router no use Client
        } else {
            setError("Usuário ou senha inválidos")
        }
    }

    return (
        <div>
            <h1>Rota</h1>
            <div>
                <h2>Email</h2>
                <input type="text" placeholder="email" name="email" id="email" />
                <h2>Senha</h2>
                <input type="password" placeholder="password" name="password" id="password" />

                <button type="submit" onClick={Verifica}>Login</button>
            </div>
            
            <p id="error">{error}</p>

            <a href="/">Home</a>
        </div>
    )
}
