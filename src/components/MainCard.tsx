/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import { FaFireAlt } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
import { BlurImage } from "./BlurImage";

interface Profile {
  nome: string;
  cidade: string;
  photos: string[];
  tag: string;
}

interface MainCardProps {
  profiles: Profile[];
}

const MainCard: React.FC<MainCardProps> = ({ profiles }) => {
  const shuffledProfiles = profiles.sort(() => Math.random() - 0.5);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 gap-2 md:gap-8 mt-10 pb-16 md:pb-16 blur-xl">
      {shuffledProfiles.slice(0, 5).map((profile, index) => (
        <Link
          key={index}
          href={`/girls/${profile.nome}`}
          className="border-2 rounded-md border-zinc-700"
        >
          <div className="relative hover:border-none rounded-md overflow-hidden">
            <div className="h-8 md:h-8 w-full bg-pink-800 flex justify-center align-middle items-center rounded-t-md z-10 absolute top-0 left-0">
              <div className="flex rounded-md">
                <FaFireAlt className="text-yellow-500 mr-2" />
                <p className="text-sm text-white justify-center">Em destaque</p>
              </div>
            </div>
            <BlurImage
              src={profile.photos[0]}
              alt={profile.nome}
              className="w-full h-48 md:h-64 object-cover transition duration-300 ease-in-out transform hover:scale-105 hover:opacity-60 "
            />
            <p className="flex items-center absolute bottom-0 left-1/2 transform -translate-x-1/2 pb-2 text-white text-sm md:text-md px-2 rounded">
              <FaMapMarkerAlt className="text-pink-800 mr-2" /> {profile.cidade}
            </p>
            <p className="absolute bottom-7 left-1/2 transform -translate-x-1/2 pb-2 text-white font-bold text-md md:text-xl px-2 rounded whitespace-nowrap flex items-center">
              {profile.nome}{" "}
              <VscVerifiedFilled className="text-green-400 ml-2" />
            </p>
          </div>
          <div className="h-14 md:h-20 bg-[#1E2427] border border-zinc-700 rounded-md flex flex-col justify-center items-center">
            <p className="text-white text-xs italic">{profile.tag}</p>

            <div className="flex justify-center items-center mt-2">
              <p className="text-yellow-500 text-xs italic">Há 30 minutos</p>
              <RiMessage2Fill className="text-yellow-500 ml-2" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MainCard;
