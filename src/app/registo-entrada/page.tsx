"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
import supabase from "@/database/supabase";
import Header from "@/components/Header";
import HeaderLoged from "@/components/Register/HeaderLoged";
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
import FiltroCabelo from "@/components/Filtros/FiltroCabelo";
import CheckContacto from "@/components/Register/CheckContacto";
import {
  updateNome,
  updateuserUID,
  updateIdade,
  updateTelefone,
  updateCidade,
} from "@/actions/ProfileActions";
import Link from "next/link";
import { useParams } from "next/navigation";
import FiltroTarifa from "@/components/Filtros/FiltroTarifa";

const RegistoEntrada = () => {
  const dispatch = useDispatch();
  const { userUID } = useParams<{
    userUID: string;
  }>();

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");

  const userUIDRedux = useSelector(
    (state: any) => state.profile?.profile?.userUID
  );
  const userEmail = useSelector((state: any) => state.profile?.profile?.email);

  const nomeRedux = useSelector((state: any) => state.profile?.profile?.nome);
  const idadeRedux = useSelector((state: any) => state.profile?.profile?.idade);
  const telefoneRedux = useSelector(
    (state: any) => state.profile?.profile?.telefone
  );
  const cidadeRedux = useSelector(
    (state: any) => state.profile?.profile?.cidade
  );

  useEffect(() => {
    setNome(nomeRedux || "");
    setIdade(idadeRedux || "");
    setTelefone(telefoneRedux || "");
    setCidade(cidadeRedux || "");
  }, [nomeRedux, idadeRedux, telefoneRedux, cidadeRedux]);

  const handleNomeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const novoNome = event.target.value;
    dispatch(updateNome(novoNome));
  };

  const handleIdadeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const novaIdade = event.target.value;
    dispatch(updateIdade(novaIdade));
  };

  const handleTelefoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const novoTelefone = event.target.value;
    dispatch(updateTelefone(novoTelefone));
  };

  const handleCidadeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const novaCidade = event.target.value;
    dispatch(updateCidade(novaCidade));
  };

  useEffect(() => {
    if (userUID) {
      dispatch(updateuserUID(userUID));
    }
  }, [dispatch, userUID]);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        console.log(
          "Sessão não iniciada ou erro ao verificar a sessão:",
          error
        );
      } else {
        console.log("Sessão iniciada:", data.session);
        console.log("Usuário:", data.session.user);
      }
    };
    getSession();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-90 backdrop-blur-lg">
      <div className="bg-gradient-to-b bg-gray-900 dark:bg-gray-800 h-4/5 mt-16 mb-16 border border-[#3C3C3C] rounded-3xl max-w-screen-lg shadow-2xl w-full overflow-y-auto flex flex-col">
        <div className="p-10 flex-grow">
          <h2 className="text-4xl text-pink-500 mb-6 font-extrabold text-center tracking-wide">
            Cria o teu Perfil de Anunciante
          </h2>
          <div className="flex flex-col space-y-8">
            <div className="flex justify-around">
              {/* Esquerda */}
              <div className="flex flex-col justify-around w-1/2 mx-6 items-start">
                <div className="w-full mt-2">
                  <p className="text-pink-500 font-medium">Nome*</p>
                  <input
                    className="py-3 px-3 w-full mt-2 bg-[#2E2E2E] text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={nome}
                    onChange={handleNomeChange}
                  />
                </div>
                <div className="w-full mt-4">
                  <p className="text-pink-500 font-medium">Idade</p>
                  <p className="text-xs text-pink-500 mt-1">
                    Certifica a tua idade e ganha um prémio*
                  </p>
                  <input
                    className="py-3 px-3 w-full mt-2 bg-[#2E2E2E] text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value={idade}
                    onChange={handleIdadeChange}
                  />
                </div>
                <div className="w-full mt-4">
                  <p className="text-pink-500 font-medium">Número de Telefone*</p>
                  <input
                    className="py-3 px-3 w-full mt-2 bg-[#2E2E2E] text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value={telefone}
                    onChange={handleTelefoneChange}
                    maxLength={9}
                    pattern="[0-9]*"
                  />
                </div>

                {/* Filtros */}
                <FiltroTarifa 
                  rounded="rounded-md"
                  buttonPadding="py-3"
                  bgColor="bg-[#2E2E2E]"
                />
                <FiltroDistrito
                  rounded="rounded-md"
                  buttonPadding="py-3"
                  bgColor="bg-[#2E2E2E]"
                />
                <div className="w-full mt-4">
                  <p className="text-red-400 font-medium">Cidade</p>
                  <input
                    className="py-3 px-3 w-full mt-2 bg-[#2E2E2E] text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={cidade}
                    onChange={handleCidadeChange}
                  />
                </div>
                <FiltroOrigem
                  rounded="rounded-md"
                  buttonPadding="py-3"
                  bgColor="bg-[#2E2E2E]"
                />
              </div>

              {/* Direita */}
              <div className="flex flex-col justify-around w-1/2 mx-6">
                <FiltroAltura
                  rounded="rounded-md"
                  buttonPadding="py-3"
                  bgColor="bg-[#2E2E2E]"
                />
                <FiltroCorpo
                  rounded="rounded-md"
                  buttonPadding="py-3"
                  bgColor="bg-[#2E2E2E]"
                />
                <FiltroOlhos
                  rounded="rounded-md"
                  buttonPadding="py-3"
                  bgColor="bg-[#2E2E2E]"
                />
                <FiltroMamas
                  rounded="rounded-md"
                  buttonPadding="py-3"
                  bgColor="bg-[#2E2E2E]"
                />
                <FiltroPeito
                  rounded="rounded-md"
                  buttonPadding="py-3"
                  bgColor="bg-[#2E2E2E]"
                />
                <FiltroPelos
                  rounded="rounded-md"
                  buttonPadding="py-3"
                  bgColor="bg-[#2E2E2E]"
                />
                <FiltroTatuagem
                  rounded="rounded-md"
                  buttonPadding="py-3"
                  bgColor="bg-[#2E2E2E]"
                />
                <FiltroSigno
                  rounded="rounded-md"
                  buttonPadding="py-3"
                  bgColor="bg-[#2E2E2E]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer com botões fixos */}
        <div className="flex justify-between items-end px-8 py-4 bg-gradient-to-b from-[#2E2E2E] to-[#1A1A1A] rounded-b-3xl border-t border-[#3C3C3C] sticky bottom-0">
          <Link href="/">
            <p className="text-md text-white bg-gray-600 px-10 py-2 rounded-md cursor-pointer text-center transition duration-300 hover:bg-gray-500">
              Voltar
            </p>
          </Link>
          <Link href="/registo-contacto">
            <p className="text-md text-white bg-red-600 px-10 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-red-500 ease-in-out transform hover:scale-105 text-center">
              Cria a tua Conta
            </p>
          </Link>
        </div>
      </div>
    </div>
  );

  
  
  
};

export default RegistoEntrada;
