'use client';

import React, { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { IoTrashBin } from "react-icons/io5";
import supabase from "@/database/supabase";
import { updatePhotos, updateVPhotos } from "@/actions/ProfileActions";
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
    console.error("Erro ao adicionar marca d'água:", error.message);
    throw new Error("Erro ao adicionar marca d'água: " + error.message);
  }
}

const RegistoFotos: React.FC = () => {
  const dispatch = useDispatch();
  const userUID = useSelector((state: any) => state.profile?.profile.userUID);
  const photosFromRedux = useSelector(
    (state: any) => state.profile.profile.photos || []
  );
  const vphotosFromRedux = useSelector(
    (state: any) => state.profile.profile.vphotos || []
  );

  const [selectedPhotos, setSelectedPhotos] = useState<string[]>(photosFromRedux);
  const [VselectedPhotos, VsetSelectedPhotos] = useState<string[]>(vphotosFromRedux);

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
              const { data, error } = await supabase.storage
                .from("profileFoto")
                .upload(filePath, blob);
             
              if (error) throw new Error(error.message);
              const publicURLFoto = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/profileFoto/${filePath}`;
              uploadedPhotoURLs.push(publicURLFoto);
              console.log("Foto de perfil carregada:", publicURLFoto);
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

  const handleDeleteVerificationPhoto = (index: number) => {
    const updatedVPhotos = [...VselectedPhotos];
    updatedVPhotos.splice(index, 1); // Remove a foto de verificação pelo índice
    VsetSelectedPhotos(updatedVPhotos); // Atualiza o estado local
    dispatch(updateVPhotos(updatedVPhotos)); // Atualiza o estado globalmente usando Redux
    console.log("Foto de verificação removida.");
    
    // Aqui, você pode incluir a lógica para deletar a foto do Supabase se necessário
};

  const handleVerificationPhotoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]; // Apenas uma foto de verificação permitida
      const fileName = file.name
        .toLowerCase()
        .replace(/ /g, "_")
        .replace(/[^a-z0-9_]/g, "") + ".png";
      const filePath = `${userUID}/${fileName}`;
      
      try {
        await new Promise(async (resolve, reject) => {
          const { data, error } = await supabase.storage
            .from("verificationFoto")
            .upload(filePath, file);

          if (error) {
            console.error("Erro durante o upload:", error.message);
            reject(error);
          } else {
            const publicURLFotoV = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/verificationFoto/${filePath}`;
            VsetSelectedPhotos([publicURLFotoV]);
            dispatch(updateVPhotos([publicURLFotoV]));
            console.log("Foto de verificação carregada:", publicURLFotoV);
            resolve(true);
          }
        });
      } catch (error: any) {
        console.error("Erro durante o upload:", error.message);
      }
    }
  };




  return (
    <div className="text-gray-600 pb-20 bg-[#1b1b1b]">
      <div className="h-full bg-[#1b1b1b] px-44">
        
        {/* Título Principal */}
        <div className="w-full pt-2 mb-2">
          <p className="text-pink-800 text-xl mt-8 pb-0 px-6">Cria o teu Perfil de Anunciante</p>
        </div>
  
        {/* Seção de Fotos de Perfil */}
        <div className="bg-[#1E2427] w-full h-auto mb-10 mt-0 border border-zinc-600 rounded-sm pb-6">
          <div className="px-10 mt-4">
            <p className="text-pink-800 text-2xl">Fotos de Perfil</p>
            <p className="text-white mt-2">Podes adicionar até 10 Fotos</p>
          </div>
  
          <div className="grid grid-cols-5 gap-10 mx-4 px-4 my-8">
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
          </div>
        </div>
  

        {/* Seção para Foto de Verificação */}
        <div className="bg-[#1E2427] w-full h-auto mb-10 mt-0 border border-zinc-600 rounded-sm pb-6">
          <div className="px-10 mt-4">
            <p className="text-pink-800 text-2xl">Foto de Verificacao</p>
            <p className="text-white mt-2">Adiciona uma foto de verificacao para obteres um Perfil Certificado </p>
          </div>
  
          <div className="grid grid-cols-5 gap-10 mx-4 px-4 my-8">
            {VselectedPhotos.map((vphoto, index) => (
              <div key={index} className="relative">
                <BlurImage
                  src={vphoto}
                  alt={`Foto ${index}`}
                  className="w-full h-24 object-cover rounded-md border border-gray-600"
                />
                <IoTrashBin
                  size={24}
                  className="absolute top-0 right-0 cursor-pointer text-white bg-gray-600 hover:bg-red-600 p-1"
                  onClick={() => handleDeleteVerificationPhoto()}
                />
              </div>
            ))}
          </div>
  
          <div className="px-10 flex">
            <label
              htmlFor="upload-verification-photo"
              className="text-md text-white bg-green-600 px-10 py-2 rounded-xl cursor-pointer"
            >
              + Adicionar Foto de Verificacao...
            </label>
            <input
              type="file"
              id="upload-verification-photo"
              style={{ display: "none" }}
              onChange={handleVerificationPhotoUpload}
            />
          </div>
        </div>
        <div className="bg-[#1E2427] w-full h-full mb-10 mt-0 border border-zinc-600 rounded-sm">
          <div className="flex justify-between w-full mb-1 mt-10 my-10 py-6 px-10">
            <div className="w-26">
              <Link href="/registo-contacto">
                <p className="text-md text-white bg-zinc-400 px-10 py-2 rounded-md cursor-pointer">
                  Voltar
                </p>
              </Link>
            </div>
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
};

export default RegistoFotos;
