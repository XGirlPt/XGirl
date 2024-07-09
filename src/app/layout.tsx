import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/provider/redux-provider";
import { Metadata } from "next";
import { MainProvider } from "@/provider/main-provider";

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
        url: "/public/logo.png",
        alt: "Logótipo XGirl",
      },
    ],
    url: "https://www.xgirl.pt/",
  },
  twitter: {
    card: "summary_large_image",
    site: "@XGirlOfficial",
    title: "XGirl - Classificados Eróticos, Acompanhates e Escort em Portugal",
    description:
      "Bem-vindo ao XGirl , a sua principal fonte para os melhores anúncios classificados eróticos em Portugal. Explore a nossa ampla gama de serviços e encontre o que deseja.",
    images: [
      {
        url: "/public/logo.png",
        alt: "Logótipo XGirl",
      },
    ],
  },
};

export const additionalMetaTags = [
  { name: "viewport", content: "width=device-width, initial-scale=1.0" },
  { name: "author", content: "XGirl" },
  { name: "language", content: "Portuguese" },
  { name: "robots", content: "index, follow" },
  { name: "revised", content: "Friday, July 6th, 2024" },
  { name: "copyright", content: "Copyright © 2024 X-Girl" },
  { name: "distribution", content: "global" },
  { name: "geo.region", content: "PT" },
  { name: "geo.placename", content: "Portugal" },
  // Adicione geo.position se tiver coordenadas específicas
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}  bg-[#1b1b1b]`}>
        <ReduxProvider>
          <MainProvider>{children}</MainProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
