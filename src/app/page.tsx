"use client";
import Navbar from "./componentes/navbar";
import Footer from "./componentes/footer";
import Inicio from "./componentes/inicio"
import  Styles  from "./page.module.css";

export default function Home() {
  return (
    <div className={Styles.body}>
      <Navbar/>

      <Inicio/>

     <Footer/> 
    </div>
  );
}