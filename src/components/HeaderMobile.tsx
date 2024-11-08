"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/ProfileActions";
import {
  faHome,
  faUsers,
  faSignInAlt,
  faUserCircle,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import { BiSolidMoviePlay } from "react-icons/bi";

const HeaderMobile: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);

  const emailReduxProfile = useSelector(
    (state: any) => state.profile?.profile?.email
  );
  const photoUID = useSelector((state: any) => state.profile?.profile?.photos?.[0]);
  const userName = useSelector((state: any) => state.profile?.profile?.name);

  const handleLoginLogout = () => {
    if (emailReduxProfile) {
      dispatch(logout());
      localStorage.removeItem("email");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userUID");
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Banda preta com o logo e avatar no topo */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-black flex items-center justify-between h-24 shadow-md px-4">
        {/* Avatar do usuário (se logado) */}
        {emailReduxProfile ? (
          <div
            className="relative w-12 h-12 rounded-full overflow-hidden border-4 border-pink-800 cursor-pointer"
            onClick={toggleMenu}
          >
            {photoUID ? (
              <Image
                src={photoUID}
                alt="User Avatar"
                className="w-full h-full object-cover"
                width={48}
                height={48}
              />
            ) : (
              <div className="w-full h-full bg-gray-400"></div>
            )}
          </div>
        ) : (
          <button
            onClick={handleLoginLogout}
            aria-label="Login"
            className="text-white text-sm"
          >
            Login
          </button>
        )}

        {/* Logo centralizado */}
        <Link href="/" aria-label="Ir para a página inicial">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={150}
            height={150}
            priority
            className="object-contain"
          />
        </Link>

        {/* Placeholder para manter o layout simétrico */}
        <div className="w-12 h-12"></div>
      </div>

      {/* Espaço adicional para evitar sobreposição de conteúdo */}
      <div className="h-24"></div>

      {/* Menu fixo na parte inferior */}
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

          {/* Botão Stories */}
          <Link href="/Stories" aria-label="Abrir Stories">
            <div className="flex flex-col items-center">
              <BiSolidMoviePlay className="text-xl" />
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
            <span className="text-xs">
              {emailReduxProfile ? "Logout" : "Login"}
            </span>
          </button>
        </div>
      </div>

      {/* Menu lateral móvel */}
      {menuOpen && (
        <>
          {/* Sobreposição com opacidade */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMenu}
          ></div>

          {/* Conteúdo do menu lateral */}
          <div className="fixed top-0 left-0 w-2/3 h-full bg-pink-900 text-white z-50 shadow-lg">
            {/* Topo com avatar, nome e email */}
            <div className="flex items-center bg-pink-800 py-6 px-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white mr-4">
                {photoUID ? (
                  <Image
                    src={photoUID}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                    width={64}
                    height={64}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-400"></div>
                )}
              </div>
              <div>
                <p className="text-lg font-bold">{userName || "Usuário"}</p>
                <p className="text-sm text-gray-200">{emailReduxProfile}</p>
              </div>
            </div>

            {/* Itens do menu */}
            <div className="mt-6 space-y-4 px-4">
              <Link
                href="/minha-conta"
                className="flex items-center text-lg hover:bg-pink-800 py-3 px-4 rounded-lg"
                onClick={closeMenu}
              >
                <FontAwesomeIcon icon={faUserCircle} className="mr-3" />
                A Minha Conta
              </Link>
              <Link
                href="/Definicoes"
                className="flex items-center text-lg hover:bg-pink-800 py-3 px-4 rounded-lg"
                onClick={closeMenu}
              >
                <FontAwesomeIcon icon={faCogs} className="mr-3" />
                Definições
              </Link>
              <Link
                href="/meu-perfil"
                className="flex items-center text-lg hover:bg-pink-800 py-3 px-4 rounded-lg"
                onClick={closeMenu}
              >
                <FontAwesomeIcon icon={faUserCircle} className="mr-3" />
                O Meu Perfil
              </Link>
              <button
                onClick={() => {
                  handleLoginLogout();
                  closeMenu();
                }}
                className="flex items-center text-lg hover:bg-pink-800 py-3 px-4 rounded-lg w-full text-left"
              >
                <FontAwesomeIcon icon={faSignInAlt} className="mr-3" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HeaderMobile;
