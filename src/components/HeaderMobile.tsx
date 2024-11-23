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
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { BiSolidMoviePlay, BiSolidMessageSquareAdd } from "react-icons/bi";
import { FaUserEdit, FaPhotoVideo, FaInfoCircle } from "react-icons/fa";
import ModificarFotos from "@/app/minha-conta/_ui/ModificarFotos";
import ModificarStories from "@/app/minha-conta/_ui/ModificarStories";
import ModificarPerfil from "@/app/minha-conta/_ui/ModificarPerfil";
import ModificarContacto from "@/app/minha-conta/_ui/ModificarContacto";
import ModalAtualizarTagProps from "@/components/ModalAtualizarTagProps";
import SearchModal from "@/components/SearchModal";

const HeaderMobile: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const emailReduxProfile = useSelector(
    (state: any) => state.profile?.profile?.email
  );
  const photoUID = useSelector((state: any) => state.profile?.profile?.photos?.[0]);
  const nomeRedux = useSelector((state: any) => state.profile?.profile?.nome);

  const [showModifyPhoto, setShowModifyPhoto] = useState(false);
  const [showModifyStory, setShowModifyStory] = useState(false);
  const [showModifyPerfil, setShowModifyPerfil] = useState(false);
  const [showModifyContacto, setShowModifyContacto] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // Controla o modal de busca
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTag, setNewTag] = useState("");

  const toggleAccountMenu = () => {
    setAccountMenuOpen(!accountMenuOpen);
  };

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
    setAccountMenuOpen(false);
  };

  const handleAlterarFotoClick = () => {
    closeMenu();
    setShowModifyPhoto(true);
  };

  const handleAlterarStoryClick = () => {
    closeMenu();
    setShowModifyStory(true);
  };

  const handleAlterarPerfilClick = () => {
    closeMenu();
    setShowModifyPerfil(true);
  };

  const handleAlterarContactoClick = () => {
    closeMenu();
    setShowModifyContacto(true);
  };

  const handleVoltarFoto = () => {
    setShowModifyPhoto(false);
  };

  const handleVoltarStory = () => {
    setShowModifyStory(false);
  };

  const handleVoltarPerfil = () => {
    setShowModifyPerfil(false);
  };

  const handleVoltarContacto = () => {
    setShowModifyContacto(false);
  };

  const handleSaveTag = (tag: string) => {
    console.log("Nova tag salva:", tag);
    setNewTag(tag);
  };

  return (
    <>
      {/* Banda preta com o logo e avatar no topo */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-black flex items-center justify-between h-24 shadow-md px-4">
        {emailReduxProfile && (
          <div
            className="absolute left-4 w-12 h-12 rounded-full overflow-hidden border-4 border-pink-800 cursor-pointer"
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
        )}

        <div className="absolute left-1/2 transform -translate-x-1/2">
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
        </div>
      </div>

      <div className="h-24"></div>

      {/* Renderização Condicional dos Componentes */}
      {showModifyPhoto && <ModificarFotos handleVoltar={handleVoltarFoto} />}
      {showModifyStory && <ModificarStories handleVoltar={handleVoltarStory} />}
      {showModifyPerfil && <ModificarPerfil handleVoltar={handleVoltarPerfil} />}
      {showModifyContacto && <ModificarContacto handleVoltar={handleVoltarContacto} />}

      {/* Menu fixo na parte inferior */}
      <div className="block md:hidden fixed bottom-0 left-0 w-full bg-pink-800 opacity-90 text-white shadow-lg z-50">
        <div className="flex justify-around items-center h-16">
          {/* Link para Home */}
          <Link href="/" aria-label="Ir para Home">
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faHome} className="text-xl" />
              <span className="text-xs"></span>
            </div>
          </Link>

          {/* Link para Acompanhantes */}
          <Link href="/Acompanhantes" aria-label="Ver Acompanhantes">
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faUsers} className="text-xl" />
              <span className="text-xs"></span>
            </div>
          </Link>

          {/* Botão para abrir o modal "Alterar Estado" */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              aria-label="Alterar Estado"
              className="flex flex-col items-center focus:outline-none"
            >
              <BiSolidMessageSquareAdd className="text-xl" />
            </button>
          </div>

          {/* Botão para abrir o modal de busca */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setIsSearchModalOpen(true)}
              aria-label="Abrir Busca"
              className="flex flex-col items-center focus:outline-none"
            >
              <FontAwesomeIcon icon={faSearch} className="text-xl" />
            </button>
          </div>

          {/* Botão de Login/Logout */}
          <button
            onClick={handleLoginLogout}
            aria-label={emailReduxProfile ? "Logout" : "Login"}
            className="flex flex-col items-center focus:outline-none"
          >
            <FontAwesomeIcon icon={faSignInAlt} className="text-xl" />
            <span className="text-xs">{emailReduxProfile ? "" : ""}</span>
          </button>
        </div>

        {/* Modal "Alterar Estado" */}
        {isModalOpen && (
          <ModalAtualizarTagProps
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveTag}
          />
        )}

        {/* Modal de busca */}
        {isSearchModalOpen && (
          <SearchModal
            isOpen={isSearchModalOpen}
            onClose={() => setIsSearchModalOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default HeaderMobile;
