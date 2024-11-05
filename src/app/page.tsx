"use client";
import { useState, useEffect } from "react";
import InfoCard from "@/components/InfoCard";
import MainCard from "@/components/MainCard";
import CaroselG from "@/components/CaroselG";
import Footer from "@/components/Footer";
import LastAnnounce from "@/components/LastAnnounce";
import { fetchProfiles } from "@/services/profileService";
import Maiores from "@/components/Maiores";
import Link from "next/link";
import { Profile } from "@/types/index";
import FilterInput from "@/components/FilterInput";
import "../styles/globals.min.css";
import Map from "@components/Map";

interface Profile {
  nome: string;
  cidade: string;
  photos: string[];
  stories: string[];
  tag: string;
  tagtimestamp: string;
  certificado: boolean;
}

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [showMaiores, setShowMaiores] = useState(true);

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
  }, []);

  const handleCloseMaiores = () => {
    setShowMaiores(false);
    localStorage.setItem("hasVisitedDashboard", "true");
  };

  return (
    <>
      <div className="text-gray-600 bg-white w-full overflow-x-hidden">
        {/* Header que só é exibido em telas médias ou maiores */}
       

        <div className="mt-2 w-full">
          {showMaiores && <Maiores setShowMaiores={handleCloseMaiores} />}
        </div>

        <div className="w-full">
          {profiles && profiles.length > 0 && <CaroselG profiles={profiles} />}
        </div>

        <p className="text-pink-800 text-xl md:text-3xl flex justify-center mt-8 mb-6 w-full">
          Escort Girls e Massagistas eróticas em Portugal
        </p>

        <div className="hidden md:block w-full justify-center md:mx-32 mt-8">
          <FilterInput profiles={profiles} onFilter={setFilteredProfiles} />
        </div>

        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 max-w-full">
          <Link href="/girls">
            <p className="text-white text-3xl flex mt-8">Anúncios em Destaque</p>
          </Link>
        </div>

        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 max-w-full">
          <MainCard profiles={profiles} currentPage={currentPage} itemsPerPage={itemsPerPage} />
        </div>

        <p className="text-pink-800 text-2xl flex justify-center pb-5 w-full">
          Procura na tua Área
        </p>

        <div className="hidden sm:block w-full px-4 max-w-screen-lg mx-auto min-h-[100px]">
        <InfoCard />
        </div>

        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 max-w-full">
          <p className="text-white text-3xl flex mt-8">Novidades</p>
        </div>

        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 max-w-full">
          <LastAnnounce profiles={profiles} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
