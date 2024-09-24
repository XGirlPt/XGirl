"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { supabase } from "../../database/supabase";
import { Profile } from "@/types";
import Image from "next/image";
import SidebarAdmin from "../../components/SideBarAdmin";

const AdminPage: React.FC = () => {
  const [pendingProfiles, setPendingProfiles] = useState<Profile[]>([]);
  const [approvedProfiles, setApprovedProfiles] = useState<Profile[]>([]);
  const [inactiveProfiles, setInactiveProfiles] = useState<Profile[]>([]);
  const [activeProfiles, setActiveProfiles] = useState<Profile[]>([]);
  const [activeSection, setActiveSection] = useState<string>("pending"); 
  const [expandedProfile, setExpandedProfile] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    await fetchPendingProfiles();
    await fetchApprovedProfiles();
    await fetchInactiveProfiles(); 
    await fetchActiveProfiles();
  };

  const fetchPendingProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('ProfilesData')
        .select('*')
        .eq('aprovado', false);

      if (error) {
        throw error;
      }

      const profilesWithPhotos = await Promise.all(data.map(fetchProfilePhotos));
      setPendingProfiles(profilesWithPhotos);
    } catch (error) {
      console.error("Error fetching pending profiles:", error.message);
    }
  };

  const fetchApprovedProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('ProfilesData')
        .select('*')
        .eq('aprovado', true);

      if (error) {
        throw error;
      }

      const profilesWithPhotos = await Promise.all(data.map(fetchProfilePhotos));
      setApprovedProfiles(profilesWithPhotos);
    } catch (error) {
      console.error("Error fetching approved profiles:", error.message);
    }
  };

  const fetchInactiveProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('ProfilesData')
        .select('*')
        .eq('inactive', true);

      if (error) {
        throw error;
      }

      const profilesWithPhotos = await Promise.all(data.map(fetchProfilePhotos));
      setInactiveProfiles(profilesWithPhotos);
    } catch (error) {
      console.error("Error fetching inactive profiles:", error.message);
    }
  };

  const fetchActiveProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('ProfilesData')
        .select('*')
        .eq('inactive', false);

      if (error) {
        throw error;
      }

      const profilesWithPhotos = await Promise.all(data.map(fetchProfilePhotos));
      setActiveProfiles(profilesWithPhotos);
    } catch (error) {
      console.error("Error fetching active profiles:", error.message);
    }
  };

  const fetchProfilePhotos = async (profile: Profile) => {
    const { data: profilePhotoData, error: profilePhotoError } = await supabase
      .from("profilephoto")
      .select("*")
      .eq("userUID", profile.userUID);

    const profilePhotoURL = profilePhotoData && profilePhotoData.length > 0 ? profilePhotoData[0].imageurl : null;

    return {
      ...profile,
      photoURL: profilePhotoURL,
    };
  };

  const handleApprove = async (id: number) => {
    const { error } = await supabase
      .from('ProfilesData')
      .update({ aprovado: true })
      .eq('id', id);

    if (error) {
      console.error("Error approving profile:", error);
    } else {
      fetchProfiles();
    }
  };

  const handleReject = async (id: number) => {
    const { error } = await supabase
      .from('ProfilesData')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error rejecting profile:", error);
    } else {
      fetchProfiles();
    }
  };

  const toggleExpandProfile = (id: number) => {
    setExpandedProfile(expandedProfile === id ? null : id);
  };

  const renderProfiles = () => {
    switch (activeSection) {
      case "pending":
        return renderProfileList(pendingProfiles, "Perfis Pendentes de Verificação", handleApprove, handleReject);
      case "approved":
        return renderProfileList(approvedProfiles, "Perfis Verificados");
      case "inactive":
        return renderProfileList(inactiveProfiles, "Perfis Inativos", handleApprove, handleReject);
      case "active":
        return renderProfileList(activeProfiles, "Perfis Ativos");
      default:
        return <p className="text-white">Selecione uma seção</p>;
    }
  };

  const renderProfileList = (
    profiles: Profile[],
    title: string,
    approveHandler?: (id: number) => void,
    rejectHandler?: (id: number) => void
  ) => (
    <div className="mb-8 ml-10">
      <h1 className="text-3xl font-bold text-white mb-8 mt-8">{title}</h1>
      {profiles.length === 0 ? (
        <p className="text-white">Nenhum perfil nesta seção</p>
      ) : (
        <ul className="space-y-4">
          {profiles.map((profile) => (
            <li key={profile.id} className="flex flex-col p-4 bg-gray-700 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                {profile.photoURL ? (
                  <Image
                    src={profile.photoURL}
                    alt={`Profile Photo`}
                    className="w-16 h-16 object-cover rounded-full"
                    width={64}
                    height={64}
                  />
                ) : (
                  <p className="text-white">Sem fotos</p>
                )}
                <div className="text-white flex-1 ml-4">
                  <p className="font-semibold">Nome: {profile.nome}</p>
                  <p>Email: {profile.email}</p>
                  <p>UserUID: {profile.userUID}</p>
                </div>
                <button
                  onClick={() => toggleExpandProfile(profile.id)}
                  className="p-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors duration-300"
                >
                  {expandedProfile === profile.id ? '▲' : '▼'} 
                </button>
                {approveHandler && (
                  <button
                    onClick={() => approveHandler(profile.id)}
                    className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors duration-300"
                  >
                    Aprovar Verificação
                  </button>
                )}
                {rejectHandler && (
                  <button
                    onClick={() => rejectHandler(profile.id)}
                    className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-300"
                  >
                    Rejeitar Verificação
                  </button>
                )}
              </div>
              {expandedProfile === profile.id && (
                <div className="mt-2 text-white">
                  <p>Idade: {profile.idade}</p>
                  <p>Cidade: {profile.cidade}</p>
                  <p>Tatuagens: {profile.tatuagens}</p>
                  {/* Adicione mais informações aqui, se necessário */}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen flex">
      <SidebarAdmin setActiveSection={setActiveSection} />
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-white">Painel de Administração</h1>
        {renderProfiles()}
      </main>
    </div>
  );
};

export default AdminPage;
