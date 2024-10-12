/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { IoInformationCircle } from "react-icons/io5";

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
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50 backdrop-blur-md">
          <div className="w-full md:w-3/5 h-auto max-w-lg mx-4 bg-[#1E2427] rounded-lg shadow-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg md:text-xl text-white font-bold">Perfil Certificado</h1>
              <button onClick={fecharCertificado} className="text-white hover:text-pink-800 transition-colors">
                <ImCross size={20} />
              </button>
            </div>
            <div className="border-b border-zinc-700 my-4"></div>
  
            <div className="flex items-center bg-green-600 p-4 rounded-md mb-6">
              <span className="text-white font-bold">Certificado</span>
              <IoInformationCircle size={20} className="text-white ml-2" />
            </div>
  
            <div className="text-white mb-6">
              <p className="mb-4">
                Um perfil certificado significa que as fotos foram validadas por um moderador da equipe <span className="text-pink-800">XGirl</span> e correspondem à realidade.
              </p>
              <p className="mb-4">
                Além do controle humano, um sistema automático analisa todas as fotos dos perfis certificados para garantir que não pertencem a outra pessoa na internet.
              </p>
              <p>
                <strong>Perfil certificado = Encontro 100% satisfeito.</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
  
};

export default Certificado;
