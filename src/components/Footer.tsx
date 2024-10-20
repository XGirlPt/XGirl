import Link from "next/link";

function Footer() {
  return (
    <div className="bg-[#1E2427] w-full py-6">
      <div className="flex flex-col md:flex-row justify-center text-center">
        <div className="mb-4 md:mr-4">
          <Link href="/">
            <img
              src="/photos/logo1.png"
              alt="logo"
              className="w-36 h-12 object-contain mb-4"
            />
          </Link>
          <p className="text-xl text-white py-2">Links Rápidos</p>
          <Link href="/girls?distrito=Lisboa">
            <p className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">Escort em Lisboa</p>
          </Link>
          <Link href="/girls?distrito=Porto">
            <p className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">Escort no Porto</p>
          </Link>
          <Link href="/girls?distrito=Faro">
            <p className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">Escort em Faro</p>
          </Link>
          <Link href="/girls?distrito=Madeira">
            <p className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">Escort na Madeira</p>
          </Link>
          <Link href="/girls?distrito=Acores">
            <p className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">Escort nos Açores</p>
          </Link>
        </div>

        <div className="mb-4">
          <p className="text-xl text-white py-2">Informações Úteis</p>
          <p className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">Termos e Condições</p>
          <p className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">Privacidade</p>
          <p className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">Ajuda</p>
          <p className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">Contacto</p>
          <p className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">Procurar</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
