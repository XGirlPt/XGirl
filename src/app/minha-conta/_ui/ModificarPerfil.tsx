import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FiltroAltura from "@/components/Filtros/FiltroAltura";
import FiltroCorpo from "@/components/Filtros/FiltroCorpo";
import FiltroMamas from "@/components/Filtros/FiltroMamas";
import FiltroOlhos from "@/components/Filtros/FiltroOlhos";
import FiltroPeito from "@/components/Filtros/FiltroPeito";
import FiltroPelos from "@/components/Filtros/FiltroPelos";
import FiltroTatuagem from "@/components/Filtros/FiltroTatuagem";
import FiltroSigno from "@/components/Filtros/FiltroSigno";
import FiltroTarifa from "@/components/Filtros/FiltroTarifa";
import FiltroOrigem from "@/components/Filtros/FiltroOrigem";
import CheckContacto from "@/components/Register/CheckContacto";
import supabase from "@/database/supabase";
import FiltroDistrito from "@/components/Filtros/FiltroDistrito";
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

const ModificarPerfil: React.FC<{ handleVoltar: () => void; onClose: () => void }> = ({
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


  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700  bg-transparent backdrop-blur-md z-50 ">
    <div className="md:w-full md:max-w-4xl bg-gray-800 text-white rounded-xl border border-gray-500 shadow-xl my-24 mx-12 overflow-hidden h-[90vh]  sm:max-h-[80vh] overflow-y-auto">
    <div className="md:p-10 flex-grow">
    <header className="bg-pink-800 py-6 px-4 md:px-10">
          <h1 className="text-3xl font-bold tracking-wide text-center">
            Modificar Perfil 
          </h1>
          <p className="text-center text-gray-200 text-sm mt-2">
            Modifica as informações no <strong>Xgirl.pt</strong>
          </p>
        </header>


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

         
          </div>
          <div className="flex justify-between items-end px-8 py-4 bg-gradient-to-b from-gray-800 to-gray-700 rounded-b-3xl border-t border-gray-600 sticky bottom-0">
          <button
            className="text-white bg-gray-600 px-8 py-3 rounded-full shadow-lg transition duration-300 hover:bg-gray-500 flex items-center space-x-2"
            onClick={handleVoltar}
          >
            <span>Voltar</span>
          </button>
          <button
            className="text-white bg-pink-600 px-8 py-3 rounded-full shadow-lg transition duration-300 hover:bg-pink-500 hover:shadow-xl"
            onClick={handleGuardar}
          >
            Guardar
          </button>
        </div>
        </div>
      </div>

  );

  
  
};

export default ModificarPerfil;
