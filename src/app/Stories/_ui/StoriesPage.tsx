"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CardsGirl from "@/components/CardsGirl";
import CaroselRound from "@/components/CaroselRound";
import Footer from "@/components/Footer";
import { fetchProfiles } from "@/services/profileService";
import { useSearchParams } from "next/navigation";
import StoryCard from "@/components/StoryCard";
import StoryBigS from "@/components/StoryBigS"



interface Profile {
  nome: string;
  cidade: string;
  photoURL: string[];
  stories: string[];
  tag: string;
  tagtimestamp: string;
  certificado: boolean; // Adiciona a propriedade certificado como boolean
}

interface StoriesPageProps {
  profiles: Profile[];
}

 const StoriesPage: React.FC<StoriesPageProps> = ({ profiles }) => {

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
          ? fetchedProfiles.filter((distrito) => distrito === distrito)
          : fetchedProfiles;
        setFilteredProfiles(profilesToDisplay);
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    }
    fetchData();
  }, [searchParams]);


  return (
    <div className="text-gray-600 bg-black">
      <div className="px-36">
        <p className="text-pink-800 text-3xl text-center justify-center pt-4">
          Escort Girls, Massagistas Eróticas e Acompanhantes de Luxo em Portugal
        </p>
      </div>
      <CaroselRound profiles={filteredProfiles} />
      <div className="px-36">
      {showLargeStory && (
  <StoryBigS
    cidade={selectedCidade} // Passa a cidade
    story={selectedStory} // Passa a história
    photos={selectedPhotos} // Passa as fotos
    nome={selectedNome} // Passa o nome
    photoURL={selectedphotoURL} // Passa a photoURL
    onClose={() => setShowLargeStory(false)}
  />
)}
<StoryCard profiles={filteredProfiles}  cidade={selectedCidade} // Passa a cidade
  
      onStoryClick={handleStoryClick} />
</div>
    </div>
  );
}

export default StoriesPage;
