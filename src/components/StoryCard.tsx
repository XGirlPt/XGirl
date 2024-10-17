/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FaMapMarkerAlt, FaFireAlt } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import { RiMessage2Fill } from "react-icons/ri";
import { BlurImage } from "./BlurImage";
import { useEffect, useState } from "react";
import StoryBigS from "./StoryBigS";
import { useDispatch, useSelector } from "react-redux";


interface Profile {
  nome: string;
  cidade: string;
  photos: string[];
  stories: string[]; // Array de stories
  tag: string;
  tagtimestamp: string;
}

interface StoryCardProps {
  profiles: Profile[];
}

const StoryCard: React.FC<StoryCardProps> = ({ profiles }) => {
  const [timeElapsedList, setTimeElapsedList] = useState<string[]>([]);
  const [selectedStory, setSelectedStory] = useState<string | null>(null); // Estado para controlar a história selecionada
  const [showStoryModal, setShowStoryModal] = useState(false); 

  const dispatch = useDispatch();
  const storiesRedux = useSelector((state: any) => state.profile?.profile.stories);
  console.log("storiesRedux", storiesRedux)

  const userUIDRedux = useSelector((state: any) => state.profile?.profile.userUIDRedux);
  console.log("storiesRedux", userUIDRedux)

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

  const handleCardClick = (story: string) => {
    setSelectedStory(story); // Define a história selecionada
    setShowStoryModal(true); // Mostra o modal
  };

  const closeStoryModal = () => {
    setSelectedStory(null);
    setShowStoryModal(false); // Fecha o modal
  };



  return (
    <div >
          {/* Renderiza o StoryBigS se showStoryModal estiver true */}
      {showStoryModal && (
        <StoryBigS story={selectedStory} onClose={closeStoryModal} />
      )}
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xxl:grid-cols-6 gap-2 md:gap-8 mt-10 pb-16 md:pb-16">
      {profilesWithStories.map((profile, profileIndex) =>
        profile.stories.map((story, storyIndex) => (
          <button
            key={`${profileIndex}-${storyIndex}`}
            className="border-2 rounded-md border-zinc-800"
            onClick={() => handleCardClick(story)} // Define a ação de clique

          >
            <div className="relative hover:border-none rounded-md overflow-hidden h-72">
              <div className="h-8 md:h-8 w-full bg-pink-800 flex justify-center align-middle items-center rounded-t-md z-10 absolute top-0 left-0">
                <div className="flex rounded-md">
                  <FaFireAlt className="text-yellow-500 mr-2" />
                  <p className="text-sm text-white justify-center">
                    Story em destaque {profile.cidade}
                  </p>
                </div>
              </div>
              <video
                  src={story}
                  alt={`Thumbnail `}
                  className="rounded-2xl border border-zinc-500 shadow-md transition-transform duration-200 ease-in-out hover:scale-105"
                  width={300}
                  height={100}

                />
            
            </div>
            
          </button>
        ))
      )}
    </div>
    </div>
  );
};

export default StoryCard;
