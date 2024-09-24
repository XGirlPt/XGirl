import React from "react";
import { FaUsers, FaCheckCircle, FaTimesCircle, FaUserSlash } from "react-icons/fa";

interface SidebarAdminProps {
  setActiveSection: (section: string) => void;
  activeSection: string; // Adicione a prop para saber a seção ativa
}

const SidebarAdmin: React.FC<SidebarAdminProps> = ({ setActiveSection, activeSection }) => {
  return (
    <aside className="bg-gray-800 w-64 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Administração</h2>
      <nav className="flex flex-col space-y-4">
        <button
          onClick={() => setActiveSection("pending")}
          className={`flex items-center space-x-2 w-full text-left p-3 rounded transition-colors duration-300 ${
            activeSection === "pending" ? "bg-gray-700" : "hover:bg-gray-700"
          } text-white`}
        >
          <FaUsers />
          <span>Perfis Pendentes</span>
        </button>
        <button
          onClick={() => setActiveSection("approved")}
          className={`flex items-center space-x-2 w-full text-left p-3 rounded transition-colors duration-300 ${
            activeSection === "approved" ? "bg-gray-700" : "hover:bg-gray-700"
          } text-white`}
        >
          <FaCheckCircle />
          <span>Perfis Aprovados</span>
        </button>
        <button
          onClick={() => setActiveSection("inactive")}
          className={`flex items-center space-x-2 w-full text-left p-3 rounded transition-colors duration-300 ${
            activeSection === "inactive" ? "bg-gray-700" : "hover:bg-gray-700"
          } text-white`}
        >
          <FaUserSlash />
          <span>Perfis Inativos</span>
        </button>
        <button
          onClick={() => setActiveSection("active")}
          className={`flex items-center space-x-2 w-full text-left p-3 rounded transition-colors duration-300 ${
            activeSection === "active" ? "bg-gray-700" : "hover:bg-gray-700"
          } text-white`}
        >
          <FaTimesCircle />
          <span>Perfis Ativos</span>
        </button>
      </nav>
    </aside>
  );
};

export default SidebarAdmin;
