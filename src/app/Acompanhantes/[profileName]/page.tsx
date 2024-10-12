"use client";
import { useEffect, useState } from "react";
import { IoInformationCircle } from "react-icons/io5";
import FotoBig from "@/components/Profile/FotoBig";
import StoryBig from "@/components/Profile/StoryBig";

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
  const [showLargeStory, setShowLargeStory] = useState(false);

  const [photoIndex, setPhotoIndex] = useState(0);
  const [StoryIndex, setStoryIndex] = useState(0);


  const [showLiga, setShowLiga] = useState(false);
  const [showPartilha, setShowPartilha] = useState(false);
  const [showCertificado, setShowCertificado] = useState(false);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  const [thumbnails, setThumbnails] = useState<string[]>([]);



  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
      .from("ProfilesData")
      .select("*")
      .eq('status', true);
      
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
          .eq("userUID", profileData.userUID)
         
  
        if (photoError) {
          throw photoError;
        }
  
        // Log dos dados de fotos recebidos para inspecionar
        console.log("Dados de fotos recebidos do Supabase:", photoData);
  
        const photoURLs = photoData.map((photo) => photo.imageurl);
        console.log("URLs das fotos mapeadas:", photoURLs);
    

  
        // Log dos dados combinados (perfil + fotos)
  

        const { data: storyData, error: storyError } = await supabase
        .from("stories")
        .select("*")
        .eq("userUID", profileData.userUID)
       

      if (storyError) {
        throw storyError;
      }

      const storyURL = storyData.map((story) => story.storyurl);
      console.log("URLs dos stories mapeadas:", storyURL);

      
      const combinedProfileData = {
        ...profileData,
        photoURL: photoData.map((photo) => photo.imageurl) || [], // Garante que seja sempre um array
        storyURL: storyData?.map((story)=> story.storyurl) || []
      };


        setIsCertified(profileData.certificado); // Atualize o estado com a certificação
        setSelectedProfile(combinedProfileData); // Atualize o perfil selecionado
      } catch (error: any) {
        console.error("Erro ao buscar perfil:", error.message);
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
  const handleStoryClick = (index: number) => {
    setShowLargeStory(true);
    setStoryIndex(index);
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
    // console.log("isCertified state changed:", isCertified);
  }, [isCertified]);

  console.log("Story URLs:", selectedProfile?.storyURL);
  console.log("Foto URLs:", selectedProfile?.photoURL);
  console.log("Selected Profile:", selectedProfile);

  const getVideoThumbnail = async (videoSrc: string): Promise<string | null> => {
    return new Promise((resolve) => {
        const video = document.createElement("video");
        video.src = videoSrc;
        video.currentTime = 1; // Pega um frame no primeiro segundo

        video.addEventListener("loadeddata", () => {
            const canvas = document.createElement("canvas");
            canvas.width = 160; // Defina a largura do thumbnail
            canvas.height = 90;  // Defina a altura do thumbnail
            const ctx = canvas.getContext("2d");

            if (ctx) {
                // Desenhe o frame do vídeo no canvas
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const thumbnail = canvas.toDataURL("image/jpeg");
                resolve(thumbnail);  // Retorna o thumbnail gerado
            } else {
                resolve(null);
            }
        });

        video.addEventListener("error", () => {
            resolve(null); // Retorna null em caso de erro
        });

        video.load(); // Carrega o vídeo
    });
    
};

useEffect(() => {
    const fetchThumbnails = async () => {
        if (selectedProfile && selectedProfile.storyURL) {
            const thmbs = await Promise.all(
                selectedProfile.storyURL.map(async (media: string) => {
                    console.log(`Processing media: ${media}`);
                    
                    try {
                        if (media.endsWith(".mp4") || media.endsWith(".mov") || media.endsWith(".webm")) {
                            const thumbnail = await getVideoThumbnail(media);
                            console.log(`Thumbnail generated for: ${media}`);
                            return thumbnail;
                        } else {
                            console.log(`Skipping non-video media: ${media}`);
                            return null; // Ignorar se não for vídeo

                        }
                    } catch (error) {
                        console.error(`Error generating thumbnail for media: ${media}`, error);
                        return null;
                    }
                })
            );

            const validThumbnails = thmbs.filter((thumbnail): thumbnail is string => thumbnail !== null);
            setThumbnails(validThumbnails);
        }
    };

    fetchThumbnails();
}, [selectedProfile]);





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

{showLargeStory && (
              <StoryBig
                selectedProfile={selectedProfile as any}
                onClose={() => setShowLargeStory(false)}
                currentIndex={photoIndex}
              />
            )}

            <div className="sm:w-full md:w-3/6">



              <div className="grid gap-10 items-center">

              <div className="flex flex-col mb-8">
  <p className="text-pink-800 text-2xl mb-4 font-semibold">
    Stories de {selectedProfile?.nome}
  </p>
  {selectedProfile && selectedProfile.storyURL && selectedProfile.storyURL.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
      {selectedProfile.storyURL.map((media, index) => {
        if (!media) {
          return null;
        }

        const isVideo = media.endsWith(".mp4") || media.endsWith(".mov") || media.endsWith(".webm");
        const thumbnailSrc = thumbnails[index] || '/placeholder.jpg';

        return (
          <div key={index} className="relative">
            {isVideo ? (
              <div>
                {/* Exibe o thumbnail do vídeo */}
                <video
                  src={thumbnailSrc}
                  alt={`Thumbnail ${index + 1}`}
                  className="rounded-2xl border border-zinc-500 shadow-md transition-transform duration-200 ease-in-out hover:scale-105"
                  onClick={() => handleStoryClick(index)}
                  width={300}
                  height={200}
                  priority={index === 0}
                />
                {/* Ícone de "play" */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-3xl">▶️</span>
                </div>
              </div>
            ) : (
              <Image
                src={media}
                alt={`Story ${index + 1}`}
                className="rounded-2xl border border-zinc-500 shadow-md transition-transform duration-200 ease-in-out hover:scale-105"
                onClick={() => handleStoryClick(index)}
                width={300}
                height={200}
                priority={index === 0}
              />
            )}
          </div>
        );
      })}
    </div>
  ) : null} {/* Não renderiza nada se não houver stories */}
</div>




              <div className="bg-zinc-900 gap-6 py-8 w-full min-h-[300px] px-10 ml-10 mr-24 border border-zinc-700 rounded-3xl shadow-lg">
  

  <div className="flex flex-col mb-8">
    <p className="text-pink-800 text-2xl mb-4 font-semibold">
      Fotografias de {selectedProfile?.nome}
    </p>

    {loading || isCertified === null ? (
      <div className="ml-4 p-2 rounded-md flex h-8 items-center cursor-pointer bg-zinc-700">
        <p className="text-white">Carregando...</p>
      </div>
    ) : (
      <div
        className={`ml-4 p-2 rounded-md flex h-8 items-center cursor-pointer ${
          isCertified ? "bg-green-700 hover:opacity-80" : "bg-red-700 hover:opacity-80"
        }`}
      >
        <p className="text-white" onClick={handleCertificadoClick}>
          {isCertified ? "Certificado" : "Não Certificado"}
        </p>
        <IoInformationCircle size={26} className="text-white ml-2" />
      </div>
    )}
  </div>

  {selectedProfile && selectedProfile.photoURL && selectedProfile.photoURL.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {selectedProfile.photoURL.map((media, index) => {
    const isVideo = media.endsWith(".mp4") || media.endsWith(".mov") || media.endsWith(".webm");

    return isVideo ? (
      <video
        key={index}
        autoPlay
        controlsList="nodownload"
        className="rounded-2xl border border-zinc-500 shadow-md transition-transform duration-200 ease-in-out hover:scale-105"
      >
        <source
          src={media}
          type={media.endsWith(".mp4") ? "video/mp4" : media.endsWith(".webm") ? "video/webm" : "video/ogg"}
        />
        Seu navegador não suporta o elemento de vídeo.
      </video>
    ) : (
      <Image
        key={index}
        src={media}
        alt={`Foto ${index + 1}`}
        className="w-full h-48 object-cover cursor-pointer rounded-2xl border border-zinc-500 shadow-md transition-opacity duration-200 ease-in-out hover:opacity-75 hover:scale-105"
        onClick={() => handlePhotoClick(index)}
        width={160}
        height={120}
      />
    );
  })}
</div>

  ) : (
    <BlurImage
      src={selectedProfile?.photoURL?.[0] || "/placeholder.jpg"}
      alt={selectedProfile?.nome || "Placeholder"}
      className="w-full h-96 object-cover rounded-2xl border border-zinc-500 shadow-md"
    />
  )}
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
