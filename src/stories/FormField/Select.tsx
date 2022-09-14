import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { Fragment, memo, useCallback, useState } from 'react';

import { useUpdateEffect } from '../../hooks/useUpdateEffect';

type Option = {
    value: string | number;
    label: string;
    disabled: boolean;
};

export type SelectProps = {
    value?: Option | null;
    options: Array<Option>;
    onChange?: (option: Option | null) => void;
    className?: string;
    width?: string;
};

const Select = ({
    value = null,
    options,
    className = '',
    onChange = (_) => _,
    width,
}: SelectProps) => {
    const [state, setState] = useState<Option | null>(value);

    useUpdateEffect(() => {
        onChange(state);
    }, [state]);

    const changeCb = useCallback(
        (option: Option) => {
            option.value === state?.value ? setState(null) : setState(option);
        },
        [state]
    );

    return (
        <Listbox value={state} onChange={changeCb}>
            <Listbox.Button
                className={({ open }) =>
                    `flex items-center justify-between ${className} ${
                        open ? 'ring' : ''
                    }`
                }
            >
                <span>{state ? state.label : ''}</span>
                <ChevronUpDownIcon
                    className="h-5 self-end"
                    aria-hidden="true"
                />
            </Listbox.Button>
            <Transition
                as={Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Listbox.Options
                    className={`${width} max-h-60 overflow-auto bg-white text-base shadow-xl focus:outline-none sm:text-sm`}
                >
                    {options.map((option, index) => (
                        <Listbox.Option
                            key={index}
                            className={({ active }) =>
                                `relative select-none py-2 pl-10 pr-4 ${
                                    active
                                        ? 'bg-primary text-white'
                                        : 'text-body'
                                }`
                            }
                            value={option}
                        >
                            {({ selected, active }) => (
                                <span
                                    className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                    {option.label}
                                    {selected ? (
                                        <CheckIcon
                                            className={`h-8 w-8 absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                active
                                                    ? 'text-white'
                                                    : 'text-primary'
                                            }`}
                                            aria-hidden="true"
                                        />
                                    ) : null}
                                </span>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Transition>
        </Listbox>
    );
};

export default memo(Select);
