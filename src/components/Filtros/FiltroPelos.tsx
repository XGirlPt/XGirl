import React, { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { updatePelos } from "../../actions/ProfileActions";

const pelos = [
  { id: 1, name: "Rapadinha", unavailable: false },
  { id: 2, name: "Parcialmente Rapada", unavailable: false },
  { id: 3, name: "Ao Natural", unavailable: false },
];

interface FiltroPelosProps {
  bgColor?: string;
  buttonPadding?: string;
  rounded?: string;
  padding?: string;
}

const FiltroPelos: React.FC<FiltroPelosProps> = ({
  bgColor = "bg-slate-600",
  buttonPadding = "py-1",
  rounded = "rounded-md",
}) => {
  const dispatch = useDispatch();

  const pelosRedux = useSelector(
    (state: any) => state.profile && state.profile?.profile?.pelos
  );
  console.log("pelos do redux", pelosRedux);

  const [pelosSelecionada, setPelosSelecionada] = useState(pelosRedux);

  const handlePelosChange = (newValue: string) => {
    dispatch(updatePelos(newValue));
  };

  return (
    <div className="w-full mb-2 md:mb-0">
      <Listbox
        onChange={(selectedOption: { name: string }) =>
          handlePelosChange(selectedOption.name)
        }
        // @ts-ignore
        id="pelos"
        name="pelos"
      >
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <p className="text-pink-800">Pelos</p>
              <Listbox.Button
                className={`relative w-full mt-1 bg-slate-600 text-white z-100 text-xs ${bgColor} ${buttonPadding} md:text-sm cursor-default py-1 pl-3 pr-10 text-left shadow-md sm:text-sm ${rounded}`}
              >
                <span className="block truncate">{pelosRedux || "Pelos"}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-pink-800"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className={`
                                        absolute mt-1 max-h-60 w-full overflow-auto bg-zinc-700 text-white text-xs md:text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10
                                        ${open ? "block" : "hidden"}
                                    `}
                >
                  {pelos.map((method, methodIdx) => (
                    <Listbox.Option
                      key={methodIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-1 md:pl-10 pl-3 pr-4 text-xs md:text- opacity-90 Z-10 ${
                          active ? "bg-teal-50 text-teal-700" : "text-gray-900"
                        }`
                      }
                      value={method}
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
                    </Listbox.Option>
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

export default FiltroPelos;
