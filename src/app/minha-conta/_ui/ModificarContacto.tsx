"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateServico,
  updateLingua,
  updatePagamento,
  updateDescription,
} from "@/actions/ProfileActions";
import CheckPagamento from "@/components/Register/CheckPagamento";
import CheckLinguas from "@/components/Register/CheckLinguas";
import CheckServico from "@/components/Register/CheckServico";
import FiltroPrice from "@/components/Filtros/FiltroPrice";
import { updateProfileData } from "@/services/profileService";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FroalaEditor = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

interface ModificarContactoProps {
  handleVoltar: () => void;
  onClose: () => void;
}

const ModificarContacto: React.FC<ModificarContactoProps> = ({
  handleVoltar,
  onClose,
}) => {
  const dispatch = useDispatch();

  const userUID = useSelector((state: any) => state.profile?.profile?.userUID);
  const pagamentoRedux = useSelector(
    (state: any) => state.profile?.profile?.pagamento
  );
  const linguaRedux = useSelector(
    (state: any) => state.profile?.profile?.lingua
  );
  const servicoRedux = useSelector(
    (state: any) => state.profile?.profile?.servico
  );
  const descriptionRedux = useSelector(
    (state: any) => state.profile?.profile?.description
  );

  const [selectedPagamento, setSelectedPagamento] = useState<string[]>(
    pagamentoRedux || []
  );
  const [selectedLingua, setSelectedLingua] = useState<string[]>(
    linguaRedux || []
  );
  const [selectedServico, setSelectedServico] = useState<string[]>(
    servicoRedux || []
  );
  const [description, setDescription] = useState<string>(
    descriptionRedux || ""
  );
  const [editorState, setEditorState] = useState<string>("");

  useEffect(() => {
    if (pagamentoRedux) {
      setSelectedPagamento(pagamentoRedux);
    }
  }, [pagamentoRedux]);

  useEffect(() => {
    if (descriptionRedux) {
      setDescription(descriptionRedux);
    }
  }, [descriptionRedux]);

  useEffect(() => {
    if (linguaRedux) {
      setSelectedLingua(linguaRedux);
    }
  }, [linguaRedux]);

  useEffect(() => {
    if (servicoRedux) {
      setSelectedServico(servicoRedux);
    }
  }, [servicoRedux]);

  const handlePaymentChange = (updatedPagamento: string[]) => {
    dispatch(updatePagamento(updatedPagamento));
    setSelectedPagamento(updatedPagamento);
  };

  const handleDescriptionChange = (content: string) => {
    setDescription(content);
    dispatch(updateDescription(content));
  };

  const handleLinguaChange = (updatedLingua: string[]) => {
    dispatch(updateLingua(updatedLingua));
    setSelectedLingua(updatedLingua);
  };

  const handleServicoChange = (updatedServico: string[]) => {
    dispatch(updateServico(updatedServico));
    setSelectedServico(updatedServico);
  };

  useEffect(() => {
    new FroalaEditor("#editor");
  }, []);

  const handleGuardar = async () => {
    const dataToUpdate = {
      pagamento: selectedPagamento,
      lingua: selectedLingua,
      servico: selectedServico,
      description,
    };

    try {
      const response = await updateProfileData(dataToUpdate, userUID);
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
      dispatch(updatePagamento(selectedPagamento));
      dispatch(updateLingua(selectedLingua));
      dispatch(updateServico(selectedServico));
      dispatch(updateDescription(description));
      // onClose();
      console.log(
        "Informações de contato atualizadas com sucesso na base de dados!"
      );
    } catch (error: any) {
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
      console.error(
        "Erro ao atualizar informações de contato na base de dados:",
        error.message
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 backdrop-blur-md">
      <ToastContainer />
      <div className="bg-[#2A2D32] h-4/5 mt-16 mb-16 border border-zinc-600 rounded-3xl max-w-screen-lg shadow-2xl w-full overflow-y-auto">
        <div className="p-10">
          <h2 className="text-4xl text-pink-600 mb-4 font-bold text-center">Modificar Perfil</h2>
  
          <div className="flex flex-col mb-6">
            <div className="w-44 mb-4">
              <FiltroPrice />
            </div>
            <p className="text-md text-pink-800 font-semibold">Meio de contacto</p>
            <div className="w-full mt-2">
              <p className="text-md text-pink-800 font-semibold">Meios de Pagamento</p>
              <CheckPagamento />
            </div>
            <div className="w-full mt-4">
              <p className="text-md text-pink-800 font-semibold">Linguas</p>
              <CheckLinguas />
            </div>
            <div className="w-full mt-4">
              <p className="text-md text-pink-800 font-semibold">Servicos</p>
              <CheckServico
                selectedServico={selectedServico}
                setSelectedServico={setSelectedServico}
              />
            </div>
            <div className="w-full mt-4">
              <p className="text-md text-pink-800 font-semibold">Descrição</p>
              <FroalaEditor
                id="editor"
                config={{
                  pluginsEnabled: ["emoji"],
                  toolbarButtons: ["emoji"],
                  emojisSet: "emojione",
                  emojiDefaultSet: "emojione",
                  events: {
                    contentChanged: () => {
                      const content =
                        document.getElementById("editor")?.innerHTML || "";
                      setEditorState(content);
                    },
                  },
                }}
                model={description}
                onModelChange={handleDescriptionChange}
              />
            </div>
          </div>
        </div>
  
        <div className="flex justify-between items-center px-8 py-4 bg-[#2A2D32] rounded-b-3xl">
          <button
            className="text-white bg-gray-600 px-8 py-3 rounded-full shadow-lg transition duration-300 hover:bg-gray-500 flex items-center space-x-2"
            onClick={handleVoltar}
          >
            <span>Voltar</span>
          </button>
          <button
            className="text-white bg-pink-600 px-8 py-3 rounded-full shadow-lg transition duration-300 hover:bg-pink-500 flex items-center space-x-2"
            onClick={handleGuardar}
          >
            <span>Guardar</span>
          </button>
        </div>
      </div>
    </div>
  );
  
  
  
};

export default ModificarContacto;
