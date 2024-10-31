import React from "react"
import Styles from "../page.module.css"

type Inputprops = {
    name: string
    tipo: string
    id: string
}

const Input: React.FC<Inputprops> =({  name,  tipo,  id }) => {
    return (
        <div>
            <h2>{name}</h2>
            <input className={Styles.input} type={tipo} name={name} id={id} placeholder={"digite o(a) "+ name}/></div>
    )
}

export default Input