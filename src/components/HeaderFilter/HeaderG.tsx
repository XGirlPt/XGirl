import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { supabase } from "../../database/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Profile } from "@/types";


interface HeaderGProps {
  currentProfileIndex: number;
  setCurrentProfileIndex: Dispatch<SetStateAction<number>>;
  profiles: Profile[];
}

const HeaderG: React.FC<HeaderGProps> = ({
  currentProfileIndex,
  setCurrentProfileIndex,
  profiles,
}) => {
  const router = useRouter();

  const handleDistrictClick = (district: string) => {
    router.push(`/girl?distrito=${encodeURIComponent(district)}`);
  };

  const handleNextProfile = () => {
    // Verifica se há um próximo perfil válido
    const nextIndex = (currentProfileIndex + 1) % profiles.length;
    const nextProfile = profiles[nextIndex];
    
    if (nextProfile) {
      setCurrentProfileIndex(nextIndex);
      router.push(`/Acompanhantes/${nextProfile.nome}`);
    }
  };

  const handlePrevProfile = () => {
    // Verifica se há um perfil anterior válido
    const prevIndex = (currentProfileIndex - 1 + profiles.length) % profiles.length;
    const prevProfile = profiles[prevIndex];
    
    if (prevProfile) {
      setCurrentProfileIndex(prevIndex);
      router.push(`/Acompanhantes/${prevProfile.nome}`);
    }
  };

  
  const currentProfile = profiles[currentProfileIndex];

  return (
    <div className="w-full bbg-gray-900 dark:bg-gray-800 sticky top-[128px]">
      <div className="flex mx-auto md:mx-20 justify-between align-middle bg-gray-900 dark:bg-gray-800 h-14 items-center">
        <div className="ml-10">
          <button
            className="flex px-6 mt-1 py-1 shadow-sm border border-pink-800 text-sm rounded-md items-center nk-800 text-white bg-pink-800 hover:bg-pink-900 hover:text-zinc-300 transition duration-300 ease-in-out transform"
            onClick={handlePrevProfile}
          >
            <IoIosArrowRoundBack size={22} className="mr-2" />
            Perfil Anterior
          </button>
        </div>

        {currentProfile && currentProfile.distrito && (
          <div className="flex">
            <p className="text-zinc-400 mr-2 ml-2">Girls</p>
            <p className="text-zinc-400 mr-2 ml-2">/</p>
            <Link
  href={`/Acompanhantes?distrito=${encodeURIComponent(currentProfile.distrito)}`}
  className="text-white mr-2 ml-2 cursor-pointer hover:text-pink-800"
>
  {currentProfile.distrito}
</Link>
            <p className="text-zinc-400 mr-2 ml-2">/</p>
            <p className="text-pink-800 mr-2 ml-2">{currentProfile.nome}</p>
          </div>
        )}

        <div className="ml-10">
          <button
            onClick={handleNextProfile}
            className="flex px-6 mt-1 py-1 shadow-sm border border-pink-800 text-sm rounded-md items-center text-white bg-pink-800 hover:bg-pink-900 hover:text-zinc-300 transition duration-300 ease-in-out transform"
          >
            Próximo Perfil
            <IoIosArrowRoundForward size={22} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderG;