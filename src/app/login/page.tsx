'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import supabase from '@/database/supabase';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, addProfileData } from '@/actions/ProfileActions';
import { fetchProfileFromDatabase } from '@/services/profileService';
// import HCaptcha from '@hcaptcha/react-hcaptcha';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  // const [captchaVerified, setCaptchaVerified] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // const handleCaptchaVerify = (token: string) => {
  //   setCaptchaToken(token);
  //   setCaptchaVerified(true);
  // };

  // const handleCaptchaExpire = () => {
  //   setCaptchaToken(null);
  //   setCaptchaVerified(false);
  // };

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

  const fetchProfileData = async (userUID: string) => {
    try {
      const data = await fetchProfileFromDatabase(userUID);
      dispatch(addProfileData(data));
    } catch (error: any) {
      console.error('Erro ao buscar dados do perfil:', error.message);
    }
  };

  const handleLogin = async () => {
    // if (!captchaVerified || !captchaToken) {
    //   console.error('Captcha não verificado. Por favor, complete o captcha.');
    //   return;
    // }
    // console.log('Captcha Token:', captchaToken);

    // try {
    //   const verifyCaptchaResponse = await fetch('/api/verify-captcha', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ captchaToken }),
      // });
  
      // if (!verifyCaptchaResponse.ok) {
      //   const text = await verifyCaptchaResponse.text();
      //   console.error('Erro ao verificar o CAPTCHA:', text);
      //   return;
      // }
  
      // const captchaResult = await verifyCaptchaResponse.json();
  
      // if (!captchaResult.success) {
      //   console.error('Erro ao verificar o CAPTCHA:', captchaResult.message);
      //   return;
      // }
  
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
    // } catch (error: any) {
    //   console.error('Erro ao fazer login:', error.message);
    //   dispatch(loginFailure(error));
    // }
  };

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const token = localStorage.getItem('userToken');
        if (token) {
          dispatch(loginSuccess(token));
        }
      } catch (error: any) {
        console.error('Erro ao verificar o token do usuário:', error.message);
      }
    };

    checkUserToken();
  }, [dispatch]);

  return (
    <div className="flex justify-center mt-16  bg-black text-white">
      <div className="w-full max-w-md p-8 bg-zinc-900 rounded-lg shadow-lg h-1/3">
        <h1 className="text-pink-800 text-3xl font-bold mb-6 text-center">
          Conecta-te ao X-Girl
        </h1>
   
        <div className="mb-6">
          <label className="block text-pink-800 text-sm font-semibold mb-2" htmlFor="email">
            Email*
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full bg-zinc-700 text-white h-12 rounded-md pl-4 outline-none focus:outline-pink-800"
          />
        </div>
  
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-pink-800 text-sm font-semibold" htmlFor="password">
              Password*
            </label>
            <span className="text-pink-800 text-xs cursor-pointer hover:text-pink-900 hover:underline">
              Esqueceste a palavra passe?
            </span>
          </div>
          <input
            id="password"
            type="password"
            placeholder="Insere a tua Password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full bg-zinc-700 text-white h-12 rounded-md pl-4 outline-none focus:outline-pink-800"
          />
        </div>
  
        {/* <div className="mb-6 flex justify-between">
          <HCaptcha
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || 'd64e2e6a-e810-461e-8012-1ac42f9e4054'}
            onVerify={handleCaptchaVerify}
            onExpire={handleCaptchaExpire}
          />
        </div> */}
  
        <button
          onClick={handleLogin}
          className="w-full bg-pink-800 text-white py-2 rounded-md hover:bg-pink-900 focus:outline-none"
        >
          Conectar
        </button>
  
        <div className="mt-6 text-center text-white text-lg">
          <p>Ainda não tens uma conta?</p>
          <Link
            href="/regista"
            className="text-pink-800 ml-2 cursor-pointer hover:text-pink-900"
          >
            Regista-te
          </Link>
        </div>
      </div>
    </div>
  );
  
};

export default Login;
