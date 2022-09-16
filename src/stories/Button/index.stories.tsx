import { HandThumbUpIcon, HeartIcon } from '@heroicons/react/24/solid';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Button, { variantClassnames } from '.';

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
        variant: {
            options: Object.keys(variantClassnames),
            control: {
                type: 'radio',
            },
            defaultValue: {
                summary: 'filled',
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
        icon: {
            table: {
                disable: true,
            },
        },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'default',
    loadingText: 'Carregando...',
    className: '',
    variant: 'filled',
    disabled: false,
    loading: false,
    size: 'md',
    as: 'default',
    fullWidth: false,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    icon: <HandThumbUpIcon />,
    children: 'like',
    loadingText: 'Carregando...',
    className: '',
    variant: 'filled',
    disabled: false,
    loading: false,
    size: 'md',
    as: 'default',
    fullWidth: false,
};

export const IconButton = Template.bind({});
IconButton.args = {
    icon: <HeartIcon />,
    className: '',
    variant: 'filled',
    disabled: false,
    loading: false,
    size: 'md',
    as: 'default',
    fullWidth: false,
};
