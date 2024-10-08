import React from "react";
import { FaInfoCircle, FaUser, FaCamera, FaCog, FaEye } from "react-icons/fa";

interface SideBarContaProps {
  handleModificar: () => void;
  showModificar: boolean;
  handleContacto: () => void;
  showContacto: boolean;
  handleFotos: () => void;
  showFotos: boolean;
  handleDefinicoes: () => void;
  handleVerPerfil: () => void;
  sidebarOpen: boolean;

}

const SideBarConta: React.FC<SideBarContaProps> = ({
  handleModificar,
  showModificar,
  handleContacto,
  showContacto,
  handleFotos,
  showFotos,
  handleDefinicoes,
  handleVerPerfil,
}) => {
  return (
    <aside className=" bg-gray-800 p-8 ">
      {/* <div className="flex items-center justify-center h-screen border-b border-gray-700">
        <img
          src="/photos/logo1.png"
          alt="logo"
          className="w-32 h-12 object-contain"
        />
      </div> */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <button
          onClick={handleModificar}
          className={`flex items-center w-full p-2 rounded-md hover:bg-pink-700 transition-colors ${
            showModificar ? "bg-pink-700" : ""
          }`}
        >
          <FaInfoCircle className="mr-3" />
          Informações Gerais
        </button>
        <button
          onClick={handleContacto}
          className={`flex items-center w-full p-2 rounded-md hover:bg-pink-700 transition-colors ${
            showContacto ? "bg-pink-700" : ""
          }`}
        >
          <FaUser className="mr-3" />
          Outras Informações
        </button>
        <button
          onClick={handleFotos}
          className={`flex items-center w-full p-2 rounded-md hover:bg-pink-800 transition-colors ${
            showFotos ? "bg-pink-700" : ""
          }`}
        >
          <FaCamera className="mr-3" />
          Alterar Fotos
        </button>
        <button
          onClick={handleDefinicoes}
          className="flex items-center w-full p-2 rounded-md hover:bg-pink-800 transition-colors"
        >
          <FaCog className="mr-3" />
          Definições
        </button>

        
        <button
          onClick={handleVerPerfil}
          className="flex items-center w-full p-2 rounded-md hover:bg-pink-800 transition-colors"
        >
          <FaEye className="mr-3" />
          Ver Perfil
        </button>
      </nav>
      <div className="px-4 py-4 border-t border-gray-700">
        {/* Add any additional sidebar content here */}
      </div>
    </aside>
  );
};

export default SideBarConta;
