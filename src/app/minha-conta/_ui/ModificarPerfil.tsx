import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FiltroAltura from "@/components/Filtros/FiltroAltura";
import FiltroCorpo from "@/components/Filtros/FiltroCorpo";
import FiltroMamas from "@/components/Filtros/FiltroMamas";
import FiltroOlhos from "@/components/Filtros/FiltroOlhos";
import FiltroPeito from "@/components/Filtros/FiltroPeito";
import FiltroPelos from "@/components/Filtros/FiltroPelos";
import FiltroTatuagem from "@/components/Filtros/FiltroTatuagem";
import FiltroOrigem from "@/components/Filtros/FiltroOrigem";
import CheckContacto from "@/components/Register/CheckContacto";
import supabase from "@/database/supabase";
import FiltroDistrito from "@/components/Register/FiltroDistrito";
import { updateProfileData } from "@/services/profileService";
import {
  updateNome,
  updateuserUID,
  updateIdade,
  updateTelefone,
  updateCidade,
  updateMamas,
  updateAltura,
  updateDistrito,
  updateOrigem,
  updateCorpo,
  updateCabelo,
  updateOlhos,
  updateSeios,
  updatePelos,
  updateTatuagem,
} from "@/actions/ProfileActions";
import { useParams } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ModificarPerfilProps {
  handleVoltar: () => void;
  onClose: () => void;
}

const ModificarPerfil: React.FC<ModificarPerfilProps> = ({
  handleVoltar,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { userUID } = useParams<{ userUID: string }>();

  const [nome, setNome] = useState<string>("");
  const [idade, setIdade] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [distrito, setDistrito] = useState<string>("");
  const [origem, setOrigem] = useState<string>("");
  const [altura, setAltura] = useState<string>("");
  const [mamas, setMamas] = useState<string>("");
  const [pelos, setPelos] = useState<string>("");
  const [corpo, setCorpo] = useState<string>("");
  const [cabelo, setCabelo] = useState<string>("");
  const [olhos, setOlhos] = useState<string>("");
  const [seios, setSeios] = useState<string>("");
  const [tatuagem, setTatuagem] = useState<string>("");

  const reduxState = useSelector((state: any) => state);
  const userUIDd = useSelector((state: any) => state.profile?.profile?.userUID);

  const nomeRedux = useSelector((state: any) => state.profile?.profile?.nome);
  const idadeRedux = useSelector((state: any) => state.profile?.profile?.idade);
  const telefoneRedux = useSelector(
    (state: any) => state.profile?.profile?.telefone
  );
  const cidadeRedux = useSelector(
    (state: any) => state.profile?.profile?.cidade
  );
  const origemRedux = useSelector(
    (state: any) => state.profile?.profile?.origem
  );
  const distritoRedux = useSelector(
    (state: any) => state.profile?.profile?.distrito
  );
  const alturaRedux = useSelector(
    (state: any) => state.profile?.profile?.altura
  );
  const mamasRedux = useSelector((state: any) => state.profile?.profile?.mamas);
  const pelosRedux = useSelector((state: any) => state.profile?.profile?.pelos);
  const corpoRedux = useSelector((state: any) => state.profile?.profile?.corpo);
  const cabeloRedux = useSelector(
    (state: any) => state.profile?.profile?.cabelo
  );
  const olhosRedux = useSelector((state: any) => state.profile?.profile?.olhos);
  const seiosRedux = useSelector((state: any) => state.profile?.profile?.seios);
  const tatuagemRedux = useSelector(
    (state: any) => state.profile?.profile?.tatuagem
  );

  const handleGuardar = async () => {
    const dataToUpdate = {
      nome,
      idade,
      telefone,
      cidade,
      distrito,
      origem,
      altura,
      pelos,
      userUID: userUIDd,
      mamas,
      corpo,
      cabelo,
      olhos,
      seios,
      tatuagem,
    };
  
    try {
      await updateProfileData(dataToUpdate, userUIDd);
      toast.success('Alteração efetuada com sucesso!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // onClose(); // Fechar modal ou realizar outra ação de sucesso
    } catch (error) {
      console.error("Erro ao atualizar perfil na base de dados:" + error);
      toast.error('Erro ao atualizar perfil na base de dados: ' + error, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    
    }
   
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
      }
    };

    getSession();
  }, []);

  useEffect(() => {
    // Adiciona estilo para ocultar o overflow do body
    document.body.style.overflow = "hidden";

    // Remove o estilo quando o componente for desmontado
    return () => {
      document.body.style.overflow = ""; // Restaura o estilo original
    };
  }, []);

  useEffect(() => {
    if (nomeRedux) setNome(nomeRedux);
    if (idadeRedux) setIdade(idadeRedux);
    if (telefoneRedux) setTelefone(telefoneRedux);
    if (cidadeRedux) setCidade(cidadeRedux);
    if (distritoRedux) setDistrito(distritoRedux);
    if (origemRedux) setOrigem(origemRedux);
    if (alturaRedux) setAltura(alturaRedux);
    if (pelosRedux) setPelos(pelosRedux);
    if (mamasRedux) setMamas(mamasRedux);
    if (corpoRedux) setCorpo(corpoRedux);
    if (cabeloRedux) setCabelo(cabeloRedux);
    if (olhosRedux) setOlhos(olhosRedux);
    if (seiosRedux) setSeios(seiosRedux);
    if (tatuagemRedux) setTatuagem(tatuagemRedux);
  }, [
    nomeRedux,
    idadeRedux,
    telefoneRedux,
    cidadeRedux,
    distritoRedux,
    origemRedux,
    alturaRedux,
    pelosRedux,
    mamasRedux,
    corpoRedux,
    cabeloRedux,
    olhosRedux,
    seiosRedux,
    tatuagemRedux,
  ]);

  // INPUT ONCHANGE START

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novoNome = event.target.value;
    dispatch(updateNome(novoNome));
    setNome(novoNome);
  };

  const handleIdadeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novaIdade = event.target.value;
    dispatch(updateIdade(novaIdade));
    setIdade(novaIdade);
  };

  const handleTelefoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novoTelefone = event.target.value;
    dispatch(updateTelefone(novoTelefone));
    setTelefone(novoTelefone);
  };

  const handleCidadeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novaCidade = event.target.value;
    dispatch(updateCidade(novaCidade));
    setCidade(novaCidade);
  };

  // END INPUT ONCHANGE

  // LISTBOX ONCHANGE START

  const handleMamasChange = (newValue: string) => {
    dispatch(updateMamas(newValue));
    setMamas(newValue);
  };

  const handleAlturaChange = (newValue: string) => {
    dispatch(updateAltura(newValue));
    setAltura(newValue);
  };

  const handleDistritoChange = (newValue: string) => {
    dispatch(updateDistrito(newValue));
    setDistrito(newValue);
  };

  const handleOrigemChange = (newValue: string) => {
    dispatch(updateOrigem(newValue));
    setOrigem(newValue);
  };

  const handleCorpoChange = (newValue: string) => {
    dispatch(updateCorpo(newValue));
    setCorpo(newValue);
  };

  const handleCabeloChange = (newValue: string) => {
    dispatch(updateCabelo(newValue));
    setCabelo(newValue);
  };

  const handleOlhosChange = (newValue: string) => {
    dispatch(updateOlhos(newValue));
    setOlhos(newValue);
  };

  const handleSeiosChange = (newValue: string) => {
    dispatch(updateSeios(newValue));
    setSeios(newValue);
  };

  const handlePelosChange = (newValue: string) => {
    dispatch(updatePelos(newValue));
    setPelos(newValue);
  };

  const handleTatuagemChange = (newValue: string) => {
    dispatch(updateTatuagem(newValue));
    setTatuagem(newValue);
  };

  // LISTBOX ONCHANGE END

  return (
    <div className="fixed w-full h-full flex items-center justify-center z-50 bg-opacity-75 backdrop-blur-md">
      
      <div className="max-w-screen-lg mx-auto shadow-md w-full">
      <ToastContainer />

    <div className="bg-[#1E2427] w-full h-full mb-10 mt-0 border border-zinc-600 rounded-xl p-10">

          <div className="flex justify-between">
        
            <div className="flex w-1/2">
           
              <div className="flex flex-col justify-around w-full mx-6 items-start">
                <div className="w-full mt-2">
                  <p className="text-pink-800">Nome*</p>
                  <input
                    className="py-2 px-2 w-full mt- bg-slate-600 text-white rounded-sm text-sm"
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
                  <p className="text-pink-800">Numero de Telefone*</p>
                  <input
                    className="py-2 px-2 w-full mt-1 bg-slate-600 text-white rounded-sm text-sm"
                    value={telefone}
                    onChange={handleTelefoneChange}
                    maxLength={9}
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
            </div>

            <div className="flex w-1/2 mt-4">
              <div className="flex flex-col justify-around w-full mx-6 items-start">
                <FiltroAltura
                  rounded="rounded-sm"
                  buttonPadding={`py-${2}`}
                  bgColor={"bg-slate-600"}
                  onChange={handleAlturaChange}
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
                  onChange={handleMamasChange}
                />
                <FiltroPeito
                  rounded="rounded-sm"
                  buttonPadding={`py-${2}`}
                  bgColor={"bg-slate-600"}
                />
                <FiltroPelos
                  rounded="rounded-sm"
                  buttonPadding={`py-${2}`}
                  bgColor={"bg-slate-600"}
                />
                <FiltroTatuagem
                  rounded="rounded-sm"
                  buttonPadding={`py-${2}`}
                  bgColor={"bg-slate-600"}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between w-full mb-2 mt-2 my-10 py-2 px-10">
            <div className="w-26 mb-2">
              <p
                className="text-md text-white bg-zinc-400 px-10 py-2 rounded-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-500"
                onClick={handleVoltar}
              >
                Voltar
              </p>
            </div>

            <div className="w-26 mb-2">
              <p
                className="text-md text-white bg-pink-800 px-10 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-pink-900 ease-in-out transform hover:scale-105"
                onClick={handleGuardar}
                
              >
                Guardar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModificarPerfil;
