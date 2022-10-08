import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Table from '.';

export default {
    title: 'Components/Table',
    component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
    className: '',
    columns: [
        {
            key: 'value0',
            label: 'Coluna 0',
        },
        {
            key: 'value1',
            label: 'Coluna 1',
        },
    ],
    layout: 'auto',
    rows: [
        {
            value0: 'Ola',
            value1: 'mundo',
        },
        {
            value0: 'Hello',
            value1: 'world',
        },
        {
            value0: 'John',
            value1: 'Doe',
        },
    ],
};
