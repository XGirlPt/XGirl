import React, { useState, useEffect } from "react";
import MainCard from "./MainCard"; // Importando o componente de cards
import { fetchProfiles } from "@/services/profileService"; // Serviço para buscar os perfis do Supabase

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const districts = [
  "Aveiro", "Beja", "Braga", "Coimbra", "Évora", "Faro",
  "Madeira", "Açores", "Leiria", "Lisboa", "Portalegre", "Porto", "Santarém",
  "Setúbal", "Viseu"
]; // Lista de distritos de Portugal

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
}) => {
  if (!isOpen) return null;

  const [profiles, setProfiles] = useState<any[]>([]); // Armazenar os perfis obtidos do Supabase
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]); // Perfis filtrados com base no searchQuery
  const [currentPage, setCurrentPage] = useState(1); // Estado para a página atual
  const itemsPerPage = 5; // Número de itens por página
  const [showMoreDistricts, setShowMoreDistricts] = useState(false); // Controla a exibição dos distritos extras
  const safeSearchQuery = searchQuery?.toLowerCase() || "";


  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProfiles = await fetchProfiles();
        if (Array.isArray(fetchedProfiles)) {
          console.log("Perfis obtidos:", fetchedProfiles);
          setProfiles(fetchedProfiles);
        } else {
          console.error("Os dados retornados não são um array:", fetchedProfiles);
          setProfiles([]); // Define como array vazio em caso de erro
        }
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Filtra os perfis com base no nome ou cidade
    const filtered = profiles.filter((acompanhante) => {
        if (!acompanhante || typeof acompanhante !== "object") return false;
        const nome = acompanhante.nome?.toLowerCase() || "";
        const distrito = acompanhante.distrito?.toLowerCase() || "";
        return nome.includes(safeSearchQuery) || distrito.includes(safeSearchQuery);
      });
    setFilteredProfiles(filtered);
  }, [searchQuery, profiles]); /// Refiltra sempre que searchQuery ou profiles mudam

  // Lógica para paginar os perfis
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProfiles = filteredProfiles.slice(startIndex, startIndex + itemsPerPage);

  // Função para filtrar perfis por distrito
  const filterByDistrict = (district: string) => {
    setSearchQuery(district);
  };

  // Função para fechar o modal ao clicar no perfil
  const handleProfileClick = () => {
    onClose(); // Fechar o modal
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center px-4 bg-black bg-opacity-60 backdrop-blur-md z-50"
      onClick={onClose} // Fechar o modal ao clicar fora dele
    >
      <div
        className="w-4/5 bg-gray-800 p-6 rounded-xl shadow-2xl overflow-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Impedir que o clique no modal feche
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg md:text-xl text-white font-semibold">Buscar</h1>
          <button
            onClick={onClose}
            className="py-2 px-3 rounded-full hover:bg-gray-700"
          >
            <span className="text-gray-400 hover:text-pink-500 transition-colors">
              X
            </span>
          </button>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-700 mb-6"></div>

        {/* Barra de Pesquisa */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="text-white font-medium">Pesquisar por Cidade ou Acompanhante</div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Digite o nome ou cidade"
          />
        </div>

        {/* Seção Cidade com distritos de Portugal */}
        <div className="mb-6">
          <h2 className="text-white font-medium text-lg mb-4">Distritos</h2>
          <div className="flex flex-wrap gap-2 mb-4 text-xs">
            {districts.slice(0, showMoreDistricts ? districts.length : 16).map((district) => (
              <button
                key={district}
                onClick={() => filterByDistrict(district)}
                className="bg-gray-700 text-white py-1 px-3 rounded-md hover:bg-pink-600 transition-colors"
              >
                {district}
              </button>
            ))}
          </div>
        </div>

        {/* Exibindo os Cards de Acompanhantes */}
        <div className="">
          <h2 className="text-white font-medium text-lg">Acompanhantes</h2>

          {paginatedProfiles.length > 0 ? (
            <MainCard
              profiles={paginatedProfiles}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onProfileClick={handleProfileClick} // Passando o manipulador de clique
            />
          ) : (
            <p className="text-gray-400 text-center">Nenhum resultado encontrado</p>
          )}
        </div>

        {/* Separator */}
        <div className="border-t border-gray-700 my-6"></div>
      </div>
    </div>
  );
};

export default SearchModal;
