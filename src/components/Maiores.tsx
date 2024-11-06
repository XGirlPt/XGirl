"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';


interface MaioresProps {
  setShowMaiores: (value: boolean) => void;
}

const Maiores: React.FC<MaioresProps> = ({ setShowMaiores }) => {
  const [mostrarMaiores, setMostrarMaiores] = useState(false);

  useEffect(() => {
    // Usando requestIdleCallback para exibir o modal apenas após o carregamento do conteúdo
    if (typeof requestIdleCallback === "function") {
      requestIdleCallback(() => {
        setMostrarMaiores(true);
      });
    } else {
      setTimeout(() => {
        setMostrarMaiores(true);
      }, 300); // Um pequeno atraso em caso de não suportar requestIdleCallback
    }

    document.body.style.overflow = "hidden"; // Impedir rolagem enquanto o modal está aberto
    return () => {
      document.body.style.overflow = ""; // Liberar overflow ao desmontar
    };
  }, []);

  const fecharMaiores = () => {
    setMostrarMaiores(false);
    setShowMaiores(false);
  };

  return (
    mostrarMaiores && (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75 backdrop-blur-sm transition-opacity duration-300">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg transform transition-transform duration-300 scale-100 hover:scale-105">
          <h1 className="text-2xl font-bold text-black">Aviso de Conteúdo Adulto e Uso de Cookies</h1>
          <p className="text-black mt-2">Bem-vindo ao Xgirl.pt</p>
          <p className="text-black text-sm mt-4">
            Este website contém materiais restritos por idade, incluindo nudez. Ao entrar, você confirma que tem pelo
            menos 18 anos de idade ou a idade da maioria na jurisdição de onde está acessando o website, e consente em
            visualizar conteúdo sexualmente explícito.
          </p>
          <div className="flex justify-around mt-6 gap-4">
            <button
              className="px-6 py-3 text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-200 text-sm"
              onClick={fecharMaiores}
              aria-label="Confirmar que sou maior de 18 anos"
            >
              Sou maior de 18 anos - Entrar
            </button>
            <Link href="https://www.google.com" passHref>
              <button 
                className="px-6 py-3 text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-200 text-sm"
                aria-label="Indicar que sou menor de 18 anos e sair"
              >
                Sou menor de 18 anos - Sair
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default Maiores;
