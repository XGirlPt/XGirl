"use client";
import { useState, useEffect } from "react";
import CaroselRound from "@/components/carosel-round";
import { fetchProfiles } from "@/services/profileService";
import { useSearchParams } from "next/navigation";
import MainCard from "@/components/main-card";
import { Listbox } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";

export interface Profile {
  nome: string;
  cidade: string;
  photos: string[];
  stories: string[];
  tag: string;
  tagtimestamp: string;
  certificado: boolean;
  distrito: string;
  live: boolean;
}

const distritos = [
  "Distrito",
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
  "Viseu",
];
function GirlsPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrito, setSelectedDistrito] = useState("Distrito");

  const searchParams = useSearchParams();
  const itemsPerPage = 15;

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProfiles: Profile[] = await fetchProfiles();
        setProfiles(fetchedProfiles);

        const distrito = searchParams.get("distrito");
        // Filtra os perfis com base no distrito da URL, se estiver presente
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
    const filtered = profiles.filter(
      (profile) =>
        profile.nome?.toLowerCase().includes(searchTerm.toLowerCase()) // Usando encadeamento opcional
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

  useEffect(() => {
    const filtered = profiles.filter(
      (profile) =>
        profile.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedDistrito === "Distrito" ||
          profile.distrito === selectedDistrito)
    );
    setFilteredProfiles(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedDistrito, profiles]);

  const totalProfiles = profiles.length;

  return (
    <div className="bg-gray-900 text-white w-screen">
      <div className="px-4 md:px-36 py-4">
        <h1 className="text-3xl md:text-4xl pink-500 font-bold text-center">
          Acompanhantes de Luxo e Massagistas Eróticas em Portugal
        </h1>
        <p className="text-lg md:text-xl text-gray-300 text-center mt-2">
          Descubra as melhores profissionais de todo o país
        </p>
      </div>

      <CaroselRound profiles={filteredProfiles} />

      <div className="px-4 md:px-36 mb-2">
        <h2 className="text-xl md:text-2xl pink-500 mb-2">
          Buscar Acompanhante
        </h2>
      </div>

      <div className="px-4 md:px-36 w-full md:w-2/4 mb-4 flex flex-col md:flex-row items-center gap-2">
        <div className="relative w-full md:w-1/3">
          <Listbox value={selectedDistrito} onChange={handleDistritoSelect}>
            <Listbox.Button className="w-full py-2 px-3 bg-pink-500 text-white rounded-md shadow-md flex justify-between items-center">
              {selectedDistrito === "Distrito"
                ? `Distrito (${totalProfiles})`
                : `${selectedDistrito}`}
              <FiChevronDown className="w-5 h-5 ml-2" />
            </Listbox.Button>
            <Listbox.Options className="absolute w-full mt-2 bg-white rounded-md shadow-lg z-20 max-h-60 overflow-auto">
              <Listbox.Option
                key="Distrito"
                value="Distrito"
                className={({ active }) =>
                  `cursor-pointer select-none relative p-2 ${
                    active ? "bg-pink-100 text-pink-900" : "text-gray-900"
                  }`
                }
              >
                Distrito ({totalProfiles})
              </Listbox.Option>
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
                  <span className="text-sm text-gray-500">
                    (
                    {
                      profiles.filter(
                        (profile) => profile.distrito === distrito
                      ).length
                    }
                    )
                  </span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>

        <div className="flex-1">
          <input
            type="text"
            className="w-full py-2 pl-4 text-gray-900 bg-white rounded-md shadow-md focus:outline-none focus:ring-4 focus:ring-pink-500"
            placeholder="Buscar por nome ou tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="px-4 md:px-36">
        <MainCard
          profiles={filteredProfiles}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />

        <div className="flex justify-center items-center mt-4">
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
