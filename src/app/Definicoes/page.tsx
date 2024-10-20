"use client";

import React, { useState } from "react";
import { FaInfoCircle, FaUser, FaCamera, FaCog, FaEye, FaVideo } from "react-icons/fa";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import supabase from "../../database/supabase";
import {FaEnvelope, FaLock, FaCreditCard,  FaShieldAlt, FaUserCircle } from "react-icons/fa"

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

const handleDeleteAccount = async () => {
  if (confirm("Tem certeza de que deseja eliminar sua conta? Esta ação é irreversível.")) {
    const { error } = await supabase.auth.signOut(); // Desconecta o usuário

    if (error) {
      console.error("Erro ao desconectar:", error);
      return;
    }

    const { error: deleteError } = await supabase.auth.deleteUser();

    if (deleteError) {
      console.error("Erro ao eliminar conta:", deleteError);
      // Aqui você pode adicionar uma mensagem de erro para o usuário
    } else {
      // Conta eliminada com sucesso, você pode redirecionar o usuário ou mostrar uma mensagem de sucesso
      alert("Sua conta foi eliminada com sucesso.");
      router.push("/"); // Redirecionar para a página inicial ou qualquer outra página
    }
  }
};

  return (
    <div className="bg-gray-900 text-gray-100 h-full flex">
      <aside className="bg-gradient-to-b from-gray-900 to-gray-700 w-72 shadow-xl fixed  h-full">
      <div className="flex justify-center mb-14">
    <Image
      src="/photos/logo1.png"
      alt="logo"
      width={160}
      height={0}
      className="w-40 h-auto object-contain"
    />
  </div>

  <nav className="space-y-2">
    <button
      onClick={() => setActiveSection("email")}
      className={`flex items-center justify-start w-full p-3 rounded-lg transition-all hover:bg-pink-700 text-white shadow-lg ${activeSection === "email" ? "bg-pink-800" : "bg-gray-800"}`}
    >
      <FaEnvelope className="text-2xl" />
      <span className="ml-4 text-lg">Email</span>
    </button>

    <button
      onClick={() => setActiveSection("password")}
      className={`flex items-center justify-start w-full p-3 rounded-lg transition-all hover:bg-pink-700 text-white shadow-lg ${activeSection === "password" ? "bg-pink-800" : "bg-gray-800"}`}
    >
      <FaLock className="text-2xl" />
      <span className="ml-4 text-lg"> Palavra-passe</span>
    </button>

    <button
      onClick={() => setActiveSection("payment")}
      className={`flex items-center justify-start w-full p-3 rounded-lg transition-all hover:bg-pink-700 text-white shadow-lg ${activeSection === "payment" ? "bg-pink-800" : "bg-gray-800"}`}
    >
      <FaCreditCard className="text-2xl" />
      <span className="ml-4 text-lg">Subscrição</span>
    </button>

    <button
      onClick={() => setActiveSection("Conta")}
      className={`flex items-center justify-start w-full p-3 rounded-lg transition-all hover:bg-pink-700 text-white shadow-lg ${activeSection === "notifications" ? "bg-pink-800" : "bg-gray-800"}`}
    >
      <FaUser className="text-2xl" />
      <span className="ml-4 text-lg">Conta</span>
    </button>

    {/* <button
      onClick={() => setActiveSection("security")}
      className={`flex items-center justify-start w-full p-3 rounded-lg transition-all hover:bg-pink-700 text-white shadow-lg ${activeSection === "security" ? "bg-pink-800" : "bg-gray-800"}`}
    >
      <FaShieldAlt className="text-2xl" />
      <span className="ml-4 text-lg">Segurança e Privacidade</span>
    </button> */}

    <button
      onClick={handleVerPerfil}
      className="flex items-center justify-start w-full p-3 rounded-lg transition-all hover:bg-pink-700 text-white shadow-lg bg-gray-800"
    >
      <FaUserCircle className="text-2xl" />
      <span className="ml-4 text-lg">Ver Perfil</span>
    </button>
  </nav>
</aside>


<main className="flex-1 pb-20 mt-10 ml-72"> {/* Adicione ml-72 para compensar a largura do menu */}
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
  <div className="bg-gray-800 p-6 rounded-lg mb-4 shadow-lg">
    <h2 className="text-2xl font-semibold mb-6 text-pink-500 flex items-center">
      <FaLock className="mr-2 text-3xl" /> Alterar Palavra-passe
    </h2>

    <form className="mt-4" onSubmit={handleChangePassword}>
      <div className="mb-6">
        <label className="block text-gray-300 mb-2" htmlFor="new-password">Nova Senha:</label>
        <input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:border-pink-500 transition duration-200"
          placeholder="Digite sua nova senha"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-300 mb-2" htmlFor="confirm-password">Confirmar Nova Senha:</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:border-pink-500 transition duration-200"
          placeholder="Confirme sua nova senha"
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors shadow-md"
      >
        Alterar Senha
      </button>

      <p className="mt-4 text-gray-400 text-sm">
        Dicas para criar uma senha forte:
        <ul className="list-disc list-inside">
          <li>Use pelo menos 8 caracteres.</li>
          <li>Inclua letras maiúsculas e minúsculas.</li>
          <li>Adicione números e símbolos.</li>
        </ul>
      </p>
    </form>
  </div>
)}


{activeSection === "payment" && (
  <div className="bg-gray-800 p-6 rounded-lg mb-4 shadow-lg h-full">
    <h2 className="text-2xl font-semibold mb-6 text-pink-500 flex items-center">
      <FaCreditCard className="mr-2 text-3xl" /> Métodos de Pagamento
    </h2>
    
    <p className="text-gray-300 mb-6">
      Para acessar todas as funcionalidades do nosso site, é necessária uma assinatura mensal de 
      <span className="font-bold text-pink-500"> 10 EUR</span>. Os pagamentos são processados através do <span className="font-bold text-pink-500">Verotel</span>.
    </p>
    
    <h3 className="text-xl font-semibold mb-4">Informações da Assinatura</h3>
    <div className="bg-gray-700 p-4 rounded-lg mb-6">
      <ul className="list-disc list-inside text-gray-300">
        <li>Subscrição: <span className="font-bold">10 EUR</span></li>
        <li>Faturamento mensal no dia da assinatura.</li>
        <li>Cancelamento a qualquer momento sem taxas adicionais.</li>
      </ul>
    </div>

    <h3 className="text-xl font-semibold mb-4">Status do Pagamento</h3>
    <div className="bg-gray-700 p-4 rounded-lg mb-6">
      <p className="text-gray-300 mb-2">
        Seu pagamento está <span className="font-bold text-green-500">em dia</span>.
      </p>
      <ul className="list-disc list-inside text-gray-300">
        <li>Data da Assinatura: <span className="font-bold">15 de Outubro de 2024</span></li>
        <li>Data da Próxima Mensalidade: <span className="font-bold">15 de Novembro de 2024</span></li>
      </ul>
    </div>

    <h3 className="text-xl font-semibold mb-4">Métodos de Pagamento Aceitos</h3>
    <div className="bg-gray-700 p-4 rounded-lg mb-6">
      <p className="text-gray-300 mb-2">Aceitamos os seguintes métodos de pagamento:</p>
      <ul className="list-disc list-inside text-gray-300">
        <li>Cartões de Crédito (Visa, Mastercard, etc.)</li>
        <li>Transferências Bancárias</li>
        <li>PayPal (se disponível)</li>
      </ul>
    </div>

    <div className="mt-4 flex justify-between">
      <button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors shadow-md">
        Adicionar Método de Pagamento
      </button>
      <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-md">
        Remover Método de Pagamento
      </button>
    </div>

    <h3 className="text-xl font-semibold mt-6 mb-2">Histórico de Pagamentos</h3>
    <p className="text-gray-300 mb-4">
      Aqui você pode visualizar seu histórico de pagamentos e status de assinatura. 
      <span className="text-pink-500 underline cursor-pointer"> Clique aqui</span> para acessar o histórico.
    </p>
  </div>
)}


{activeSection === "Conta" && (
  <div className="bg-gray-800 p-6 rounded-lg mb-4 shadow-lg">
    <h2 className="text-2xl font-semibold mb-6 text-pink-500 flex items-center">
      <FaUser className="mr-2 text-3xl" /> Configurações da Conta
    </h2>
    
    <p className="text-gray-300 mb-6">
      Gerencie sua conta e suas preferências. Você pode suspender temporariamente ou eliminar sua conta definitivamente.
    </p>
    
    <div className="space-y-6">
      {/* Seção para suspender a conta */}
      <div className="bg-gray-700 p-4 rounded-lg flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Suspender Conta Temporariamente</h3>
          <p className="text-gray-400 text-sm">
            Você poderá reativar sua conta a qualquer momento.
          </p>
        </div>
        <button className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-500 transition-all">
          Suspender
        </button>
      </div>

      {/* Seção para eliminar a conta */}
      <div className="bg-red-800 p-4 rounded-lg flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Eliminar Conta Definitivamente</h3>
          <p className="text-gray-200 text-sm">
            Esta ação é irreversível. Todos os dados serão permanentemente removidos.
          </p>
        </div>
        <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400 transition-all"
                  onClick={handleDeleteAccount}
>
          Eliminar
        </button>
      </div>
      
      {/* Informações de suporte */}
      <div className="border-t border-gray-600 pt-4">
        <h3 className="text-lg font-semibold mb-2 text-pink-500">Suporte</h3>
        <p className="text-gray-300 mb-2">
          Se você tiver dúvidas ou precisar de assistência, entre em contato com nosso suporte.
        </p>
        <button className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-all">
          Fale com o Suporte
        </button>
      </div>

      {/* Adicionar um aviso de segurança */}
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-400">Aviso de Segurança</h3>
        <p className="text-gray-300">
          Nunca compartilhe suas informações de login e sempre utilize uma senha forte para proteger sua conta.
        </p>
      </div>
    </div>
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
