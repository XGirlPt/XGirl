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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 transition-all duration-300">
          <div className="w-full md:w-3/5 lg:w-2/5 h-auto bg-gray-800 rounded-lg shadow-2xl p-6">
            <div className="flex justify-between items-center border-b border-gray-700 pb-4">
              <h1 className="text-xl text-white font-semibold">Filtros</h1>
              <button onClick={fecharFiltro} className="text-red-500 hover:text-red-400">
                <ImCross size={20} />
              </button>
            </div>

            {/* FORM START */}
            <form className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <FiltroAge />
                <FiltroPrice />
                <FiltroLingua />
                <FiltroPelos />
                <FiltroMamas />
                <FiltroPeito />
                <FiltroOlhos />
                <FiltroAltura />
                <FiltroCorpo />
                <FiltroTatuagem />
                <FiltroOrigem />
              </div>

              <div className="flex justify-end mt-6">
                <button className="flex items-center justify-center w-full md:w-auto bg-pink-600 text-white py-2 px-4 rounded-md shadow-lg transition duration-200 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400">
                  <LuFilter className="mr-2" size={20} />
                  Aplicar Filtros
                </button>
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
