"use client"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaMapMarkerAlt, FaUser, FaCamera } from "react-icons/fa";
import supabase from "@/database/supabase";
import ModificarPerfil from "./_ui/ModificarPerfil";
import ModificarContacto from "./_ui/ModificarContacto";
import ModificarFotos from "./_ui/ModificarFotos";
import { BlurImage } from "@/components/BlurImage";
import SideBarConta from "@/components/SidebarConta";
import { useDispatch } from "react-redux";
import { updateTag } from "@/actions/ProfileActions";
import Definicoes from "../Definicoes/page";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface MinhaContaProps {}

const MinhaConta: React.FC<MinhaContaProps> = () => {
  const [showModificar, setShowModificar] = useState(false);
  const [showContacto, setShowContacto] = useState(false);
  const [showFotos, setShowFotos] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newTag, setNewTag] = useState<string>("");
  const [certificado, setCertificado] = useState<boolean | null>(null); // Guardar o estado do certificado


  const emailRedux = useSelector((state: any) => state.profile?.user?.user?.email);
  const tagRedux = useSelector((state: any) => state.profile?.profile?.tag);
  const cidadeRedux = useSelector((state: any) => state.profile?.profile?.cidade);
  const nomeRedux = useSelector((state: any) => state.profile?.profile?.nome);
  const photoURLsRedux = useSelector((state: any) => state.profile?.profile?.photos);


  const dispatch = useDispatch(); // Instanciar o dispatch
  
  const [nome, setNome] = useState<string | undefined>(nomeRedux);

  useEffect(() => {
    setNome(nomeRedux);
  }, [nomeRedux]);

  const handleVoltar = () => {
    setShowModificar(false);
    setShowContacto(false);
    setShowFotos(false);
  };


  const [activeContent, setActiveContent] = useState("minhaConta");

  const handleDefinicoes = () => {
    setActiveContent("definicoes"); // Altera o conteúdo para definições
  };

  // New function to handle updating the tag
  const handleAtualizarEstado = async () => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      console.error("Erro ao obter sessão:", sessionError);
      return;
    }
  
    const userUID = session.user.id; // Use o ID do usuário da sessão
    console.log("userId:", userUID); // Verifique se isso é o que você espera
  



    
    const { data, error } = await supabase
      .from('ProfilesData') // Certifique-se de que 'profiles' é o nome correto da sua tabela
      .update({ tag: newTag }) // Atualiza a coluna 'tag' com o novo valor
      .eq("userUID", userUID);
  
    if (error) {
      console.error("Erro ao atualizar o estado:", error.message || error);
    } else {
      console.log("Estado atualizado com sucesso:", data);
      dispatch(updateTag(newTag)); // Atualizar a tag no Redux

      setNewTag(""); // Limpa o campo após a atualização
      toast.success("Nova tag foi alterada com sucesso!");

    }
  };


  useEffect(() => {
    const fetchCertificado = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        console.error("Erro ao obter sessão:", sessionError);
        return;
      }

      const userUID = session.user.id;

      const { data, error } = await supabase
        .from('ProfilesData') // Substitua pelo nome correto da sua tabela
        .select('certificado')
        .eq('userUID', userUID)
        .single();

      if (error) {
        console.error("Erro ao buscar certificado:", error.message || error);
      } else {
        setCertificado(data?.certificado); // Atualiza o estado com o valor do certificado
      }
    };

    fetchCertificado();
  }, []);

  // Função para determinar a cor e mensagem da notificação com base no valor de "certificado"
  const renderNotification = () => {
    if (certificado === true) {
      return (
        <div className="bg-green-600 text-white px-4 py-3 flex justify-between items-center">
          <span>✅ O teu perfil está certificado.</span>
          <button
            onClick={() => setCertificado(null)}
            className="text-lg"
          >
            &times;
          </button>
        </div>
      );
    } else if (certificado === null) {
      return (
        <div className="bg-yellow-600 text-white px-4 py-3 flex justify-between items-center">
          <span>⚠️ O teu perfil aguarda verificação da nossa equipa.</span>
          <button
            onClick={() => setCertificado(null)}
            className="text-lg"
          >
            &times;
          </button>
        </div>
      );
    } else if (certificado === false) {
      return (
        <div className="bg-red-600 text-white px-4 py-3 flex justify-between items-center">
          <span>❌ O teu perfil não está certificado. Adiciona uma foto de verificação para certificar o teu perfil.</span>
          <button
            onClick={() => setCertificado(null)}
            className="text-lg"
          >
            &times;
          </button>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        console.log("Sessão não iniciada ou erro ao verificar a sessão:", error);
      } else {
        console.log("Sessão iniciada:", session);
        console.log("Usuário:", session.user);
      }
    };

    getSession();
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100">
       <ToastContainer />
      {/* Notification Bar */}
      {renderNotification()}

      <div className="flex ">
        {/* Sidebar */}
        <SideBarConta
          sidebarOpen={sidebarOpen}
          handleModificar={() => setShowModificar(true)}
          showModificar={showModificar}
          handleContacto={() => setShowContacto(true)}
          showContacto={showContacto}
          handleFotos={() => setShowFotos(true)}
          showFotos={showFotos}
          handleDefinicoes={() => {}}
          handleVerPerfil={() => {}}
        />

        {/* Main Content */}
        <main
          className={`flex-1 pb-20 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : ""
          }`}
          style={{ marginTop: "80px" }} // Margin-top adjusted to accommodate header height
        >

{activeContent === "definicoes" ? (
          <Definicoes /> // Renderiza o componente de definições
        ) : (
          <div className="flex flex-col items-center">
            {/* Profile Header */}
            <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center">
                <div className="relative w-32 h-32 mb-4 md:mb-0 md:mr-6">
                  {photoURLsRedux?.length > 0 ? (
                    <BlurImage
                      src={photoURLsRedux[0]}
                      alt={`Foto de ${nomeRedux}`}
                      className="w-full h-full rounded-full object-cover shadow-md"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-600 flex items-center justify-center">
                      <FaUser className="text-5xl text-gray-400" />
                    </div>
                  )}
                  <button className="absolute bottom-0 right-0 bg-pink-600 text-white p-2 rounded-full shadow-md hover:bg-pink-700 transition-colors">
                    <FaCamera />
                  </button>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold">{nomeRedux}</h1>
                  <p className="flex items-center justify-center md:justify-start text-pink-600 mt-2">
                    <FaMapMarkerAlt className="mr-2" />
                    {cidadeRedux}
                  </p>
                  <p className="text-gray-400 mt-1">{tagRedux}</p>
                </div>
              </div>
              {/* Status Update */}
              <div className="mt-6 bg-gray-700 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Estado Atual</h2>
                <p className="text-gray-300 mb-4">
                  {tagRedux || "Sem estado definido"}
                </p>
                <h2 className="text-xl font-semibold mb-2">Atualiza o teu Estado</h2>
                <div className="flex flex-col sm:flex-row items-center">
                  <input
                    type="text"
                    className="w-full sm:w-auto flex-1 p-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Escreva o novo estado"
                  />
                 <button 
  onClick={handleAtualizarEstado} // Sem passar userUID
  className="mt-2 sm:mt-0 sm:ml-4 px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-md transition-colors"
>
  Actualizar Estado
</button>
                </div>
              </div>
            </div>

            {/* Action Panels */}
            <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6">
              {showModificar && (
                <ModificarPerfil
                  handleVoltar={handleVoltar}
                  onClose={() => setShowModificar(false)}
                />
              )}
              {showContacto && (
                <ModificarContacto
                  handleVoltar={handleVoltar}
                  onClose={() => setShowContacto(false)}
                />
              )} 
              {showFotos && <ModificarFotos      
 handleVoltar={handleVoltar} />}
              {!showModificar && !showContacto && !showFotos && (
                <div className="text-center text-gray-400">
                  Selecione uma opção no menu para modificar as suas informações.
                </div>
              )}
            </div>
          </div>
           )}
        </main>
      </div>
    </div>
  );
};

export default MinhaConta;
