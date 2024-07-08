"use client";
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaMapMarkerAlt } from "react-icons/fa";
import supabase from "@/database/supabase";
import Header from "@/components/Header";
import HeaderLoged from "@/components/Register/HeaderLoged";
import ModificarPerfil from "./_ui/ModificarPerfil";
import ModificarContacto from "./_ui/ModificarContacto";
import ModificarFotos from "./_ui/ModificarFotos";
import { BlurImage } from "@/components/BlurImage";

interface MinhaContaProps {}

const MinhaConta: React.FC<MinhaContaProps> = () => {
  const [showModificar, setShowModificar] = useState(false);
  const [showContacto, setShowContacto] = useState(false);
  const [showFotos, setShowFotos] = useState(false);

  const userEmailRedux = useSelector(
    (state: any) => state.profile?.user?.user?.email
  );
  const cidadeRedux = useSelector(
    (state: any) => state.profile?.profile?.cidade
  );
  const nomeRedux = useSelector((state: any) => state.profile?.profile?.nome);
  const photoURLsRedux = useSelector(
    (state: any) => state.profile?.profile?.photos
  );

  const [nome, setNome] = useState<string | undefined>(nomeRedux);

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
        console.log(
          "Sessão não iniciada ou erro ao verificar a sessão:",
          error
        );
      } else {
        console.log("Sessão iniciada:", session);
        console.log("Usuário:", session.user);
      }
    };

    getSession();
  }, []);

  return (
    <div className="text-gray-600 bg-[#1b1b1b] flex flex-col min-h-screen pb-10">
      <HeaderLoged />
      <div className="mx-10">
        <div className="flex-1">
          <p className="text-3xl text-white">O Meu Perfil</p>
        </div>
      </div>
      <div className="mx-10">
        <div className="bg-[#1E2427] mb-10 grid gap-2 py-6 w-1/2 px-10 border mt-6 border-gray-600 rounded-md mx-auto">
          <p className="mb-2 text-white text-lg">
            Valida o teu email {userEmailRedux} para continuares a receber
            notificações
          </p>
          <div className="py-2 px-2 mt-4 bg-pink-800 hover:bg-pink-900 text-white cursor pointer rounded-md w-64 flex items-center align-middle cursor-pointer justify-center">
            Enviar email de Verificação
          </div>
        </div>
      </div>
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
      <div className="mx-10">
        <div className="bg-[#1E2427] grid w-1/2 border mt-2 border-gray-600 rounded-md mx-auto">
          <div className="flex py-2 bg-red-400 text-white px-4 rounded-t-md justify-center">
            Perfil Expira Brevemente
          </div>
          <div className="flex h-56 border border-gray-600">
            <div className="w-1/4 relative">
              {photoURLsRedux?.length > 0 && (
                <BlurImage
                  src={photoURLsRedux[0]}
                  alt={`Foto de ${nomeRedux}`}
                  className="w-full h-full object-cover "
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-2 text-white">
                <p className="text-xl font-bold flex justify-center">
                  {nomeRedux}
                </p>
                <p className="text-md flex items-center align-middle justify-center">
                  <FaMapMarkerAlt size={12} className="text-pink-800 mr-1" />{" "}
                  {cidadeRedux}
                </p>
              </div>
            </div>
            <div className="w-3/4 flex flex-col">
              <div
                className="h-1/4 border border-gray-600 pl-4 flex items-center hover:bg-pink-800 cursor-pointer"
                onClick={handleModificar}
              >
                <p className="text-white">O Meu Perfil - Informações Gerais</p>
              </div>
              <div
                className="h-1/4 border border-gray-600 pl-4 flex items-center hover:bg-pink-800 cursor-pointer"
                onClick={handleContacto}
              >
                <p className="text-white">O Meu Perfil - Outras Informações</p>
              </div>
              <div
                className="h-1/4 border border-gray-600 pl-4 flex items-center hover:bg-pink-800 cursor-pointer"
                onClick={handleFotos}
              >
                <p className="text-white">Gerir as minhas Fotos</p>
              </div>
              <div className="h-1/4 border border-gray-600 pl-4 flex items-center hover:bg-pink-800 cursor-pointer">
                <p className="text-white">Apagar o Meu Perfil</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinhaConta;
