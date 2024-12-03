import { useState, useEffect, useRef } from "react";
import { IoIosOptions, IoIosArrowDown } from "react-icons/io";
import { BiSolidMoviePlay } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/ProfileActions";
import { logoutClubs } from "../actions/ClubsActions";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FaUser, FaCog, FaSignOutAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";
import SearchModal from "./search-modal";
import Filtro from "./filtro";

interface HeaderProps {
  blur?: boolean;
}

const Header: React.FC<HeaderProps> = ({ blur }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");

  const userUID = useSelector((state: any) => state.profile?.profile?.userUID);
  const emailReduxProfile = useSelector(
    (state: any) => state.profile?.profile?.email
  );
  const emailReduxClubs = useSelector(
    (state: any) => state.clubs && state.clubs.email
  );
  const photoUID = useSelector(
    (state: any) => state.profile?.profile?.photos?.[0]
  );

  const [filtroAberto, setFiltroAberto] = useState<boolean>(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] =
    useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dropdownRef = useRef<HTMLUListElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setEmail(emailReduxProfile || "");
  }, [emailReduxProfile]);

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
  };

  const toggleFiltro = () => {
    setFiltroAberto(!filtroAberto);
  };

  const handleLogout = () => {
    if (emailReduxProfile) {
      dispatch(logout());
    } else if (emailReduxClubs) {
      dispatch(logoutClubs());
    }
    localStorage.removeItem("email");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userUID");
    router.push("/");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setLanguageDropdownOpen(false);
    }
    if (
      modalOpen &&
      modalRef.current &&
      !modalRef.current.contains(event.target as Node)
    ) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  return (
    <nav className="hidden md:block fixed flex h-10 top-0 w-full z-40 ">
      {/* Header Principal */}
      <div className="w-full bg-black h-16  flex justify-center items-center shadow-md">
        <Link href="/" aria-label="Ir para a página inicial">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={200}
            height={200}
            priority
            style={{ objectFit: "contain" }}
          />
        </Link>
      </div>

      {/* Navegação */}
      <div className="w-full bg-pink-800 ">
        <div className="flex mx-auto px-5 md:px-10 items-center justify-between">
          {/* Links de navegação */}
          <div className="flex space-x-5 h-full text-md">
            <Link
              href="/"
              className={`nav-link flex items-center px-4 py-3 text-white h-full ${
                pathname === "/" ? "bg-pink-900" : "hover:bg-pink-800"
              } transition duration-200`}
            >
              Home
            </Link>
            <Link
              href="/acompanhantes"
              className={`nav-link flex items-center px-4 py-3 text-white h-full ${
                pathname === "/Acompanhantes"
                  ? "bg-pink-900"
                  : "hover:bg-pink-800"
              } transition duration-200`}
            >
              Acompanhantes
            </Link>
            <Link
              href="/stories"
              className={`nav-link flex items-center px-4 py-3 text-white h-full ${
                pathname === "/Stories" ? "bg-pink-900" : "hover:bg-pink-800"
              } transition duration-200`}
            >
              <BiSolidMoviePlay className="mr-2" />
              Stories
            </Link>
            <button
              onClick={toggleFiltro}
              className="flex items-center px-4 py-3 text-white h-full hover:bg-pink-800 transition duration-200"
            >
              <IoIosOptions className="mr-2" />
              Filtros
            </button>
            {filtroAberto && <Filtro />}
          </div>

          {/* Barra de Pesquisa */}
          <div className="relative py-2 px-2">
            <input
              type="text"
              placeholder="Buscar..."
              onClick={() => setModalOpen(true)} // Abrir o modal ao clicar
              className="px-4 py-1 w-64 text-sm bg-white text-gray-300 rounded-lg focus:outline-none focus:bg-gray-300 placeholder-gray-800"
            />
          </div>

          {/* Área de usuário e configurações */}
          <div className="flex items-center space-x-2 h-full text-sm">
            <p className="text-gray-300 ml-2"></p>
            {!emailReduxProfile && !emailReduxClubs ? (
              <>
                <Link
                  href="/login"
                  className={`nav-link flex items-center py-3  px-4 text-white h-full ${
                    pathname === "/login"
                      ? "bg-pink-800 py-4"
                      : "hover:bg-pink-800"
                  } transition duration-200`}
                >
                  <FaUser className="mr-2 text-sm" />
                  Login
                </Link>
                <Link
                  href="/regista2"
                  className={`nav-link flex items-center px-4 py-4  text-white h-full ${
                    pathname === "/regista2"
                      ? "bg-pink-800 py-4"
                      : "hover:bg-pink-800 "
                  } transition duration-200`}
                >
                  <FaUser className="mr-2 text-sm" />
                  Regista-te
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4 cursor-pointer">
                <span className="text-gray-300 flex"> {emailReduxProfile}</span>
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-4 border-pink-800 transition-transform hover:scale-110">
                  {photoUID ? (
                    <Image
                      src={photoUID || "/logo.webp"}
                      alt="Profile Photo"
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-400"></div>
                  )}
                </div>

                {/* Seta do dropdown só é renderizada quando o usuário está logado */}
                <div className="relative">
                  <button
                    onClick={toggleLanguageDropdown}
                    className="flex items-center text-gray-300 h-full"
                  >
                    <IoIosArrowDown className="text-xl ml-1" />
                  </button>
                  {languageDropdownOpen && (
                    <ul
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-48 bg-pink-900 text-white shadow-lg rounded-lg py-2"
                    >
                      <li
                        onClick={() => {
                          router.push("/minha-conta");
                          setLanguageDropdownOpen(false);
                        }}
                        className="flex items-center px-5 py-3 hover:bg-pink-800 cursor-pointer transition duration-200"
                      >
                        <FaUser className="mr-2" />A Minha Conta
                      </li>
                      <li
                        onClick={() => {
                          router.push("/Definicoes");
                          setLanguageDropdownOpen(false);
                        }}
                        className="flex items-center px-5 py-3 hover:bg-pink-800 cursor-pointer transition duration-200"
                      >
                        <FaCog className="mr-2" />
                        Definições
                      </li>
                      <li
                        onClick={handleLogout}
                        className="flex items-center px-5 py-3 hover:bg-pink-800 cursor-pointer transition duration-200"
                      >
                        <FaSignOutAlt className="mr-2" />
                        Sair
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Passando modalOpen para o SearchModal */}
      <SearchModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </nav>
  );
};

export default Header;
