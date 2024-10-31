interface Reserva {
    id: number,
    usuario_id: number,
    mesa_id: number,
    data: Date,
    n_pessoas: number
    status: boolean
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

export default Reserva