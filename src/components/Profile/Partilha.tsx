import { useState } from "react";
import { ImCross } from "react-icons/im";
import { MdEmail, MdContentCopy } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PartilhaProps {
  selectedProfile: {
    nome: string;
    Tarifa: number;
    email: string;
  };
  setShowPartilha: (show: boolean) => void;
}

const Partilha: React.FC<PartilhaProps> = ({
  selectedProfile,
  setShowPartilha,
}) => {
  const [mostrarPartilha, setMostrarPartilha] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  const fecharPartilha = () => {
    setMostrarPartilha(false);
    setShowPartilha(false); // Resetar o estado showPartilha no componente Profile
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("O link foi copiado com sucesso!", {
      position: "top-right",
      autoClose: 3000, // Tempo em milissegundos para o toast desaparecer
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <>
     <ToastContainer /> 
      {mostrarPartilha && (
        <div className="fixed inset-0 flex justify-center bg-black bg-opacity-60 backdrop-blur-md z-50">
          <div className="w-full md:w-2/6 h-46 mb-12 md:h-2/5 mt-36 bg-[#1E2427] rounded-lg shadow-2xl">
            <div className="flex justify-between items-center">
              <h1 className="text-sm md:text-lg mx-10 items-center mt-8 align-middle mb-8 text-white font-bold">
                Partilhar o Perfil de {selectedProfile?.nome}
              </h1>
              <button className="text-bold font-bold" onClick={fecharPartilha}>
                <ImCross
                  size={16}
                  className="text-zinc-700 hover:text-pink-800 transition-transform font-bold mx-10"
                />
              </button>
            </div>
            <div className="border border-zinc-700 border-solid border-t-0 w-full"></div>
            <div className="flex justify-center my-6">
              <p className="text-white">{window.location.href}</p>
            </div>
            <div className="border border-zinc-700 border-solid border-t-0 w-full"></div>
            <div className="flex justify-center items-center my-6 mt-10">
            <div className="bg-blue-600 flex flex-row justify-center items-center py-2 rounded-md w-2/4 cursor-pointer hover:bg-blue-800">
  <a
    href={`mailto:${selectedProfile?.email}?subject=Assunto do Email&body=Corpo do Email`}
    className="flex items-center"
  >
    <MdEmail size={20} className="mr-2 text-white" />
    <p className="text-md text-white">Partilhar por Email</p>
  </a>
</div>
            </div>
            <div className="flex justify-center items-center my-6 ">
              <div
                className="bg-pink-800 flex justify-center align-middle items-center py-2 rounded-md w-2/4 cursor-pointer hover:bg-pink-600"
                onClick={copyToClipboard}
              >
                <MdContentCopy size={20} className="mr-2 text-white" />
                <p className="text-md text-white">Copiar Link</p>
              </div>
              {copySuccess && (
                <span className="ml-2 text-green-500">Link copiado!</span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Partilha;
