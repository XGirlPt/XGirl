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

function Definicoes() {
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
        console.log("Sessão iniciada:", data.session);
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
          <div className="flex bg-pink-800 hover:bg-pink-900 text-white px-6 py-2 cursor-pointer rounded-l-md align-center items-center">
            <MdOutlineEmail
              size={20}
              className="mr-2 items-center align-middle"
            />
            Email
          </div>

          <Link href="/definicoes/palavra-passe">
            <div className="flex bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 cursor-pointer align-center items-center">
              <FaLock size={18} className="mr-2 items-center align-middle" />
              Palavra Passe
            </div>
          </Link>

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

        <div className="bg-[#1E2427] grid gap-2 py-6 w-1/2 px-10 border mt-6 border-gray-600 rounded-md mb-20 mx-auto">
          <p className="text-pink-800 text-2xl">Endereços de Email</p>
          <p className="text-white">
            Os seguintes e-mails estão associados à sua conta:
          </p>

          <div className="flex gap-1 align-middle items-center mt-2">
            <p className="text-white text-lg">{userEmailRedux}</p>
            <p className="bg-yellow-600 text-slate-900 text-sm px-2 rounded-md align-middle items-center">
              Não verificado
            </p>
            <p className="bg-pink-800 text-slate-900 text-sm px-2 rounded-md">
              Principal
            </p>
          </div>

          <div className="flex gap-2 mt-4">
            <div className="bg-pink-800 hover:bg-pink-900 py-2 px-4 text-white rounded-md cursor-pointer">
              Utilizar como principal
            </div>

            <div className="bg-gray-400 hover:bg-gray-500 py-2 px-4 text-white rounded-md cursor-pointer">
              Reenviar email de confirmação
            </div>

            <div className="bg-red-700 hover:bg-red-800 py-2 px-4 text-white rounded-md cursor-pointer">
              Eliminar Conta
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-pink-800 text-2xl">
              Adicionar um endereço email
            </p>
            <p className="mb-2 text-pink-800">Endereço email*</p>
            <input
              className="w-full py-2 px-2 bg-slate-600 mb-6 text-white"
              placeholder="Endereço email"
            />
            <button className="bg-pink-800 hover:bg-pink-900 py-2 px-2 text-white w-28 rounded-md">
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Definicoes;
