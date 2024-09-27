import React from "react"

type Inputprops = {
    name: string
    tipo: string
    id: string
}

const Input: React.FC<Inputprops> =({  name,  tipo,  id }) => {
    return (
        <div>
            <h2>{name}</h2>
            <input type={tipo} name={name} id={id} placeholder={"digite o(a) "+ name}/></div>
    )
}

export default Input