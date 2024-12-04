'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import supabase from '@/database/supabase';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, addProfileData } from '@/actions/ProfileActions';
import { fetchProfileFromDatabase } from '@/services/profileService';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(''); // Estado para mensagem de erro
  const router = useRouter();
  const dispatch = useDispatch();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const storedEmail = localStorage.getItem('email'); // Recuperando o email
    const storedUser = localStorage.getItem('user'); // Recuperando o user (se necessário)

    if (token && storedEmail && storedUser) {
      dispatch(loginSuccess({
        email: storedEmail, // Passando o email
        token,              // Passando o token
        user: JSON.parse(storedUser),
      }));
    }
  }, [dispatch]);

  useEffect(() => {
    const handleAuthStateChange = async (event: string) => {
      if (event === 'SIGNED_IN') {
        const returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
          router.push(returnUrl);
          localStorage.removeItem('returnUrl');
        } else {
          router.push('/');
        }
      } else {
        router.push('/login');
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  const fetchProfileData = async (userUID: string) => {
    try {
      const data = await fetchProfileFromDatabase(userUID);
      dispatch(addProfileData(data));
    } catch (error: any) {
      console.error('Erro ao buscar dados do perfil:', error.message);
    }
  };

  const handleLogin = async () => {
    setErrorMessage(''); // Limpa a mensagem de erro ao tentar fazer login
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Erro ao fazer login:', error.message);
      setErrorMessage('Email ou senha incorretos. Tente novamente.'); // Atualiza a mensagem de erro
      dispatch(loginFailure(error));
    } else {
      if (user) {
        const userUID = user.user.id;
        fetchProfileData(userUID);

        dispatch(
          loginSuccess({
            email: user.user.email || '',  // Garantindo que email não seja undefined
            token: user.session.refresh_token,
            user: user.user
          })
        );

        const tokenID = user.session.refresh_token;
        localStorage.setItem('userToken', tokenID);
        localStorage.setItem('email', email);

        router.push('/acompanhantes');
      } else {
        console.log('O objeto de usuário retornado está vazio ou undefined.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 to-gray-300 px-4 pb-20">
      {/* Texto motivador */}
      <p className="text-center text-gray-400 text-sm mb-6">
        Descubra momentos únicos com <span className="text-pink-500 font-bold">total privacidade</span> e <span className="text-pink-500 font-bold">segurança</span>.
      </p>
  
      <div className="bg-gray-800 w-full max-w-md md:w-1/3 rounded-lg shadow-2xl border border-gray-700 px-6 py-8 space-y-6">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-pink-600 mb-2">
          Conecta-te ao <span className="text-white">X-Girl</span>
        </h1>
        <p className="text-center text-gray-400 text-sm mb-4">
          Encontre experiências únicas e inesquecíveis ao alcance de um clique.
        </p>
  
        {/* Benefícios */}
        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
          <li>
            <span className="text-pink-500">Perfis exclusivos:</span> Encontre acompanhantes que atendem às suas preferências.
          </li>
          <li>
            <span className="text-pink-500">Privacidade garantida:</span> Conexões seguras e discretas.
          </li>
          <li>
            <span className="text-pink-500">Fácil e rápido:</span> Registe-se e inicie em minutos.
          </li>
        </ul>
  
        {/* Formulário */}
        <div className="space-y-4">
          {/* Campo de Email */}
          <div>
            <label
              className="block mb-1 text-sm font-medium text-gray-300"
              htmlFor="email"
            >
              Email*
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="Insere o teu email"
                value={email}
                onChange={handleEmailChange}
                className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-3 pl-10"
                required
              />
              <svg
                className="w-5 h-5 absolute top-3 left-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12H8m12 4h-7m7-8H9m12 4a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
  
          {/* Campo de Password */}
          <div>
            <label
              className="block mb-1 text-sm font-medium text-gray-300"
              htmlFor="password"
            >
              Password*
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="Insere a tua password"
                value={password}
                onChange={handlePasswordChange}
                className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-3 pl-10"
                required
              />
              <svg
                className="w-5 h-5 absolute top-3 left-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m0-12a5 5 0 015 5v4a5 5 0 01-10 0V8a5 5 0 015-5z"
                />
              </svg>
            </div>
          </div>
  
          {/* Mensagem de erro */}
          {errorMessage && (
            <div className="text-center bg-pink-100 text-pink-600 border border-pink-500 rounded-lg p-2 text-sm">
              {errorMessage}
            </div>
          )}
        </div>
  
        {/* Botão de Login */}
        <button
          onClick={handleLogin}
          className="py-2 text-lg font-medium text-center text-white rounded-lg bg-pink-600 w-full hover:bg-pink-500 transition-all duration-200 focus:ring focus:ring-pink-400"
        >
          Conectar
        </button>
  
        {/* Link para registro */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">Ainda não tens uma conta?</p>
          <Link
            href="/regista2"
            className="text-pink-600 cursor-pointer hover:text-pink-500 font-semibold"
          >
            Regista-te
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
