"use client"; // Indica que este é um componente cliente, necessário para Next.js 13 com React Server Components

// Importando os componentes necessários
import Navbar from "./componentes/navbar"; // Importa o componente Navbar para exibir no topo
import Footer from "./componentes/footer"; // Importa o componente Footer para exibir no rodapé
import Inicio from "./componentes/inicio"; // Importa o componente Inicio para exibir a seção principal
import Styles from "./page.module.css"; // Importa os estilos CSS definidos no arquivo page.module.css

// Definindo o componente funcional Home
export default function Home() {
  return (
    <div className={Styles.body}> {/* Aplica o estilo 'body' definido no arquivo CSS a esta div */}
      
      <Navbar /> {/* Exibe o componente Navbar na parte superior da página */}

      <Inicio /> {/* Exibe o componente Inicio, que pode ser a seção principal da página */}

      <Footer /> {/* Exibe o componente Footer na parte inferior da página */}
      
    </div>
  );
}
