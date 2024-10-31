interface Usuario {
    id?: number,
    nome: string,
    email : string,
    password: string,
    tipo?: string ,
}

const Perfilusuario: React.FC <{usuario: Usuario}> = ({usuario}) => {
    return (
        <div>
   
            <h1>{usuario.nome}</h1>
            {usuario.email && <h1> {usuario.email}</h1>}
        </div>
    )    
}

export default Perfilusuario
