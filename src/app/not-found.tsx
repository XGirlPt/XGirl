// app/not-found.tsx
import React from 'react';
import Link from 'next/link';
import { BiErrorCircle } from 'react-icons/bi'; // Ícone de erro

const NotFound: React.FC = () => {
  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center px-4 pb-20">
      <div className="bg-gray-800 w-full max-w-lg rounded-lg border border-gray-700 px-8 py-12 space-y-8">
        
        {/* Ícone de erro */}
        <div className="flex justify-center">
          <BiErrorCircle className="text-pink-600 text-6xl mb-4" />
        </div>
        
        {/* Título de erro */}
        <h1 className="text-6xl font-bold text-center text-pink-600 mb-4">
          404
        </h1>
        
        {/* Texto explicativo */}
        <p className="text-2xl text-center text-gray-400 mb-6">
          Página não encontrada
        </p>
        <p className="text-center text-gray-500 mb-8">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>

        {/* Link para voltar */}
        <div className="text-center">
          <Link href="/">
            <p className="text-lg text-pink-600 hover:text-pink-700 cursor-pointer font-semibold">
              Voltar para a página inicial
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
