import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Alert from './Alert';

export default {
    title: 'Components/Alert',
    component: Alert,
    argTypes: {
        children: {
            type: {
                name: 'string',
                required: true,
            },
        },
    },
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Aqui vai a descrição.',
    isInline: false,
    size: 'md',
    title: 'Título!',
    type: 'info',
    withBg: false,
};
