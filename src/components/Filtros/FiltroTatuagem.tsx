import { useState, useEffect } from "react";
import { Listbox, Transition, ListboxButton, ListboxOption } from "@headlessui/react"; // Importações corretas
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { updateTatuagem } from "../../actions/ProfileActions"; // Ação para atualizar tatuagem

const tatuagem = [
  { id: 1, name: "Com Tatuagens", unavailable: false },
  { id: 2, name: "Sem Tatuagens", unavailable: false },
];

interface FiltroTatuagemProps {
  bgColor?: string;
  buttonPadding?: string;
  rounded?: string;
  padding?: string;
}

const FiltroTatuagem: React.FC<FiltroTatuagemProps> = ({
  bgColor = "bg-gray-700",
  buttonPadding = "py-1",
  rounded = "rounded-md",
}) => {
  const dispatch = useDispatch();

  const tatuagemRedux = useSelector(
    (state: any) => state.profile?.profile?.tatuagem
  );
  console.log("tatuagem do redux", tatuagemRedux);

  const [tatuagemSelecionada, setTatuagemSelecionada] = useState<string | null>(
    tatuagemRedux
  );

  const handleTatuagemChange = (newValue: string) => {
    dispatch(updateTatuagem(newValue));
  };

  return (
    <div className="w-full mb-2 md:mb-0">
      <Listbox
        onChange={(selectedOption: any) =>
          handleTatuagemChange(selectedOption.name)
        }
        value={tatuagemSelecionada} // Controlando o valor selecionado
      >
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <p className="text-pink-800 ">Tatuagens</p>
              <ListboxButton
                className={`relative w-full mt-1 bg-gray-700 text-white z-100 text-xs ${bgColor} ${buttonPadding} md:text-sm cursor-default py-1 pl-3 pr-10 text-left shadow-md sm:text-sm ${rounded}`}
              >
                <span className="block truncate">
                  {tatuagemRedux || "Tatuagens"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-pink-800"
                    aria-hidden="true"
                  />
                </span>
              </ListboxButton>

              <Transition
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className={`
                    absolute mt-1 max-h-60 w-full overflow-auto bg-zinc-700 text-white text-xs md:text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10
                    ${open ? "block" : "hidden"}
                  `}
                >
                  {tatuagem.map((method, methodIdx) => (
                    <ListboxOption
                      key={methodIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-1 md:pl-10 pl-3 pr-4 text-xs md:text- opacity-90 Z-10 ${
                          active ? "bg-teal-50 text-teal-700" : "text-gray-900"
                        }`
                      }
                      value={method} // Passando o objeto inteiro
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {method.name}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-pink-600 border-zinc-400">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default FiltroTatuagem;
