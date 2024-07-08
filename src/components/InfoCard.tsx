"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const InfoCard: React.FC = () => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(
      "(min-width: 600px) and (max-width: 1024px)"
    );

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setShouldRender(!e.matches);
    };

    handleMediaQueryChange(mediaQueryList as any);

    mediaQueryList.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  if (!shouldRender) {
    return null; // Retorna null se o componente não deve ser renderizado
  }

  return (
    <div className="w-full h-full mb-2 flex justify-center">
      <div className="flex-1 flex h-72 justify-center items-center">
        <div className="rounded-lg shadow-md bg-[#1E2427] p-4 m-4 w-full border border-gray-600 flex flex-col justify-center items-center">
          <div>
            <p className="flex justify-center font-bold text-2xl mb-4 text-white">
              2103 Utilizadores
            </p>
            <p className="font-semibold pb-8 pt-3 text-white text-md">
              Descobre escorts de TOP, massagistas e outros serviços na tua zona
            </p>
            <Link href="/girls">
              <p className="text-md text-white bg-pink-800 px-10 py-2 rounded-md justify-center flex mx-16 cursor-pointer transition duration-300 hover:bg-pink-900 ease-in-out transform hover:scale-105">
                Ver Anúncios
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 flex h-72 justify-center items-center">
        <div className="rounded-lg shadow-md bg-[#1E2427] p-4 m-4 w-full border border-gray-600 flex flex-col justify-center items-center">
          <div>
            <p className="flex justify-center font-bold text-2xl mb-4 text-white">
              + 5000 Visitas Diárias
            </p>
            <p className="font-semibold pb-8 pt-3 text-white text-md">
              Descobre os últimos comentários postados sobre escorts na tua
              região
            </p>
            <Link href="/girls">
              <p className="text-md text-white bg-pink-800 px-10 py-2 rounded-md justify-center flex mx-16 cursor-pointer transition duration-300 hover:bg-pink-900 ease-in-out transform hover:scale-105">
                Ver Anúncios
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 flex h-72 justify-center items-center">
        <div className="rounded-lg shadow-md bg-[#1E2427] p-4 m-4 w-full border border-gray-600 flex flex-col justify-center items-center">
          <div>
            <p className="flex justify-center font-bold text-2xl mb-4 text-white">
              Publica o teu anúncio
            </p>
            <p className="font-semibold pb-8 pt-3 text-white text-md">
              Publica o teu anúncio gratuitamente em O Teu Desejo. Site erótico
              n1 em Portugal
            </p>
            <Link href="/regista">
              <p className="text-md text-white bg-pink-800 px-10 py-2 rounded-md justify-center flex mx-16 cursor-pointer transition duration-300 hover:bg-pink-900 ease-in-out transform hover:scale-105">
                Inscreve-te
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
