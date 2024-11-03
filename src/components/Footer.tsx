import Link from "next/link";
import Image from "next/image";
import mastercard from "../../public/photos/mastercard.png"; // Ajuste o caminho conforme necessário
import visa from "../../public/photos/visa.png"; // Ajuste o caminho conforme necessário
import btc from "../../public/photos/btc.png"; // Ajuste o caminho conforme necessário
import paypal from "../../public/photos/paypal.png"; // Ajuste o caminho conforme necessário


function Footer() {
  return (
    <footer className="bg-[#1E2427] w-full py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/">
              <Image
                src="/photos/logo1.png"
                alt="logo"
                className="w-36 h-12 object-contain mb-4"
                width={144}
                height={48}
              />
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Descubra os melhores serviços de escort nas principais regiões de Portugal.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="mb-8">
            <p className="text-xl text-white py-2">Links Rápidos</p>
            <ul className="space-y-1">
              <li>
                <Link href="/girls?distrito=Lisboa">
                  <p className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">Escort em Lisboa</p>
                </Link>
              </li>
              <li>
                <Link href="/girls?distrito=Porto">
                  <p className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">Escort no Porto</p>
                </Link>
              </li>
              <li>
                <Link href="/girls?distrito=Faro">
                  <p className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">Escort em Faro</p>
                </Link>
              </li>
              <li>
                <Link href="/girls?distrito=Madeira">
                  <p className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">Escort na Madeira</p>
                </Link>
              </li>
              <li>
                <Link href="/girls?distrito=Acores">
                  <p className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">Escort nos Açores</p>
                </Link>
              </li>
            </ul>
          </div>

          {/* Informações Úteis */}
          <div className="mb-8">
            <p className="text-xl text-white py-2">Informações Úteis</p>
            <ul className="space-y-1">
              <li>
                <Link href="/termos">
                  <p className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">Termos e Condições</p>
                </Link>
              </li>
              <li>
                <Link href="/privacidade">
                  <p className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">Política de Privacidade</p>
                </Link>
              </li>
              <li>
                <Link href="/ajuda">
                  <p className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">Ajuda</p>
                </Link>
              </li>
              <li>
                <Link href="/contacto">
                  <p className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">Contacto</p>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <p className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">Blog</p>
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociais e Métodos de Pagamento */}
          <div className="mb-8">
            <p className="text-xl text-white py-2">Siga-nos</p>
            <ul className="flex justify-center md:justify-start space-x-4 mb-4">
              <li>
                <Link href="https://www.facebook.com" target="_blank" rel="noreferrer">
                  <span className="sr-only">Facebook</span>
                  <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} className="hover:opacity-75" />
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com" target="_blank" rel="noreferrer">
                  <span className="sr-only">Instagram</span>
                  <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} className="hover:opacity-75" />
                </Link>
              </li>
              <li>
                <Link href="https://www.twitter.com" target="_blank" rel="noreferrer">
                  <span className="sr-only">Twitter</span>
                  <Image src="/icons/twitter.svg" alt="Twitter" width={24} height={24} className="hover:opacity-75" />
                </Link>
              </li>
            </ul>

            {/* Ícones de Pagamento */}
            <p className="text-xl text-white py-2">Métodos de Pagamento</p>
            <ul className="flex justify-center md:justify-start space-x-4">
              <li>
              <Image src={visa} alt="Visa" width={32} height={20} />
              </li>
              <li>
              <Image src={mastercard} alt="Mastercard" width={32} height={20} />
           
            </li>
              <li>
              <Image src={btc} alt="Btc" width={24} height={12} />
              </li>
              <li>
              <Image src={paypal} alt="Paypal" width={32} height={20} />
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} XGirl. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
