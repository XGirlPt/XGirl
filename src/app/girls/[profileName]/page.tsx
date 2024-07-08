/* eslint-disable @next/next/no-img-element */
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
import { useSelector, useDispatch } from "react-redux";
import LeftSide from "@/components/Profile/LeftSide";
import Linguas from "@/components/Profile/idioma";
import sanitizeHtml from "sanitize-html";
import { useParams } from "next/navigation";
import { Profile } from "@/types";
import { BlurImage } from "@/components/BlurImage";

function UserProfile() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]); // Store all profiles
  const { profileName } = useParams<{ profileName: string }>();
  const [showLargePhoto, setShowLargePhoto] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showLiga, setShowLiga] = useState(false);
  const [showPartilha, setShowPartilha] = useState(false);
  const [showCertificado, setShowCertificado] = useState(false);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase.from("ProfilesData").select("*");
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
        // Fetch dos dados do perfil
        const { data: profileData, error: profileError } = await supabase
          .from("ProfilesData")
          .select("*")
          .eq("nome", decodeURIComponent(profileName))
          .single();

        if (profileError) {
          throw profileError;
        }

        // Fetch das fotos do perfil da tabela profilephoto
        const { data: photoData, error: photoError } = await supabase
          .from("profilephoto")
          .select("*")
          .eq("userUID", profileData.userUID);

        if (photoError) {
          throw photoError;
        }

        // Combine os dados do perfil com os dados das fotos
        const combinedProfileData = {
          ...profileData,
          photoURL: photoData.map((photo) => photo.imageurl),
        };

        setSelectedProfile(combinedProfileData);
      } catch (error: any) {
        console.error("Error fetching profile:", error.message);
      }
    }

    fetchProfile();
  }, [profileName]);

  const handleLigaMeClick = () => {
    setShowLiga(!showLiga); // Alternar o estado entre true e false
  };

  const handleCertificadoClick = () => {
    setShowCertificado(!showCertificado); // Alternar o estado entre true e false
  };

  const handlePartilhaClick = () => {
    setShowPartilha(!showPartilha);
  };

  const handlePhotoClick = (index: number) => {
    // Recebendo o índice da foto como parâmetro
    setShowLargePhoto(true);
    setPhotoIndex(index); // Atualizando o estado do índice da foto
  };

  const findProfileIndex = (profileId: number) => {
    return profiles.findIndex((profile) => profile.id === profileId);
  };

  useEffect(() => {
    if (profiles.length > 0) {
      setCurrentProfileIndex(findProfileIndex(selectedProfile?.id as any));
    }
  }, [profiles, selectedProfile]);

  console.log(selectedProfile);

  return (
    <>
      <HeaderG
        setCurrentProfileIndex={setCurrentProfileIndex}
        currentProfileIndex={currentProfileIndex}
        profiles={profiles}
      />
      <div className="container relative">
        <div className=" h-full bg-[#1b1b1b] md:flex flex-col user-profile">
          <div className="md:flex mx-36 mt-10 relative">
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

            <div className="sm:w-full md:w-2/3 ">
              {/* Conteúdo da parte direita aqui */}
              <div className="grid gap-10 items-center">
                {/* FOTOS  */}
                <div className="bg-[#1E2427]    gap-2 py-6 w-full min-h-[600px] px-10 mx-10 border  border-gray-600  rounded-3xl">
                  <div className="flex mb-6">
                    <p className="text-pink-800  text-2xl mb-2">
                      {" "}
                      Fotografias reais{" "}
                    </p>

                    <div className="ml-4 p-2 rounded-md flex h-8 items-center cursor-pointer bg-green-600 hover:opacity-80 ">
                      <p
                        className=" text-white"
                        onClick={handleCertificadoClick}
                      >
                        {" "}
                        Certificado{" "}
                      </p>
                      <p>
                        {" "}
                        <IoInformationCircle
                          size={26}
                          className="text-white bg-green-600 ml-2"
                        />
                      </p>
                    </div>
                  </div>
                  {selectedProfile &&
                    selectedProfile.photoURL &&
                    (Array.isArray(selectedProfile.photoURL) &&
                    selectedProfile.photoURL.length > 0 ? (
                      <div className="grid grid-cols-3  gap-6">
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
                            <img
                              key={index}
                              src={media}
                              alt={`Foto ${index + 1}`}
                              className="w-40 h-auto object-cover cursor-pointer rounded-2xl border border-zinc-500 transition-opacity duration-100 ease-in-out hover:opacity-75 hover:scale-110 blur-2xl"
                              onClick={() => handlePhotoClick(index)}
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

                {/* Descricao */}
                <div className="bg-[#1E2427] grid gap-2 py-6 w-full px-10 mx-10 border border-gray-600  rounded-3xl">
                  <p className="text-pink-800 text-2xl">Descrição</p>
                  <div className=" gap-4 mt-6">
                    <div
                      className="text-white "
                      style={{ textAlign: "justify" }}
                      dangerouslySetInnerHTML={{
                        __html: selectedProfile?.description as any,
                      }}
                    />
                  </div>
                </div>

                {/* END DESCRICAO */}

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
