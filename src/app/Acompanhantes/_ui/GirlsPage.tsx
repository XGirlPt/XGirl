"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CardsGirl from "@/components/CardsGirl";
import CaroselRound from "@/components/CaroselRound";
import Footer from "@/components/Footer";
import { fetchProfiles } from "@/services/profileService";
import { useSearchParams } from "next/navigation";
import { Profile } from "@/types";

function GirlsPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const searchParams = useSearchParams();

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
        <CardsGirl profiles={filteredProfiles} />
      </div>
    </div>
  );
}

export default GirlsPage;
