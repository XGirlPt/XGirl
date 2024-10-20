/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { useState } from "react";

interface Profile {
  nome: string;
  cidade: string;
  photos: string[]; // Array de fotos
  stories: string[]; // Array de stories
  tag: string;
  tagtimestamp: string;
  
  photoURL: string[]; // Array de fotos

}

interface StoryBigSProps {
  profiles: Profile[];
}


const StoryBigS: React.FC<StoryBigSProps> = ({
 
  cidade,
  story,
  photos,
  nome,
  photoURL,
  onClose,
}) => {
  // Logs para depuração
  console.log("Dados do perfil:", profiles);
  console.log("photoURL recebido:", photoURL);  
  
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const dispatch = useDispatch();


  // Função para verificar se a URL é de vídeo ou imagem
  const isVideo = (url?: string) => {
    return url ? url.match(/\.(mp4|webm|ogg|mov)$/i) : false;
  };

  // Logs para depuração
  console.log("src", story);
  console.log("cidade", cidade);
  console.log("photos", photos);
  console.log("nome", nome);
  console.log("photos bigS", photos[0]); 
  console.log("profile", profile);
  console.log("photoURL", {photoURL});


  const firstPhotos = profiles
  .filter((profile) => profile.stories && profile.stories.length > 0)
  .map((profile) => (profile.photos && profile.photos.length > 0 ? profile.photos[0] : null));

console.log("Primeiras fotos dos perfis", firstPhotos); 



  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50 backdrop-blur-md">
      <div className="flex">
        {/* Exibe a imagem do avatar no canto superior */}
        <div className="absolute top-4 left-4 w-12 h-12 rounded-full border-2 border-yellow-500 overflow-hidden">
          {/* Verifica se a foto está disponível antes de renderizar */}
          {profile.photoURL && profile.photoURL.length > 0 ? (
            <img
              src={profile.photoURL[0]} // Acesse a primeira URL de photoURL
              alt={profile.nome}
              className="w-full h-48 md:h-64 object-cover transition duration-500 ease-in-out transform hover:scale-110 hover:opacity-60"
            />
          ) : (
            <div className="w-full h-full bg-gray-400" /> // Placeholder se não houver foto
          )}
        </div>

        {/* Nome e cidade ao lado da imagem do avatar */}
        <div className="absolute top-4 left-20 flex flex-col justify-center ml-3">
          <span className="text-white font-bold">{nome || 'Nome Indisponível'}</span>
          <span className="text-gray-300">{cidade || 'Cidade Indisponível'}</span>
        </div>
      </div>

      <div className="relative">
        <video
          src={story || ""}
          controls
          autoPlay
          muted
          crossOrigin="anonymous"
          onLoadedData={() => console.log("Vídeo carregado com sucesso")}
          onError={(e) => console.log("Erro ao carregar o vídeo", e)}
          className="max-w-[80vw] max-h-[80vh] transition-opacity duration-900 ease-in-out rounded-2xl"
        />
        {/* Botão fixo dentro do vídeo */}
        <button className="absolute bottom-24 right-2 transform -translate-x-1/2 bg-pink-800 text-white font-bold py-2 px-4 rounded">
          Ver Perfil
        </button>
      </div>

      <button className="text-bold font-bold" onClick={onClose}>
        <ImCross
          size={16}
          className="absolute top-0 right-10 mt-10 text-white text-2xl hover:text-pink-800"
        />
      </button>
    </div>
  );
};

export default StoryBigS;
