"use client";

import React, { useState } from "react";
import { FaInfoCircle, FaUser, FaCamera, FaCog, FaEye, FaVideo } from "react-icons/fa";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import supabase from "../../database/supabase";

const Definicoes: React.FC = () => {
  const router = useRouter();
  const userUID = useSelector((state: any) => state.profile?.profile.userUID);
  const nomeRedux = useSelector((state: any) => state.profile?.profile.nome);
  const emailRedux = useSelector((state: any) => state.profile?.profile.email);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeSection, setActiveSection] = useState("email");

  const handleVerPerfil = () => {
    router.push(`/Acompanhantes/${nomeRedux}`);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    const { user, error: updateError } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess('Mot de passe changé avec succès!');
      setNewPassword('');
      setConfirmPassword('');
      setError(null); // Effacer les erreurs
    }
};

  return (
    <div className="bg-gray-900 text-gray-100 h-full flex">
      <aside className="bg-gradient-to-b from-gray-900 to-gray-700 px-6 mt-10 w-72 shadow-xl flex flex-col">
        <div className="flex justify-center mb-14">
          <Image
            src="/photos/logo1.png"
            alt="logo"
            width={160}
            height={0}
            className="w-40 h-auto object-contain"
          />
        </div>

        <nav className="space-y-4">
          <button
            onClick={() => setActiveSection("email")}
            className={`flex items-center justify-center w-full p-4 rounded-xl transition-all hover:bg-pink-500 text-white shadow-lg ${activeSection === "email" ? "bg-pink-500" : "bg-gray-800"}`}
          >
            <FaInfoCircle className="text-2xl" />
            <span className="ml-4 hidden lg:block">Email</span>
          </button>

          <button
            onClick={() => setActiveSection("password")}
            className={`flex items-center justify-center w-full p-4 rounded-xl transition-all hover:bg-pink-500 text-white shadow-lg ${activeSection === "password" ? "bg-pink-500" : "bg-gray-800"}`}
          >
            <FaUser className="text-2xl" />
            <span className="ml-4 hidden lg:block">Alterar Palavra-passe</span>
          </button>

          <button
            onClick={() => setActiveSection("payment")}
            className={`flex items-center justify-center w-full p-4 rounded-xl transition-all hover:bg-pink-500 text-white shadow-lg ${activeSection === "payment" ? "bg-pink-500" : "bg-gray-800"}`}
          >
            <FaCamera className="text-2xl" />
            <span className="ml-4 hidden lg:block">Métodos de Pagamento</span>
          </button>

          <button
            onClick={() => setActiveSection("notifications")}
            className={`flex items-center justify-center w-full p-4 rounded-xl transition-all hover:bg-pink-500 text-white shadow-lg ${activeSection === "notifications" ? "bg-pink-500" : "bg-gray-800"}`}
          >
            <FaVideo className="text-2xl" />
            <span className="ml-4 hidden lg:block">Notificações</span>
          </button>

          <button
            onClick={() => setActiveSection("security")}
            className={`flex items-center justify-center w-full p-4 rounded-xl transition-all hover:bg-pink-500 text-white shadow-lg ${activeSection === "security" ? "bg-pink-500" : "bg-gray-800"}`}
          >
            <FaCog className="text-2xl" />
            <span className="ml-4 hidden lg:block">Segurança e Privacidade</span>
          </button>

          <button
            onClick={handleVerPerfil}
            className="flex items-center justify-center w-full p-4 rounded-xl transition-all hover:bg-pink-500 text-white shadow-lg bg-gray-800"
          >
            <FaEye className="text-2xl" />
            <span className="ml-4 hidden lg:block">Ver Perfil</span>
          </button>
        </nav>
      </aside>

      <main className="flex-1 pb-20 mt-10">
        <div className="w-full max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6">Definições</h1>

          {/* Renderiza a seção ativa com base no estado */}
          {activeSection === "email" && (
            <div className="bg-gray-700 p-6 rounded-lg mb-4">
              <h2 className="text-2xl font-semibold mb-4">Email</h2>
              <p className="text-gray-300 mb-4">
                Seu email atual é: <span className="font-bold">{emailRedux || "Email não disponível"}</span>
              </p>

              <h3 className="text-xl font-semibold mb-2">Configurações de Email</h3>
              <p className="text-gray-300 mb-4">
                Você pode gerenciar suas preferências de comunicação e notificações abaixo:
              </p>

              <ul className="list-disc list-inside text-gray-300 mb-4">
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Receber notificações sobre novas mensagens e atualizações.
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Receber ofertas e promoções especiais.
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Receber lembretes sobre sua assinatura e pagamento.
                  </label>
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-2">Alterar Email</h3>
              <p className="text-gray-300 mb-4">
                Caso queira alterar seu endereço de email, clique no botão abaixo:
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mb-4">
                Alterar Email
              </button>

              <h3 className="text-xl font-semibold mb-2">Verificação de Email</h3>
              <p className="text-gray-300 mb-4">
                Se você não recebeu o email de verificação, pode solicitar um novo:
              </p>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                Reenviar Email de Verificação
              </button>
            </div>
          )}

          {activeSection === "password" && (
            <div className="bg-gray-700 p-6 rounded-lg mb-4">
              <h2 className="text-xl font-semibold">Alterar Palavra-passe</h2>

              <form className="mt-4" onSubmit={handleChangePassword}>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2" htmlFor="new-password">Nova Senha:</label>
                  <input
                    type="password"
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full p-2 rounded bg-gray-800 text-gray-300 border border-gray-600 focus:outline-none focus:border-pink-500"
                    placeholder="Digite sua nova senha"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2" htmlFor="confirm-password">Confirmar Nova Senha:</label>
                  <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full p-2 rounded bg-gray-800 text-gray-300 border border-gray-600 focus:outline-none focus:border-pink-500"
                    placeholder="Confirme sua nova senha"
                  />
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}

                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Alterar Senha
                </button>
              </form>
            </div>
          )}

          {activeSection === "payment" && (
            <div className="bg-gray-700 p-6 rounded-lg mb-4">
              <h2 className="text-2xl font-semibold mb-4">Métodos de Pagamento</h2>
              <p className="text-gray-300 mb-4">Gerencie seus métodos de pagamento aqui.</p>
              {/* Adicione componentes ou lógica para gerenciar métodos de pagamento */}
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="bg-gray-700 p-6 rounded-lg mb-4">
              <h2 className="text-2xl font-semibold mb-4">Notificações</h2>
              <p className="text-gray-300 mb-4">Configure suas preferências de notificações aqui.</p>
              {/* Adicione componentes ou lógica para gerenciar notificações */}
            </div>
          )}

          {activeSection === "security" && (
            <div className="bg-gray-700 p-6 rounded-lg mb-4">
              <h2 className="text-2xl font-semibold mb-4">Segurança e Privacidade</h2>
              <p className="text-gray-300 mb-4">Revise suas configurações de segurança aqui.</p>
              {/* Adicione componentes ou lógica para gerenciar segurança e privacidade */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Definicoes;
