// Maiores.tsx
import Link from "next/link";
import { useState, useEffect } from "react";

interface MaioresProps {
  setShowMaiores: (value: boolean) => void;
}

const Maiores: React.FC<MaioresProps> = ({ setShowMaiores }) => {
  const [mostrarMaiores, setMostrarMaiores] = useState(false);

  useEffect(() => {
    setMostrarMaiores(true); // Exibir sem atraso
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
        <div className="w-full max-w-lg h-[300px] p-6 md:p-8 bg-gray-600 rounded-lg shadow-2xl space-y-4">
          <h1 className="text-xl font-bold text-white">Aviso de Conteúdo Adulto e Uso de Cookies</h1>
          <p className="text-white">Bem-vindo ao Xgirl.pt</p>
          <p className="text-white text-sm">
            Este website contém materiais restritos por idade, incluindo nudez. Ao entrar, você confirma que tem pelo
            menos 18 anos de idade ou a idade da maioria na jurisdição de onde está acessando o website, e consente em
            visualizar conteúdo sexualmente explícito.
          </p>
          <div className="flex justify-around mt-4 pt-10 gap-6">
            <button
              className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 text-sm"
              onClick={fecharMaiores}
            >
              Sou maior de 18 anos - Entrar
            </button>
            <Link href="https://www.google.com">
              <button className="px-4 py-2 text-white bg-black rounded-md hover:bg-zinc-700 text-sm">
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
