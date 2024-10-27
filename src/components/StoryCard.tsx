/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FaMapMarkerAlt, FaFireAlt } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import { RiMessage2Fill } from "react-icons/ri";
import { BlurImage } from "./BlurImage";
import { useEffect, useState } from "react";
import StoryBigS from "./StoryBigS";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidMoviePlay } from "react-icons/bi";


interface Profile {
  nome: string;
  cidade: string;
  photos: string[];
  stories: string[]; // Array de stories
  tag: string;
  tagtimestamp: string;
  certificado: boolean;
  firstPhotos: string;
}

interface StoryCardProps {
  profiles: Profile[];
}

const StoryCard: React.FC<StoryCardProps> = ({ profiles }) => {
  const [timeElapsedList, setTimeElapsedList] = useState<string[]>([]);
  const [selectedStory, setSelectedStory] = useState<string | null>(null); // Estado para controlar a história selecionada
  const [showStoryModal, setShowStoryModal] = useState(false); 
  const [selectedCidade, setSelectedCidade] = useState<string | null>(null); // Estado para controlar a história selecionada
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]); // Alterado para array de strings
  const [selectedNome, setSelectedNome] = useState<string[]>([]); // Alterado para array de strings
  const [selectedPhotoURL, setSelectedPhotoURL] = useState<string>(""); // Alterado para string única


  selectedPhotoURL
 

  const dispatch = useDispatch();

  const formatTimeElapsed = (minutesElapsed: number): string => {
    const hoursElapsed = minutesElapsed / 60;

    if (hoursElapsed > 48) {
      return "Há mais de 48 horas";
    } else if (minutesElapsed < 60) {
      return `Há ${minutesElapsed} minuto${minutesElapsed !== 1 ? "s" : ""}`;
    } else {
      const hours = Math.floor(hoursElapsed);
      const minutes = minutesElapsed % 60;
      return `Há ${hours} hora${hours !== 1 ? "s" : ""}${
        minutes > 0 ? ` ${minutes} minuto${minutes !== 1 ? "s" : ""}` : ""
      }`;
    }
  };

  const calculateTimeElapsed = (tagTimestamp: string): string => {
    const timestampDate = new Date(tagTimestamp);

    if (isNaN(timestampDate.getTime())) {
      return "Tempo indeterminado";
    }

    const currentTime = Date.now();
    const elapsedTime = currentTime - timestampDate.getTime();
    const minutesElapsed = Math.floor(elapsedTime / (1000 * 60));

    return formatTimeElapsed(minutesElapsed);
  };

  useEffect(() => {
    const timeElapsed = profiles.map((profile) =>
      calculateTimeElapsed(profile.tagtimestamp)
    );
    setTimeElapsedList(timeElapsed);

    const interval = setInterval(() => {
      const updatedTimeElapsed = profiles.map((profile) =>
        calculateTimeElapsed(profile.tagtimestamp)
      );
      setTimeElapsedList(updatedTimeElapsed);
    }, 60000);

    return () => clearInterval(interval);
  }, [profiles]);

  // Filtra perfis que possuem stories e mapeia cada story individualmente


  const profilesWithStories = profiles.filter(
    (profile) => profile.stories && profile.stories.length > 0
  );
  console.log("stories dos perfis", profilesWithStories)



  
  // Extrai a primeira foto de cada perfil
  const firstPhotos = profilesWithStories.map((profile) => {
    return profile.photos && profile.photos.length > 0 ? profile.photos[0] : null;
  });
  
  console.log("Primeiras fotos dos perfis", firstPhotos);  


  const handleCardClick = (story: string, profile: Profile) => {
    setSelectedStory(story);
    setShowStoryModal(true);
    setSelectedCidade(profile.cidade);
    setSelectedPhotos(profile.photos);
    setSelectedNome(profile.nome);
    setSelectedPhotoURL(profile.photos[0]); // Passe a primeira foto como string única
};
  const closeStoryModal = () => {
    setSelectedStory(null);
    setShowStoryModal(false); // Fecha o modal
  };



  return (
    <div  className="rounded-xl h-full">
          {/* Renderiza o StoryBigS se showStoryModal estiver true */}
          {showStoryModal && (
       <StoryBigS
       story={selectedStory}
       onClose={closeStoryModal}
       firstPhotos={selectedPhotoURL} // Passe a string correta
       cidade={selectedCidade}
       nome={selectedNome}
     />
      )}
<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-5 xxl:grid-cols- gap-2 md:gap-8 mt-10 pb-16 md:pb-16">
  {profilesWithStories.map((profile, profileIndex) =>
    profile.stories.map((story, storyIndex, nome) => (
      <button
        key={`${profileIndex}-${storyIndex}`}
        className="relative border-1 rounded-2xl border-zinc-800"
        onClick={() => handleCardClick(story, profile, profile.photos, firstPhotos)}
        >
        <div className="relative rounded-lg overflow-hidden h-full">
          <div className="h-8 md:h-8 w-full bg-pink-800 flex justify-center items-center z-10 absolute top-0 left-0">
            <div className="flex rounded-md">
              <FaFireAlt className="text-yellow-500 mr-2" />
              <p className="text-sm text-white">Story em destaque</p>
            </div>
          </div>

          {/* Aplique o efeito de hover no vídeo */}
          <div className="relative w-full h-full overflow-hidden ">
            <video
              src={story}
              alt={`Thumbnail`}
              className="w-full h-full object-cover border border-zinc-500 shadow-md transform transition-transform duration-500 ease-in-out hover:scale-110" 
            />
          </div>

          {/* Ícone de play centralizado */}
          <div className="absolute inset-0 flex items-center justify-center text-6xl">
            <BiSolidMoviePlay className="text-gray-800 opacity-50 " />
          </div>

          {/* Nome do perfil sobreposto no vídeo */}
          <div className="absolute bottom-4 left-0 w-full h-20 flex justify-center">
            <p className="absolute bottom-7 left-1/2 transform -translate-x-1/2 pb-2 text-white font-bold text-md md:text-xl px-2 rounded whitespace-nowrap flex items-center">
              {profile.nome}{" "}
              <VscVerifiedFilled className="text-green-400 ml-2" />
            </p>
            <p className="flex items-center absolute bottom-0 left-1/2 transform -translate-x-1/2 pb-2 text-white text-sm md:text-md px-2 rounded">
              <FaMapMarkerAlt className="text-pink-800 mr-2" /> {profile.cidade}
              {profile.certificado && (
                <VscVerifiedFilled className="text-green-400 ml-2" />
              )}
            </p>
          </div>
        </div>
      </button>
    ))
  )}
</div>






    </div>
  );
};

export default StoryCard;
