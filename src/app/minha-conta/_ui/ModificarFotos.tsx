/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import supabase from "@/database/supabase";
import { IoTrashBin } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { updatePhotos } from "@/actions/ProfileActions";
import { createCanvas, loadImage } from "canvas"; // Importe createCanvas e loadImage usando 'import'
import watermarkImage from "../../../../public/logo.png"; // Importe a imagem da marca d'água
import Link from "next/link";
import { BlurImage } from "@/components/BlurImage";

interface ModificarFotosProps {
  handleVoltar: () => void;
  handleGuardar: () => void;
}

async function addWatermark(
  imagePath: string,
  outputFormat: string,
  scale = 0.2
): Promise<string> {
  // scale parameter with default value
  try {
    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    const watermark = await loadImage(watermarkImage.src);

    // Redimensionar a marca d'água
    const watermarkWidth = watermark.width * scale;
    const watermarkHeight = watermark.height * scale;

    // Calcular a posição para centralizar a marca d'água redimensionada
    const x = (image.width - watermarkWidth) / 2;
    const y = (image.height - watermarkHeight) / 2;

    const opacity = 0.4; // Definir opacidade
    ctx.globalAlpha = opacity;

    // Desenhar a marca d'água redimensionada
    ctx.drawImage(watermark, x, y, watermarkWidth, watermarkHeight);

    return canvas.toDataURL(`image/${outputFormat}` as any);
  } catch (error: any) {
    throw new Error("Erro ao adicionar marca d'água: " + error.message);
  }
}

const ModificarFotos: React.FC<ModificarFotosProps> = ({ handleVoltar, handleGuardar }) => {
  const dispatch = useDispatch();
  const photoURLsRedux = useSelector(
    (state: any) => state.profile?.profile.photos
  );
  const userUID = useSelector((state: any) => state.profile?.profile.userUID);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  useEffect(() => {
    setSelectedPhotos(photoURLsRedux || []);
  }, [photoURLsRedux]);

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      const selected = files.slice(0, 10);
      const uploadedPhotoURLs: string[] = [];

      const uploadPromises = selected.map(async (file) => {
        const filePath = `${userUID}/${file.name
          .toLowerCase()
          .replace(/ /g, "_")
          .replace(/\./g, "_")}`;

        console.log("filePath", filePath);
        try {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          await new Promise<void>((resolve) => {
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
              console.log(data, error);
              if (error) throw new Error(error.message);

              const publicURLFoto = `https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/profileFoto/${filePath}`;
              uploadedPhotoURLs.push(publicURLFoto);

              resolve();
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
  }

  const handleDeletePhoto = async (index: number) => {
    try {
      const updatedPhotosArray = [...selectedPhotos];
      if (updatedPhotosArray[index]) {
        const photoURLToDelete = updatedPhotosArray[index];
        const fileName = photoURLToDelete.split("/").pop();
        const filePath = `profileFoto/${userUID}/${fileName}`;

        const { error: storageError } = await supabase.storage
          .from("profileFoto")
          .remove([filePath]);
        if (storageError)
          throw new Error(
            "Erro ao remover foto do storage: " + storageError.message
          );

        const { error: dbError } = await supabase
          .from("profilephoto")
          .delete()
          .match({ imageurl: photoURLToDelete, userUID });
        if (dbError)
          throw new Error("Erro ao remover foto da tabela: " + dbError.message);

        updatedPhotosArray.splice(index, 1);
        setSelectedPhotos(updatedPhotosArray);
        dispatch(updatePhotos(updatedPhotosArray));

        console.log(
          "Foto excluída com sucesso do storage e da tabela:",
          photoURLToDelete
        );
      } else {
        console.error("A foto não existe no índice especificado.");
      }
    } catch (error: any) {
      console.error("Erro ao excluir foto:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 backdrop-blur-md">
      <div className="bg-[#2A2D32] h-4/5 mt-16 mb-16 border border-zinc-600 rounded-3xl max-w-screen-lg shadow-2xl w-full overflow-y-auto">
        <div className="p-10">
          <h2 className="text-4xl text-pink-600 mb-4 font-bold text-center">Gerir Fotos</h2>
          <p className="text-gray-400 mb-6 text-center">Podes adicionar até 10 Fotos</p>
  
          <div className="flex justify-center mb-8">
            <label
              htmlFor="upload-photo"
              className="text-white bg-green-500 px-6 py-3 rounded-full shadow-lg transition duration-300 hover:bg-green-400 hover:shadow-xl flex items-center space-x-2 cursor-pointer"
            >
              <span>+ Adicionar Fotos...</span>
              <input
                type="file"
                id="upload-photo"
                style={{ display: "none" }}
                onChange={handleFileUpload}
                multiple
              />
            </label>
            <Link
              href="/registo-contacto"
              className="text-white bg-gray-600 px-6 py-3 rounded-full shadow-lg transition duration-300 hover:bg-gray-500 hover:shadow-xl flex items-center space-x-2 ml-4"
            >
              <span>? Regras</span>
            </Link>
          </div>
  
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.isArray(selectedPhotos) &&
              selectedPhotos.map((photoURL, index) => (
                <div key={index} className="relative group rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                  <IoTrashBin
                    size={26}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 cursor-pointer text-white bg-red-600 rounded-full p-1 transition-opacity duration-300"
                    onClick={() => handleDeletePhoto(index)}
                  />
                  <BlurImage
                    src={photoURL}
                    alt={`Foto ${index}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-600"
                  />
                </div>
              ))}
          </div>
        </div>
  
        <div className="flex justify-between items-center px-8 py-4 bg-[#2A2D32] rounded-b-3xl">
          <button
            className="text-white bg-gray-600 px-8 py-3 rounded-full shadow-lg transition duration-300 hover:bg-gray-500 flex items-center space-x-2"
            onClick={handleVoltar}
          >
            <span>Voltar</span>
          </button>
          <button
            className="text-white bg-pink-600 px-8 py-3 rounded-full shadow-lg transition duration-300 hover:bg-pink-500 flex items-center space-x-2"
            onClick={handleFileUpload}
          >
            <span>Guardar</span>
          </button>
        </div>
      </div>
    </div>
  );
  
  
  

};

export default ModificarFotos;
