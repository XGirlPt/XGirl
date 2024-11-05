'use client'
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
    if (token) {
      dispatch(loginSuccess(token));
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
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const fetchProfileData = async (userUID: string, email: string) => {
    try {
      const data = await fetchProfileFromDatabase(userUID);
      dispatch(addProfileData(data));
    } catch (error: any) {
      console.error('Erro ao buscar dados do perfil:', error.message);
    }
  };

  const handleLogin = async () => {
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Erro ao fazer login:', error.message);
      dispatch(loginFailure(error));
    } else {
      if (user) {
        const userUID = user.user.id;
        fetchProfileData(userUID);

        dispatch(
          loginSuccess({
            email: user.user.email,
            userUID: user.user.id,
          })
        );

        const tokenID = user.session.refresh_token;
        localStorage.setItem('userToken', tokenID);
        localStorage.setItem('email', email);

        router.push('/Acompanhantes');
      } else {
        console.log('O objeto de usuário retornado está vazio ou undefined.');
      }
    }
  };

  return (
    <div className="bg-gray-900 dark:bg-gray-800 mt-10 rounded-lg shadow-lg w-full max-w-md mx-auto px-6 py-8 space-y-6">
      <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-4">
        Conecta-te ao X-Girl
      </h1>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="email">
          Email*
        </label>
        <input
          id="email"
          type="email"
          placeholder="Insere o teu email"
          value={email}
          onChange={handleEmailChange}
          className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-3"
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="password">
          Password*
        </label>
        <input
          id="password"
          type="password"
          placeholder="Insere a tua password"
          value={password}
          onChange={handlePasswordChange}
          className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-3"
          required
        />
      </div>

      <button
        onClick={handleLogin}
        className="py-2 text-lg font-medium text-center text-white rounded-lg bg-pink-600 w-full hover:bg-pink-500 transition duration-200"
      >
        Conectar
      </button>

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
  );
};

export default Login;
