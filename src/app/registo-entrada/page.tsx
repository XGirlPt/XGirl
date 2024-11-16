"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import supabase from "@/database/supabase";
import { updateNome, updateuserUID, updateIdade, updateTelefone, updateCidade } from "@/actions/ProfileActions";
import Link from "next/link";
import FiltroAltura from "@/components/Filtros/FiltroAltura";
import FiltroCorpo from "@/components/Filtros/FiltroCorpo";
import FiltroMamas from "@/components/Filtros/FiltroMamas";
import FiltroOlhos from "@/components/Filtros/FiltroOlhos";
import FiltroPeito from "@/components/Filtros/FiltroPeito";
import FiltroPelos from "@/components/Filtros/FiltroPelos";
import FiltroTatuagem from "@/components/Filtros/FiltroTatuagem";
import FiltroOrigem from "@/components/Filtros/FiltroOrigem";
import FiltroDistrito from "@/components/Filtros/FiltroDistrito";
import FiltroSigno from "@/components/Filtros/FiltroSigno";
import FiltroTarifa from "@/components/Filtros/FiltroTarifa";

const RegistoEntrada = () => {
  const dispatch = useDispatch();
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");

  const nomeRedux = useSelector((state: any) => state.profile?.profile?.nome);
  const idadeRedux = useSelector((state: any) => state.profile?.profile?.idade);
  const telefoneRedux = useSelector((state: any) => state.profile?.profile?.telefone);
  const cidadeRedux = useSelector((state: any) => state.profile?.profile?.cidade);

  useEffect(() => {
    setNome(nomeRedux || "");
    setIdade(idadeRedux || "");
    setTelefone(telefoneRedux || "");
    setCidade(cidadeRedux || "");
  }, [nomeRedux, idadeRedux, telefoneRedux, cidadeRedux]);

  const handleNomeChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateNome(event.target.value));
  };

  const handleIdadeChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateIdade(event.target.value));
  };

  const handleTelefoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTelefone(event.target.value));
  };

  const handleCidadeChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateCidade(event.target.value));
  };

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        console.log("Erro ao verificar sessão:", error);
      } else {
        console.log("Sessão iniciada:", data.session);
      }
    };
    getSession();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700  bg-transparent backdrop-blur-md z-50 ">
    <div className="md:w-full md:max-w-4xl bg-gray-800 text-white rounded-xl border border-gray-500 shadow-xl my-24 mx-12 overflow-hidden h-[90vh]  sm:max-h-[80vh] overflow-y-auto">
      {/* Conteúdo da modal */}
        {/* Header */}
        <header className="bg-pink-800 py-6 px-4 md:px-10">
          <h1 className="text-3xl font-bold tracking-wide text-center">
            Cria o teu Perfil 
          </h1>
          <p className="text-center text-gray-200 text-sm mt-2">
            Complete as informações para começar no <strong>Xgirl.pt</strong>
          </p>
        </header>

        {/* Formulário */}
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Coluna Esquerda */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300">Nome*</label>
                <input
                  className="w-full py-3 px-4 bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={nome}
                  onChange={handleNomeChange}
                  placeholder="Digite seu nome"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Idade</label>
                <input
                  type="number"
                  className="w-full py-3 px-4 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={idade}
                  onChange={handleIdadeChange}
                  placeholder="Sua idade"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Número de Telefone*</label>
                <input
                  className="w-full py-3 px-4 bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={telefone}
                  onChange={handleTelefoneChange}
                  placeholder="Seu telefone"
                />
              </div>
              <FiltroTarifa rounded="rounded-lg" buttonPadding="py-3" bgColor="bg-gray-700" />
              <FiltroDistrito rounded="rounded-lg" buttonPadding="py-3" bgColor="bg-gray-700" />
              <div>
                <label className="block text-sm font-medium text-gray-300">Cidade</label>
                <input
                  className="w-full py-3 px-4 bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={cidade}
                  onChange={handleCidadeChange}
                  placeholder="Sua cidade"
                />
              </div>
            </div>

            {/* Coluna Direita */}
            <div className="space-y-6">
              <FiltroAltura rounded="rounded-lg" buttonPadding="py-3" bgColor="bg-gray-300" />
              <FiltroCorpo rounded="rounded-lg" buttonPadding="py-3" bgColor="bg-gray-700" />
              <FiltroOlhos rounded="rounded-lg" buttonPadding="py-3" bgColor="bg-gray-700" />
              <FiltroMamas rounded="rounded-lg" buttonPadding="py-3" bgColor="bg-gray-700" />
              <FiltroPeito rounded="rounded-lg" buttonPadding="py-3" bgColor="bg-gray-700" />
              <FiltroPelos rounded="rounded-lg" buttonPadding="py-3" bgColor="bg-gray-700" />
              <FiltroTatuagem rounded="rounded-lg" buttonPadding="py-3" bgColor="bg-gray-700" />
              <FiltroSigno rounded="rounded-lg" buttonPadding="py-3" bgColor="bg-gray-700" />
            </div>
          </div>
        </div>

        {/* Botões Fixos */}
        <footer className="bg-gray-800 border-t border-gray-700 p-4 sticky bottom-0">
          <div className="flex justify-between">
            <Link href="/">
              <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition">
                Voltar
              </button>
            </Link>
            <Link href="/registo-contacto">
              <button className="px-6 py-3 bg-pink-800 hover:bg-pink-900 rounded-lg text-sm font-medium ">
                Criar Conta
              </button>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default RegistoEntrada;
