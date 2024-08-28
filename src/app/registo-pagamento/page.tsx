"use client"
import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import supabase from "@/database/supabase";
import { useSelector } from "react-redux";
import Link from "next/link";

const RegistoPagamento: React.FC = () => {
  const userUID = useSelector((state: any) => state.profile?.profile.userUID);
  const nomeRedux = useSelector((state: any) => state.profile?.profile.nome);
  const photoURLredux = useSelector(
    (state: any) => state.profile?.profile.photos || []
  );
  const telefoneRedux = useSelector(
    (state: any) => state.profile?.profile.telefone
  );
  const alturaRedux = useSelector(
    (state: any) => state.profile?.profile.altura
  );
  const cabeloRedux = useSelector(
    (state: any) => state.profile?.profile.cabelo
  );
  const corpoRedux = useSelector((state: any) => state.profile?.profile.corpo);
  const mamasRedux = useSelector((state: any) => state.profile?.profile.mamas);
  const olhosRedux = useSelector((state: any) => state.profile?.profile.olhos);
  const origemRedux = useSelector(
    (state: any) => state.profile?.profile.origem
  );
  const seiosRedux = useSelector((state: any) => state.profile?.profile.seios);
  const tatuagemRedux = useSelector(
    (state: any) => state.profile?.profile.tatuagem
  );
const tarifaredux = useSelector((state: any) => state.profile?.profile.tarifa);

  const pelosRedux = useSelector((state: any) => state.profile?.profile.pelos);
  const distritoRedux = useSelector(
    (state: any) => state.profile?.profile.distrito
  );
  const idadeRedux = useSelector((state: any) => state.profile?.profile.idade);
  const signoRedux = useSelector((state: any) => state.profile?.profile.signo);
  const userEmail = useSelector((state: any) => state.profile?.profile.email);
  const cidadeRedux = useSelector(
    (state: any) => state.profile?.profile.cidade
  );
  const pagamentoRedux = useSelector(
    (state: any) => state.profile?.profile.pagamento
  );
  const linguaRedux = useSelector(
    (state: any) => state.profile?.profile.lingua
  );
  const servicoRedux = useSelector(
    (state: any) => state.profile?.profile.servico
  );
  const descriptionRedux = useSelector(
    (state: any) => state.profile?.profile.description
  );

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();

    const verificationPhotoInput = document.getElementById("verificationPhoto") as HTMLInputElement;
    const verificationPhotoFile = verificationPhotoInput?.files?.[0];

    if (!verificationPhotoFile) {
      console.error("Nenhuma foto de verificação selecionada.");
      return;
    }

    console.log("Objeto do arquivo para upload:", verificationPhotoFile);

    try {
      const selectedPayments: string[] = [];
      for (const key in pagamentoRedux) {
        if (pagamentoRedux[key]) {
          selectedPayments.push(key);
        }
      }

      const selectedLingua: string[] = [];
      for (const key in linguaRedux) {
        if (linguaRedux[key]) {
          selectedLingua.push(key);
        }
      }

      const selectedServico: string[] = [];
      for (const key in servicoRedux) {
        if (servicoRedux[key]) {
          selectedServico.push(key);
        }
      }

      const userData = {
        userUID,
        email: userEmail,
        nome: nomeRedux,
        idade: idadeRedux,
        tarifa: tarifaredux,
        altura: alturaRedux,
        cabelo: cabeloRedux,
        corpo: corpoRedux,
        olhos: olhosRedux,
        origem: origemRedux,
        seios: seiosRedux,
        tatuagens: tatuagemRedux,
        mamas: mamasRedux,
        pelos: pelosRedux,
        signo: signoRedux,
        distrito: distritoRedux,
        telefone: telefoneRedux,
        pagamento: selectedPayments,
        servico: selectedServico,
        lingua: selectedLingua,
        description: descriptionRedux,
        aprovado: false
      };

      console.log("Dados do usuário a serem enviados:", userData);

      const { data: profileData, error: profileError } = await supabase
        .from("ProfilesData")
        .insert([userData]);

      if (profileError) {
        throw new Error("Erro ao inserir dados na tabela ProfilesData: " + profileError.message);
      }

      console.log("Dados inseridos com sucesso na tabela ProfilesData:", profileData);

      // Inserir URLs das fotos na tabela profilephoto
      const photoInsertionsProfile = photoURLredux.map(photoURL => ({
        userUID,
        imageurl: photoURL
      }));

      const { data: photoData, error: photoError } = await supabase
        .from("profilephoto")
        .insert(photoInsertionsProfile);

      if (photoError) {
        throw new Error("Erro ao inserir URLs das fotos na tabela profilephoto: " + photoError.message);
      }

      console.log("URLs das fotos inseridas com sucesso na tabela profilephoto:", photoData);

      // Upload da foto de verificação
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('verificationFoto')
        .upload(`${userUID}/${verificationPhotoFile.name}`, verificationPhotoFile);

      if (uploadError) {
        throw new Error("Erro ao fazer upload da foto de verificação: " + uploadError.message);
      }

      console.log("Foto de verificação carregada com sucesso:", uploadData);

      // Obter o URL da foto de verificação
      const { data: publicURLData, error: publicURLError } = await supabase
        .storage
        .from('verificationFoto')
        .getPublicUrl(`${userUID}/${verificationPhotoFile.name}`);

      if (publicURLError) {
        throw new Error("Erro ao obter URL da foto de verificação: " + publicURLError.message);
      }

      const publicURL = publicURLData?.publicUrl;

      if (!publicURL) {
        throw new Error("Erro ao obter URL pública da foto de verificação.");
      }

      console.log("URL pública da foto de verificação:", publicURL);

      // Inserir URL da foto de verificação na tabela VPhoto
      await insertVerificationPhoto(userUID, publicURL);
    } catch (error: any) {
      console.error("Erro ao adicionar dados:", error.message);
    }
  };

  // Função para inserir URL da foto de verificação na tabela VPhoto
  async function insertVerificationPhoto(userUID: string, verificationPhotoURL: string) {
    try {
      const { data: vPhotoData, error: vPhotoError } = await supabase
        .from("VPhoto")
        .insert([{ userUID, imageurl: verificationPhotoURL }]);
  
      if (vPhotoError) {
        throw new Error("Erro ao inserir URL da foto de verificação na tabela VPhoto: " + vPhotoError.message);
      }
  
      console.log("URL da foto de verificação inserida com sucesso na tabela VPhoto:", vPhotoData);
    } catch (error: any) {
      console.error("Erro ao adicionar a foto de verificação:", error.message);
    }
  }


  return (
    <div className="text-gray-600 pb-20 min-h-[60vh] bg-[#1b1b1b]">
      <div className="h-full bg-[#1b1b1b] px-44">
        <div className="w-full pt-2 mb-2">
          <p className="text-pink-800 text-xl mt-8 pb-0 px-6">
            Cria o teu Perfil de Anunciante
          </p>
        </div>

        {/* Header */}
        <div className="bg-[#1E2427] w-full h-12 mb-2 mt-10 border border-zinc-600 flex rounded-sm">
          <div className="flex justify-around w-full mx-6 items-center">
            <div className="flex border-zinc-500 pt-3">
              <p className="rounded-full border border-zinc-500 mr-2 px-2 mb-2 text-zinc-500">
                1
              </p>
              <p className="mb-2 text-zinc-500">Perfil</p>
            </div>

            <div className="flex border-zinc-500 pt-3">
              <p className="rounded-full border border-zinc-500 mr-2 px-2 mb-2 text-zinc-500">
                4
              </p>
              <p className="mb-2 text-zinc-500">Mensalidade</p>
            </div>

            <div className="flex border-zinc-500 pt-3">
              <p className="rounded-full border border-zinc-500 mr-2 px-2 mb-2 text-zinc-500">
                3
              </p>
              <p className="mb-2 text-zinc-500">Fotos</p>
            </div>

            <div className="flex border-b-2 border-pink-800 pt-3">
              <p className="rounded-full border border-pink-800 mr-2 px-2 mb-2 text-pink-800">
                4
              </p>
              <p className="mb-2 text-pink-800">Mensalidade</p>
            </div>
          </div>
        </div>
        {/* Header end */}

        <div className="bg-[#1E2427] w-full h-full mb-10 mt-0 border border-zinc-600 rounded-sm">
          <div className="px-10 mt-4">
           
            <a href="https://controlcenter.verotel.com/register-reseller?website=znjiu4xie868d5ndojpu1slddnb64o4kuznt4h1x">Sign me up!</a>
            <a href="https://controlcenter.verotel.com/register-reseller?website=znjiu4xie868d5ndojpu1slddnb64o4kuznt4h1x">Sign me up!</a>
          </div>
        </div>

        <div className="bg-[#1E2427] w-full h-full mb-10 mt-0 border border-zinc-600 rounded-sm">
          <div className="flex justify-between w-full mb-1 mt-10 my-10 py-6 px-10">
            <div className="w-26 mb-">
              <Link href="/registo-fotos">
                <p className="text-md text-white bg-zinc-400 px-10 py-2 rounded-md cursor-pointer">
                  Voltar
                </p>
              </Link>
            </div>
            <Link href="/">
              <p
                className="text-md text-white bg-pink-800 px-10 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-pink-600 ease-in-out transform hover:scale-105"
                onClick={handleSubmit}
              >
                Finalizar Perfil
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistoPagamento;
