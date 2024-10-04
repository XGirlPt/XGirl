"use client";
import { useEffect, useState } from "react";
import { IoInformationCircle } from "react-icons/io5";
import FotoBig from "@/components/Profile/FotoBig";
import Liga from "@/components/Profile/Liga";
import Partilha from "@/components/Profile/Partilha";
import Certificado from "@/components/Certificado";
import Sobre from "@/components/Profile/Sobre";
import supabase from "@/database/supabase";
import ServicosPrestados from "@/components/Profile/ServicosPrestados";
import Tarifas from "@/components/Profile/Tarifas";
import HeaderG from "@/components/HeaderFilter/HeaderG";
import LeftSide from "@/components/Profile/LeftSide";
import Linguas from "@/components/Profile/idioma";
import { useParams } from "next/navigation";
import { Profile } from "@/types";
import { BlurImage } from "@/components/BlurImage";
import Image from 'next/image';


function UserProfile() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isCertified, setIsCertified] = useState<boolean | null>(null); // Inicialize como null
  const [loading, setLoading] = useState<boolean>(true); // Novo estado de carregamento
  const { profileName } = useParams<{ profileName: string }>();
  const [showLargePhoto, setShowLargePhoto] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showLiga, setShowLiga] = useState(false);
  const [showPartilha, setShowPartilha] = useState(false);
  const [showCertificado, setShowCertificado] = useState(false);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
      .from("ProfilesData")
      .select("*");
      
      if (error) {
        throw error;
      }
      setProfiles(data);
    } catch (error: any) {
      console.error("Erro ao buscar perfis:", error?.message);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true); // Inicia o carregamento
        const { data: profileData, error: profileError } = await supabase
          .from("ProfilesData")
          .select("*")
          .eq("nome", decodeURIComponent(profileName))
          .single();

        if (profileError) {
          throw profileError;
        }

        const { data: photoData, error: photoError } = await supabase
          .from("profilephoto")
          .select("*")
          .eq("userUID", profileData.userUID);

        if (photoError) {
          throw photoError;
        }

        const combinedProfileData = {
          ...profileData,
          photoURL: photoData.map((photo) => photo.imageurl),
        };

        setIsCertified(profileData.certificado); // Atualize o estado com a certificação
        setSelectedProfile(combinedProfileData); // Atualize o perfil selecionado
      } catch (error: any) {
        console.error("Error fetching profile:", error.message);
      } finally {
        setLoading(false); // Encerra o carregamento
      }
    }

    fetchProfile();
  }, [profileName]);

  const handleLigaMeClick = () => setShowLiga(!showLiga);
  const handleCertificadoClick = () => setShowCertificado(!showCertificado);
  const handlePartilhaClick = () => setShowPartilha(!showPartilha);
  const handlePhotoClick = (index: number) => {
    setShowLargePhoto(true);
    setPhotoIndex(index);
  };

  const findProfileIndex = (profileId: number) => {
    return profiles.findIndex((profile) => profile.id === profileId);
  };

  useEffect(() => {
    if (profiles.length > 0 && selectedProfile?.id) {
      setCurrentProfileIndex(findProfileIndex(selectedProfile.id));
    }
  }, [profiles, selectedProfile]);

  useEffect(() => {
    console.log("isCertified state changed:", isCertified);
  }, [isCertified]);

  return (
    <>
      <HeaderG
        setCurrentProfileIndex={setCurrentProfileIndex}
        currentProfileIndex={currentProfileIndex}
        profiles={profiles}
      />
      <div className="container relative">
        <div className="w-screen bg-black md:flex flex-col user-profile">
          <div className="md:flex m-24 mt-10 relative">
            {showLiga && (
              <Liga
                selectedProfile={selectedProfile as any}
                setShowLiga={setShowLiga}
              />
            )}
            {showPartilha && (
              <Partilha
                selectedProfile={selectedProfile as any}
                setShowPartilha={setShowPartilha}
              />
            )}
            {showCertificado && (
              <Certificado
                selectedProfile={selectedProfile as any}
                setShowCertificado={setShowCertificado}
              />
            )}

            <LeftSide
              selectedProfile={selectedProfile as any}
              handleLigaMeClick={handleLigaMeClick}
              handlePartilhaClick={handlePartilhaClick}
            />

            {showLargePhoto && (
              <FotoBig
                selectedProfile={selectedProfile as any}
                onClose={() => setShowLargePhoto(false)}
                currentIndex={photoIndex}
              />
            )}

            <div className="sm:w-full md:w-3/6">
              <div className="grid gap-10 items-center">
                <div className="bg-zinc-900 gap-2 py-6 w-full min-h-[300px] px-10 ml-10 mr-24 border border-zinc-700 rounded-3xl">
                  <div className="flex mb-6">
                    <p className="text-pink-800 text-2xl mb-2">
                      Fotografias de {selectedProfile?.nome}
                    </p>

                    {loading ? (
                      <div className="ml-4 p-2 rounded-md flex h-8 items-center cursor-pointer bg-zinc-700">
                        <p className="text-white">Carregando...</p>
                      </div>
                    ) : isCertified === null ? (
                      <div className="ml-4 p-2 rounded-md flex h-8 items-center cursor-pointer bg-zinc-700">
                        <p className="text-white">Carregando...</p>
                      </div>
                    ) : (
                      <div
                        className={`ml-4 p-2 rounded-md flex h-8 items-center cursor-pointer ${
                          isCertified ? "bg-green-700 hover:opacity-80" : "bg-red-700 hover:opacity-80"
                        }`}
                      >
                        <p
                          className="text-white"
                          onClick={handleCertificadoClick}
                        >
                          {isCertified ? "Certificado" : "Não Certificado"}
                        </p>
                        <p>
                          <IoInformationCircle
                            size={26}
                            className="text-white ml-2"
                          />
                        </p>
                      </div>
                    )}
                  </div>
                  {selectedProfile &&
                    selectedProfile.photoURL &&
                    (Array.isArray(selectedProfile.photoURL) &&
                    selectedProfile.photoURL.length > 0 ? (
                      <div className="grid grid-cols-3  gap-2">
                        {selectedProfile.photoURL.map((media, index) =>
                          media.endsWith(".mp4", ".mov" as any) ? ( // Verifica se o arquivo é um vídeo
                            <video
                              key={index}
                              autoPlay
                              controlsList="nodownload"
                              onMouseOver={(e) => e.stopPropagation()}
                              className="w-auto h-48 rounded-2xl border border-zinc-500"
                            >
                              <source
                                src={media}
                                type={
                                  media.endsWith(".mp4")
                                    ? "video/mp4"
                                    : media.endsWith(".webm")
                                    ? "video/webm"
                                    : "video/ogg"
                                }
                              />
                              Seu navegador não suporta o elemento de vídeo.
                            </video>
                          ) : (
                            // Se não for um vídeo, trata-se de uma imagem
                            <Image
      key={index}
      src={media}
      alt={`Foto ${index + 1}`}
      className="w-40 h-auto object-cover cursor-pointer rounded-2xl border border-zinc-500 transition-opacity duration-100 ease-in-out hover:opacity-75 hover:scale-110 "
      onClick={() => handlePhotoClick(index)}
      width={160} // Ajuste o valor de largura conforme necessário
      height={120} // Ajuste o valor de altura conforme necessário
    />
                          )
                        )}
                      
                      </div>
                    ) : (
                      <BlurImage
                        src={selectedProfile.photoURL[0]}
                        alt={selectedProfile.nome}
                        className="w-full h-96 object-cover rounded-2xl border border-zinc-500"
                      />
                    ))}
                </div>

                <Sobre selectedProfile={selectedProfile as any} />

                <ServicosPrestados selectedProfile={selectedProfile} />

                <div className="bg-zinc-900 grid gap-2 py-6 w-full px-10 mx-10 border border-zinc-700 rounded-3xl">
                  <p className="text-pink-800 text-2xl">Descrição</p>
                  <div className="gap-4 mt-6">
                    <div
                      className="text-white "
                      style={{ textAlign: "justify" }}
                      dangerouslySetInnerHTML={{
                        __html: selectedProfile?.description as any,
                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-4 w-full rounded-md mx-10">
                  <Linguas selectedProfile={selectedProfile as any} />
                  <Tarifas selectedProfile={selectedProfile as any} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
