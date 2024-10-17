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
import StoryBigS from "@/components/StoryBigS"
import { useDispatch, useSelector } from "react-redux";


function StoriesPage({}) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const searchParams = useSearchParams();

  const [showLargeStory, setShowLargeStory] = useState(false);


  
  const handleStoryClick = (story: string) => {
    setSelectedStory(story);
    setShowLargeStory(true); // Mostra o StoryBigS
  };


  const userUIDRedux = useSelector((state: any) => state.profile?.profile.userUIDRedux);
  console.log("storiesRedux", userUIDRedux)


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
            story={selectedStory} // Passa a história selecionada para o componente
            onClose={() => setShowLargeStory(false)}
          />
        )}
        <StoryCard profiles={filteredProfiles} onStoryClick={handleStoryClick} /> {/* Passa a função para o StoryCard */}
      </div>
    </div>
  );
}

export default StoriesPage;
