'use client';

import React, { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { IoTrashBin } from "react-icons/io5";
import supabase from "@/database/supabase";
import { updatePhotos } from "@/actions/ProfileActions";
import Header from "@/components/Header";
import watermarkImage from "../../../public/logo.png"; // Import the watermark image
import { createCanvas, loadImage } from "canvas";
import { BlurImage } from "@/components/BlurImage";

async function addWatermark(
  imagePath: string,
  outputFormat: string,
  scale: number = 0.2
): Promise<string> {
  try {
    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    const watermark = await loadImage(watermarkImage.src);
    const watermarkWidth = watermark.width * scale;
    const watermarkHeight = watermark.height * scale;
    const x = (image.width - watermarkWidth) / 2;
    const y = (image.height - watermarkHeight) / 2;
    ctx.globalAlpha = 0.4;
    ctx.drawImage(watermark, x, y, watermarkWidth, watermarkHeight);

    return canvas.toDataURL(`image/${outputFormat}` as any);
  } catch (error: any) {
    throw new Error("Erro ao adicionar marca d'água: " + error.message);
  }
}

const RegistoFotos: React.FC = () => {
  const dispatch = useDispatch();
  const userUID = useSelector((state: any) => state.profile?.profile.userUID);
  const photosFromRedux = useSelector(
    (state: any) => state.profile.profile.photos || []
  );
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>(photosFromRedux);
  const [verificationPhoto, setVerificationPhoto] = useState<string | null>(null);

  const handleDeletePhoto = (index: number) => {
    const updatedPhotos = [...selectedPhotos];
    updatedPhotos.splice(index, 1);
    setSelectedPhotos(updatedPhotos);
    dispatch(updatePhotos(updatedPhotos));
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files).slice(0, 10);
      const uploadedPhotoURLs: string[] = [];

      const uploadPromises = files.map(async (file) => {
        const filePath = `${userUID}/${file.name
          .toLowerCase()
          .replace(/ /g, "_")
          .replace(/\./g, "_")}`;
        try {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          await new Promise((resolve) => {
            reader.onload = async () => {
              const watermarkedURL = await addWatermark(
                reader.result as string,
                "png",
                0.3
              );
              const watermarkedFile = await fetch(watermarkedURL);
              const blob = await watermarkedFile.blob();
             console.log(blob, "url profile?")
              const { data, error } = await supabase.storage
                .from("profileFoto")
                .upload(filePath, blob);
             
                if (error) throw new Error(error.message);
              const publicURLFoto = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/profileFoto/${filePath}`;
              uploadedPhotoURLs.push(publicURLFoto);
              resolve(true);
            };
          });
        } catch (error: any) {
          console.error("Erro durante o upload:", error.message);
        }
      });

      await Promise.all(uploadPromises);
      const newSelectedPhotos = [...selectedPhotos, ...uploadedPhotoURLs];
      setSelectedPhotos(newSelectedPhotos);
      dispatch(updatePhotos(newSelectedPhotos));
    }
  };

  const handleVerificationPhotoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files).slice(0, 10);
      const uploadedPhotoURLsV: string[] = [];
      
      const uploadPromises = files.map(async (file) => {
        const fileName = file.name
          .toLowerCase()
          .replace(/ /g, "_")
          .replace(/[^a-z0-9_]/g, "") + ".png";
        const filePath = `${userUID}/${fileName}`;
        console.log("Uploading file with path:", filePath);  // Log para depuração
        
        try {
          const { data, error } = await supabase.storage
            .from("verificationFoto")
            .upload(filePath, file);
  
          if (error) throw new Error(error.message);
          
          console.log("Upload realizado com sucesso:", data);
  
          const publicURLFotoV = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/verificationFoto/${filePath}`;
          console.log("URL pública da foto de verificação:", publicURLFotoV); // Log para depuração
          uploadedPhotoURLsV.push(publicURLFotoV);
          setVerificationPhoto(publicURLFotoV); // Atualiza a foto de verificação com a URL pública
        } catch (error: any) {
          console.error("Erro durante o upload:", error.message);
        }
      });
  
      await Promise.all(uploadPromises);
  
      // Fazer algo com uploadedPhotoURLsV, se necessário
    }
  };
  
  return (
    <div className="text-gray-600 pb-20 bg-[#1b1b1b]">
      <div className="h-full bg-[#1b1b1b] px-44">
        
        {/* Título Principal */}
        <div className="w-full pt-2 mb-2">
          <p className="text-pink-800 text-xl mt-8 pb-0 px-6">Cria o teu Perfil de Anunciante</p>
        </div>
  
        {/* Navegação do Processo */}
        <div className="bg-[#1E2427] w-full h-12 mb-2 mt-10 border border-zinc-600 flex rounded-xl">
          <div className="flex justify-around w-full mx-6 items-center">
            {['Perfil', 'Fotos', 'Mensalidade'].map((step, index) => (
              <div key={index} className={`flex ${index === 1 ? 'border-b-2 border-pink-800' : 'border-zinc-500'} pt-3`}>
                <p className={`rounded-full border ${index === 1 ? 'border-pink-800 text-pink-800' : 'border-zinc-500 text-zinc-500'} mr-2 px-2 mb-2`}>{index + 1}</p>
                <p className={`mb-2 ${index === 1 ? 'text-pink-800' : 'text-zinc-500'}`}>{step}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Seção de Fotos de Perfil */}
        <div className="bg-[#1E2427] w-full h-auto mb-10 mt-0 border border-zinc-600 rounded-sm pb-6">
        <div className="px-10 mt-4">
            <p className="text-pink-800 text-2xl">Fotos de Perfil</p>
            <p className="text-white mt-2">Podes adicionar até 10 Fotos</p>
          </div>
  
          <div className="grid grid-cols-5 gap-10 mx-4 px-4 my-8" style={{ height: `calc(12rem + 8px * ${Math.ceil(selectedPhotos.length / 5)})` }}>
            {selectedPhotos.map((photo, index) => (
              <div key={index} className="relative">
                <BlurImage
                  src={photo}
                  alt={`Foto ${index}`}
                  className="w-full h-24 object-cover rounded-md border border-gray-600"
                />
                <IoTrashBin
                  size={24}
                  className="absolute top-0 right-0 cursor-pointer text-white bg-gray-600 hover:bg-red-600 p-1"
                  onClick={() => handleDeletePhoto(index)}
                />
              </div>
            ))}
          </div>
  
          <div className="px-10 flex">
            <label
              htmlFor="upload-photo"
              className="text-md text-white bg-green-600 px-10 py-2 rounded-xl cursor-pointer"
            >
              + Adicionar Fotos de Perfil...
            </label>
            <input
              type="file"
              id="upload-photo"
              style={{ display: "none" }}
              onChange={handleFileUpload}
              multiple
            />
            {/* <Link href="/registo-contacto">
              <p className="text-md text-white bg-gray-400 px-6 py-2 rounded-sm cursor-pointer">? Regras</p>
            </Link> */}
          </div>
        </div>
  
        {/* Seção de Certificação */}
        {/* <div className="bg-[#1E2427] w-full h-full mb-10 mt-0 border border-zinc-600 rounded-xl">
          <div className="px-10 mt-4">
            <Link href="/">
              <p className="text-md text-white bg-pink-800 px-10 py-2 rounded-sm cursor-pointer transition duration-300 hover:bg-pink-600 ease-in-out transform hover:scale-105">
                Certificar o Meu Perfil
              </p>
            </Link>
          </div>
        </div> */}
  
        {/* Seção para Foto de Verificação */}
        <div className="bg-[#1E2427] w-full h-auto mb-10 mt-0 border border-zinc-600 rounded-sm pb-6">
          <div className="px-10 mt-4">
            <p className="text-pink-800 text-2xl">Foto de Verificação</p>
            <p className="text-white mt-2">Adiciona uma foto para verificação</p>
          </div>
  
          <div className="mx-4 px-4 my-8">
            {verificationPhoto && (

<div className="relative">
                <BlurImage
                  src={verificationPhoto}
                  alt="Foto de Verificação"
                  className="w-full h-24 object-cover rounded-md border border-gray-600"
                />
                 <IoTrashBin
                  size={24}
                  className="absolute top-0 right-0 cursor-pointer text-white bg-gray-600 hover:bg-red-600 p-1"
                  
                />
              </div>
              
            )}
           
          </div>
  
          <div className="px-10 mt-4">
            <label
              htmlFor="upload-verification-photo"
              className="text-md text-white bg-green-600 px-10 py-2 rounded-sm cursor-pointer"
            >
              + Adicionar Foto de Verificação...
            </label>
            <input
              type="file"
              id="upload-verification-photo"
              style={{ display: "none" }}
              onChange={handleVerificationPhotoUpload}
            />
          </div>
        </div>
  
        {/* Navegação Inferior */}
        <div className="bg-[#1E2427] w-full h-full mb-10 mt-0 border border-zinc-600 rounded-sm">
          <div className="flex justify-between w-full mb-1 mt-10 my-10 py-6 px-10">
            <Link href="/registo-contacto">
              <p className="text-md text-white bg-zinc-400 px-10 py-2 rounded-md cursor-pointer">Voltar</p>
            </Link>
            <Link href="/registo-pagamento">
              <p className="text-md text-white bg-pink-800 px-10 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-pink-600 ease-in-out transform hover:scale-105">
                Continuar
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}  

export default RegistoFotos;
