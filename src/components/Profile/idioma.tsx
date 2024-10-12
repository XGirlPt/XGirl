/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux";
import ru from "../../../public/Flags/ru.svg";
import ale from "../../../public/Flags/ale.png";

import fr from "../../../public/Flags/fr.svg";
import ing from "../../../public/Flags/ing.png";
import it from "../../../public/Flags/it.svg";
import es from "../../../public/Flags/es.svg";
import ar from "../../../public/Flags/ar.png";
import pt from "../../../public/Flags/pt.svg";
interface Profile {
  lingua: string[];
}

interface LinguasProps {
  selectedProfile?: Profile;
}

const Linguas: React.FC<LinguasProps> = ({ selectedProfile }) => {
  const linguasRedux = useSelector(
    (state: any) => state.profile && state.profile.lingua
  );
  // console.log("Linguas Redux", linguasRedux);

  const linguaCheckboxes = useSelector(
    (state: any) => state.profile.linguaCheckboxes
  );
  // console.log("Lingua Checkboxes", linguaCheckboxes);

  const lingua = selectedProfile?.lingua;
  // console.log("Lingua", lingua);

  return (
    <div className="bg-zinc-900 px-10 pt-10 pb-10 w-full border border-zinc-700 rounded-3xl">
      <p className="text-pink-800 text-2xl">Idiomas</p>
      {lingua && Array.isArray(lingua) ? (
        <div className="grid grid-cols-2 mt-4">
          {lingua.map((lingua, index) => (
            <div key={index} className="flex items-center text-white my-3">
              {lingua === "Russo" && (
                <img
                  src="/Flags/ru.svg"
                  alt="Russia flag"
                  className="bg-white mr-2"
                  style={{ width: "30px", height: "20px" }}
                />
              )}
              {lingua === "Alemão" && (
                <img
                  src="/Flags/ale.png"
                  alt="Germany flag"
                  className="bg-white mr-2"
                  style={{ width: "30px", height: "20px" }}
                />
              )}
              {lingua === "Português" && (
                <img
                  src="/Flags/pt.svg"
                  alt="Portugal flag"
                  className="bg-white mr-2"
                  style={{ width: "30px", height: "20px" }}
                />
              )}
              {lingua === "Francês" && (
                <img
                  src="/Flags/fr.svg"
                  alt="France flag"
                  className="bg-white mr-2"
                  style={{ width: "30px", height: "20px" }}
                />
              )}
              {lingua === "Inglês" && (
                <img
                  src="/Flags/ing.png"
                  alt="England flag"
                  className="bg-white mr-2"
                  style={{ width: "30px", height: "20px" }}
                />
              )}
              {lingua === "Italiano" && (
                <img
                  src="/Flags/it.svg"
                  alt="Italy flag"
                  className="bg-white mr-2"
                  style={{ width: "30px", height: "20px" }}
                />
              )}
              {lingua === "Árabe" && (
                <img
                  src="/Flags/ar.png"
                  alt="Arab flag"
                  className="bg-white mr-2"
                  style={{ width: "30px", height: "20px" }}
                />
              )}
              {lingua === "Espanhol" && (
                <img
                  src="/Flags/es.svg"
                  alt="Spain flag"
                  className="bg-white mr-2"
                  style={{ width: "30px", height: "20px" }}
                />
              )}
              <p>{lingua}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">Nenhum idioma selecionado.</p>
      )}
    </div>
  );
};

export default Linguas;
