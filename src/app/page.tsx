"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // Importação do dynamic
import Link from "next/link";
import { fetchProfiles } from "@/services/profileService";
import "../styles/globals.min.css";
import Map from "@/components/Map";
import { useTranslation } from "react-i18next"; // Importando o hook

// Carregamento dinâmico de componentes pesados (desativando SSR para esses componentes)
const CaroselG = dynamic(() => import('@/components/CaroselG'), { ssr: false });
const InfoCard = dynamic(() => import('@/components/InfoCard'), { ssr: false });
const LastAnnounce = dynamic(() => import('@/components/LastAnnounce'), { ssr: false });
const MainCard = dynamic(() => import('@/components/MainCard'), { ssr: false });
const Maiores = dynamic(() => import('@/components/Maiores'), { ssr: false }); // Se você quiser carregar o Maiores de forma dinâmica também

interface Profile {
  nome: string;
  cidade: string;
  adress: string;
  photos: string[];
  stories: string[];
  tag: string;
  tagtimestamp: string;
  certificado: boolean;
  live: boolean;
  latitude?: number;
  longitude?: number;
}
async function fetchCoordinates(address: string): Promise<{ latitude: number, longitude: number }> {
  if (!address || address.trim() === "") {
    console.error("Endereço inválido:", address);
    return { latitude: 0, longitude: 0 };  // Retorna coordenadas padrão
  }

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyC9gd59nW47Bg63ksUnNd2HmigKDUDGA7E`);
    const data = await response.json();

    if (data.results && data.results[0]) {
      const location = data.results[0].geometry.location;
      return { latitude: location.lat, longitude: location.lng };
    } else {
      console.error("Google Maps API não encontrou resultados válidos para o endereço:", address);
      return { latitude: 0, longitude: 0 }; // Retorna coordenadas padrão caso não encontre
    }
  } catch (error) {
    console.error("Erro ao buscar coordenadas:", error);
    return { latitude: 0, longitude: 0 };  // Retorna coordenadas padrão em caso de erro
  }
}

const Dashboard: React.FC = () => {
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [showMaiores, setShowMaiores] = useState(false);
  const { t } = useTranslation(); // Usando o hook para pegar as traduções

  useEffect(() => {
    async function fetchData() {
      try {
        const combinedProfiles = await fetchProfiles();

        // Ordenar os perfis por `tagtimestamp` mais recente
        const sortedProfiles = combinedProfiles.sort((a: Profile, b: Profile) => {
          const timeA = new Date(a.tagtimestamp).getTime();
          const timeB = new Date(b.tagtimestamp).getTime();
          return timeB - timeA; // Ordena do mais recente para o mais antigo
        });

        setProfiles(sortedProfiles);
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
  }, [])

  const handleCloseMaiores = () => {
    setShowMaiores(false);
    localStorage.setItem("hasVisitedDashboard", "true");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const combinedProfiles = await fetchProfiles();
  
        const profilesWithCoordinates = await Promise.all(combinedProfiles.map(async (profile: Profile) => {
          // Se as coordenadas já estão presentes na resposta da API, usá-las diretamente
          if (profile.latitude && profile.longitude) {
            return profile; // Se já tiver as coordenadas, retorna o perfil como está
          }
  
          // Se o endereço estiver presente e não for vazio, busque as coordenadas
          if (profile.adress && profile.adress.trim() !== "") {
            const coordinates = await fetchCoordinates(profile.adress);
            return {
              ...profile,
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            };
          } else {
            console.warn(`Endereço inválido para o perfil ${profile.nome}`);
            return profile; // Retorna o perfil sem coordenadas
          }
        }));
  
        setProfiles(profilesWithCoordinates);
      } catch (error: any) {
        console.error("Erro ao buscar perfis:", error.message);
      }
    }
  
    fetchData();
  }, []);  // Colocanda dependência vazia para rodar apenas uma vez na montagem

  return (
    <div className="text-gray-600 bg-black w-full overflow-x-hidden ">
      {/* <div className="mt-2 w-full">
        {showMaiores && <Maiores setShowMaiores={handleCloseMaiores} />}
      </div> */}

      <div className="w-full">
        {profiles && profiles.length > 0 && <CaroselG profiles={profiles} />}
      </div>

      <p className="text-pink-800 text-xl md:text-3xl flex justify-center mt-8 mb-6 w-full">
      {t('dashboard.escort_title')}

      </p>

      {/* <div className="hidden md:block w-full justify-center md:mx-32 mt-8">
        <FilterInput profiles={profiles} onFilter={setFilteredProfiles} />
      </div> */}

      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 max-w-full">
        <Link href="/acompanhantes">
          <p className="text-white text-3xl flex mt-8">{t('dashboard.featured_ads')}</p>
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
      {t('dashboard.search_area')}
      </p>
      
      {/* <Map profiles={profiles} /> Aqui renderiza o mapa com os perfis */}

      <div className="hidden sm:block w-full px-4 max-w-screen-lg mx-auto">
        <div className="min-h-[150px] bg-gray-800 animate-pulse rounded">
          <InfoCard />
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 max-w-full">
        <p className="text-white text-3xl flex mt-8">{t('dashboard.news')}</p>
      </div>
      <div className="w-full px-4 sm:px-10 md:px-16 lg:px-32 xl:px-48 max-w-full">
        <LastAnnounce profiles={profiles} />
      </div>
    </div>
  );
};

export default Dashboard;
