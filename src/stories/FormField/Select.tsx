import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { Fragment, memo, useCallback, useState } from 'react';

import { useUpdateEffect } from '../../hooks/useUpdateEffect';

type Option = {
    value: string | number;
    label: string;
    disabled: boolean;
};

type Props = {
    value?: Option | null;
    options: Array<Option>;
    onChange?: (option: Option | null) => void;
    className?: string;
};

const Select = ({
    value = null,
    options,
    className = '',
    onChange = (_) => _,
}: Props) => {
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
        <div>
            <Listbox value={state} onChange={changeCb}>
                <Listbox.Button
                    className={`${className} flex items-center justify-between`}
                >
                    <span>{value ? value.label : ''}</span>
                    <ChevronUpDownIcon
                        className="h-5 w-5 self-end"
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
                    <Listbox.Options className="absolute right-4 left-4 max-h-60 overflow-auto bg-white py-1 text-base shadow-xl focus:outline-none sm:text-sm">
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
                                            selected
                                                ? 'font-medium'
                                                : 'font-normal'
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
        </div>
    );
};

export default memo(Select);
