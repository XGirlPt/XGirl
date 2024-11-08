"use client";
import Header from "@/components/Header";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/themes/dark.min.css";
import "froala-editor/js/languages/pt_br.js";
import "froala-editor/js/languages/es.js";
import "froala-editor/js/plugins/emoticons.min.js";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import HeaderMobile from "@/components/HeaderMobile"

export interface MainProviderProps {
  children: React.ReactNode;
}

export function MainProvider(props: MainProviderProps) {
  const { children } = props;

  return (
    <>
      {/* Header visível apenas em telas médias ou maiores */}
      <div className="hidden md:block">
        <Header />
      </div>
      <div className="block md:hidden">
        <HeaderMobile />
      </div>

      {/* Logo grande, centralizado, visível apenas em telas pequenas */}
      {/* <div className=" md:hidden sticky top-0 z-50 bg-black flex justify-center items-center h-24 shadow-md">
        <Link href="/" aria-label="Ir para a página inicial">
          <Image 
            src="/logo.webp"   
            alt="Logo" 
            width={250}  // Aumentando o tamanho
            height={250} // Ajustado proporcionalmente
            priority
            className="object-contain" // Garante que a imagem se ajuste ao contêiner
          />
        </Link>
      </div> */}

      <main className="min-h-[60vh]">{children}</main>

      <footer className="pt-10">
        <Footer />
      </footer>
    </>
  );
}
