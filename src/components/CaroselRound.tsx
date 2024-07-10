/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BlurImage } from "./BlurImage";

interface Profile {
  nome: string;
  photos: string[];
}

interface CaroselRoundProps {
  profiles: Profile[];
}

const CaroselRound: React.FC<CaroselRoundProps> = ({ profiles }) => {
  const profilesToDisplay = profiles.slice(0, 10);

  return (
    <div className="flex mx-28 flex-wrap justify-center gap-4 mt-8 mb-10">
      {profilesToDisplay.map((profile, index) => (
        <Link key={index} href={`/Acompanhantes/${profile.nome}`}>
          <div className="relative flex flex-col items-center cursor-pointer ">
            <div className="relative w-24 h-24 rounded-full cursor-pointer overflow-hidden border-2 border-pink-800 transition duration-300 ease-in-out transform hover:scale-105 ">
              {Array.isArray(profile.photos) && profile.photos.length > 0 ? (
                <BlurImage
                  src={profile.photos[0]}
                  alt={profile.nome}
                  className="w-full h-full object-cover rounded-full border-2 border-white cursor-pointer blur-2xl"
                  style={{ borderRadius: "50%" }}
                />
              ) : profile.photos ? (
                <BlurImage
                  src={profile.photos[0]}
                  alt={profile.nome}
                  className="w-full h-full object-cover rounded-full border-2 border-white cursor-pointer"
                  style={{ borderRadius: "50%" }}
                />
              ) : (
                <div className="w-full h-full bg-gray-300"></div>
              )}

              <div className="absolute inset-0 hover:bg-pink-800 hover:opacity-40 duration-300"></div>
            </div>
            <p className="text-white text-xs mt-2 whitespace-nowrap">
              {profile.nome}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CaroselRound;
