// import { NextRequest, NextResponse } from 'next/server';
// import supabase from "../../../../database/supabase";

// export async function GET(req: NextRequest, { params }) {
//   const { nome } = params;

//   try {
//     const { data: profile, error } = await supabase
//       .from('ProfilesData')
//       .select('*')
//       .eq('nome', nome)
//       .single();

//     if (error) {
//       return NextResponse.json({ message: 'Erro ao buscar o perfil' }, { status: 500 });
//     }

//     if (!profile) {
//       return NextResponse.json({ message: 'Perfil não encontrado' }, { status: 404 });
//     }

//     if (!profile.aprovado) {
//       return NextResponse.json({ message: 'Perfil não aprovado' }, { status: 403 });
      
//     }

//     const { data: photoData, error: photoError } = await supabase
//       .from('profilephoto')
//       .select('*')
//       .eq('userUID', profile.userUID);

//     if (photoError) {
//       return NextResponse.json({ message: 'Erro ao buscar fotos do perfil' }, { status: 500 });
//     }

//     const combinedProfileData = {
//       ...profile,
//       photoURL: photoData.map((photo) => photo.imageurl),
//     };

//     return NextResponse.json(combinedProfileData, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: 'Erro ao buscar o perfil' }, { status: 500 });
//   }
// }
