import React from "react"


type Buttonprops = {
    name: string

}

const Button: React.FC<Buttonprops> =( { name }) => {
    return <div><h1>{name}</h1></div>
}

export default Button