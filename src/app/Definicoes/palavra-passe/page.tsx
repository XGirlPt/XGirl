"use client";
import { useEffect } from "react";
import Header from "@/components/Header";
import supabase from "@/database/supabase";
import HeaderLoged from "@/components/Register/HeaderLoged";
import { useSelector } from "react-redux";
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { ImBin } from "react-icons/im";
import Link from "next/link";
import { RootState } from "@/store";

function Defpassword() {
  const reduxState = useSelector((state: RootState) => state);
  console.log("Estado Redux completo:", reduxState);

  const userEmailRedux = useSelector(
    (state: any) => state.profile?.user?.user?.email
  );
  console.log("email do redux", userEmailRedux);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        console.log(
          "Sessão não iniciada ou erro ao verificar a sessão:",
          error
        );
      } else {
        // Você pode adicionar outras ações aqui, se necessário
      }
    };

    getSession();
  }, []);

  return (
    <div className="text-gray-600 bg-[#1b1b1b] flex flex-col min-h-screen">
      <HeaderLoged />
      {/* Renderiza HeaderLoged se o usuário estiver logado */}

      <div className="mx-10">
        <div className="flex-1">
          <p className="text-3xl text-white">Definições de Perfil</p>
        </div>

        <div className="flex my-4 align-center items-center justify-center">
          <Link href="/definicoes">
            <div className="flex bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 cursor-pointer align-center rounded-l-md items-center">
              <MdOutlineEmail
                size={20}
                className="mr-2 items-center align-middle"
              />
              Email
            </div>
          </Link>

          <div className="flex bg-pink-800 hover:bg-pink-900 text-white px-6 py-2 cursor-pointer align-center items-center">
            <FaLock size={18} className="mr-2 items-center align-middle" />
            Palavra Passe
          </div>
          <div className="flex bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 cursor-pointer align-center items-center">
            <LiaFileInvoiceDollarSolid
              size={20}
              className="mr-2 items-center align-middle"
            />
            Faturacao
          </div>

          <Link href="/definicoes/apagar-conta">
            <div className="flex bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 cursor-pointer rounded-r-md align-center items-center">
              <ImBin size={20} className="mr-2 items-center align-middle" />
              Apagar
            </div>
          </Link>
        </div>

        <div className="bg-[#1E2427] grid gap-2 py-6 w-1/2 px-10 border mt-6 border-gray-600 rounded-md mb-10 mx-auto">
          <div>
            <p className="text-pink-800 text-2xl">Alterar Palavra Passe</p>
            <div className="mt-6">
              <p className="mb-2 text-pink-800"> Palavra Passe atual</p>
              <input
                type="password"
                className="w-full py-2 px-2 bg-slate-600 mb-6 text-white"
                placeholder="Palavra Passe Atual"
              />

              <p className="mb-2 text-pink-800"> Nova Palavra Passe</p>
              <input
                type="password"
                className="w-full py-2 px-2 bg-slate-600 mb-6 text-white"
                placeholder="Nova Palavra Passe"
              />

              <p className="mb-2 text-pink-800">
                {" "}
                Nova Palavra Passe (Confirmação)
              </p>
              <input
                type="password"
                className="w-full py-2 px-2 bg-slate-600 mb-6 text-white"
                placeholder="Confirmação de Palavra Passe"
              />
            </div>

            <div className="mt-2">
              <button className="bg-pink-800 hover:bg-pink-900 py-2 px-2 text-white w-42 rounded-md">
                Alterar Palavra Passe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Defpassword;
