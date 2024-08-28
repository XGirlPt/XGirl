import { useState } from "react";
import { LuFilter } from "react-icons/lu";
import { ImCross } from "react-icons/im";
import FiltroAge from "./Filtros/FiltroAge";
import FiltroPrice from "./Filtros/FiltroPrice";
import FiltroLingua from "./Filtros/FiltroLingua";
import FiltroPeito from "./Filtros/FiltroPeito";
import FiltroMamas from "./Filtros/FiltroMamas";
import FiltroPelos from "./Filtros/FiltroPelos";
import FiltroAltura from "./Filtros/FiltroAltura";
import FiltroOlhos from "./Filtros/FiltroOlhos";
import FiltroCorpo from "./Filtros/FiltroCorpo";
import FiltroTatuagem from "./Filtros/FiltroTatuagem";
import FiltroOrigem from "./Filtros/FiltroOrigem";

const Filtro: React.FC = () => {
  const [mostrarFiltro, setMostrarFiltro] = useState(true);

  const fecharFiltro = () => {
    setMostrarFiltro(false);
  };

  return (
    <>
      {mostrarFiltro && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 bg-blur-20 z-50 ">
          <div className="w-full md:w-2/6 h-2/3 md:h-3/4 bg-zinc-900 rounded-lg shadow-2xl ">
            <div className="border-b border-neutral-200 px-4 relative">
              <div className="flex justify-between">
                <h1 className="text-sm md:text-xl mb-8 mt-6 text-white font-bold">
                  Filtros
                </h1>
                <button className="text-bold font-bold" onClick={fecharFiltro}>
                  <ImCross
                    size={16}
                    className="text-red hover:text-pink-800 transition-transform font-bold"
                  />
                </button>
              </div>
            </div>

            {/* FORM START */}
            <form className="mx-6">
              <div className="grid-cols-3 gap-1 my-1 md:my-2">
                <div className="flex gap-4 mb-0">
                  <FiltroAge />
                  <FiltroPrice />
                </div>

                <div className="flex gap-4 mb-0">
                  <FiltroLingua />
                  <FiltroPelos />
                </div>

                <div className="flex gap-4 mb-0">
                  <FiltroMamas />
                  <FiltroPeito />
                </div>

                <div className="flex gap-4 mb-0">
                  <FiltroPelos />
                  <FiltroOlhos />
                </div>
                <div className="flex gap-4 mb-0">
                  <FiltroAltura />
                  <FiltroCorpo />
                </div>

                <div className="flex gap-4 mb-0">
                  <FiltroTatuagem />
                  <FiltroOrigem />
                </div>
              </div>

              <div className="flex justify-center items-center align-bottom rounded-md cursor-pointer text-white w-full bg-pink-800 py-2 mt-4 mr-4 md:mr-10 hover:bg-pink-900">
                <LuFilter className="mr-1 font-bold" size={18} />
                <button>Aplicar Filtros</button>
              </div>
            </form>
            {/* FORM END */}
          </div>
        </div>
      )}
    </>
  );
};

export default Filtro;
