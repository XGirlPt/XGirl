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

const ModificarFotos: React.FC<ModificarFotosProps> = ({ handleVoltar }) => {
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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-75 backdrop-blur-md">
      <div className="bg-[#1E2427] h-4/5 mt-32 mb-32 border border-zinc-600 rounded-xl max-w-screen-lg shadow-md w-full overflow-y-scroll">
        <div className="p-8">
          <div className="mb-8 border border-gray-500 p-8">
            <p className="text-2xl text-pink-800 mb-2">Fotos</p>
            <p className="text-white mb-4">Podes adicionar até 10 Fotos</p>
            <div className="mb-8">
              <label
                htmlFor="upload-photo"
                className="inline-block text-white bg-green-600 px-4 py-2 rounded-md cursor-pointer"
              >
                + Adicionar Fotos...
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
                className="inline-block ml-4 text-white bg-gray-400 px-4 py-2 rounded-md cursor-pointer"
              >
                ? Regras
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-10">
              {Array.isArray(selectedPhotos) &&
                selectedPhotos.map((photoURL, index) => (
                  <div key={index} className="relative">
                    <IoTrashBin
                      size={24}
                      className="absolute top-0 right-0 cursor-pointer text-white bg-gray-600 hover:bg-red-600 p-1"
                      onClick={() => handleDeletePhoto(index)}
                    />
                    <BlurImage
                      src={photoURL}
                      alt={`Foto ${index}`}
                      className="w-full h-24 object-cover rounded-md border border-gray-600 "
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between px-8 pb-8">
          <div className="w-32">
            <p
              className="text-white bg-gray-600 px-4 py-2 rounded-md cursor-pointer"
              onClick={handleVoltar}
            >
              Voltar
            </p>
          </div>
          <div className="w-32">
            <p className="text-white bg-pink-800 px-4 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-pink-900 hover:scale-105">
              Guardar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModificarFotos;
