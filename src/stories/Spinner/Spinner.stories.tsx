import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Spinner from './Spinner';

export default {
    title: 'Components/Spinner',
    component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => (
    <Spinner {...args} />
);

export const Default = Template.bind({});
Default.args = {
    color: 'primary',
    size: 'md',
};
