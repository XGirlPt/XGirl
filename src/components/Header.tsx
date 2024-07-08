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
  const router = useRouter();
  const pathname = usePathname();

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
    <nav
      className={`sticky top-0 left-0 w-full z-40 ${
        blur ? "backdrop-blur-lg" : ""
      }`}
    >
   <div className="w-full bg-black h-20">
  <div className="sticky flex justify-center items-center h-full">
    <Link href="/">
      <img
        src="/photos/logo1.png"
        alt="logo"
        className="w-36 h-12 object-contain"
      />
    </Link>
  </div>
</div>

      <div className=" w-full bg-pink-800   z-100">
        <div className="flex mx-auto md:mx-20 bg-pink-800 h-12 justify-between items-center">
          <div className="flex h-full">
            <Link
              href="/"
              className={`nav-link cursor-pointer flex px-3 h-full hover:bg-pink-900 items-center ${
                pathname === "/" ? "bg-pink-900" : ""
              }`}
            >
              <p className="font-bold text-sm px-2 cursor-pointer text-white block w-full">
                Home
              </p>
            </Link>

            <Link
              href="/girls"
              className={`nav-link cursor-pointer flex px-3 h-full hover:bg-pink-900 items-center ${
                pathname === "/girls" || pathname.includes("/girls")
                  ? "bg-pink-900"
                  : ""
              }`}
            >
              <p className="font-bold text-sm px-2 cursor-pointer text-white block w-full">
                Girls
              </p>
            </Link>

            <Link
              href="/clubs"
              className={`nav-link cursor-pointer flex px-3 h-full hover:bg-pink-900 items-center ${
                pathname === "/clubs" ? "bg-pink-900" : ""
              }`}
            >
              <p className="font-bold text-sm px-2 cursor-pointer text-white block w-full">
                Clubs
              </p>
            </Link>

            <div className="hover:bg-pink-900 cursor-pointer flex h-full items-center">
              <button
                className="font-bold text-md px-2 cursor-pointer w-full flex items-center text-white"
                onClick={toggleFiltro}
              >
                <IoIosOptions className="text-white mr-1" />
                Filtros
              </button>
              {filtroAberto && <Filtro />}
            </div>
          </div>

          <div>
            <Search />
          </div>

          <div className="flex align-middle h-full">
            {!emailReduxProfile && !emailReduxClubs ? (
              <>
                <Link
                  href="/login"
                  className={`nav-link cursor-pointer flex px-3 h-full hover:bg-pink-900 items-center ${
                    pathname === "/login" ? "bg-pink-900" : ""
                  }`}
                >
                  <FaUser className="text-black flex align-middle justify-center" />
                  <p className="ml-2 align-middle text-sm text-black mr-1">
                    Login
                  </p>
                </Link>

                <Link
                  href="/regista2"
                  className={`nav-link cursor-pointer flex px-3 h-full hover:bg-pink-900 items-center ${
                    pathname === "/Regista" ? "bg-pink-900" : ""
                  }`}
                >
                  <FaUser className="text-black flex align-middle justify-center" />
                  <p className="ml-2 align-middle text-sm text-black mr-1">
                    Regista-te
                  </p>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/minha-conta"
                  className={`nav-link cursor-pointer flex px-3 h-full hover:bg-pink-900 items-center ${
                    pathname === "/MinhaConta" ? "bg-pink-900" : ""
                  }`}
                >
                  <FaUser className="text-black flex align-middle justify-center" />
                  <p className="ml-2 align-middle text-sm text-black mr-1">
                    A Minha Conta
                  </p>
                </Link>

                <button
                  className={`nav-link cursor-pointer flex px-3 h-full hover:bg-pink-900 items-center ${
                    pathname === "/login" ? "bg-pink-900" : ""
                  }`}
                  onClick={handleLogout}
                >
                  <FaUser className="text-black flex align-middle justify-center" />
                  <p className="ml-2 align-middle text-sm text-black mr-1">
                    Logout
                  </p>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;