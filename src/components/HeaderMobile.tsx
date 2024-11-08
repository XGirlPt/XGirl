"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; // Use useRouter de next/navigation no app directory
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faFilter,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { BiSolidMoviePlay } from "react-icons/bi";


const HeaderMobile: React.FC = () => {
  const router = useRouter(); // Certifique-se de usar o hook certo para navegação no cliente

  // Função para alternar entre login/logout
  const handleLoginLogout = () => {
    const isLoggedIn = false; // Altere para refletir o estado real
    if (isLoggedIn) {
      console.log("Logout realizado!");
    } else {
      router.push("/login"); // Redireciona para a página de login
    }
  };

  return (
    <div className="block md:hidden fixed bottom-0 left-0 w-full bg-pink-800 text-white shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        {/* Botão Home */}
        <Link href="/" aria-label="Ir para Home">
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faHome} className="text-xl" />
            <span className="text-xs">Home</span>
          </div>
        </Link>

        {/* Botão Acompanhantes */}
        <Link href="/Acompanhantes" aria-label="Ver Acompanhantes">
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faUsers} className="text-xl" />
            <span className="text-xs">Acompanhantes</span>
          </div>
        </Link>

        {/* Botão Filtros */}
        <Link href="/Stories" aria-label="Abrir Filtros">
          <div className="flex flex-col items-center">
            <BiSolidMoviePlay  className="text-xl" />
            <span className="text-xs">Stories</span>
          </div>
        </Link>

        {/* Botão Login/Logout */}
        <button
          onClick={handleLoginLogout}
          aria-label="Login"
          className="flex flex-col items-center focus:outline-none"
        >
          <FontAwesomeIcon icon={faSignInAlt} className="text-xl" />
          <span className="text-xs">Login</span>
        </button>
      </div>
    </div>
  );
};

export default HeaderMobile;
