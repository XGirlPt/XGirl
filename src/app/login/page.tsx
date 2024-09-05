'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import supabase from '@/database/supabase';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, addProfileData } from '@/actions/ProfileActions';
import { fetchProfileFromDatabase } from '@/services/profileService';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaVerified, setCaptchaVerified] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
    setCaptchaVerified(true);
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken(null);
    setCaptchaVerified(false);
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

  const fetchProfileData = async (userUID: string) => {
    try {
      const data = await fetchProfileFromDatabase(userUID);
      dispatch(addProfileData(data));
    } catch (error: any) {
      console.error('Erro ao buscar dados do perfil:', error.message);
    }
  };

  const handleLogin = async () => {
    if (!captchaVerified || !captchaToken) {
      console.error('Captcha não verificado. Por favor, complete o captcha.');
      return;
    }
    console.log('Captcha Token:', captchaToken);

    try {
      const verifyCaptchaResponse = await fetch('/api/verify-captcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ captchaToken }),
      });
  
      if (!verifyCaptchaResponse.ok) {
        const text = await verifyCaptchaResponse.text();
        console.error('Erro ao verificar o CAPTCHA:', text);
        return;
      }
  
      const captchaResult = await verifyCaptchaResponse.json();
  
      if (!captchaResult.success) {
        console.error('Erro ao verificar o CAPTCHA:', captchaResult.message);
        return;
      }
  
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
    } catch (error: any) {
      console.error('Erro ao fazer login:', error.message);
      dispatch(loginFailure(error));
    }
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
    <div className="text-gray-600 bg-[#1b1b1b]">
      <div className="pb-0 bg-[#1b1b1b]">
        <div className="flex justify-center items-center pb-20">
          <div className="bg-[#1E2427] border border-zinc-600 w-1/3 h-1/4 px-10 mt-24 rounded-md">
            <p className="text-pink-800 text-3xl flex justify-center py-6">
              Conecta-te ao X-Girl
            </p>

            <div className="mt-2">
              <p className="text-pink-800 pb-2">Email*</p>
              <input
                className="w-full bg-zinc-600 text-white h-10 rounded-md pl-4 outline-pink-800 focus:outline-pink-800"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div className="mt-6 justify-between">
              <div className="flex justify-between align-bottom">
                <p className="text-pink-800 pb-2">Password*</p>
                <span className="text-pink-800 flex cursor-pointer text-xs hover:text-pink-900 hover:underline items-end pb-2 align-bottom justify-end">
                  Esqueceste da palavra passe?
                </span>
              </div>

              <input
                className="w-full bg-zinc-600 py-2 rounded-md pl-4 text-white outline-pink-800"
                placeholder="Insere a tua Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="flex justify-center mt-6">
              <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || 'd64e2e6a-e810-461e-8012-1ac42f9e4054'}
                onVerify={handleCaptchaVerify}
                onExpire={handleCaptchaExpire}
              />
            </div>

            <div
              className="flex justify-center items-center align-bottom rounded-md cursor-pointer text-white w-full bg-pink-800 py-2 mb-6 mt-6 mr-4 md:mr-10 hover:bg-pink-900"
              onClick={handleLogin}
            >
              <button>Conectar</button>
            </div>
            <div className="flex justify-center text-white text-lg pb-8">
              <p>Ainda não tens uma conta???</p>
              <Link
                href="/regista"
                className="text-pink-800 ml-2 cursor-pointer hover:text-pink-900 hover:underline"
              >
                Regista-te
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
