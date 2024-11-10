"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const InfoCard: React.FC = () => {

  return (
    <div className="bg-gray-900  w-full rounded-xl h-full mb-2 flex justify-center">
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <div className="flex flex-col h-72 justify-center items-center w-full sm:w-80 md:w-82">
          <div className="rounded-lg shadow-lg bg-gray-900 dark:bg-gray-800  p-4 border border-gray-600 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl">
            <p className="font-bold text-2xl mb-4 text-white">2103 Utilizadores</p>
            <p className="font-medium text-gray-300 mb-6 text-sm text-center">
              Descobre escorts de TOP, massagistas e outros serviços na tua zona
            </p>
            <Link href="/girls">
              <p className="text-md text-white bg-pink-800 px-8 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-pink-700 ease-in-out">
                Ver Anúncios
              </p>
            </Link>
          </div>
        </div>
  
        {/* Cartão de Visitas Diárias */}
        <div className="flex flex-col h-72 justify-center items-center w-full sm:w-80 md:w-82">
        <div className="rounded-lg shadow-lg bg-gray-900 dark:bg-gray-800  p-4 border border-gray-600 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl">
        <p className="font-bold text-2xl mb-4 text-white">+ 5000 Visitas Diárias</p>
            <p className="font-medium text-gray-300 mb-6 text-sm text-center">
              Descobre os últimos comentários postados sobre escorts na tua região
            </p>
            <Link href="/girls">
              <p className="text-md text-white bg-pink-800 px-8 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-pink-700 ease-in-out">
                Ver Anúncios
              </p>
            </Link>
          </div>
        </div>
  
        {/* Cartão de Publicação de Anúncio */}
        <div className="flex flex-col h-72 justify-center items-center w-full sm:w-80 md:w-82">
        <div className="rounded-lg shadow-lg bg-gray-900 dark:bg-gray-800  p-4 border border-gray-600 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl">
            <p className="font-bold text-2xl mb-4 text-white">Publica o teu anúncio</p>
            <p className="font-medium text-gray-300 mb-6 text-sm text-center">
              Publica o teu anúncio gratuitamente em O Teu Desejo. Site erótico n1 em Portugal
            </p>
            <Link href="/regista">
              <p className="text-md text-white bg-pink-800 px-8 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-pink-700 ease-in-out">
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
