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
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50 backdrop-blur-md">
          <div className="w-full md:w-3/5 h-auto max-w-lg mx-4 bg-[#1E2427] rounded-xl shadow-2xl p-6">
            
            <div className="flex justify-between items-center mb-4">
             <div>
              <h1 className="text-lg md:text-xl text-white font-bold">Perfil Certificado</h1>

              
              </div>

              <button onClick={fecharCertificado} className="text-white hover:text-pink-800 transition-colors">
                <ImCross size={20} />
              </button>
            </div>
          
          
            <div className="border-b border-zinc-700 my-4"></div>
  
            <div className="flex items-center bg-green-600 py-1 px-1 w-1/3 rounded-md mb-6 justify-center" >
              <span className="text-white justify-center">Certificado</span>
              <VscVerifiedFilled size={20} className="text-white ml-2" />
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
