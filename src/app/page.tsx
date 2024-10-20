"use client";
import { useState, useEffect } from "react";
import InfoCard from "@/components/InfoCard";
import MainCard from "@/components/MainCard";
import CaroselG from "@/components/CaroselG";
import Footer from "@/components/Footer";
import LastAnnounce from "@/components/LastAnnounce";
import { fetchProfiles } from "@/services/profileService";
import Maiores from "@/components/Maiores";
import Map from "@/components/Map";
import Link from "next/link";
import { Profile } from "@/types/index"; // Ajuste o caminho conforme a estrutura do seu projeto
import FilterInput from "@/components/FilterInput"

interface Profile {

  nome: string;
  cidade: string;
  photos: string[];
  stories: string[];
  tag: string;
  tagtimestamp: string;
  certificado: boolean; // Adiciona a propriedade certificado como boolean
}


interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [showMaiores, setShowMaiores] = useState(true);
  const [paddingClass, setPaddingClass] = useState("md:px-72"); // Initial value for large screens

  useEffect(() => {
    async function fetchData() {
      try {
        const combinedProfiles = await fetchProfiles();
        setProfiles(combinedProfiles);
      } catch (error: any) {
        console.error("Error fetching profiles:", error.message);
      }
    }
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const hasVisitedDashboard = localStorage.getItem("hasVisitedDashboard");
    if (hasVisitedDashboard) {
      setShowMaiores(false);
    }
    adjustPadding();
    window.addEventListener("resize", adjustPadding);
    return () => window.removeEventListener("resize", adjustPadding);
  }, []);

  const adjustPadding = () => {
    const width = window.innerWidth;
    const dpr = window.devicePixelRatio;

    if (width >= 1440 && dpr < 2) {
      setPaddingClass("md:px-72"); // Default for large conventional screens
    } else if (width >= 1280 && width < 1440 && dpr >= 2) {
      setPaddingClass("md:px-36"); // Specific for MacBook Retina 13''
    } else {
      setPaddingClass("md:px-32"); // Default for other resolutions
    }
  };

  const handleCloseMaiores = () => {
    setShowMaiores(false);
    localStorage.setItem("hasVisitedDashboard", "true");
  };

  return (
    <>
   
      <div className="text-gray-600 bg-black w-screen justify-center">
        {showMaiores && <Maiores setShowMaiores={handleCloseMaiores} />}

        <div className=" mt-4 w-full">
          {profiles && profiles.length > 0 && <CaroselG profiles={profiles} />}
        </div>
        <p className="text-pink-800 text-xl md:text-3xl flex justify-center mt-8 mb-6">
          Escort Girls e Massagistas eróticas em Portugal
        </p>

        <div className="w-full flex justify-center mt-8"> {/* Ajustado para centralização */}
  <FilterInput profiles={profiles} onFilter={setFilteredProfiles} />
</div>


        <div className={`sm:px-4 ${paddingClass}`}>
          <Link href="/girls">
            <p className="text-white text-3xl flex mt-8">
              Anúncios em Destaque
            </p>
          </Link>
        </div>
        <div className={`px-10 ${paddingClass}`}>
        <MainCard profiles={profiles} currentPage={currentPage} itemsPerPage={itemsPerPage} />
        </div>
        <p className="text-pink-800 text-2xl flex justify-center pb-5">
          Procura na tua Área
        </p>
        <Map />
        <div className={`  ${paddingClass}`}>
          <p className="text-white text-3xl flex mt-8">Novidades</p>
        </div>
         <div className={`hidden sm:block ${paddingClass}`}>
          <InfoCard />
        </div>
        <div className={`  ${paddingClass}`}>
          <LastAnnounce profiles={profiles} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
