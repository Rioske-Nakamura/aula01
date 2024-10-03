interface Usuario {
    id: number,
    nome: string,
    email : string,
    senha: string,
    tipo: string 
}

/*const Perfilusuario: React.FC <{usuario: Usuario}> = ({usuario}) => {
    return (
        <div>
            <h1>{usuario.idade}</h1>
            <h1>{usuario.nome}</h1>
            {usuario.email && <h1> {usuario.email}</h1>}
        </div>
    )    
}

export default Perfilusuario*/

export default Usuario