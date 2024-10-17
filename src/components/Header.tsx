"use client";
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa6";
import Search from "./Search";
import { IoIosOptions } from "react-icons/io";
import Filtro from "./Filtro";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/ProfileActions";
import { logoutClubs } from "../actions/ClubsActions";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { MdLanguage } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { BiSolidMoviePlay } from "react-icons/bi";


interface HeaderProps {
  blur?: boolean;
  isLogged?: boolean;
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

  const [filtroAberto, setFiltroAberto] = useState<boolean>(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
  };

  const toggleFiltro = () => {
    setFiltroAberto(!filtroAberto);
  };

  useEffect(() => {
    setEmail(emailReduxProfile || "");
  }, [emailReduxProfile]);

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

  useEffect(() => {
    console.log(
      "Estado do Redux após logout:",
      emailReduxClubs,
      emailReduxProfile
    );
  }, [emailReduxClubs, emailReduxProfile]);

  return (
    <nav className={`sticky top-0 left-0 w-full z-40 ${blur ? "backdrop-blur-lg" : ""}`}>
      <div className="w-full bg-black h-20 flex justify-center items-center">
        <Link href="/">
          <img src="/photos/logo1.png" alt="logo" className="w-40 h-14 object-contain" />
        </Link>
      </div>
  
      <div className="w-full bg-pink-800">
        <div className="flex mx-auto px-5 md:px-20 h-14 items-center justify-between">
          <div className="flex space-x-5 h-full">
            <Link href="/" className={`nav-link flex items-center px-4 py-2 rounded-md text-white relative h-full ${pathname === "/" ? "bg-pink-900" : ""} hover:bg-pink-900`}>
              Home
            </Link>
  
            <Link href="/Acompanhantes" className={`nav-link flex items-center px-4 py-2 rounded-md text-white relative h-full ${pathname === "/girls" ? "bg-pink-900" : ""} hover:bg-pink-900`}>
              Acompanhantes
            </Link>
  
            <Link href="/Stories" className={`nav-link flex items-center px-4 py-2 rounded-md text-white relative h-full ${pathname === "/Stories" ? "bg-pink-900" : ""} hover:bg-pink-900`}>
              <BiSolidMoviePlay className="mr-2" />
              Stories
            </Link>
  
            <button onClick={toggleFiltro} className={`flex items-center px-4 py-2 rounded-md text-white relative h-full hover:bg-pink-900`}>
              <IoIosOptions className="mr-2" />
              Filtros
            </button>
            {filtroAberto && <Filtro />}
          </div>
  
          <div className="flex items-center space-x-4 h-full">
            {!emailReduxProfile && !emailReduxClubs ? (
              <>
                <Link href="/login" className={`nav-link flex items-center px-4 py-2 rounded-md text-white relative h-full ${pathname === "/login" ? "bg-pink-900" : ""} hover:bg-pink-900`}>
                  <FaUser className="mr-2" />
                  Login
                </Link>
  
                <Link href="/regista2" className={`nav-link flex items-center px-4 py-2 rounded-md text-white relative h-full ${pathname === "/regista2" ? "bg-pink-900" : ""} hover:bg-pink-900`}>
                  <FaUser className="mr-2" />
                  Regista-te
                </Link>
              </>
            ) : (
              <>
                <Link href="/minha-conta" className={`nav-link flex items-center px-4 py-2 rounded-md text-white relative h-full ${pathname === "/minha-conta" ? "bg-pink-900" : ""} hover:bg-pink-900`}>
                  <FaUser className="mr-2" />
                  A Minha Conta
                </Link>
  
                <button onClick={handleLogout} className={`nav-link flex items-center px-4 py-2 rounded-md text-white relative h-full hover:bg-pink-900`}>
                  <FaUser className="mr-2" />
                  Logout
                </button>
              </>
            )}
  
            <div className="relative">
              <button onClick={toggleLanguageDropdown} className="flex items-center text-white relative h-full">
                <MdLanguage className="text-xl" />
                <IoIosArrowDown className="text-xl ml-1" />
              </button>
  
              {languageDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg py-2 text-black">
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Português</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">English</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Español</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
  
  
  
};

export default Header;
