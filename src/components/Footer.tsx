import Link from "next/link";
import Image from "next/image";
import mastercard from "../../public/photos/mastercard.png"; // Ajuste o caminho conforme necessário
import visa from "../../public/photos/visa.png"; // Ajuste o caminho conforme necessário
import btc from "../../public/photos/btc.png"; // Ajuste o caminho conforme necessário
import paypal from "../../public/photos/paypal.png"; // Ajuste o caminho conforme necessário
import { useTranslation } from "react-i18next"; // Importando o hook

function Footer() {
  const { t } = useTranslation(); // Usando o hook para pegar as traduções

  return (
    <footer className="bg-gray-800 w-full py-8 ">
      <div className="max-w-screen-xl mx-auto px-4 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/">
              

            <div className="w-36 h-12 object-contain mx-auto md:mx-0 mb-4">
              <Image
                src="/photos/logo1.png"
                alt="logo"
                width={144}
                height={48}
              />
</div>


            </Link>
            <p className="text-sm text-gray-400 mb-4">
            {t("footer.discover_services")}
            </p>
          </div>

          <div className="mb-8">
            <p className="text-xl text-white py-2">{t("footer.quick_links")}</p>
            <ul className="space-y-1">
              <li>
                <Link href="/Acompanhantes?distrito=Lisboa"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"> {t("footer.escorts_in_lisboa")}
                </Link>
              </li>
              <li>
                <Link href="/girls?distrito=Porto"
                   className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">{t("footer.escorts_in_porto")}
                </Link>
              </li>
              <li>
                <Link href="/girls?distrito=Faro"
                   className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"> {t("footer.escorts_in_faro")}
                </Link>
              </li>
              <li>
                <Link href="/girls?distrito=Madeira"
                   className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"> {t("footer.escorts_in_madeira")}
                </Link>
              </li>
              <li>
                <Link href="/girls?distrito=Acores"
                   className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"> {t("footer.escorts_in_acores")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Informações Úteis */}
          <div className="mb-8">
            <p className="text-xl text-white py-2">{t("footer.useful_information")}</p>
            <ul className="space-y-1">
              <li>
                <Link href="/Termos"
                   className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">{t("footer.terms_and_conditions")}
                </Link>
              </li>
              <li>
                <Link href="/Privacidade"
                 className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">  {t("footer.privacy_policy")}
                </Link>
              </li>
              <li>
                <Link href="/ajuda"
                  className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"> {t("footer.help")}
                </Link>
              </li>
              <li>
                <Link href="/Contacto"
                   className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]"> {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link href="/blog"
                   className="text-[#D53F8C] cursor-pointer hover:underline hover:text-[#C2136A]">  {t("footer.blog")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociais e Métodos de Pagamento */}
          <div className="mb-8">
            <p className="text-xl text-white py-2">{t("footer.payment_methods")}</p>
            <ul className="flex justify-center md:justify-start space-x-4">
              <li>

                <div className="h-6 w-6">

                <Image
                  src={visa}
                  alt="Visa"
                  width={32}
                  height={20}
                  
                />
                </div>
              </li>
            
            
              <li>
              <div className="h-6 w-6"> 
                <Image
                  src={mastercard}
                  alt="Mastercard"
                  width={32}
                  height={20}            
                /></div>
              </li>
              
              
              <li>
                <div className="h-6 w-6"> 
                <Image
                  src={btc}
                  alt="Bitcoin"
                  width={32}
                  height={20}    
                /></div>
      
              </li>
              <li>
              <div className="h-6 w-6"> 

                <Image
                  src={paypal}
                  alt="Paypal"
                  width={32}
                  height={20}
                
                />
                          </div>

              </li>
            </ul>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-gray-500 mb-24">
          &copy; {new Date().getFullYear()}  {t("footer.all_rights_reserved")}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
