import Link from "next/link";


function Footer() {
  return (
    <div className="bg-[#1E2427] w-full h-64 my-0 pb-0 mb-0 pt-4">
      <div className="w-full flex justify-end ">
      
        <div className="w-full flex justify-center ">
        <div className="sticky flex justify-center items-center h-full w-1/3">
    <Link href="/" className="">
      <img
        src="/photos/logo1.png"
        alt="logo"
        className="w-36 h-12 object-contain"
      />
    </Link>
  </div>
          <div className="mx-auto">
            <p className="text-xl text-white py-2 ">Links Rápidos</p>
            <Link
              href="/girls?distrito=Lisboa"
              onClick={() => console.log("Clicou em Escort Lisboa")}
            >
              <p className="text-pink-800 cursor-pointer hover:underline hover:text-pink-900">
                Escort em Lisboa
              </p>
            </Link>

            <Link
              href="/girls?distrito=Porto"
              onClick={() => console.log("Clicou em Escort Porto")}
            >
              <p className="text-pink-800 cursor-pointer hover:underline hover:text-pink-900">
                Escort no Porto
              </p>
            </Link>

            <Link
              href="/girls?distrito=Faro"
              onClick={() => console.log("Clicou em Escort Faro")}
            >
              <p className="text-pink-800 cursor-pointer hover:underline hover:text-pink-900">
                Escort em Faro
              </p>
            </Link>

            <Link
              href="/girls?distrito=Madeira"
              onClick={() => console.log("Clicou em Escort Madeira")}
            >
              <p className="text-pink-800 cursor-pointer hover:underline hover:text-pink-900">
                Escort na Madeira
              </p>
            </Link>

            <Link
              href="/girls?distrito=Acores"
              onClick={() => console.log("Clicou em Escort Acores")}
            >
              <p className="text-pink-800 cursor-pointer hover:underline hover:text-pink-900">
                Escort nos Acores{" "}
              </p>
            </Link>
          </div>
          <div className="mx-auto">
            <p className="text-xl text-white py-2">Informações Úteis</p>
            <p className="text-pink-800 cursor-pointer hover:underline hover:text-pink-900">
              Termos e Condições
            </p>
            <p className="text-pink-800 cursor-pointer hover:underline hover:text-pink-900">
              Privacidade
            </p>
            <p className="text-pink-800 cursor-pointer hover:underline hover:text-pink-900">
              Ajuda
            </p>
            <p className="text-pink-800 cursor-pointer hover:underline hover:text-pink-900">
              Contacto
            </p>
            <p className="text-pink-800 cursor-pointer hover:underline hover:text-pink-900">
              Procurar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
