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
    <div className="text-gray-600 bg-[#1b1b1b]">
      {/* <div className="pt-8">
        <HeaderLoged />
      </div> */}
      <div className="h-full bg-[#1b1b1b] px-44">
        <div className="flex justify-between w-full py-3 bg-blue-200">
          <div>
            <p className="text-blue-800 pl-8">
              Email de confirmação enviado com sucesso a {userEmail}
            </p>
          </div>
          <button className="font-bold">
            <ImCross
              size={14}
              className="text-red hover:text-pink-800 transition-transform font-bold mr-8"
            />
          </button>
        </div>
        <div className="flex justify-between w-full py-3 bg-green-100">
          <div>
            <p className="text-green-800 pl-8">
              Contectado a {userEmail} com sucesso
            </p>
          </div>
          <button className="font-bold">
            <ImCross
              size={14}
              className="text-red hover:text-pink-800 transition-transform font-bold mr-8"
            />
          </button>
        </div>
        <p className="text-pink-800 text-2xl mt-4 pb-0 px-6">
          Cria o teu Perfil de Anunciante
        </p>

        <div className="bg-[#1E2427] w-full h-12 mb-2 mt-4 border border-zinc-600 flex rounded-sm">
          <div className="flex justify-around w-full mx-6 items-center">
            <div className="flex border-b-2 border-pink-800 pt-3">
              <p className="rounded-full border border-pink-800 mr-2 px-2 mb-2 text-pink-800">
                1
              </p>
              <p className="mb-2 text-pink-800">Perfil</p>
            </div>
            <div className="flex border-zinc-500 pt-3">
              <p className="rounded-full border border-zinc-500 mr-2 px-2 mb-2 text-zinc-500">
                2
              </p>
              <p className="text-zinc-500">Contacto</p>
            </div>
            <div className="flex border-zinc-500 pt-3">
              <p className="rounded-full border border-zinc-500 mr-2 px-2 mb-2 text-zinc-500">
                3
              </p>
              <p className="mb-2 text-zinc-500">Fotos</p>
            </div>
            <div className="flex border-zinc-500 pt-3">
              <p className="rounded-full border border-zinc-500 mr-2 px-2 mb-2 text-zinc-500">
                4
              </p>
              <p className="mb-2 text-zinc-500">Mensalidade</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1E2427] w-full h-full mb-10 mt-0 border border-zinc-600 rounded-sm">
          <div className="flex justify-between">
            <div className="flex w-1/2">
              <div className="flex flex-col justify-around w-full mx-6 items-start">
                <div className="w-full mt-0">
                  <p className="text-pink-800">Nome*</p>
                  <input
                    className="py-2 px-2 w-full mt-1 bg-slate-600 text-white rounded-sm"
                    value={nome}
                    onChange={handleNomeChange}
                  />
                </div>
                <div className="w-full flex flex-col">
                  <div className="flex items-end">
                    <p className="text-pink-800">Idade</p>
                    <p className="text-xs text-green-600 ml-4">
                      Certifica a tua idade e ganha um prémio*
                    </p>
                  </div>
                  <input
                    className="py-2 px-2 w-full mt-1 bg-slate-600 text-white rounded-sm"
                    value={idade}
                    onChange={handleIdadeChange}
                  />
                </div>
                <div className="w-full mt-2">
                  <p className="text-pink-800">Numero de Telefone*</p>
                  <input
                    className="py-2 px-2 w-full mt-1 bg-slate-600 text-white rounded-sm"
                    value={telefone}
                    onChange={handleTelefoneChange}
                    maxLength={9}
                    pattern="[0-9]*"
                  />
                </div>
                <div className="w-full mt-2 gap-4">
                  <p className="text-md text-pink-800">Meio de contacto</p>
                  <CheckContacto />
                </div>
                <FiltroDistrito
                  padding="py-2"
                  rounded="rounded-sm"
                  buttonPadding="py-2"
                  bgColor="bg-slate-600"
                />
                <div className="w-full flex flex-col">
                  <div className="flex items-end">
                    <p className="text-pink-800">Cidade</p>
                  </div>
                  <input
                    className="py-2 px-2 w-full mt-1 bg-slate-600 text-white rounded-sm"
                    value={cidade}
                    onChange={handleCidadeChange}
                  />
                </div>
                <FiltroOrigem
                  padding="py-2"
                  rounded="rounded-sm"
                  buttonPadding="py-2"
                  bgColor="bg-slate-600"
                />
              </div>
            </div>

            <div className="flex w-1/2 mt-4">
              <div className="flex flex-col justify-around w-full mx-6 items-start">
                <FiltroAltura
                  padding="py-2"
                  rounded="rounded-sm"
                  buttonPadding="py-2"
                />
                <FiltroCorpo
                  padding="py-2"
                  rounded="rounded-sm"
                  buttonPadding="py-2"
                  bgColor="bg-slate-600"
                />
                <FiltroOlhos
                  padding="py-2"
                  rounded="rounded-sm"
                  buttonPadding="py-2"
                  bgColor="bg-slate-600"
                />
                <FiltroMamas
                  padding="py-2"
                  rounded="rounded-sm"
                  buttonPadding="py-2"
                  bgColor="bg-slate-600"
                />
                <FiltroPeito
                  padding="py-2"
                  rounded="rounded-sm"
                  buttonPadding="py-2"
                  bgColor="bg-slate-600"
                />
                <FiltroPelos
                  padding="py-2"
                  rounded="rounded-sm"
                  buttonPadding="py-2"
                  bgColor="bg-slate-600"
                />
                <FiltroTatuagem
                  padding="py-2"
                  rounded="rounded-sm"
                  buttonPadding="py-2"
                  bgColor="bg-slate-600"
                />
                <FiltroSigno
                  padding="py-2"
                  rounded="rounded-sm"
                  buttonPadding="py-2"
                  bgColor="bg-slate-600"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between w-full mb-6 mt-10 my-10 py-6 px-10">
            <div className="w-26 mb-6">
              <Link href="/">
                <p className="text-md text-white bg-zinc-400 px-10 py-2 rounded-md cursor-pointer">
                  Voltar
                </p>
              </Link>
            </div>
            <Link href="/registo-contacto">
              <p className="text-md text-white bg-pink-800 px-10 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-pink-600 ease-in-out transform hover:scale-105">
                Cria a tua Conta
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistoEntrada;
