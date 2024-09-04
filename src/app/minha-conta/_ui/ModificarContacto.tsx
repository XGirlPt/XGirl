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
    <div className="fixed inset-0 flex items-center justify-center align-middle z-50 bg-opacity-75 backdrop-blur-md ">
      <ToastContainer />
      <div className="bg-[#1E2427] h-4/5 mt-32 mb-32 border border-zinc-600 rounded-xl max-w-screen-lg shadow-md w-full overflow-y-scroll">
      <div className="bg-pink-800 text-white text-center py-4 rounded-t-lg">
          <h2 className="text-xl font-semibold">Modificar Perfil</h2>
        </div>
        <div className="flex w-full justify-between ">
          
       
          <div className="flex flex-col w-full mx-6 pt-4">
            <div className="w-44 mt-0">
              <FiltroPrice />
            </div>
            <div className="w-3/4 mt-2 gap-4">
              <p className="text-md text-pink-800">Meio de contacto</p>
            </div>
            <div className="w-full mt-6">
              <p className="text-md text-pink-800">Meios de Pagamento</p>
              <CheckPagamento
              // selectedPagamento={selectedPagamento}
              // setSelectedPagamento={setSelectedPagamento}
              // onChange={handlePaymentChange}
              />
            </div>
            <div className="w-full mt-6">
              <p className="text-md text-pink-800">Linguas</p>
              <CheckLinguas
              // selectedLingua={selectedLingua}
              // setSelectedLingua={setSelectedLingua}
              // onChange={handleLinguaChange}
              />
            </div>
            <div className="w-full mt-6">
              <p className="text-md text-pink-800">Servicos</p>
              <CheckServico
                selectedServico={selectedServico}
                setSelectedServico={setSelectedServico}
              />
            </div>
            <div className="w-full mt-6">
              <p className="text-md text-pink-800">Descrição</p>
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
  );
};

export default ModificarContacto;
