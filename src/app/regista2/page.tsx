"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaClock, FaMoneyBillWave, FaStar, FaGift } from "react-icons/fa";
import { TfiCup } from "react-icons/tfi";
import supabase from "@/database/supabase";
import ListRegister from "@/components/Register/ListRegister";
import { registerUser } from "@/actions/ProfileActions";
import { useRouter } from "next/navigation";

const TipoDeRegisto = [
  { id: 1, name: "Anunciante", unavailable: false },
  { id: 2, name: "Bar / Salao Erotico", unavailable: false },
  { id: 3, name: "Utilizador", unavailable: false },
];

const Regista2: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<{
    id: number;
    name: string;
    unavailable: boolean;
  } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleOptionSelect = (option: {
    id: number;
    name: string;
    unavailable: boolean;
  }) => {
    setSelectedOption(option);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      console.error("As senhas não coincidem");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      setIsLoggedIn(true);

      if (error) {
        console.error("Erro ao registrar:", error.message);
      } else {
        console.log("Usuário registrado com sucesso:", data.user);
        console.log("Usuário registrado com sucesso:", data.user?.id);

        if (data?.user?.id) {
          dispatch(registerUser(data?.user?.id, email));
        }
        console.log("Email passado para o Redux:", email);

        if (selectedOption) {
          switch (selectedOption.id) {
            case 1:
              await supabase.from("ProfilesData").insert([
                {
                  userUID: data.user?.id,
                  userData: data.user,
                },
              ]);

              router.push(
                `/registo-entrada?email=${email}&userUID=${data.user?.id}`
              );
              break;

            case 2:
              await supabase.from("estabelecimentos").insert([
                {
                  userUID: data.user?.id,
                  userData: data.user,
                },
              ]);
              router.push(
                `/registo-estabelecimento?email=${email}&userUID=${data.user?.id}`
              );

              break;

            case 3:
              router.push("/registo-entrada");
              break;
            default:
              break;
          }
        }
      }
    } catch (error: any) {
      console.error("Erro ao registrar:", error.message);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const session = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      }
    };

    checkSession();
  }, [router]);

  return (
    <div className="text-gray-900 bg-black rounded-md">
      <div className="pb-4 bg-gray-900 rounded-md">
        {/* <Header isLogged={isLoggedIn} /> */}
        <div className=" h-full bg-black px- justify-center flex">
          {/* LEFT SIDE */}
          <div className="w-1/2 pt-20 mb-10 flex flex-col justify-end items-center">
            <div>
              <p className="text-pink-800 text-2xl pb-10 px-6 ">
                XGirl.pt é o site de classificados eroticos mais completo de
                Portugal{" "}
              </p>
              <div className="flex">
                <div className="px-10 pb-2 pt-1 justify-center gap-10 align-middle items-center">
                  <div className="flex items-center py-2">
                    <TfiCup className="text-pink-800 mr-4" size={48} />
                    <p className="text-white py-2">
                      O site mais completo em Portugal
                    </p>
                  </div>
                  <div className="flex items-center py-2">
                    <FaClock className="text-pink-800 mr-4" size={48} />
                    <p className="text-white py-2">
                      O processo de inscrição é simples e rápido.
                    </p>
                  </div>
                  <div className="flex items-center py-2">
                    <FaMoneyBillWave className="text-pink-800 mr-4" size={48} />
                    <p className="text-white py-2">
                      Ganhe muito dinheiro! Atenda de 20 a 200 contactos por
                      mês.
                    </p>
                  </div>
                  <div className="flex items-center py-2">
                    <FaStar className="text-pink-800 mr-4" size={48} />
                    <p className="text-white py-2">
                      Vários destaques por mês e por dia sem pagar mais
                    </p>
                  </div>
                  <div className="flex items-center py-2">
                    <FaGift className="text-yellow-500 mr-4" size={48} />
                    <p className="text-yellow-500 underline cursor-pointer py-2">
                      Clique aqui para ver todas as vantagens.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between px-8 my-4"></div>
            </div>
          </div>

          {/* right size */}
          <div className="bg-zinc-900 w-1/3 mb-2 mt-20 border border-zinc-600 rounded-2xl flex items-center">
            <div className="w-full my-auto">
              <p className="text-white text-xl px-6 justify-center flex">
                Cria uma nova conta 
              </p>
              <div className="w-full px-6">
                <div className="px-1 pb-2 pt-1 justify-center align-middle items-center">
                  <div className="items-center">
                    <p className="text-pink-800 py-2">Email* </p>
                    <input
                      className="w-full bg-zinc-600 text-white h-10 rounded-md pl-4 outline-pink-800 focus:outline-pink-800"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Digite o seu email"
                    />
                  </div>
                  <div className="px-1 pb-2 pt-1 justify-center align-middle items-center">
                    <div className="flex items-center">
                      <ListRegister handleOptionSelect={handleOptionSelect} />
                    </div>
                  </div>
                  <div className="items-center">
                    <p className="text-pink-800">Password* </p>
                    <input
                      type="password"
                      className="w-full bg-zinc-600 py-2 rounded-md pl-4 text-white outline-pink-800"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Digite a sua password"
                    />
                  </div>
                  <div className="items-center">
                    <p className="text-pink-800 py-2">
                      Confirma a tua Password*{" "}
                    </p>
                    <input
                      type="password"
                      className="w-full bg-zinc-600 py-2 rounded-md pl-4 text-white outline-pink-800"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirme a sua password"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center px-8 my-4">
                <button
                  onClick={handleRegister}
                  className="flex justify-center items-center rounded-md cursor-pointer text-white w-56 bg-pink-800 py-2 mb-4 hover:bg-pink-900"
                >
                  Cria a tua conta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regista2;
