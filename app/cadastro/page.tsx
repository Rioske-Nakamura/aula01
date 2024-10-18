"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../componentes/input";
import Button from "../componentes/butto"; // Corrigido o nome do arquivo
import Usuario from "../interfaces/usuario";

export default function Cadastro() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [nome, setNome] = useState("");
    const [nascimento, setNascimento] = useState("");

    const router = useRouter();
 const [usuario, setUsuario] = useState<Usuario>({nome: "", email: "", password: "", tipo: "cliente"});
const Cadastra = (novonNome : string, novonEmail : string, novonPassword : string) => {
    
    
    console.log(novonNome, novonEmail, novonPassword) 


        setUsuario((prevUsuario) => ({
            ...prevUsuario,
            nome: novonNome,
            email: novonEmail,
            password: novonPassword
        }))
    }
    



    return (
        <div>
            <h2>Cadastra-se</h2>
            <div>

            <input
                name="email"
                type="email" 
                id="email"
                onChange={(e) => setEmail(e.target.value)} />
            <input
                name="password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}

            />
            <input
                name="nome"
                type="text"
                id="nome"
                onChange={(e) => setNome(e.target.value)}
            />
            <input
                name="nascimento"
                type="date"
                id={"nascimento"}
                onChange={(e) => setNascimento(e.target.value)}
            />
            
            <Button name="Cadastrar"  onClick={() => Cadastra(nome, email, password)}/>
            
                </div>
            {error && <p>{error}</p>}
        </div>
    );
}

