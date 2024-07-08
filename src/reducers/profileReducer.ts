import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_USER,
  ADD_PROFILE_DATA,
  UPDATE_NOME,
  UPDATE_MAMAS,
  UPDATE_ALTURA,
  UPDATE_DISTRITO,
  UPDATE_ORIGEM,
  UPDATE_CORPO,
  UPDATE_CABELO,
  UPDATE_OLHOS,
  UPDATE_SEIOS,
  UPDATE_TATUAGEM,
  UPDATE_TELEFONE,
  UPDATE_PELOS,
  UPDATE_IDADE,
  UPDATE_CIDADE,
  SET_PHOTO_URL,
  UPDATE_DESCRIPTION,
  UPDATE_LINGUA,
  UPDATE_PAGAMENTO,
  UPDATE_SERVICO,
  UPDATE_SIGNO,
  UPDATE_PHOTOS,
  UPDATE_PROFILES,
  SET_SELECTED_PROFILE,
} from "../actions/ProfileActions";

// Define the state type
interface Profile {
  userUID: string | null;
  photos: string[];
  nome?: string | null;
  email?: string | null;
  idade?: number | null;
  altura?: number | null;
  cabelo?: string | null;
  cidade?: string | null;
  mamas?: string | null;
  distrito?: string | null;
  origem?: string | null;
  signo?: string | null;
  corpo?: string | null;
  olhos?: string | null;
  seios?: string | null;
  tatuagem?: string | null;
  telefone?: string | null;
  pelos?: string | null;
  lingua?: string | null;
  pagamento?: string | null;
  servico?: string | null;
  description?: string | null;
  photoURL?: string | null;
}

interface AppState {
  user: any | null;
  token: string | null;
  error: string | null;
  loading: boolean;
  isLoggedIn: boolean;
  email: string | null;
  profile: Profile;
  profiles?: Profile[];
  selectedProfile?: Profile;
}

// Define the action payload types
interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: any;
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

interface RegisterUserAction {
  type: typeof REGISTER_USER;
  payload: {
    user: any;
    token: string;
    email: string;
  };
}

interface AddProfileDataAction {
  type: typeof ADD_PROFILE_DATA;
  payload: Partial<Profile>;
}

interface UpdateNomeAction {
  type: typeof UPDATE_NOME;
  payload: string;
}

interface UpdateIdadeAction {
  type: typeof UPDATE_IDADE;
  payload: number;
}

interface UpdateCidadeAction {
  type: typeof UPDATE_CIDADE;
  payload: string;
}

interface UpdateMamasAction {
  type: typeof UPDATE_MAMAS;
  payload: string;
}

interface UpdateAlturaAction {
  type: typeof UPDATE_ALTURA;
  payload: number;
}

interface UpdateDistritoAction {
  type: typeof UPDATE_DISTRITO;
  payload: string;
}

interface UpdateOrigemAction {
  type: typeof UPDATE_ORIGEM;
  payload: string;
}

interface UpdateSignoAction {
  type: typeof UPDATE_SIGNO;
  payload: string;
}

interface UpdateCorpoAction {
  type: typeof UPDATE_CORPO;
  payload: string;
}

interface UpdateOlhosAction {
  type: typeof UPDATE_OLHOS;
  payload: string;
}

interface UpdateSeiosAction {
  type: typeof UPDATE_SEIOS;
  payload: string;
}

interface UpdateTatuagemAction {
  type: typeof UPDATE_TATUAGEM;
  payload: string;
}

interface UpdateTelefoneAction {
  type: typeof UPDATE_TELEFONE;
  payload: string;
}

interface UpdatePelosAction {
  type: typeof UPDATE_PELOS;
  payload: string;
}

interface UpdateCabeloAction {
  type: typeof UPDATE_CABELO;
  payload: string;
}

interface UpdateLinguaAction {
  type: typeof UPDATE_LINGUA;
  payload: string;
}

interface UpdatePagamentoAction {
  type: typeof UPDATE_PAGAMENTO;
  payload: string;
}

interface UpdateServicoAction {
  type: typeof UPDATE_SERVICO;
  payload: string;
}

interface UpdateDescriptionAction {
  type: typeof UPDATE_DESCRIPTION;
  payload: string;
}

interface SetPhotoUrlAction {
  type: typeof SET_PHOTO_URL;
  payload: string[];
}

interface UpdatePhotosAction {
  type: typeof UPDATE_PHOTOS;
  payload: string[];
}

interface UpdateProfilesAction {
  type: typeof UPDATE_PROFILES;
  payload: Profile[];
}

interface SetSelectedProfileAction {
  type: typeof SET_SELECTED_PROFILE;
  payload: Profile;
}

// Combine the action types in a union
type ProfileActionTypes =
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | RegisterUserAction
  | AddProfileDataAction
  | UpdateNomeAction
  | UpdateIdadeAction
  | UpdateCidadeAction
  | UpdateMamasAction
  | UpdateAlturaAction
  | UpdateDistritoAction
  | UpdateOrigemAction
  | UpdateSignoAction
  | UpdateCorpoAction
  | UpdateOlhosAction
  | UpdateSeiosAction
  | UpdateTatuagemAction
  | UpdateTelefoneAction
  | UpdatePelosAction
  | UpdateCabeloAction
  | UpdateLinguaAction
  | UpdatePagamentoAction
  | UpdateServicoAction
  | UpdateDescriptionAction
  | SetPhotoUrlAction
  | UpdatePhotosAction
  | UpdateProfilesAction
  | SetSelectedProfileAction;

// Define the initial state
const initialState: AppState = {
  user: null,
  token: null,
  error: null,
  loading: false,
  isLoggedIn: false,
  email: null,
  profile: {
    userUID: null,
    photos: [],
  },
};

// Define the reducer
const rootReducer = (
  state = initialState,
  action: ProfileActionTypes
): AppState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log("Action payload no LOGIN_SUCCESS:", action.payload);
      return {
        ...state,
        user: action.payload,
        token: action.payload.token,
        isLoggedIn: true,
        error: null,
        loading: false,
        email: action.payload.email,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isLoggedIn: false,
        error: null,
        loading: false,
        email: null,
        profile: {
          email: null,
          nome: null,
          idade: null,
          altura: null,
          cabelo: null,
          userUID: null,
          photos: [],
        },
      };

    case REGISTER_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        email: action.payload.email,
        isLoggedIn: true,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      };

    case ADD_PROFILE_DATA:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      };

    case UPDATE_NOME:
      return {
        ...state,
        profile: {
          ...state.profile,
          nome: action.payload,
        },
      };

    case UPDATE_IDADE:
      return {
        ...state,
        profile: {
          ...state.profile,
          idade: action.payload,
        },
      };

    case UPDATE_CIDADE:
      return {
        ...state,
        profile: {
          ...state.profile,
          cidade: action.payload,
        },
      };

    case UPDATE_MAMAS:
      console.log("Ação UPDATE_MAMAS foi chamada. Novo valor:", action.payload);
      return {
        ...state,
        profile: {
          ...state.profile,
          mamas: action.payload,
        },
      };

    case UPDATE_ALTURA:
      return {
        ...state,
        profile: {
          ...state.profile,
          altura: action.payload,
        },
      };

    case UPDATE_DISTRITO:
      return {
        ...state,
        profile: {
          ...state.profile,
          distrito: action.payload,
        },
      };

    case UPDATE_ORIGEM:
      return {
        ...state,
        profile: {
          ...state.profile,
          origem: action.payload,
        },
      };

    case UPDATE_SIGNO:
      return {
        ...state,
        profile: {
          ...state.profile,
          signo: action.payload,
        },
      };

    case UPDATE_CORPO:
      return {
        ...state,
        profile: {
          ...state.profile,
          corpo: action.payload,
        },
      };

    case UPDATE_OLHOS:
      return {
        ...state,
        profile: {
          ...state.profile,
          olhos: action.payload,
        },
      };

    case UPDATE_SEIOS:
      return {
        ...state,
        profile: {
          ...state.profile,
          seios: action.payload,
        },
      };

    case UPDATE_TATUAGEM:
      return {
        ...state,
        profile: {
          ...state.profile,
          tatuagem: action.payload,
        },
      };

    case UPDATE_TELEFONE:
      return {
        ...state,
        profile: {
          ...state.profile,
          telefone: action.payload,
        },
      };

    case UPDATE_PELOS:
      return {
        ...state,
        profile: {
          ...state.profile,
          pelos: action.payload,
        },
      };

    case UPDATE_CABELO:
      return {
        ...state,
        profile: {
          ...state.profile,
          cabelo: action.payload,
        },
      };

    case UPDATE_LINGUA:
      return {
        ...state,
        profile: {
          ...state.profile,
          lingua: action.payload,
        },
      };

    case UPDATE_PAGAMENTO:
      return {
        ...state,
        profile: {
          ...state.profile,
          pagamento: action.payload,
        },
      };

    case UPDATE_SERVICO:
      return {
        ...state,
        profile: {
          ...state.profile,
          servico: action.payload,
        },
      };

    case UPDATE_DESCRIPTION:
      return {
        ...state,
        profile: {
          ...state.profile,
          description: action.payload,
        },
      };

    case SET_PHOTO_URL:
      console.log("URLs das fotos recebidas no redutor:", action.payload);
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.payload,
        },
      };

    case UPDATE_PHOTOS:
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.payload,
        },
      };

    case UPDATE_PROFILES:
      console.log("Recebendo perfis para atualização:", action.payload);
      return {
        ...state,
        profiles: action.payload.map((profile) => ({
          ...profile,
          photoURL:
            profile.photoURL ||
            "https://ulcggrutwonkxbiuigdu.supabase.co/storage/v1/object/public/profileFoto/f66101fd-e346-44c8-9cdd-d99d9c01d995/1.3.png.jpg",
        })),
      };

    case SET_SELECTED_PROFILE:
      return {
        ...state,
        selectedProfile: {
          ...action.payload,
          photoURL: action.payload.photos[0],
        },
      };

    default:
      return state;
  }
};

export default rootReducer;