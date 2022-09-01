import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Logo from './Logo';

export default {
    title: 'Components/Logo',
    component: Logo,
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Default = Template.bind({});
Default.args = {
    size: 'lg',
};
