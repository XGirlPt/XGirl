"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { supabase } from "../../database/supabase";
import { Profile } from "@/types";
import Image from "next/image";

const AdminPage: React.FC = () => {
  const [pendingProfiles, setPendingProfiles] = useState<Profile[]>([]);
  const [approvedProfiles, setApprovedProfiles] = useState<Profile[]>([]);
  const [inactiveProfiles, setInactiveProfiles] = useState<Profile[]>([]);
  const [ActiveProfiles, setActiveProfiles] = useState<Profile[]>([]);

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

      const profilesWithPhotos = await Promise.all(data.map(async (profile: Profile) => {
        // Fetch profile photo
        const { data: profilePhotoData, error: profilePhotoError } = await supabase
          .from("profilephoto")
          .select("*")
          .eq("userUID", profile.userUID);

        if (profilePhotoError) {
          console.error("Error fetching profile photos:", profilePhotoError);
        }

        const profilePhotoURL = profilePhotoData && profilePhotoData.length > 0 ? profilePhotoData[0].imageurl : null;
        console.log(profilePhotoURL, "foto de perfil")

        // Fetch verification photo
        const { data: verificationPhotoData, error: verificationPhotoError } = await supabase
          .from("VPhoto")
          .select("*")
          .eq("userUID", profile.userUID);

        if (verificationPhotoError) {
          console.error("Error fetching verification photos:", verificationPhotoError);
        }

        const verificationPhotoURL = verificationPhotoData && verificationPhotoData.length > 0 ? verificationPhotoData[0].imageurl : null;
console.log(verificationPhotoURL, "foto de verificacao")
        return {
          ...profile,
          photoURL: profilePhotoURL,
          verificationPhotoURL: verificationPhotoURL,
        };
      }));

      console.log("Fetched pending profiles:", profilesWithPhotos);
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

      const profilesWithPhotos = await Promise.all(data.map(async (profile: Profile) => {
        // Fetch profile photo
        const { data: profilePhotoData, error: profilePhotoError } = await supabase
          .from("profilephoto")
          .select("*")
          .eq("userUID", profile.userUID);

        if (profilePhotoError) {
          console.error("Error fetching profile photos:", profilePhotoError);
        }

        const profilePhotoURL = profilePhotoData && profilePhotoData.length > 0 ? profilePhotoData[0].imageurl : null;





        // Fetch verification photo
        const { data: verificationPhotoData, error: verificationPhotoError } = await supabase
          .from("VPhoto")
          .select("*")
          .eq("userUID", profile.userUID);

        if (verificationPhotoError) {
          console.error("Error fetching verification photos:", verificationPhotoError);
        }

        const verificationPhotoURL = verificationPhotoData && verificationPhotoData.length > 0 ? verificationPhotoData[0].imageurl : null;


        
        return {
          ...profile,
          photoURL: profilePhotoURL,
          verificationPhotoURL: verificationPhotoURL,
        };
      }));

      

      console.log("Fetched approved profiles:", profilesWithPhotos);
      setApprovedProfiles(profilesWithPhotos);
    } catch (error) {
      console.error("Error fetching approved profiles:", error.message);
    }
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

  const handleDisapprove = async (id: number) => {
    const { error } = await supabase
      .from('ProfilesData')
      .update({ aprovado: false })
      .eq('id', id);

    if (error) {
      console.error("Error disapproving profile:", error)
    } else {
      fetchProfiles();
    }
  };

  const handleDeactivate = async (id: number) => {
    const { error } = await supabase
      .from('ProfilesData')
      .update({ inactive: true })
      .eq('id', id);

    if (error) {
      console.error("Error deactivating profile:", error);
    } else {
      fetchProfiles();
    }
  };

  const fetchInactiveProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('ProfilesData')
        .select('*')
        .eq('inactive', true); // Filtrar perfis onde bloqueado é true
  
      if (error) {
        throw error;
      }
  
      const profilesWithPhotos = await Promise.all(data.map(async (profile: Profile) => {
        // Buscar foto de perfil
        const { data: profilePhotoData, error: profilePhotoError } = await supabase
          .from("profilephoto")
          .select("*")
          .eq("userUID", profile.userUID);
  
        if (profilePhotoError) {
          console.error("Error fetching profile photos:", profilePhotoError);
        }
  
        const profilePhotoURL = profilePhotoData && profilePhotoData.length > 0 ? profilePhotoData[0].imageurl : null;
  
        // Buscar foto de verificação
        const { data: verificationPhotoData, error: verificationPhotoError } = await supabase
          .from("VPhoto")
          .select("*")
          .eq("userUID", profile.userUID);
  
        if (verificationPhotoError) {
          console.error("Error fetching verification photos:", verificationPhotoError);
        }
  
        const verificationPhotoURL = verificationPhotoData && verificationPhotoData.length > 0 ? verificationPhotoData[0].imageurl : null;
  
        return {
          ...profile,
          photoURL: profilePhotoURL,
          verificationPhotoURL: verificationPhotoURL,
        };
      }));
  
      console.log("Fetched Active profiles:", profilesWithPhotos);
      setInactiveProfiles(profilesWithPhotos);
    } catch (error) {
      console.error("Error fetching active profiles:", error.message);
    }
  };
  
  const fetchActiveProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('ProfilesData')
        .select('*')
        .eq('inactive', false); // Filtrar perfis onde bloqueado é true
  
      if (error) {
        throw error;
      }
  
      const profilesWithPhotos = await Promise.all(data.map(async (profile: Profile) => {
        // Buscar foto de perfil
        const { data: profilePhotoData, error: profilePhotoError } = await supabase
          .from("profilephoto")
          .select("*")
          .eq("userUID", profile.userUID);
  
        if (profilePhotoError) {
          console.error("Error fetching profile photos:", profilePhotoError);
        }
  
        const profilePhotoURL = profilePhotoData && profilePhotoData.length > 0 ? profilePhotoData[0].imageurl : null;
  
        // Buscar foto de verificação
        const { data: verificationPhotoData, error: verificationPhotoError } = await supabase
          .from("VPhoto")
          .select("*")
          .eq("userUID", profile.userUID);
  
        if (verificationPhotoError) {
          console.error("Error fetching verification photos:", verificationPhotoError);
        }
  
        const verificationPhotoURL = verificationPhotoData && verificationPhotoData.length > 0 ? verificationPhotoData[0].imageurl : null;
  
        return {
          ...profile,
          photoURL: profilePhotoURL,
          verificationPhotoURL: verificationPhotoURL,
        };
      }));
  
      console.log("Fetched blocked profiles:", profilesWithPhotos);
      setActiveProfiles(profilesWithPhotos);
    } catch (error) {
      console.error("Error fetching blocked profiles:", error.message);
    }
  };

  const viewProfile = (nome: string) => {
    router.push(`/Acompanhantes/${nome}`);
  };

  console.log()

  return (
    <div className="p-6 bg-gray-800 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Perfis Pendentes de Verificação</h1>
        {pendingProfiles.length === 0 ? (
          <p className="text-white">Nenhum perfil pendente</p>
        ) : (
          <ul className="space-y-4">
            {pendingProfiles.map((profile) => (
              <li key={profile.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-4">
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
                    {profile.verificationPhotoURL ? (
                      <Image
                        src={profile.verificationPhotoURL}
                        alt={`Verification Photo`}
                        className="w-16 h-16 object-cover rounded-full"
                        width={64}
                        height={64}
                      />
                    ) : (
                      <p className="text-white">Sem foto de verificação</p>
                    )}
                  </div>
                  <div className="text-white">
                    <p className="font-semibold">Nome: {profile.nome}</p>
                    <p>Idade: {profile.idade}</p>
                    <p>Cidade: {profile.cidade}</p>
                    <p>UserUID: {profile.userUID}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => viewProfile(profile.nome)} 
                    className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
                  >
                    Ver Perfil
                  </button>
                  <button 
                    onClick={() => handleApprove(profile.id)} 
                    className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors duration-300"
                  >
                    Aprovar Verificação
                  </button>
                  <button 
                    onClick={() => handleReject(profile.id)} 
                    className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duração-300"
                  >
                    Rejeitar Verificação
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
  
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">Perfis Aprovados</h1>
        {approvedProfiles.length === 0 ? (
          <p className="text-white">Nenhum perfil aprovado</p>
        ) : (
          <ul className="space-y-4">
            {approvedProfiles.map((profile) => (
              <li key={profile.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-4">
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
                    {profile.verificationPhotoURL ? (
                      <Image
                        src={profile.verificationPhotoURL}
                        alt={`Verification Photo`}
                        className="w-16 h-16 object-cover rounded-full"
                        width={64}
                        height={64}
                      />
                    ) : (
                      <p className="text-white">Sem foto de verificação</p>
                    )}
                  </div>
                  <div className="text-white">
                    <p className="font-semibold">Nome: {profile.nome}</p>
                    <p className="font-semibold">Idade: {profile.idade}</p>
                    <p className="font-semibold">Cidade: {profile.cidade}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => viewProfile(profile.nome)} 
                    className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
                  >
                    Ver Perfil
                  </button>
                  <button 
                    onClick={() => handleDisapprove(profile.id)} 
                    className="p-2 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700 transition-colors duração-300"
                  >
                    Desaprovar Verificação
                  </button>
                  <button 
                    onClick={() => viewProfile(profile.nome)} 
                    className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duração-300"
                  >
                    Suspender Perfil
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
  <h1 className="text-3xl font-bold text-white mb-4 mt-10">Perfis Activos</h1>
  {ActiveProfiles.length === 0 ? (
    <p className="text-white">Nenhum perfil Activo</p>
  ) : (
    <ul className="space-y-4">
      {ActiveProfiles.map((profile) => (
        <li key={profile.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-4">
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
              {profile.verificationPhotoURL ? (
                <Image
                  src={profile.verificationPhotoURL}
                  alt={`Verification Photo`}
                  className="w-16 h-16 object-cover rounded-full"
                  width={64}
                  height={64}
                />
              ) : (
                <p className="text-white">Sem foto de verificação</p>
              )}
            </div>
            <div className="text-white">
              <p className="font-semibold">Nome: {profile.nome}</p>
              <p className="font-semibold">Idade: {profile.idade}</p>
              <p className="font-semibold">Cidade: {profile.cidade}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => viewProfile(profile.nome)} 
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
            >
              Ver Perfil
            </button>
           
            <button 
            onClick={() => handleDeactivate(profile.id)}
            className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duração-300"
>
            
              Desactivar Perfil
            </button>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>


      <div>
  <h1 className="text-3xl font-bold text-white mb-4 mt-10">Perfis Inactivos</h1>
  {inactiveProfiles.length === 0 ? (
    <p className="text-white">Nenhum perfil Inactivo</p>
  ) : (
    <ul className="space-y-4">
      {inactiveProfiles.map((profile) => (
        <li key={profile.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-4">
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
              {profile.verificationPhotoURL ? (
                <Image
                  src={profile.verificationPhotoURL}
                  alt={`Verification Photo`}
                  className="w-16 h-16 object-cover rounded-full"
                  width={64}
                  height={64}
                />
              ) : (
                <p className="text-white">Sem foto de verificação</p>
              )}
            </div>
            <div className="text-white">
              <p className="font-semibold">Nome: {profile.nome}</p>
              <p className="font-semibold">Idade: {profile.idade}</p>
              <p className="font-semibold">Cidade: {profile.cidade}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => viewProfile(profile.nome)} 
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
            >
              Ver Perfil
            </button>
           
            <button 
              onClick={() => viewProfile(profile.nome)} 
              className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors duração-300"
            >
              Activar Perfil
            </button>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>

    </div>
  );
}

export default AdminPage;
