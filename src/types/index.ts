export interface Profile {
  id: number;
  nome: string;

  photos: string[];
  photoURL: string[];

  stories: string[];
  storyURL: string[];
  

  userUID?: string;
  description?: string;
  localidade?: string;
  tag?: string;
  tagtimestamp?: Date;
  tarifa: number;
  lingua: string[];
  telefone: string;
  email: string;
  idade: number;
  altura: string;
  distrito: string;
  origem: string;
  cidade: string;
  peso: string;
  tatuagens: string;
  pelos: string;
  olhos: string;
  seios: string;
  mamas: string;
  signo: string;
  pagamento: string[];
  verificationPhotoURL: string;
  inactive: boolean;
  certificado: boolean
}
