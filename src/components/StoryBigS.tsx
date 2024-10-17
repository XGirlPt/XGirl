/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ImCross } from "react-icons/im";

interface StoryBigSProps {
  story: string | null; // A prop story é do tipo string ou null
  onClose: () => void;  // Função para fechar o componente
}

const StoryBigS: React.FC<StoryBigSProps> = ({ story, onClose }) => {
  // Função para verificar se a URL é de vídeo ou imagem
  const isVideo = (url?: string) => {
    return url ? url.match(/\.(mp4|webm|ogg|mov)$/i) : false;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50 backdrop-blur-md">
      <div className="relative">
        
          <video
            src={story}
            controls
            autoPlay
            muted
            crossOrigin="anonymous"
            onLoadedData={() => console.log("Video loaded successfully")}
            onError={(e) => console.log("Error loading video", e)}
            className="max-w-[80vw] max-h-[80vh] transition-opacity duration-900 ease-in-out rounded-2xl"
          />
        
       
          <p className="text-white">No story available</p>
       
      </div>
      <button className="text-bold font-bold" onClick={onClose}>
        <ImCross
          size={16}
          className="absolute top-0 right-10 mt-24 text-white text-xl hover:text-pink-800"
        />
      </button>
    </div>
  );
};

export default StoryBigS;
