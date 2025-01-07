"use client"

import { useEffect } from "react";
import Navbar from "../componentes/navbar";
import { parseCookies } from "nookies";
import router from "next/router";
import Styles from "../page.module.css";



const MyReservas = () => {
    useEffect(() => {
        const { "restaurant-token": token } = parseCookies();
        if (!token) {
          router.push("/login");
        }
      }, []);
    return(
      <div className={Styles.reservar}>

        <Navbar/>

        <h2>Minhas Reservas</h2>

</div>
    )
};

export default MyReservas;