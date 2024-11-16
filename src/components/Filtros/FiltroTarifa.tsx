import React, { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { updateTarifa } from "../../actions/ProfileActions";

const tarifaOptions = [
  { id: 1, name: "a partir de 50", value: 50, unavailable: false },
  { id: 2, name: "a partir de 100€", value: 100, unavailable: false },
  { id: 3, name: "a partir de 200€", value: 200, unavailable: false },
  { id: 4, name: "a partir de 500€", value: 500, unavailable: true },
  { id: 5, name: "+ 500€", value: 501, unavailable: false },
];

interface FiltroTarifaProps {
  bgColor?: string;
  buttonPadding?: string;
  rounded?: string;
  onChange?: (value: string) => void;

}

const FiltroTarifa: React.FC<FiltroTarifaProps> = ({
  bgColor = "bg-gray-700",
  buttonPadding = "py-0",
  rounded = "rounded-md",
  onChange,
}) => {
  const dispatch = useDispatch();
  const tarifaRedux = useSelector((state: any) => state.profile?.profile?.tarifa);
  console.log("tarifa do redux", tarifaRedux);

  const handleTarifaChange = (newValue: number) => {
    dispatch(updateTarifa(newValue));
    if (onChange) {
      // Caso precise enviar como string em outro lugar
    }
  };

  return (
    
    <div className="w-full mb-2 md:mb-0">
      <Listbox
        onChange={(selectedOption: any) => {
          handleTarifaChange(selectedOption.value)
          console.log(selectedOption);
        }}
        // @ts-ignore
        id="tarifa"
        name="tarifa"
      >


        
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <p  className="block text-sm font-medium text-gray-300">Tarifa</p>
              <Listbox.Button
                className={`relative w-full mt-1 bg-gray-700 text-slate-200 z-100 text-xs ${bgColor} ${buttonPadding} md:text-sm cursor-default py-5 rounded-xl pl-3 pr-10 text-left ${rounded} shadow-md sm:text-sm`}
                >
                <span className="block truncate">{tarifaRedux}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-white"
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
                    absolute mt-1 max-h-60 w-full overflow-auto bg-slate-600 text-white rounded-lg text-md md:text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10
                  ${open ? "block" : "hidden"}
                                    `}
                >
                  {tarifaOptions.map((option, optionIdx) => (
                    <Listbox.Option
                      key={optionIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-1 md:pl-10 pl-3 pr-4 text-md md:text- opacity-90 Z-10 ${
                          active
                            ? "bg-slate-400 text-slate-600"
                            : "text-gray-900"
                        }`
                      }
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {option.name}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3  text-pink-800 border-zinc-400">
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

export default FiltroTarifa;
