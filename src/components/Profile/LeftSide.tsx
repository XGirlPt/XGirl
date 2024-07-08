import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { FaMapMarkerAlt } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import { RiMessage2Fill } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import { IoShareSocialOutline } from "react-icons/io5";
import { Profile } from "@/types";
import { BlurImage } from "../BlurImage";

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
  const photoURLredux = useSelector(
    (state: any) => state.profile && state.profile.photoURL
  );
  console.log("Valor de photoURL no Redux:", photoURLredux);
  console.log("URL da foto Left side:", selectedProfile?.photoURL);

  const [timeElapsed, setTimeElapsed] = useState<string>("");

  const selectedProfileRef = useRef<Profile>(selectedProfile);

  useEffect(() => {
    selectedProfileRef.current = selectedProfile;
  }, [selectedProfile]);

  const formatTimeElapsed = (minutesElapsed: number): string => {
    const interval = 5;
    const roundedMinutes = Math.floor(minutesElapsed / interval) * interval;
    const remainder = minutesElapsed % interval;

    if (remainder === 0) {
      if (roundedMinutes === 0) {
        return "A menos de 5 minutos";
      } else {
        return `Há ${roundedMinutes} minutos`;
      }
    } else {
      return `Há ${roundedMinutes} - ${roundedMinutes + interval} minutos`;
    }
  };

  useEffect(() => {
    const calculateTimeElapsed = () => {
      if (!selectedProfileRef.current) return;
      let { tagTimestamp } = selectedProfileRef?.current;

      if (typeof tagTimestamp === "string") {
        tagTimestamp = new Date(tagTimestamp);
      }

      if (tagTimestamp instanceof Date && !isNaN(tagTimestamp.getTime())) {
        const currentTime = Date.now();
        const elapsedTime = currentTime - tagTimestamp.getTime();
        const minutesElapsed = Math.floor(elapsedTime / (1000 * 60));

        setTimeElapsed(formatTimeElapsed(minutesElapsed));
      } else {
        setTimeElapsed("Tempo indeterminado");
      }
    };

    calculateTimeElapsed();

    const interval = setInterval(calculateTimeElapsed, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:w-1/3 align-middle min-h-screen justify-center sticky top-56  z-10 h-full ">
      <div className="md:relative justify-center items-center  ">
        {selectedProfile ? (
          Array.isArray(selectedProfile?.photoURL) &&
          selectedProfile?.photoURL?.length > 0 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <BlurImage
              src={selectedProfile?.photoURL[0]}
              alt={selectedProfile?.nome}
              className="w-72 h-96 bg-gray-300 flex justify-center items-center text-gray-600 rounded-2xl object-cover blur-2xl"
            />
          ) : selectedProfile?.photoURL ? (
            // eslint-disable-next-line @next/next/no-img-element
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
        {/* <div className="absolute top-56 left-[35%]">
          <p className="md:flex absolute   left-1/2 transform -translate-x-1/2 pb-2 text-white text-lg font-bold px-2 rounded">
            <FaMapMarkerAlt className="text-pink-800 mr-2 text-lg" />{" "}
            {selectedProfile?.localidade}
          </p>
          <p className="absolute bottom-20 left-1/2 transform -translate-x-1/2 pb-2 text-white font-bold text-2xl px-2 rounded whitespace-nowrap flex items-center">
            {selectedProfile?.nome}{" "}
            <VscVerifiedFilled size={32} className="text-green-400 ml-2" />
          </p>
        </div> */}
        <div className="flex justify-center items-center w-full absolute  pr-8 -mt-24 ">
          <div className="bg-[#1E2427] h-42 md:w-[240px] p-6 px-6  rounded-2xl border border-zinc-400 justify-center items-center">
            <p className="text-yellow-500 text-sm underline italic text-center mb-1">
              Last Status
            </p>
            <p className="text-white text-xs text-center mb-2">
              {selectedProfile?.tag}
            </p>
            <div className="flex justify-center items-center mb-4">
              <p className="text-yellow-500 text-sm mr-2 flex items-center">
                {timeElapsed}
              </p>
              <RiMessage2Fill className="text-yellow-500 mr-2 px-2 flex items-center" />
            </div>
            <div className="grid gap-4">
              <div
                className="bg-pink-800 py-2 rounded-md justify-center flex cursor-pointer hover:bg-pink-600"
                onClick={handleLigaMeClick}
              >
                <FiPhone className="mr-2 text-white" />
                <p className="text-sm text-white">Liga-me</p>
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
