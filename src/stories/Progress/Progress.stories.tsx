import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Progress from './Progress';

export default {
    title: 'Components/Progress',
    component: Progress,
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => (
    <Progress {...args} />
);

export const Default = Template.bind({});
Default.args = {
    value: 0.5,
};

export const RightLabel = Template.bind({});
RightLabel.args = {
    value: 0.5,
    label: 'label',
    labelPlacement: 'right',
};

export const LeftLabel = Template.bind({});
LeftLabel.args = {
    value: 0.5,
    label: 'label',
    labelPlacement: 'left',
};
