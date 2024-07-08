/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { ImCross } from "react-icons/im";

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
        <div className="fixed inset-0 flex justify-center bg-black bg-opacity-75 z-50 backdrop-blur-md">
          <div className="w-full md:w-3/6 h-46 md:h-2/5 mt-36 bg-[#1E2427] rounded-lg shadow-2xl">
            <div className="flex justify-between items-center">
              <h1 className="text-sm md:text-lg mx-10 items-center mt-8 align-middle mb-4 text-white font-bold">
                Perfil Certificado
              </h1>
              <button
                className="text-bold font-bold"
                onClick={fecharCertificado}
              >
                <ImCross
                  size={16}
                  className="text-zinc-700 hover:text-pink-800 transition-transform font-bold mx-10"
                />
              </button>
            </div>
            <div className="border border-zinc-700 border-solid border-t-0 w-full"></div>

            <div className="mt-6 px-10 text-white">
              <span>
                Um perfil "Certificado" significa que as fotos foram validadas
                por um moderador da equipe{" "}
                <span className="text-pink-800">XGirl</span> e correspondem à
                realidade.
              </span>
              <br />
              <br />
              <span>
                Além do controle humano, um sistema automático analisa todas as
                fotos dos perfis certificados para garantir que não pertencem a
                outra pessoa na internet.
              </span>
              <br />
              <br />
              <span>Perfil certificado = Encontro 100% satisfeito.</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Certificado;
