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
    <div className="w-full bg-gray-900 dark:bg-gray-800 fixed z-50">
      <div className="flex justify-between items-center px-4 h-14 bg-gray-900 dark:bg-gray-800">
        {/* Botão Perfil Anterior */}
        <button
          className="flex items-center px-4 py-1 border border-pink-800 text-sm rounded-md text-white bg-pink-800 hover:bg-pink-900 hover:text-zinc-300 transition duration-300 ease-in-out transform"
          onClick={handlePrevProfile}
        >
          <IoIosArrowRoundBack size={20} className="mr-1" />
          <span className="hidden sm:inline">Anterior</span>
        </button>
  
        {/* Informações do Perfil */}
        {currentProfile && currentProfile.distrito && (
          <div className="flex items-center text-center text-sm space-x-2">
            <p className="text-zinc-400">Girls</p>
            <p className="text-zinc-400">/</p>
            <Link
              href={`/Acompanhantes?distrito=${encodeURIComponent(currentProfile.distrito)}`}
              className="text-white cursor-pointer hover:text-pink-800"
            >
              {currentProfile.distrito}
            </Link>
            <p className="text-zinc-400">/</p>
            <p className="text-pink-800">{currentProfile.nome}</p>
          </div>
        )}
  
        {/* Botão Próximo Perfil */}
        <button
          className="flex items-center px-4 py-1 border border-pink-800 text-sm rounded-md text-white bg-pink-800 hover:bg-pink-900 hover:text-zinc-300 transition duration-300 ease-in-out transform"
          onClick={handleNextProfile}
        >
          <span className="hidden sm:inline">Próximo</span>
          <IoIosArrowRoundForward size={20} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default HeaderG;