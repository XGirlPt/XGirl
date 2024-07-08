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
import { useRouter } from "next/navigation";
import { RootState } from "@/store";

function ApagarConta() {
  const router = useRouter();
  const userProfile = useSelector((state: any) => state.profile);
  const userUID = userProfile.profile.userUID;

  const handleDeleteAccount = async () => {
    try {
      const userId = userUID;
      if (!userId) {
        throw new Error("User ID is missing");
      }

      // Exclua o usuário atualmente autenticado
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) {
        throw error;
      }

      router.push("/"); // Redirecione para a página inicial após excluir a conta
    } catch (error: any) {
      console.error("Erro ao excluir conta:", error.message);
      // Trate o erro conforme necessário
    }
  };

  const reduxState = useSelector((state: RootState) => state);
  console.log("Estado Redux completo:", reduxState);

  const userEmailRedux = useSelector(
    (state: any) => state.profile?.user?.user?.email
  );
  console.log("email do redux", userEmailRedux);

  const id = useSelector((state: any) => state.profile?.user?.user?.id);
  console.log("id do redux", id);

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
        console.log("Usuário:", data?.session.user);
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
          <div className="flex bg-pink-800 hover:bg-pink-900 text-white px-6 py-2 cursor-pointer  align-center items-center rounded-r-md">
            <ImBin size={20} className="mr-2 items-center align-middle" />
            Apagar
          </div>
        </div>

        <div className="bg-[#1E2427] grid gap-2 py-6 w-1/2 px-10 border mt-6 border-gray-600 rounded-md mb-20 mx-auto">
          <p className="text-pink-800 text-2xl mb-4">Eliminar Conta</p>

          <p className="mb-2 text-white text-lg">
            Tens a certeza que queres apagar a tua conta?
          </p>
          <p className="mb-2 text-pink-800">
            {" "}
            *Todas as suas informações serão apagadas definitivamente
          </p>

          <div
            className="py-2 px-2 bg-red-700 hover:bg-red-800 text-white cursor pointer rounded-md w-44 flex items-center align-middle cursor-pointer"
            onClick={handleDeleteAccount}
          >
            <ImBin size={20} className="ml-2 mr-2 items-center align-middle" />
            Apagar Conta
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApagarConta;
