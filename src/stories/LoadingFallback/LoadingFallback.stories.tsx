import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import LoadingFallback from './LoadingFallback';

export default {
    title: 'Components/LoadingFallback',
    component: LoadingFallback,
    argTypes: {
        children: {
            type: {
                name: 'string',
                required: true,
            },
        },
    },
} as ComponentMeta<typeof LoadingFallback>;

const Template: ComponentStory<typeof LoadingFallback> = (args) => (
    <LoadingFallback {...args} />
);

export const Default = Template.bind({});
Default.args = {
    children: 'Aqui vai a mensagem de carregamento',
};
