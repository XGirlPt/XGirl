/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BlurImage } from "./BlurImage";
import Image from "next/image";

interface Profile {
  nome: string;
  photos: string[];
}

interface CaroselRoundProps {
  profiles: Profile[];
}

// Função para embaralhar um array
const shuffleArray = (array: Profile[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
  }
  return array;
};

const CaroselRound: React.FC<CaroselRoundProps> = ({ profiles }) => {
  // Embaralhar perfis e selecionar os primeiros 10
  const profilesToDisplay = shuffleArray([...profiles]).slice(0, 10);

  return (
    <div className="flex mx-28 flex-wrap justify-center gap-4 mt-4 mb-4">
      {profilesToDisplay.map((profile, index) => (
        <Link key={index} href={`/Acompanhantes/${profile.nome}`} passHref>
          <div className="relative flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-pink-800 transition duration-300 ease-in-out">
              {profile.photos && profile.photos.length > 0 ? (
                <Image
                  src={profile.photos[0]}
                  alt={profile.nome}
                  className="w-full h-full object-cover rounded-full border-2 border-white"
                  loading="lazy"
                  layout="responsive"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 rounded-full"></div>
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
