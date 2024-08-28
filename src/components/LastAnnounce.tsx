/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import { RiMessage2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { BlurImage } from "./BlurImage";

interface Profile {
  nome: string;
  cidade: string;
  photos: string[];
  tag: string;
}

interface LastAnnounceProps {
  profiles: Profile[];
}

const LastAnnounce: React.FC<LastAnnounceProps> = ({ profiles }) => {
  const nomeRedux = useSelector((state: { profile: { profileData: { nome: string } } }) => state.profile?.profileData?.nome);

  console.log("nome do redux", nomeRedux);

  const shuffledProfiles = profiles.sort(() => Math.random() - 0.5);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 gap-8 mt-10 pb-16 " >
      {shuffledProfiles.slice(0, 5).map((profile, index) => (
        <Link
          className="border-zinc-700 border-2 rounded-md"
          key={index}
          href={`/Acompanhantes/${nomeRedux}`}
        >
          <div className="relative ">
            <div className="image-container overflow-hidden">
              <BlurImage
                src={profile.photos[0]}
                alt={profile.nome}
                className="w-full h-72 object-cover transition duration-300 ease-in-out transform hover:scale-105 bg-pink-200 hover:bg-pink-800 hover:opacity-50 "
              />
            </div>
            <p className="flex items-center absolute bottom-0 left-1/2 transform -translate-x-1/2 pb-2 text-white text-md px-2 rounded">
              <FaMapMarkerAlt className="text-pink-800 mr-2" /> {profile.cidade}
            </p>
            <p className="absolute bottom-7 left-1/2 transform -translate-x-1/2 pb-2 text-white font-bold text-xl px-2 rounded whitespace-nowrap flex items-center">
              {profile.nome}{" "}
              <VscVerifiedFilled className="text-green-400 ml-2" />
            </p>
          </div>
          <div className="h-20 bg-[#1E2427] border-t border-zinc-700 rounded-md flex flex-col justify-center items-center">
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

export default LastAnnounce;
