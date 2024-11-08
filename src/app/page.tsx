"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // Importação do dynamic
import Link from "next/link";
import { fetchProfiles } from "@/services/profileService";
import "../styles/globals.min.css";

// Carregamento dinâmico de componentes pesados (desativando SSR para esses componentes)
const CaroselG = dynamic(() => import('@/components/CaroselG'), { ssr: false });
const InfoCard = dynamic(() => import('@/components/InfoCard'), { ssr: false });
const LastAnnounce = dynamic(() => import('@/components/LastAnnounce'), { ssr: false });
const MainCard = dynamic(() => import('@/components/MainCard'), { ssr: false });
const Maiores = dynamic(() => import('@/components/Maiores'), { ssr: false }); // Se você quiser carregar o Maiores de forma dinâmica também

interface Profile {
  nome: string;
  cidade: string;
  photos: string[];
  stories: string[];
  tag: string;
  tagtimestamp: string;
  certificado: boolean;
}

const Dashboard: React.FC = () => {
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
    // Verifica se o usuário já visitou o dashboard
    const hasVisitedDashboard = localStorage.getItem("hasVisitedDashboard");
    if (hasVisitedDashboard) {
      setShowMaiores(false);
    } else {
      // Define um tempo de atraso de 3 segundos para renderizar o componente
      const timer = setTimeout(() => {
        setShowMaiores(true); // Após 3 segundos, mostrar o componente
      }, 5000); // Atraso de 3 segundos

      return () => clearTimeout(timer); // Limpeza do timer quando o componente for desmontado
    }
  }, []);

  const handleCloseMaiores = () => {
    setShowMaiores(false);
    localStorage.setItem("hasVisitedDashboard", "true");
  };

  return (
    <div className="text-gray-600 bg-white w-full overflow-x-hidden">
      <div className="mt-2 w-full">
        {showMaiores && <Maiores setShowMaiores={handleCloseMaiores} />}
      </div>

      <div className="w-full">
        {profiles && profiles.length > 0 && <CaroselG profiles={profiles} />}
      </div>

      <p className="text-pink-800 text-xl md:text-3xl flex justify-center mt-8 mb-6 w-full">
        Escort Girls e Massagistas eróticas em Portugal
      </p>

      {/* <div className="hidden md:block w-full justify-center md:mx-32 mt-8">
        <FilterInput profiles={profiles} onFilter={setFilteredProfiles} />
      </div> */}

      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 max-w-full">
        <Link href="/girls">
          <p className="text-white text-3xl flex mt-8">Anúncios em Destaque</p>
        </Link>
      </div>

      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 max-w-full">
        <MainCard 
          profiles={profiles} 
          currentPage={currentPage} 
          itemsPerPage={itemsPerPage} 
        />
      </div>

      <p className="text-pink-800 text-2xl flex justify-center pb-5 w-full h-[50px]"> {/* Definindo altura fixa para o texto */}
      Procura na tua Área
      </p>

      <div className="hidden sm:block w-full px-4 max-w-screen-lg mx-auto min-h-[150px]"> {/* Aumentei a min-h para 150px */}
  <InfoCard />
</div>

      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 max-w-full">
        <p className="text-white text-3xl flex mt-8">Novidades</p>
      </div>

      <div className="w-full px-4 sm:px-10 md:px-16 lg:px-32 xl:px-48 max-w-full">
        <LastAnnounce profiles={profiles} />
      </div>
    </div>
  );
};

export default Dashboard;
