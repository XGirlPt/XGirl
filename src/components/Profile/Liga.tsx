/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp, FaMoneyBillWave } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useSelector } from "react-redux";
import ru from "../../../public/Flags/ru.svg";
import ale from "../../../public/Flags/ale.svg";
import pt from "../../../public/Flags/pt.svg";
import fr from "../../../public/Flags/fr.svg";
import ing from "../../../public/Flags/ing.svg";
import it from "../../../public/Flags/it.svg";
import es from "../../../public/Flags/es.svg";
import ar from "../../../public/Flags/ar.png";
import Image from "next/image";

interface LigaProps {
  selectedProfile: {
    nome: string;
    Tarifa: number;
    lingua: string[];
    telefone: string;
  };
  setShowLiga: (show: boolean) => void;
}

const Liga: React.FC<LigaProps> = ({ selectedProfile, setShowLiga }) => {
  const [mostrarLiga, setMostrarLiga] = useState(true);

  const fecharLiga = () => {
    setMostrarLiga(false);
    setShowLiga(false); // Resetar o estado showLiga no componente Profile
  };

  const obterBandeira = (lingua: string): string => {
    switch (lingua) {
      case "Russo":
        return "/Flags/ru.svg"; // Caminho relativo para a pasta public
      case "Alemão":
        return "/Flags/ale.svg";
      case "Português":
        return "/Flags/pt.svg";
      case "Francês":
        return "/Flags/fr.svg";
      case "Inglês":
        return "/Flags/ing.svg";
      case "Italiano":
        return "/Flags/it.svg";
      case "Espanhol":
        return "/Flags/es.svg";
      case "Árabe":
        return "/Flags/ar.png";
      default:
        return ""; // Pode definir uma imagem padrão para línguas sem bandeira específica
    }
  };

  const telefoneRedux = useSelector(
    (state: any) => state.profile?.profile?.telefone
  );
  const linguaRedux = useSelector(
    (state: any) => state.profile?.profile?.lingua
  );

  return (
    <>
      {mostrarLiga && (
        <div className="fixed inset-0 flex justify-center bg-black bg-opacity-60 backdrop-blur-md z-50">
          <div className="w-full md:w-2/6 h-46 md:h-2/4 mt-36 bg-gray-900 dark:bg-gray-800  rounded-lg shadow-2xl ">
            <div className="flex justify-between items-center">
              <h1 className="text-sm md:text-xl mx-10 items-center mt-8 align-middle mb-4 text-white font-bold">
                Liga a {selectedProfile?.nome}
              </h1>
              <button className="text-bold font-bold" onClick={fecharLiga}>
                <ImCross
                  size={16}
                  className="text-zinc-600 hover:text-pink-800 transition-transform font-bold mx-10"
                />
              </button>
            </div>
            <div className="border-t border-neutral-600 p-2  relative"></div>
            <div className="flex gap-6 px-6 py-6 pb-10">
              <div className="bg-pink-800 py-2 rounded-md w-full justify-center flex z-100 hover:bg-pink-600">
                <FiPhone size={22} className="mr-2 text-white" />
                <p className="text-md text-white ">
                  {selectedProfile?.telefone}
                </p>
              </div>
              <div
                className="bg-green-500 hover:bg-green-600 py-2 rounded-md w-full justify-center flex cursor-pointer z-100"
                onClick={() =>
                  window.open(
                    `https://api.whatsapp.com/send?phone=41${selectedProfile?.telefone}`,
                    "_blank"
                  )
                }
              >
                <FaWhatsapp size={22} className="mr-2 text-white" />
                <p className="text-md text-white ">WhatsApp</p>
              </div>
            </div>
            <div className="border-t border-neutral-700 p-2 relative"></div>
            <div className="flex items-center justify-center">
              <FaMoneyBillWave size={24} className="text-pink-800 mr-4" />
              <p className="text-white text-lg">
                Tarifas a partir de {selectedProfile?.Tarifa} €
              </p>
            </div>
            <div className="border-t border-neutral-700  relative mt-6"></div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-3 gap-y-3 justify-center items-center my-4">
                {linguaRedux &&
                  linguaRedux.map((lingua: string, index: number) => (
                    <div key={index} className="flex items-center mx-2">
                      < Image
  src={obterBandeira(lingua)}
  alt={`${lingua} flag`}
  className="w-6 h-6 mr-2 rounded-full object-cover grid grid-cols-3 gap-y-2"
  layout="responsive"
  width={100}
  height={100}
  

/>
                      <span className="text-white">{lingua}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Liga;
