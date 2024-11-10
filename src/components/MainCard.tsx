/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FaMapMarkerAlt, FaFireAlt } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import { RiMessage2Fill } from "react-icons/ri";
import { BlurImage } from "./BlurImage";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Profile {

  nome: string;
  cidade: string;
  photos: string[];
  stories: string[];
  tag: string;
  tagtimestamp: string;
  certificado: boolean; // Adiciona a propriedade certificado como boolean
}

interface MainCardProps {
  profiles: Profile[];
  currentPage: number; // Página atual
  itemsPerPage: number; // Itens por página
}

const MainCard: React.FC<MainCardProps> = ({ profiles,currentPage, itemsPerPage,   }) => {
  const [timeElapsedList, setTimeElapsedList] = useState<string[]>([]);

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
    const timeElapsed = profiles.map((profile) => calculateTimeElapsed(profile.tagtimestamp));
    setTimeElapsedList(timeElapsed);

    const interval = setInterval(() => {
      const updatedTimeElapsed = profiles.map((profile) => calculateTimeElapsed(profile.tagtimestamp));
      setTimeElapsedList(updatedTimeElapsed);
    }, 60000);

    return () => clearInterval(interval);
  }, [profiles]);

  const shuffledProfiles = profiles && profiles.length > 0 ? [...profiles].sort(() => Math.random() - 0.5) : [];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProfiles = profiles.slice(startIndex, startIndex + itemsPerPage);


  

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-5 gap-4 md:gap-8 mt-10 pb-16 md:pb-16 ">
      {paginatedProfiles.map((profile, index) => (
        <Link
          key={index}
          href={`/Acompanhantes/${profile.nome}`}
          className=" rounded-md  dark:bg-gray-400"
        >
          <div className="relative hover:border rounded-md overflow-hidden border border-gray-600">
            <div className="h-8 md:h-8 w-full bg-pink-800 flex justify-center align-middle items-center rounded-t-md z-10 absolute top-0 left-0">
              <div className="flex rounded-md">
                <FaFireAlt className="text-yellow-500 mr-2" />
                <p className="text-sm text-white justify-center">Em destaque</p>
              </div>
            </div>
            <Image
              src={profile.photos[0] || "/logo.webp"}
              alt={profile.nome}
              className="w-full h-48 md:h-64 object-cover transition duration-500 ease-in-out transform hover:scale-110 hover:opacity-60"
              priority
              width={100}
              height={100} 
            />
            <p className="flex items-center absolute bottom-0 left-1/2 transform -translate-x-1/2 pb-2 text-white text-sm md:text-md px-2 rounded">
              <FaMapMarkerAlt className="text-pink-800 mr-2" /> {profile.cidade}
            </p>
            <p className="absolute bottom-7 left-1/2 transform -translate-x-1/2 pb-2 text-white font-bold text-md md:text-xl px-2 rounded whitespace-nowrap flex items-center">
              {profile.nome}
              {profile.certificado && (
                <VscVerifiedFilled className="text-green-400 ml-2" />
              )}
            </p>
          </div>
          <div className="h-14 md:h-20 bg-gray-900 dark:bg-gray-800  border border-gray-400 rounded-b flex flex-col justify-center items-center">
            <p className="text-white text-xs italic">{profile.tag}</p>

            <div className="flex justify-center items-center mt-2">
              <p className="text-yellow-500 text-xs italic">{timeElapsedList[index]}</p>
              <RiMessage2Fill className="text-yellow-500 ml-2" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MainCard;
