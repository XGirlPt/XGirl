/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { IoInformationCircle } from "react-icons/io5";
import { VscVerifiedFilled } from "react-icons/vsc";


interface CertificadoProps {
  setShowCertificado: (show: boolean) => void;
  selectedProfile?: {
    nome: string;
    Tarifa: number;
    // Add other necessary properties here
  };
}

const Certificado: React.FC<CertificadoProps> = ({ setShowCertificado }) => {
  const [mostrarCertificado, setMostrarCertificado] = useState(true);

  const fecharCertificado = () => {
    setMostrarCertificado(false);
    setShowCertificado(false); // Resetar o estado showCertificado no componente Profile
  };

  return (
    <>
     {mostrarCertificado && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 backdrop-blur-md z-50">
    <div className="w-full max-w-md bg-gray-900 dark:bg-gray-800 p-6 rounded-xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg md:text-xl text-white font-semibold">
          Perfil Certificado
        </h1>
        <button onClick={fecharCertificado} className="p-2 rounded-full hover:bg-gray-700">
          <ImCross
            size={16}
            className="text-gray-400 hover:text-pink-500 transition-colors"
          />
        </button>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-700 mb-6"></div>

      {/* Certificado Badge */}
      <div className="flex items-center justify-center bg-green-600 py-2 px-4 rounded-lg mb-6">
        <span className="text-white font-medium">Certificado</span>
        <VscVerifiedFilled size={20} className="text-white ml-2" />
      </div>

      {/* Certificado Description */}
      <div className="text-gray-400">
        <p className="mb-4">
          Um perfil certificado significa que as fotos foram validadas por um moderador da equipe <span className="text-pink-500 font-medium">XGirl</span> e correspondem à realidade.
        </p>
        <p className="mb-4">
          Além do controle humano, um sistema automático analisa todas as fotos dos perfis certificados para garantir que não pertencem a outra pessoa na internet.
        </p>
        <p>
          <strong className="text-gray-200">Perfil certificado = Encontro 100% satisfeito.</strong>
        </p>
      </div>
    </div>
  </div>
)}

    </>
  );
  
};

export default Certificado;
