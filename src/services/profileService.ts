import supabase from "../database/supabase";
import { Profile } from "@/types";

// FETCH PROFILE START
export async function fetchProfiles() {
  try {
    const { data: profilesData, error: profilesError } = await supabase
      .from("ProfilesData")
      .select("*")
      .eq('status', true);

    if (profilesError) {
      throw profilesError;
    }

    // Buscar fotos dos perfis
    const { data: photosData, error: photosError } = await supabase
      .from("profilephoto")
      .select("*");

    if (photosError) {
      throw photosError;
    }

    // Buscar fotos de verificação
    const { data: VphotosData, error: VphotosError } = await supabase
      .from("VPhoto")
      .select("*");

    if (VphotosError) {
      throw VphotosError;
    }

    // Combinar dados dos perfis com dados das fotos e fotos de verificação usando a chave estrangeira
    const combinedProfiles = profilesData.map((profile) => {
      const photos = photosData.filter(
        (photo) => photo.userUID === profile.userUID
      );
      const VPhotos = VphotosData.filter(
        (VPhoto) => VPhoto.userUID === profile.userUID
      );
      return {
        ...profile,
        photos: photos.map((photo) => photo.imageurl), // Supondo que a URL da imagem seja armazenada em 'imageurl'
        verificationPhotos: VPhotos.map((photo) => photo.imageurl) // Supondo que a URL da imagem de verificação seja armazenada em 'imageurl'
      };
    });

    console.log("Perfis combinados com fotos:", combinedProfiles);
    return combinedProfiles; // Retornar os perfis combinados com as fotos
  } catch (error) {
    console.error("Error fetching profiles:", error.message);
    throw error;
  }
}
// END FETCH PROFILE

// FETCH PHOTOS PROFILE START

export async function fetchProfilePhotos() {
  try {
    const { data: photosData, error: photosError } = await supabase
      .from("profilephoto")
      .select("*");

    if (photosError) {
      throw photosError;
    }

    return photosData;
  } catch (error) {
    console.error("Error fetching profile photos:", error.message);
    throw error;
  }
}


// FETCH VERIFICATION PHOTOS PROFILE START
export async function fetchVPhotos() {
  try {
    const { data: VphotosData, error: VphotosError } = await supabase
      .from("VPhoto")
      .select("*");

    if (VphotosError) {
      throw VphotosError;
    }

    return VphotosData;
  } catch (error) {
    console.error("Error fetching verification photos:", error.message);
    throw error;
  }
}
// END FETCH PHOTOS PROFILE

// FETCH ESTABELECIMENTOS START

export async function fetchClubs() {
  try {
    const { data: clubsData, error: clubsError } = await supabase
      .from("estabelecimentos")
      .select("*");

    if (clubsError) {
      throw clubsError;
    }

    return clubsData.map((club) => ({
      photos: club.photos, // Supondo que 'photos' é a chave onde estão armazenadas as fotos
      distrito: club.distrito, // Supondo que 'distrito' é a chave onde está armazenado o distrito
      nome: club.nome, // Supondo que 'nome' é a chave onde está armazenado o nome do clube/estabelecimento
      // Adicione outras informações conforme necessário
    }));
  } catch (error) {
    console.error("Error fetching clubs:", error.message);
    throw error;
  }
}
// END FETCH ESTABELECIMENTOS




export const fetchProfileFromDatabase = async (userUID: string) => {
  try {
    // Recupera os dados do perfil do usuário
    const { data: profileData, error: profileError } = await supabase
      .from("ProfilesData")
      .select("*")
      .eq("userUID", userUID)
      .single();

    console.log("Profile Data:", profileData);

    if (profileError) {
      throw new Error("Erro ao buscar dados do perfil");
    }

    // Recupera os URLs das fotos do perfil do usuário
    const { data: photoData, error: photoError } = await supabase
      .from("profilephoto")
      .select("imageurl")
      .eq("userUID", userUID)
    

    if (photoError) {
      throw new Error("Erro ao buscar URLs das fotos do perfil");
    }

    // Recupera os URLs das fotos de verificação do perfil do usuário
    const { data: VPhotoData, error: VPhotoError } = await supabase
      .from("VPhoto")
      .select("imageurl")
      .eq("userUID", userUID);

    if (VPhotoError) {
      throw new Error("Erro ao buscar URLs das fotos de verificação do perfil");
    }

    // Combina os dados do perfil do usuário com os URLs das fotos e fotos de verificação
    const profileWithPhotos = {
      ...profileData,
      photos: photoData.map((photo) => photo.imageurl),
      verificationPhotos: VPhotoData.map((photo) => photo.imageurl),
    };

    console.log("Dados do perfil recuperados:", profileWithPhotos); // Adicione este log para verificar os dados recuperados
    return profileWithPhotos;
  } catch (error) {
    console.error("Erro ao buscar dados do perfil:", error.message);
    throw error;
  }
};

// UPDATE DATA PERFIL START

export async function updateProfileData(dataToUpdate, userUID) {
  try {
    console.log("Data to update:", dataToUpdate);
    console.log("User UID:", userUID);

    const { data, error } = await supabase
      .from("ProfilesData")
      .update(dataToUpdate)
      .eq("userUID", userUID);
      
    console.log("Response from Supabase:", data, error);

    if (error) {
      console.error("Erro ao atualizar o perfil:", error.message);
    } else {
      console.log("Perfil atualizado com sucesso:", data);
      // Aqui você pode adicionar qualquer ação que deseja executar após a atualização do perfil
    }
  } catch (error) {
    console.error("Erro ao atualizar o perfil:", error.message);
  }
}
// END UPDATE DATA PERFIL

// UPDATE PROFILE TAG START
export async function updateProfileTag(userUID, newTagValue) {
  try {
    const { data, error } = await supabase
      .from("ProfilesData")
      .update({
        tag: newTagValue, // Sua nova "tag"
        tagTimestamp: new Date().toISOString(), // Atualiza o timestamp para agora
      })
      .eq("userUID", userUID);

    if (error) {
      console.error("Erro ao atualizar a tag do perfil:", error.message);
    } else {
      console.log("Tag do perfil atualizada com sucesso:", data);
    }
  } catch (error) {
    console.error("Erro ao atualizar a tag do perfil:", error.message);
  }
}
// END UPDATE PROFILE TAG

// UPDATE VERIFICATION PHOTO START


// export const fetchNonCertificatedProfiles = async (
//   setNoncertificatedProfiles: (profiles: Profile[]) => void
// ) => {
//   try {
//     const { data, error } = await supabase
//       .from('ProfilesData')
//       .select('*')
//       .eq('certificado', false);

//     if (error) {
//       throw error;
//     }

//     const profilesWithPhotos = await Promise.all(data.map(fetchProfilePhotos));
//     setNoncertificatedProfiles(profilesWithPhotos);
//   } catch (error) {
//     console.error("Error fetching non-certificated profiles:", error.message);
//   }
// };


// END UPDATE VERIFICATION PHOTO



