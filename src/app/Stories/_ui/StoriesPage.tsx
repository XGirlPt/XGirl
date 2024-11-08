"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CardsGirl from "@/components/CardsGirl";
import CaroselRound from "@/components/CaroselRound";
import Footer from "@/components/Footer";
import { fetchProfiles } from "@/services/profileService";
import { useSearchParams } from "next/navigation";
import { Profile } from "@/types";
import StoryCard from "@/components/StoryCard";
import StoryBigS from "@/components/StoryBigS";
import CitySelector from "@/components/CitySelector";


function StoriesPage({}) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const searchParams = useSearchParams();
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [selectedCidade, setSelectedCidade] = useState<string | null>(null); 
  const [selectedPhotos, setselectedPhotos] = useState<string[]>([]); // Alterado para array de strings
  const [selectedNome, setselectedNome] = useState<string | null>(null); 
  const [selectedphotoURL, setselectedPhotoURL] = useState<string | null>(null); 


  
  const [showLargeStory, setShowLargeStory] = useState(false);

  const handleStoryClick = (story: string, cidade: string, photos: string[], nome: string,  photoURL: string) => {
    setSelectedStory(story); // Ajuste aqui
    setSelectedCidade(cidade);
    setselectedPhotos(photos); // Agora deve ser um array
    setselectedNome(nome); // Ajuste aqui
    setShowLargeStory(true)
    setselectedPhotoURL(photoURL); // Ajuste aqui

    ; // Mostra o StoryBigS
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProfiles: Profile[] = await fetchProfiles();
        setProfiles(fetchedProfiles);
        const distrito = searchParams.get("distrito");
        const profilesToDisplay = distrito
          ? fetchedProfiles.filter((profile) => profile.distrito === distrito)
          : fetchedProfiles;
        setFilteredProfiles(profilesToDisplay);
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    }
    fetchData();
  }, [searchParams]);





  
  useEffect(() => {
    console.log("Cidade selecionada:", selectedCidade); // Log para verificar a cidade selecionada
    if (selectedCidade) {
      const profilesToDisplay = profiles.filter(
        (profile) => profile.cidade === selectedCidade
      );
      console.log("Perfis filtrados:", profilesToDisplay); // Log para verificar perfis filtrados
      setFilteredProfiles(profilesToDisplay);
    } else {
      setFilteredProfiles(profiles);
    }
  }, [selectedCidade, profiles]);



  return (
    <div className="text-gray-600 bg-black">
      <div className="px-2 md:px-36">
        <p className="text-pink-800 text-3xl text-center justify-center pt-4">
          Escort Girls, Massagistas Eróticas e Acompanhantes de Luxo em Portugal
        </p>
        {/* <div>
        <CitySelector onCityChange={setSelectedCidade} />
        </div> */}
      </div>
      <CaroselRound profiles={filteredProfiles} />
      <p className="text-pink-800 text-3xl text-center justify-center pt-8 md:pt-4">
          Ultimos Stories
        </p>
      <div className="px-8 md:px-36">
      {showLargeStory && (
  <StoryBigS
    profile={filteredProfiles.find(profile => profile.nome === selectedNome)} // Encontre o perfil correspondente
    onClose={() => setShowLargeStory(false)}
   
    />
)}
<StoryCard profiles={filteredProfiles} onStoryClick={handleStoryClick}  />
</div>
    </div>
  );
}

export default StoriesPage;
