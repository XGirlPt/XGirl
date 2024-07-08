"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckDeslocacoes from "@/components/Register/CheckDeslocacoes";
import CheckPagamento from "@/components/Register/CheckPagamento";
import CheckLinguas from "@/components/Register/CheckLinguas";
import CheckServico from "@/components/Register/CheckServico";
import FiltroPrice from "@/components/Filtros/FiltroPrice";
import {
  updateDescription,
  updatePagamento,
  updateLingua,
  updateServico,
} from "@/actions/ProfileActions";
import dynamic from "next/dynamic";

const FroalaEditor = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

const RegistoContacto: React.FC = () => {
  const dispatch = useDispatch();

  const userEmailRedux = useSelector(
    (state: any) => state.profile?.profile?.email
  );
  const servicoRedux = useSelector(
    (state: any) => state.profile?.profile?.servico
  );
  const pagamentoRedux = useSelector(
    (state: any) => state.profile?.profile?.pagamento
  );
  const linguaRedux = useSelector(
    (state: any) => state.profile?.profile?.lingua
  );
  const descriptionRedux = useSelector(
    (state: any) => state.profile?.profile?.description
  );

  const [selectedPagamento, setSelectedPagamento] = useState<string[]>(
    pagamentoRedux || []
  );
  const [selectedServico, setSelectedServico] = useState<string[]>(
    servicoRedux || []
  );
  const [selectedLingua, setSelectedLingua] = useState<string[]>(
    linguaRedux || []
  );
  const [description, setDescription] = useState<string>(
    descriptionRedux || ""
  );

  useEffect(() => {
    setSelectedPagamento(pagamentoRedux || []);
  }, [pagamentoRedux]);

  useEffect(() => {
    setSelectedLingua(linguaRedux || []);
  }, [linguaRedux]);

  useEffect(() => {
    setSelectedServico(servicoRedux || []);
  }, [servicoRedux]);

  useEffect(() => {
    setDescription(descriptionRedux || "");
  }, [descriptionRedux]);

  const handleDescriptionChange = (content: string) => {
    setDescription(content);
    dispatch(updateDescription(content));
  };

  const handlePaymentChange = (updatedPayments: string[]) => {
    dispatch(updatePagamento(updatedPayments));
    setSelectedPagamento(updatedPayments);
  };

  const handleServicoChange = (updatedServico: string[]) => {
    dispatch(updateServico(updatedServico));
    setSelectedServico(updatedServico);
  };

  const handleLinguaChange = (updatedLingua: string[]) => {
    dispatch(updateLingua(updatedLingua));
    setSelectedLingua(updatedLingua);
  };

  const reduxState = useSelector((state: any) => state);
  console.log("Estado Redux completo:", reduxState);

  return (
    <div className="text-gray-600 bg-[#1b1b1b]">
      <div className="h-full bg-[#1b1b1b] px-44">
        <div className="w-full pt-2 mb-2">
          <p className="text-pink-800 text-xl mt-8 pb-0 px-6">
            Cria o teu Perfil de Anunciante
          </p>
        </div>

        <div className="bg-[#1E2427] w-full h-12 mb-2 mt-10 border border-zinc-600 flex rounded-sm">
          <div className="flex justify-around w-full mx-6 items-center">
            <div className="flex border-zinc-500 pt-3">
              <p className="rounded-full border border-zinc-500 mr-2 px-2 mb-2 text-zinc-500">
                1
              </p>
              <p className="mb-2 text-zinc-500">Perfil</p>
            </div>
            <div className="flex border-b-2 border-pink-800 pt-3">
              <p className="rounded-full border border-pink-800 mr-2 px-2 mb-2 text-pink-800">
                2
              </p>
              <p className="mb-2 text-pink-800">Contacto</p>
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
            <div className="flex w-full">
              <div className="flex flex-col w-full mx-6 pt-4">
                <div className="w-full mt-0">
                  <p className="text-pink-800">Preço*</p>
                  <FiltroPrice />
                </div>

                <div className="w-3/4 mt-2 gap-4">
                  <p className="text-md text-pink-800">Meio de contacto</p>
                  <CheckDeslocacoes />
                </div>

                <div className="w-full mt-6">
                  <p className="text-md text-pink-800">Meios de Pagamento</p>
                  <CheckPagamento />
                </div>

                <div className="w-full mt-6">
                  <p className="text-md text-pink-800">Línguas</p>
                  <CheckLinguas />
                </div>

                <div className="w-full mt-6">
                  <p className="text-md text-pink-800">Serviços</p>
                  <CheckServico
                    selectedServico={selectedServico}
                    setSelectedServico={setSelectedServico}
                  />
                </div>

                <div className="w-full mt-6">
                  <p className="text-md text-pink-800">Descrição</p>
                  <FroalaEditor
                    model={description}
                    onModelChange={handleDescriptionChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-1/2">
              <div className="flex flex-col justify-around w-full mx-6 items-center"></div>
            </div>
          </div>

          <div className="flex justify-between w-full mb-6 mt-10 my-10 py-6 px-10">
            <div className="w-26 mb-6">
              <Link
                href={{
                  pathname: "/registo-entrada",
                  query: { email: userEmailRedux },
                }}
              >
                <p className="text-md text-white bg-zinc-400 px-10 py-2 rounded-md cursor-pointer">
                  Voltar
                </p>
              </Link>
            </div>
            <Link href="/registo-fotos">
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

export default RegistoContacto;
