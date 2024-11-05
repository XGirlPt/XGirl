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
export interface MainProviderProps {
  children: React.ReactNode;
}

export function MainProvider(props: MainProviderProps) {
  const { children } = props;

  return (
    <>
 <div className="hidden md:block">
        <Header />
      </div>
      <main className="min-h-[60vh]">{children}</main>
      <footer className="pt-10 ">
        <Footer />
      </footer>
    </>
  );
}
