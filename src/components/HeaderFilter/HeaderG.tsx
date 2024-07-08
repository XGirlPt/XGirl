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
    setCurrentProfileIndex((prevIndex) => (prevIndex + 1) % profiles.length);
    router.push(`/girls/${profiles[currentProfileIndex + 1].nome}`);
  };

  const handlePrevProfile = () => {
    setCurrentProfileIndex((prevIndex) => {
      if (prevIndex > 0) {
        router.push(`/girls/${profiles[currentProfileIndex - 1].nome}`);
        return prevIndex - 1;
      } else {
        router.push(`/girls/${profiles[profiles.length - 1].nome}`);
        return profiles.length - 1;
      }
    });
  };
  const currentProfile = profiles[currentProfileIndex];

  return (
    <div className=" w-full bg-[#1E2427] sticky top-[128px] z-50 ">
      <div className="flex mx-auto md:mx-20 justify-between align-middle bg-[#1E2427] h-14 items-center">
        <div className="ml-10">
          {/* <Link href={`/girls/${currentProfile && currentProfile.nome}`}> */}
          <button
            className="flex px-8 mt-2 py-1 shadow-sm border border-pink-800 text-md rounded-md items-center text-pink-800 bg-[#2b3945] hover:bg-pink-800 hover:text-[#2b3945] transition duration-300 ease-in-out transform"
            onClick={handlePrevProfile}
          >
            <IoIosArrowRoundBack size={22} className="mr-2" />
            Voltar
          </button>
          {/* </Link> */}
        </div>

        {currentProfile && currentProfile.distrito && (
          <>
            <div className="flex">
              <p className="text-zinc-400 mr-2 ml-2">Girls</p>
              <p className="text-zinc-400 mr-2 ml-2">/</p>
              <Link
                href="/girls"
                className="text-white mr-2 ml-2 cursor-pointer hover:text-pink-800"
                onClick={() => handleDistrictClick(currentProfile.distrito)}
              >
                {currentProfile.distrito}
              </Link>
              <p className="text-zinc-400 mr-2 ml-2">/</p>
              <p className="text-pink-800 mr-2 ml-2">{currentProfile.nome}</p>
            </div>
          </>
        )}

        <div className="ml-10">
          {/* <Link href={`/girls/${currentProfile && currentProfile?.nome}`}> */}
          <button
            onClick={handleNextProfile}
            className="flex px-8 mt-2 py-1 shadow-sm border border-pink-800 text-md rounded-md items-center text-pink-800 bg-[#2b3945] hover:bg-pink-800 hover:text-[#2b3945] transition duration-300 ease-in-out transform"
          >
            Próximo Perfil
            <IoIosArrowRoundForward size={22} className="ml-2" />
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default HeaderG;
