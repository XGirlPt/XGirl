"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateServico,
  updateLingua,
  updatePagamento,
  updateDescription,
  updateTarifa,
} from "@/actions/ProfileActions";
import CheckPagamento from "@/components/Register/CheckPagamento";
import CheckLinguas from "@/components/Register/CheckLinguas";
import CheckServico from "@/components/Register/CheckServico";
import FiltroTarifa from "@/components/Filtros/FiltroTarifa";
import { updateProfileData } from "@/services/profileService";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Field, Label, Textarea } from '@headlessui/react';
import clsx from 'clsx';



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

  const tarifaRedux = useSelector(
    (state: any) => state.profile?.profile?.tarifa
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

  const [selectedTarifa, setSelectedTarifa] = useState<string[]>(
    tarifaRedux || []
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

  const handleTarifaChange = (updatedTarifa: string[]) => {
    dispatch(updateTarifa(updatedTarifa));
    setSelectedTarifa(updatedTarifa);
  };

  const handleServicoChange = (updatedServico: string[]) => {
    dispatch(updateServico(updatedServico));
    setSelectedServico(updatedServico);
  };

 
  const handleGuardar = async () => {
    const dataToUpdate = {
      pagamento: selectedPagamento,
      lingua: selectedLingua,
      servico: selectedServico,
      tarifa: selectedTarifa,
      description: description || null,    };

    try {
      const response = await updateProfileData(dataToUpdate, userUID);
      toast.success("Alteração efetuada com sucesso!", {
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
      dispatch(updateTarifa(selectedTarifa));
      console.log(
        "Informações de contato atualizadas com sucesso na base de dados!"
      );
    } catch (error: any) {
      console.error("Erro ao atualizar perfil na base de dados:" + error);
      toast.error("Erro ao atualizar perfil na base de dados: " + error, {
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 backdrop-blur-md">
      <ToastContainer />
      <div className="bg-gradient-to-b from-gray-900 to-gray-700 h-4/5 mt-16 mb-16 border border-zinc-600 rounded-3xl max-w-screen-lg shadow-2xl w-full overflow-y-auto flex flex-col">
        <div className="p-10">
          <h2 className="text-5xl text-pink-500 mb-8 font-bold text-center">
            Modificar Perfil
          </h2>

          <div className="flex flex-col mb-6">
            <div className="w-44 mb-6">
              <FiltroTarifa />
            </div>

            <div className="w-full mt-2">
              <p className="text-lg text-pink-400 font-semibold mb-2">Meios de Pagamento</p>
              <CheckPagamento />
            </div>

            <div className="w-full mt-4">
              <p className="text-lg text-pink-400 font-semibold mb-2">Línguas</p>
              <CheckLinguas />
            </div>

            <div className="w-full mt-4">
              <p className="text-lg text-pink-400 font-semibold mb-2">Serviços</p>
              <CheckServico
                selectedServico={selectedServico}
                setSelectedServico={setSelectedServico}
              />
            </div>

        
            <div className="w-full mt-6">
  <Field>
    <Label className="text-md text-pink-800">Descrição</Label>
    <Textarea
      name="description"
      value={description}
      onChange={(e) => handleDescriptionChange(e.target.value)} // Ajuste aqui
      className={clsx(
        "w-full h-32 p-4 border rounded-lg",
        "data-[hover]:shadow-lg data-[focus]:bg-gray-300",
        "focus:outline-none focus:ring-2 focus:ring-pink-800 text-gray-700"
      )}
      placeholder="Escreva a descrição aqui..."
    />
  </Field>
</div>


          </div>
        </div>

        <div className="flex justify-between items-end px-8 py-6 bg-gradient-to-b from-gray-800 to-gray-700 rounded-b-3xl border-t border-gray-600 sticky bottom-0">
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

export default ModificarContacto;
