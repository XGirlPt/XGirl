"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/ProfileActions";
import { faHome, faUsers, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { BiSolidMoviePlay } from "react-icons/bi";

const HeaderMobile: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const emailReduxProfile = useSelector(
    (state: any) => state.profile?.profile?.email
  );
  const photoUID = useSelector((state: any) => state.profile?.profile?.photos?.[0]);

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

  return (
    <>
      {/* Banda preta com o logo e avatar no topo */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-black flex items-center justify-between h-28 shadow-md px-4">
        {/* Avatar do usuário (se logado) */}
        {emailReduxProfile ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-4 border-pink-800">
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
            width={220}
            height={220}
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
    </>
  );
};

export default HeaderMobile;
