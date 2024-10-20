"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { ImBin } from "react-icons/im";
import supabase from "@/database/supabase";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import BarConta from "@/components/BarConta";

const Definicoes: React.FC = () => {
  const [showNotification, setShowNotification] = useState(true);
  const [BarOpen, setBarOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const userEmailRedux = useSelector((state: any) => state.profile?.user?.user?.email);
  const userUID = useSelector((state: any) => state.profile?.profile?.userUID);

  const handleDeleteAccount = async () => {
    try {
      if (!userUID) throw new Error("User ID is missing");

      const { error } = await supabase.auth.admin.deleteUser(userUID);
      if (error) throw error;

      toast.success("Conta apagada com sucesso!");
      router.push("/"); // Redireciona para a página inicial após exclusão
    } catch (error: any) {
      console.error("Erro ao apagar conta:", error.message);
      toast.error("Erro ao apagar conta. Tente novamente.");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      toast.success("Palavra-passe alterada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error("Erro ao alterar a palavra-passe. Tente novamente.");
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        console.log("Erro ao verificar a sessão:", error);
      } else {
        console.log("Sessão iniciada:", data.session);
      }
    };
    getSession();
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100 h-screen">
      <ToastContainer />

      <div className="flex">
        {/* Sidebar */}
        <BarConta
          BarOpen={BarOpen}
          handleVerPerfil={() => {}}
        />

        {/* Main Content */}
        <main
          className={`flex-1 pb-20 transition-all duration-300 ${BarOpen ? "ml-64" : ""}`}
          style={{ marginTop: "80px" }}
        >
          <div className="w-full max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-6">Definições</h1>

            {/* Email Section */}
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
              <div className="flex items-center mb-2">
                <MdOutlineEmail className="text-xl text-pink-600 mr-2" />
                <h2 className="text-xl font-semibold">Email</h2>
              </div>
              <p className="text-gray-300">{userEmailRedux || "Email não disponível"}</p>
            </div>

            {/* Password Section */}
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
              <div className="flex items-center mb-2">
                <FaLock className="text-xl text-pink-600 mr-2" />
                <h2 className="text-xl font-semibold">Alterar Palavra-passe</h2>
              </div>
              <div className="mt-4">
                <p className="text-gray-400 mb-2">Palavra-passe atual</p>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full py-2 px-2 bg-gray-600 text-white mb-4"
                  placeholder="Palavra-passe atual"
                />
                <p className="text-gray-400 mb-2">Nova Palavra-passe</p>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full py-2 px-2 bg-gray-600 text-white mb-4"
                  placeholder="Nova palavra-passe"
                />
                <p className="text-gray-400 mb-2">Confirmar Nova Palavra-passe</p>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full py-2 px-2 bg-gray-600 text-white mb-4"
                  placeholder="Confirmar nova palavra-passe"
                />
                <button
                  onClick={handleChangePassword}
                  className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
                >
                  Alterar Palavra-passe
                </button>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
              <div className="flex items-center mb-2">
                <LiaFileInvoiceDollarSolid className="text-xl text-pink-600 mr-2" />
                <h2 className="text-xl font-semibold">Métodos de Pagamento</h2>
              </div>
              <p className="text-gray-300">Gestão de métodos de pagamento será adicionada em breve.</p>
            </div>

            {/* Delete Account Section */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <ImBin className="text-xl text-red-600 mr-2" />
                <h2 className="text-xl font-semibold text-red-500">Apagar Conta</h2>
              </div>
              <p className="text-gray-300 mb-4">
                Ao apagar a sua conta, todas as suas informações serão permanentemente removidas.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Apagar Conta
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Definicoes;
