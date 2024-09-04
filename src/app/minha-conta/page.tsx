"use client";
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaMapMarkerAlt, FaUser, FaCog, FaEye, FaCamera } from "react-icons/fa";
import supabase from "@/database/supabase";
import ModificarPerfil from "./_ui/ModificarPerfil";
import ModificarContacto from "./_ui/ModificarContacto";
import ModificarFotos from "./_ui/ModificarFotos";
import { BlurImage } from "@/components/BlurImage";
import SidebarConta from '../../components/sidebarConta';


interface MinhaContaProps {}

const MinhaConta: React.FC<MinhaContaProps> = () => {
  const [showModificar, setShowModificar] = useState(false);
  const [showContacto, setShowContacto] = useState(false);
  const [showFotos, setShowFotos] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(true);

  const emailRedux = useSelector((state: any) => state.profile?.user?.user?.email);
  const tagRedux = useSelector((state: any) => state.profile?.profile?.tag);
  const cidadeRedux = useSelector((state: any) => state.profile?.profile?.cidade);
  const nomeRedux = useSelector((state: any) => state.profile?.profile?.nome);
  const photoURLsRedux = useSelector((state: any) => state.profile?.profile?.photos);

  const [nome, setNome] = useState<string | undefined>(nomeRedux);
  const [newTag, setNewTag] = useState<string>("");

  useEffect(() => {
    setNome(nomeRedux);
  }, [nomeRedux]);

  const handleModificar = () => {
    setShowModificar(true);
    setShowContacto(false);
    setShowFotos(false);
  };

  const handleContacto = () => {
    setShowContacto(true);
    setShowModificar(false);
    setShowFotos(false);
  };

  const handleFotos = () => {
    setShowFotos(true);
    setShowModificar(false);
    setShowContacto(false);
  };

  const handleDefinicoes = () => {
    // Logic for "Definições"
  };

  const handleVerPerfil = () => {
    // Logic for "Ver Perfil"
  };

  const handleVoltar = () => {
    setShowModificar(false);
    setShowContacto(false);
    setShowFotos(false);
  };

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error || !session) {
        console.log("Sessão não iniciada ou erro ao verificar a sessão:", error);
      } else {
        console.log("Sessão iniciada:", session);
        console.log("Usuário:", session.user);
      }
    };

    getSession();
  }, []);

  return (
    <div>
    <div className="grid min-h-screen mt-24 grid-cols-[theme(spacing.64)_1fr]">
      {/* Notification Bar */}
      {notificationVisible && (
        <div className="bg-red-600 text-white px-4 py-3 flex justify-between items-center">
          <span>⚠️ Seu perfil está expirando em breve. Atualize suas informações.</span>
          <button
            onClick={() => setNotificationVisible(false)}
            className="text-lg"
          >
            &times;
          </button>
        </div>
      )}

      <div className="flex flex-row">
        {/* Sidebar */}
        <SidebarConta
          handleModificar={handleModificar}
          showModificar={showModificar}
          handleContacto={handleContacto}
          showContacto={showContacto}
          handleFotos={handleFotos}
          showFotos={showFotos}
          handleDefinicoes={handleDefinicoes}
          handleVerPerfil={handleVerPerfil}
        />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="flex flex-col items-center">
            {/* Profile Header */}
            <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex flex-col md:flex-row items-center">
                <div className="relative w-32 h-32 mb-4 md:mb-0 md:mr-6">
                  {photoURLsRedux?.length > 0 ? (
                    <BlurImage
                      src={photoURLsRedux[0]}
                      alt={`Foto de ${nomeRedux}`}
                      className="w-full h-full rounded-full object-cover shadow-md"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-600 flex items-center justify-center">
                      <FaUser className="text-5xl text-gray-400" />
                    </div>
                  )}
                  <button className="absolute bottom-0 right-0 bg-pink-600 text-white p-2 rounded-full shadow-md hover:bg-pink-700 transition-colors">
                    <FaCamera />
                  </button>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold">{nomeRedux}</h1>
                  <p className="flex items-center justify-center md:justify-start text-pink-600 mt-2">
                    <FaMapMarkerAlt className="mr-2" />
                    {cidadeRedux}
                  </p>
                  <p className="text-gray-400 mt-1">{tagRedux}</p>
                </div>
              </div>
              {/* Status Update */}
              <div className="mt-6 bg-gray-700 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Estado Atual</h2>
                <p className="text-gray-300 mb-4">
                  {tagRedux || "Sem estado definido"}
                </p>
                <h2 className="text-xl font-semibold mb-2">Atualiza o teu Estado</h2>
                <div className="flex flex-col sm:flex-row items-center">
                  <input
                    type="text"
                    className="w-full sm:w-auto flex-1 p-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Escreva o novo estado"
                  />
                  <button className="mt-2 sm:mt-0 sm:ml-4 px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-md transition-colors">
                    Actualizar Estado
                  </button>
                </div>
              </div>
            </div>

            {/* Action Panels */}
            <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6">
              {showModificar && (
                <ModificarPerfil
                  handleVoltar={handleVoltar}
                  onClose={() => setShowModificar(false)}
                />
              )}
              {showContacto && (
                <ModificarContacto
                  handleVoltar={handleVoltar}
                  onClose={() => setShowContacto(false)}
                />
              )}
              {showFotos && <ModificarFotos handleVoltar={handleVoltar} />}
              {!showModificar && !showContacto && !showFotos && (
                <div className="text-center text-gray-400">
                  Selecione uma opção no menu para modificar as suas informações.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
    </div>
  );
};

export default MinhaConta;
