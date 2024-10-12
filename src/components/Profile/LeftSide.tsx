import { useEffect, useState } from "react";
import { RiMessage2Fill } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import { IoShareSocialOutline } from "react-icons/io5";
import { Profile } from "@/types";
import { BlurImage } from "../BlurImage";
import '../../styles/globals.css';

interface LeftSideProps {
  selectedProfile: Profile;
  handlePartilhaClick: () => void;
  handleLigaMeClick: () => void;
}

const LeftSide: React.FC<LeftSideProps> = ({
  selectedProfile,
  handlePartilhaClick,
  handleLigaMeClick,
}) => {
  const [timeElapsed, setTimeElapsed] = useState<string>("");

  // Função para formatar o tempo
  const formatTimeElapsed = (minutesElapsed: number): string => {
    const hoursElapsed = minutesElapsed / 60;

    if (hoursElapsed > 48) {
      return "Há mais de 48 horas";
    } else if (minutesElapsed < 60) {
      return `Há ${minutesElapsed} minuto${minutesElapsed !== 1 ? 's' : ''}`;
    } else {
      const hours = Math.floor(hoursElapsed);
      const minutes = minutesElapsed % 60;
      return `Há ${hours} hora${hours !== 1 ? 's' : ''}${minutes > 0 ? ` ${minutes} minuto${minutes !== 1 ? 's' : ''}` : ''}`;
    }
  };

  // Função para calcular o tempo decorrido
  const calculateTimeElapsed = () => {
    if (!selectedProfile || !selectedProfile.tagtimestamp) {
      setTimeElapsed("Tempo indeterminado");
      return;
    }

    const tagTimestamp = new Date(selectedProfile.tagtimestamp);

    if (isNaN(tagTimestamp.getTime())) {
      setTimeElapsed("Tempo indeterminado");
      return;
    }

    const currentTime = Date.now();
    const elapsedTime = currentTime - tagTimestamp.getTime();
    const minutesElapsed = Math.floor(elapsedTime / (1000 * 60)); // Corrigido para 1000 ms

    setTimeElapsed(formatTimeElapsed(minutesElapsed));
  };

  useEffect(() => {
    // console.log("useEffect chamado. selectedProfile:", selectedProfile);

    // Recalcular o tempo decorrido sempre que `tagTimestamp` mudar
    if (selectedProfile?.tagtimestamp) {
      calculateTimeElapsed();
      
      // Configura o intervalo para atualizar a cada minuto
      const interval = setInterval(calculateTimeElapsed, 60000);
      
      return () => clearInterval(interval);
    }
  }, [selectedProfile?.tagtimestamp]); // Dependência apenas em `tagTimestamp`

  return (
    <div className="md:w-1/3 align-middle min-h-screen flex justify-center sticky top-56 z-10 h-full">
      <div className="md:relative justify-center items-center">
        {selectedProfile ? (
          Array.isArray(selectedProfile?.photoURL) &&
          selectedProfile?.photoURL?.length > 0 ? (
            <BlurImage
              src={selectedProfile?.photoURL[0]}
              alt={selectedProfile?.nome}
              className="w-72 h-96 bg-gray-300 flex justify-center items-center text-gray-600 rounded-2xl object-cover"
            />
          ) : selectedProfile?.photoURL ? (
            <BlurImage
              src={selectedProfile?.photoURL[0]}
              alt={selectedProfile?.nome}
              className="w-72 h-96 bg-gray-300 flex justify-center items-center text-gray-600 rounded-2xl object-cover blur-2xl"
            />
          ) : (
            <div className="w-72 h-96 bg-gray-300 flex justify-center items-center text-gray-600">
              Sem imagem
            </div>
          )
        ) : (
          <div className="w-72 h-96 bg-gray-300 flex justify-center items-center text-gray-600">
            Sem imagem
          </div>
        )}

        <div className="flex justify-center items-center w-full absolute -mt-16">
          <div className="bg-[#1E2427] h-42 md:w-[240px] p-6 px-6 rounded-2xl border border-zinc-400 justify-center items-center">
            <div>
              <p className="text-yellow-500 text-xs underline italic text-center mb-2">
                Last Status
              </p>
              <p className="text-white text-xs text-center mb-2">
                {selectedProfile?.tag}
              </p>
              <div className="flex justify-center items-center mb-4">
                <p className="text-yellow-500 text-xs mr-2 flex items-center">
                  {timeElapsed} <RiMessage2Fill className="text-yellow-500 ml-2" size={16} />
                </p>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="relative overflow-hidden rounded-md">
                <div
                  className="bg-pink-800 py-2 rounded-md justify-center flex cursor-pointer hover:bg-pink-600 relative"
                  onClick={handleLigaMeClick}
                >
                  <FiPhone className="mr-2 text-white z-10" />
                  <p className="text-sm text-white z-10">Liga-me</p>
                  <div className="absolute top-0 left-0 w-full h-full transform -skew-x-12 bg-white opacity-20 animate-slide"></div>
                </div>
              </div>
              <div className="bg-yellow-400 py-2 rounded-md justify-center flex cursor-pointer hover:bg-yellow-600">
                <p className="text-sm text-black">Adicionar aos Favoritos</p>
              </div>
              <div
                className="bg-blue-500 text-white py-2 rounded-md justify-center flex cursor-pointer hover:bg-blue-600"
                onClick={handlePartilhaClick}
              >
                <IoShareSocialOutline size={20} className="mr-2 text-white" />
                <p className="text-sm">Partilhar o Perfil</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
