import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Button, { colorClassnames } from './Button';

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        children: {
            type: {
                name: 'string',
                required: true,
            },
        },
        className: {
            defaultValue: {
                summary: '',
            },
        },
        loadingText: {
            defaultValue: {
                summary: '',
            },
        },
        color: {
            options: Object.keys(colorClassnames),
            control: {
                type: 'radio',
            },
            defaultValue: {
                summary: 'primary',
            },
        },
        disabled: {
            defaultValue: {
                summary: false,
            },
        },
        loading: {
            defaultValue: {
                summary: false,
            },
        },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Button',
    loadingText: 'Carregando...',
    className: '',
    color: 'primary',
    disabled: false,
    loading: false,
    size: 'md',
    variant: 'default',
};
