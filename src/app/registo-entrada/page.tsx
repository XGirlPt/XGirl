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
    <div className="bg-gradient-to-b from-gray-900 to-gray-700 flex justify-center items-center h-full">
      <div className="bg-gray-800 border border-zinc-600 mt-10 rounded-3xl w-1/2 shadow-2xl overflow-hidden flex flex-col">
        <div className="p-10 flex-grow overflow-y-auto">
          <h2 className="text-4xl text-pink-600 mb-4 font-bold text-center">
            Cria o teu Perfil de Anunciante
          </h2>
          <div className="flex flex-col space-y-6">
            {/* <div className="flex justify-between w-full py-3 bg-blue-200">
              <p className="text-blue-800 pl-8">
                Email de confirmação enviado com sucesso a {userEmail}
              </p>
              <button className="font-bold">
                <ImCross
                  size={14}
                  className="text-red hover:text-pink-800 transition-transform font-bold mr-8"
                />
              </button>
            </div> */}
            {/* <div className="flex justify-between w-full py-3 bg-green-100">
              <p className="text-green-800 pl-8">
                Conectado a {userEmail} com sucesso
              </p>
              <button className="font-bold">
                <ImCross
                  size={14}
                  className="text-red hover:text-pink-800 transition-transform font-bold mr-8"
                />
              </button>
            </div> */}
  
            <div className="flex justify-around">
              <div className="flex flex-col justify-around w-1/2 mx-6 items-start">
                <div className="w-full mt-2">
                  <p className="text-pink-800">Nome*</p>
                  <input
                    className="py-2 px-2 w-full mt-1 bg-slate-600 text-white rounded-sm text-sm"
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
                    className="py-2 px-2 w-full mt-1 bg-slate-600 text-white rounded-sm text-sm"
                    value={idade}
                    onChange={handleIdadeChange}
                  />
                </div>
                <div className="w-full mt-2">
                  <p className="text-pink-800">Número de Telefone*</p>
                  <input
                    className="py-2 px-2 w-full mt-1 bg-slate-600 text-white rounded-sm text-sm"
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
                  rounded="rounded-sm"
                  buttonPadding={`py-${2}`}
                  bgColor={"bg-slate-600"}
                />
                <div className="w-full flex flex-col">
                  <div className="flex items-end">
                    <p className="text-pink-800">Cidade</p>
                  </div>
                  <input
                    className="py-2 px-2 w-full mt-1 bg-slate-600 text-white rounded-sm text-sm"
                    value={cidade}
                    onChange={handleCidadeChange}
                  />
                </div>
                <FiltroOrigem
                  rounded="rounded-sm"
                  buttonPadding={`py-${2}`}
                  bgColor={"bg-slate-600"}
                />
              </div>
  
              <div className="flex flex-col justify-around w-1/2 mx-6">
                <FiltroAltura
                  rounded="rounded-sm"
                  buttonPadding={`py-${2}`}
                  bgColor={"bg-slate-600"}
                />
                <FiltroCorpo
                  rounded="rounded-sm"
                  buttonPadding={`py-${2}`}
                  bgColor={"bg-slate-600"}
                />
                <FiltroOlhos
                  rounded="rounded-sm"
                  buttonPadding={`py-${2}`}
                  bgColor={"bg-slate-600"}
                />
                <FiltroMamas
                  rounded="rounded-sm"
                  buttonPadding={`py-${2}`}
                  bgColor={"bg-slate-600"}
                />
                <FiltroPeito
                  rounded="rounded-sm"
                  buttonPadding={`py-${2}`}
                  bgColor={"bg-slate-600"}
                />
                <FiltroPelos
                  rounded="rounded-xl "
                  buttonPadding={`py-${2}`}
                  bgColor={"bg-slate-600"}
                />
                <FiltroTatuagem
                  rounded="rounded-sm"
                  buttonPadding={`py-${2}`}
                  bgColor={"bg-slate-600"}
                />
                <FiltroSigno
                  rounded="rounded-sm"
                  buttonPadding={`py-${2}`}
                  bgColor={"bg-slate-600"}
                />
              </div>
            </div>
          </div>
        </div>
  
        {/* Footer with fixed buttons */}
        <div className="flex justify-between w-full bg-gray-800 p-4 border-t border-zinc-600">
          <Link href="/">
            <p className="text-md text-white bg-zinc-400 px-10 py-2 rounded-md cursor-pointer text-center">
              Voltar
            </p>
          </Link>
          <Link href="/registo-contacto">
            <p className="text-md text-white bg-pink-800 px-10 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-pink-600 ease-in-out transform hover:scale-105 text-center">
              Cria a tua Conta
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
  
  
  
};

export default RegistoEntrada;
