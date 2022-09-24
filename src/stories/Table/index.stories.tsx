import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Table from '.';

export default {
    title: 'Components/Table',
    component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {};
