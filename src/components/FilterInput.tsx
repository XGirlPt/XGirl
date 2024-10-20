import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { Profile } from "@/types"; // Certifique-se de ajustar o caminho conforme seu projeto

interface FilterComponentProps {
  profiles: Profile[];
  onFilter: (filteredProfiles: Profile[]) => void;
}

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

export default function FilterComponent({ profiles, onFilter }: FilterComponentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrito, setSelectedDistrito] = useState("Distrito");

  // Atualiza os perfis filtrados de acordo com o nome e o distrito selecionado
  useEffect(() => {
    const filtered = profiles.filter(
      (profile) =>
        profile.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedDistrito === "Distrito" || profile.distrito === selectedDistrito)
    );
    onFilter(filtered);
  }, [searchTerm, selectedDistrito, profiles, onFilter]);

  const totalProfiles = profiles.length;

  return (
    <div className="flex items-center gap-2">
      {/* Dropdown de seleção de distrito */}
      <div className="relative w-1/4 ">
        <Listbox value={selectedDistrito} onChange={setSelectedDistrito}>
          <Listbox.Button className="w-full p-1 bg-pink-800 text-white rounded-md shadow-md flex justify-between items-center">
            {selectedDistrito === "Distrito"
              ? `Distrito (${totalProfiles})`
              : `${selectedDistrito}`}
            <FiChevronDown className="w-2 h-5 ml-2" />
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
                  ({profiles.filter((profile) => profile.distrito === distrito).length})
                </span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>

      {/* Input de busca por nome */}
      <div className="flex-1">
        <input
          type="text"
          className="w-full p-1 text-gray-900 bg-white rounded-md shadow-md focus:outline-none focus:ring-4 focus:ring-pink-500"
          placeholder="Buscar por nome ou tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}
