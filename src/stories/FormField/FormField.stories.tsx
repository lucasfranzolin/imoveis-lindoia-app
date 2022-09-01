import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import FormField from './FormField';

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
};

export const Select = Template.bind({});
Select.args = {
    children: (
        <select id="testId-select">
            <option value="" />
            <option value={0}>option</option>
        </select>
    ),
    id: 'testId-select',
    label: 'Exemplo',
};
