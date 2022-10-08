import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Breadcrumbs from '.';

export default {
    title: 'Components/Breadcrumbs',
    component: Breadcrumbs,
    argTypes: {
        children: {
            type: {
                name: 'string',
                required: true,
            },
        },
    },
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = (args) => (
    <Breadcrumbs {...args} />
);

export const Default = Template.bind({});
Default.args = {};
