import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/provider/redux-provider";
import { Metadata } from "next";
import { MainProvider } from "@/provider/main-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X-Girl - Dashboard | Classificados Eróticos em Portugal",
  description:
    "Descubra os melhores anúncios classificados eróticos em Portugal com o X-Girl Dashboard. Explore uma ampla gama de serviços e encontre o que deseja.",
  authors: [{ name: "X-Girl" }],
  keywords:
    "classificados eróticos, acompanhantes, Portugal, serviços eróticos, classificados adultos, X-Girl",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "X-Girl",
    title: "X-Girl - Dashboard | Classificados Eróticos em Portugal",
    description:
      "Bem-vindo ao X-Girl Dashboard, a sua principal fonte para os melhores anúncios classificados eróticos em Portugal. Explore a nossa ampla gama de serviços e encontre o que deseja.",
      
    images: [
      {
        url: "https://portal-x-novo-figaym36p-miikepine.vercel.app/imagens/logo.png",
        alt: "Logótipo X-Girl",
      },
    ],
    url: "https://portal-x-novo-figaym36p-miikepine.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    site: "@XGirlOfficial",
    title: "X-Girl - Dashboard | Classificados Eróticos em Portugal",
    description:
      "Bem-vindo ao X-Girl Dashboard, a sua principal fonte para os melhores anúncios classificados eróticos em Portugal. Explore a nossa ampla gama de serviços e encontre o que deseja.",
    images: [
      {
        url: "https://portal-x-novo-figaym36p-miikepine.vercel.app/imagens/logo.png",
        alt: "Logótipo X-Girl",
      },
    ],
  },
};

export const additionalMetaTags = [
  { name: "viewport", content: "width=device-width, initial-scale=1.0" },
  { name: "author", content: "X-Girl" },
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
