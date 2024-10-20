"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CardsGirl from "@/components/CardsGirl";
import CaroselRound from "@/components/CaroselRound";
import Footer from "@/components/Footer";
import { fetchProfiles } from "@/services/profileService";
import { useSearchParams } from "next/navigation";
import { Profile } from "@/types";
import MainCard from "@/components/MainCard";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "react-icons/";

const distritos = [
  "Aveiro",
  "Beja",
  "Braga",
  "Bragança",
  "Castelo Branco",
  "Coimbra",
  "Évora",
  "Faro",
  "Guarda",
  "Leiria",
  "Lisboa",
  "Portalegre",
  "Porto",
  "Santarém",
  "Setúbal",
  "Viana do Castelo",
  "Vila Real",
  "Viseu"
];

function GirlsPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrito, setSelectedDistrito] = useState(distritos[0]);

  const searchParams = useSearchParams();
  const itemsPerPage = 15;

  // Fetch profiles on component mount
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

  // Filter profiles based on search term and selected district
  useEffect(() => {
    const filtered = profiles.filter((profile) =>
      profile.nome?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProfiles(filtered);
    setCurrentPage(1);
  }, [searchTerm, profiles]);

  const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDistritoSelect = (distrito: string) => {
    setSelectedDistrito(distrito);
  };

  // Update profiles when district or search term changes
  useEffect(() => {
    const filtered = profiles.filter(
      (profile) =>
        profile.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedDistrito === "" || profile.distrito === selectedDistrito)
    );
    setFilteredProfiles(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedDistrito, profiles]);

  // Count profiles per district
  const getProfileCountByDistrito = (distrito: string) => {
    return profiles.filter((profile) => profile.distrito === distrito).length;
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-700 text-white">
      {/* Título principal */}
      <div className="px-36 py-6">
        <h1 className="text-4xl text-pink-800 font-bold text-center">
          Acompanhantes de Luxo e Massagistas Eróticas em Portugal
        </h1>
        <p className="text-xl text-gray-300 text-center mt-2">
          Descubra as melhores profissionais de todo o país
        </p>
      </div>

      {/* Carrossel de perfis em destaque */}
      <CaroselRound profiles={filteredProfiles} />

      {/* Barra de busca */}
      <div className="px-36 mb-8">
        <h2 className="text-2xl text-pink-800 mb-2">Buscar Acompanhante</h2>
      </div>

      <div className="px-36 mb-4 flex items-center gap-4">
  {/* Dropdown de distritos */}
  <div className="relative w-1/6"> {/* Define tamanho para o dropdown */}
    <Listbox value={selectedDistrito} onChange={handleDistritoSelect}>
      <Listbox.Button className="w-full p-3 bg-pink-800 text-white rounded-md shadow-md flex justify-between items-center">
        {selectedDistrito}{" "}
        <span className="text-sm text-gray-300">
          ({profiles.filter((profile) => profile.distrito === selectedDistrito).length})
        </span>
      </Listbox.Button>
      <Listbox.Options className="absolute w-full mt-2 bg-white rounded-md shadow-lg z-20 max-h-60 overflow-auto">
        {distritos.map((distrito, index) => (
          <Listbox.Option
            key={index}
            value={distrito}
            className={({ active }) =>
              `cursor-pointer select-none relative p-2 ${
                active ? "bg-pink-100 text-pink-900" : "text-gray-900"
              }`
            }
          >
            {distrito}{" "}
            {distrito !== "Distrito" && (
              <span className="text-sm text-gray-500">
                ({profiles.filter((profile) => profile.distrito === distrito).length})
              </span>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  </div>

  {/* Input de busca */}
  <div className="flex-1">
    <input
      type="text"
      className="w-full p-3 text-gray-900 bg-white rounded-md shadow-md focus:outline-none focus:ring-4 focus:ring-pink-500"
      placeholder="Buscar por nome ou tag..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
</div>

      {/* Exibição de perfis em cards */}
      <div className="px-36">
        <MainCard profiles={filteredProfiles} currentPage={currentPage} itemsPerPage={itemsPerPage} />

        {/* Paginação */}
        <div className="flex justify-center items-center mt-8">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-pink-800 text-white rounded-md shadow-md disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="mx-4 text-lg">{`Página ${currentPage} de ${totalPages}`}</span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-pink-800 text-white rounded-md shadow-md disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}

export default GirlsPage;
