import { Inter } from "next/font/google";
import ReduxProvider from "@/provider/redux-provider";
import { Metadata } from "next";
import { MainProvider } from "@/provider/main-provider";
import 'normalize.css'; // Carrega o normalize.css
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "XGirl - Classificados Eróticos, Escort e Acompanhantes de luxo em Portugal",
  description:
    "Descubra os melhores anúncios classificados eróticos em Portugal com o XGirl. Explore uma ampla gama de serviços eróticos e encontre as melhores acompanhantes e escorts de luxo em Portugal.",
  authors: [{ name: "XGirl" }],
  keywords:
    "Classificados eróticos Portugal, acompanhantes, Escort, serviços eróticos, classificados adultos, X-Girl",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "XGirl",
    title: "XGirl - Classificados Eróticos, Escort e Acompanhantes em Portugal",
    description:
      "Bem-vindo ao XGirl, a sua principal fonte para os melhores anúncios classificados eróticos, Escort e Acompanhantes em Portugal. Explore uma ampla gama de serviços eróticos e encontre as melhores acompanhantes e escorts de luxo em Portugal.",
    images: [
      {
        url: "/logoxg.png",
        alt: "Logótipo XGirl",
      },
    ],
    url: "https://www.xgirl.pt/",
  },
  metadataBase: new URL('https://www.xgirl.pt/') // Adiciona a base URL aqui
};




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <head>
        <title>XGirl - Classificados Eróticos, Escort e Acompanhantes de luxo em Portugal</title>
        <meta name="description" content="Descubra os melhores anúncios classificados eróticos em Portugal com o XGirl. Explore uma ampla gama de serviços eróticos e encontre as melhores acompanhantes e escorts de luxo em Portugal." />
        <meta name="author" content="XGirl" />
        <meta name="keywords" content="Classificados eróticos Portugal, acompanhantes, Escort, serviços eróticos, classificados adultos, X-Girl" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="language" content="Portuguese" />
        <meta name="robots" content="index, follow" />
        <meta name="revised" content="Friday, July 6th, 2024" />
        <meta name="copyright" content="Copyright © 2024 X-Girl" />
        <meta name="distribution" content="global" />
        <meta name="geo.region" content="PT" />
        <meta name="geo.placename" content="Portugal" />
        <link rel="icon" href="/logoxg.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logoxg.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logoxg.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logoxg.png" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${inter.className} bg-gray-900`}>
        <ReduxProvider>
          <MainProvider>{children}</MainProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}