import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import MediaDropzone from './MediaDropzone';

export default {
    title: 'Components/MediaDropzone',
    component: MediaDropzone,
} as ComponentMeta<typeof MediaDropzone>;

const Template: ComponentStory<typeof MediaDropzone> = (args) => (
    <MediaDropzone {...args} />
);

export const Default = Template.bind({});
Default.args = {
    files: [],
    onChange: console.log,
    onError: console.log,
};
