"use client"; // Adicione esta linha no início do arquivo

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // Atualize a importação para 'next/navigation'
import { supabase } from "../../database/supabase";
import { Profile } from "../../types";

const AdminPage: React.FC = () => {
    const [pendingProfiles, setPendingProfiles] = useState<Profile[]>([]);
    const [approvedProfiles, setApprovedProfiles] = useState<Profile[]>([]);
    const router = useRouter(); // Para redirecionar

    useEffect(() => {
        fetchPendingProfiles();
        fetchApprovedProfiles();
    }, []);

    const fetchPendingProfiles = async () => {
        const { data, error } = await supabase
            .from('ProfilesData')
            .select('*')
            .eq('aprovado', false);

        if (error) {
            console.error("Error fetching profiles:", error);
        } else {
            setPendingProfiles(data as Profile[]);
        }
    };

    const fetchApprovedProfiles = async () => {
        const { data, error } = await supabase
            .from('ProfilesData')
            .select('*')
            .eq('aprovado', true);

        if (error) {
            console.error("Error fetching approved profiles:", error);
        } else {
            setApprovedProfiles(data as Profile[]);
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
            fetchPendingProfiles();
            fetchApprovedProfiles();
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
            fetchPendingProfiles();
            fetchApprovedProfiles();
        }
    };

    const handleDisapprove = async (id: number) => {
        const { error } = await supabase
            .from('ProfilesData')
            .update({ aprovado: false })
            .eq('id', id);

        if (error) {
            console.error("Error disapproving profile:", error);
        } else {
            fetchPendingProfiles();
            fetchApprovedProfiles();
        }
    };

    const viewProfile = (nome: string) => {
        router.push(`/Acompanhantes/${nome}`);
    };

    return (
        <div className="p-6 bg-gray-800 min-h-screen">
            {/* Seção de Perfis Pendentes */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-4">Perfis Pendentes</h1>
                {pendingProfiles.length === 0 ? (
                    <p className="text-white">Nenhum perfil pendente</p>
                ) : (
                    <ul className="space-y-4">
                        {pendingProfiles.map((profile) => (
                            <li key={profile.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md">
                                <div className="text-white">
                                    <p className="font-semibold">Nome: {profile.nome}</p>
                                    <p>Idade: {profile.idade}</p>
                                    <p>Cidade: {profile.cidade}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => handleApprove(profile.id)} 
                                        className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors duration-300"
                                    >
                                        Aprovar
                                    </button>
                                    <button 
                                        onClick={() => handleReject(profile.id)} 
                                        className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-300"
                                    >
                                        Rejeitar
                                    </button>
                                    {/* <button 
                                        onClick={() => viewProfile(profile.nome)} 
                                        className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
                                    >
                                        Ver Perfil
                                    </button> */}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Seção de Perfis Aprovados */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">Perfis Aprovados</h1>
                {approvedProfiles.length === 0 ? (
                    <p className="text-white">Nenhum perfil aprovado</p>
                ) : (
                    <ul className="space-y-4">
                        {approvedProfiles.map((profile) => (
                            <li key={profile.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md">
                                <div className="text-white">
                                    <p className="font-semibold">Nome: {profile.nome}</p>
                                    <p>Idade: {profile.idade}</p>
                                    <p>Cidade: {profile.cidade}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button 
                                        className="p-2 rounded-lg bg-green-800 text-white cursor-not-allowed"
                                    >
                                        Aprovado
                                    </button>
                                    <button 
                                        onClick={() => handleDisapprove(profile.id)} 
                                        className="p-2 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700 transition-colors duration-300"
                                    >
                                        Desaprovar
                                    </button>
                                    <button 
                                        onClick={() => viewProfile(profile.nome)} 
                                        className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
                                    >
                                        Ver Perfil
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
