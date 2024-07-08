import { Metadata } from "next";
import GirlsPage from "./_ui/GirlsPage";

export const metadata: Metadata = {
  title: "X-Girl - Girls",
  description:
    "Bem-vindo ao Dashboard do X-Girl, o melhor site de classificados eróticos em Portugal.",
};

export interface PagePageProps {}

export default function PagePage(props: PagePageProps) {
  const {} = props;

  return (
    <div>
      <GirlsPage />
    </div>
  );
}
