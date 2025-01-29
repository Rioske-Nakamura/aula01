"use client";

import { useEffect, useState } from "react";
import { parseCookies } from "nookies"; // Para ler os cookies do navegador
import { useRouter } from "next/navigation"; // Hook de navegação para redirecionamento
import Styles from "../page.module.css"; // Estilos específicos da página
import { ApiURL } from "../config"; // URL base da API
import Navbar from "../componentes/navbar"; // Componente de barra de navegação

// Interface para a estrutura da mesa
interface Table {
  id: number;
  name: string;
  reserved: boolean;
  nickname: string;
}

const Reservar = () => {
  // Estado para armazenar as mesas organizadas em uma grade 2D
  const [grid, setGrid] = useState<Table[][]>([]);
  const [nickname, setNickname] = useState(""); // Estado para o apelido
  const [contact, setContact] = useState(""); // Estado para o contato
  const [selectedTable, setSelectedTable] = useState<number | null>(null); // Estado para a mesa selecionada
  const router = useRouter(); // Instância de navegação do Next.js

  // Efeito para carregar a grade de mesas e verificar se o usuário está autenticado
  useEffect(() => {
    const { "restaurant-token": token } = parseCookies(); // Recupera o token dos cookies
    if (!token) router.push("/login"); // Se não houver token, redireciona para a página de login

    const fetchGrid = async () => {
      try {
        // Faz a requisição para obter a grade de mesas
        const response = await fetch(`${ApiURL}/table/grid`);
        const data = await response.json();
        if (response.ok) {
          setGrid(data.grid); // Se a resposta for ok, atualiza o estado com a grade de mesas
        } else {
          console.error(data.msg); // Exibe a mensagem de erro no console
        }
      } catch (error) {
        console.error("Erro ao carregar a grade de mesas:", error); // Exibe erro se a requisição falhar
      }
    };

    fetchGrid(); // Chama a função para buscar a grade de mesas
  }, []); // Executa apenas uma vez quando o componente é montado

  // Função para reservar uma mesa
  const reserveTable = async () => {
    if (selectedTable) {
      try {
        // Recupera o token do cookie e decodifica para pegar o ID do usuário
        const { "restaurant-token": token } = parseCookies();
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodifica o token JWT
        const userId = decodedToken.id; // Obtém o ID do usuário do token

        // Faz a requisição para reservar a mesa
        const response = await fetch(`${ApiURL}/table/reserve`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tableId: selectedTable, nickname, contact, userId }), // Envia os dados da reserva
        });

        const data = await response.json();
        if (response.ok) {
          alert("Reserva feita com sucesso!"); // Exibe um alerta se a reserva for feita com sucesso
          setGrid((prev) =>
            prev.map((row) =>
              row.map((table) =>
                table?.id === selectedTable ? { ...table, reserved: true } : table // Marca a mesa como reservada
              )
            )
          );
          setSelectedTable(null); // Limpa a mesa selecionada
          setNickname(""); // Limpa o campo de apelido
          setContact(""); // Limpa o campo de contato
        } else {
          alert(data.msg); // Exibe a mensagem de erro se a resposta não for ok
        }
      } catch (error) {
        console.error("Erro ao reservar mesa:", error); // Exibe erro se a requisição falhar
      }
    }
  };

  return (
    <div className={Styles.reservar}>
      <Navbar /> {/* Componente de navegação */}
      <h1>Mapa de Reserva</h1>
      <img src="../imgs/mapa.png" className={Styles.mapa} /> {/* Exibe a imagem do mapa das mesas */}
      <div className={Styles.reservar2}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className={Styles.mesas}>
            {row.map((table, colIndex) =>
              table ? (
                <button
                  key={colIndex}
                  onClick={() => !table.reserved && setSelectedTable(table.id)} // Seleciona a mesa caso não esteja reservada
                  disabled={table.reserved} // Desabilita o botão se a mesa já estiver reservada
                >
                  {table.name} {/* Exibe o nome da mesa */}
                </button>
              ) : (
                <div key={colIndex} className={Styles.empty}></div> // Exibe um espaço vazio se a mesa não existir
              )
            )}
          </div>
        ))}
      </div>

      {selectedTable && (
        <div className={Styles.formulario}>
          <h2>Reservar Mesa</h2>
          <input
            type="text"
            placeholder="Apelido"
            value={nickname} // O valor do input é o estado nickname
            onChange={(e) => setNickname(e.target.value)} // Atualiza o estado nickname conforme o usuário digita
            required
          />
          <input
            type="text"
            placeholder="Contato"
            value={contact} // O valor do input é o estado contact
            onChange={(e) => setContact(e.target.value)} // Atualiza o estado contact conforme o usuário digita
            required
          />
          <button onClick={reserveTable}>Confirmar Reserva</button> {/* Botão para confirmar a reserva */}
        </div>
      )}
    </div>
  );
};

export default Reservar;
