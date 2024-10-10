import React from "react";
import {
  FaInfoCircle,
  FaUser,
  FaCamera,
  FaCog,
  FaEye,
  FaVideo,
} from "react-icons/fa";
import { useRouter } from "next/router"; // Importar useRouter


interface BarContaProps {
  handleModificar: () => void;
  showModificar: boolean;
  handleContacto: () => void;
  showContacto: boolean;
  handleFotos: () => void;
  showFotos: boolean;
  handleVerPerfil: () => void;
  handleStories: () => void;
  showStories: boolean;
}

const BarConta: React.FC<BarContaProps> = ({
  handleModificar,
  showModificar,
  handleContacto,
  showContacto,
  handleFotos,
  showFotos,
  handleVerPerfil,
  handleStories,
  showStories,
}) => {
  return (
    <aside className="bg-gradient-to-b from-gray-900 to-gray-700 px-6 mt-10 w-72 shadow-xl flex flex-col ">
      {/* Logo/Brand Section */}
      <div className="flex justify-center mb-14">
        <img
          src="/photos/logo1.png"
          alt="logo"
          className="w-40 h-auto object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="space-y-4">
        <button
          onClick={handleModificar}
          className={`flex items-center justify-center w-full p-4 rounded-xl transition-all hover:bg-pink-500 text-white shadow-lg ${
            showModificar ? "bg-pink-500" : "bg-gray-800"
          }`}
        >
          <FaInfoCircle className="text-2xl" />
          <span className="ml-4 hidden lg:block">Informações</span>
        </button>

        <button
          onClick={handleContacto}
          className={`flex items-center justify-center w-full p-4 rounded-xl transition-all hover:bg-pink-500 text-white shadow-lg ${
            showContacto ? "bg-pink-500" : "bg-gray-800"
          }`}
        >
          <FaUser className="text-2xl" />
          <span className="ml-4 hidden lg:block">Outras Info</span>
        </button>

        <button
          onClick={handleFotos}
          className={`flex items-center justify-center w-full p-4 rounded-xl transition-all hover:bg-pink-500 text-white shadow-lg ${
            showFotos ? "bg-pink-500" : "bg-gray-800"
          }`}
        >
          <FaCamera className="text-2xl" />
          <span className="ml-4 hidden lg:block">Alterar Fotos</span>
        </button>

        <button
          onClick={handleStories}
          className={`flex items-center justify-center w-full p-4 rounded-xl transition-all hover:bg-pink-500 text-white shadow-lg ${
            showStories ? "bg-pink-500" : "bg-gray-800"
          }`}
        >
          <FaVideo className="text-2xl" />
          <span className="ml-4 hidden lg:block">Os Meus Stories</span>
        </button>

        <button className="flex items-center justify-center w-full p-4 rounded-xl transition-all hover:bg-pink-500 text-white shadow-lg bg-gray-800">
          <FaCog className="text-2xl" />
          <span className="ml-4 hidden lg:block">Definições</span>
        </button>

        <button
          onClick={handleVerPerfil}
          className="flex items-center justify-center w-full p-4 rounded-xl transition-all hover:bg-pink-500 text-white shadow-lg bg-gray-800"
        >
          <FaEye className="text-2xl" />
          <span className="ml-4 hidden lg:block">Ver Perfil</span>
        </button>
      </nav>

      {/* Footer */}
      {/* <div className="mt-6">
        <button className="flex items-center justify-center w-full p-4 text-sm rounded-xl bg-pink-600 hover:bg-pink-500 text-white shadow-lg transition-all">
          Logout
        </button>
      </div> */}
    </aside>
  );
};

export default BarConta;
