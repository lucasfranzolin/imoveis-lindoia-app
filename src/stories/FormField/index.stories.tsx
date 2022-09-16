import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import FormField from '.';

export default {
    title: 'Components/FormField',
    component: FormField,
    argTypes: {
        children: {
            table: {
                disable: true,
            },
        },
    },
} as ComponentMeta<typeof FormField>;

const Template: ComponentStory<typeof FormField> = (args) => (
    <FormField {...args} />
);

export const Input = Template.bind({});
Input.args = {
    children: <input id="testId-input" />,
    error: false,
    errorMsg: 'Mensagem de erro aqui.',
    id: 'testId-input',
    label: 'Exemplo',
    required: true,
    size: 'md',
};

export const Select = Template.bind({});
Select.args = {
    children: (
        <SelectListBox
            options={[
                { value: 1, label: 'Durward Reynolds', disabled: false },
                { value: 2, label: 'Kenton Towne', disabled: false },
                { value: 3, label: 'Therese Wunsch', disabled: false },
                { value: 4, label: 'Benedict Kessler', disabled: true },
                { value: 5, label: 'Katelyn Rohan', disabled: false },
            ]}
            value={undefined}
            onChange={console.log}
        />
    ),
    error: false,
    errorMsg: 'Mensagem de erro aqui.',
    id: 'testId-select',
    label: 'Exemplo',
    required: true,
    size: 'md',
};
