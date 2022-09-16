import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import MediaDropzone from '.';

export default {
    title: 'Components/MediaDropzone',
    component: MediaDropzone,
    argTypes: {
        files: {
            table: {
                disable: true,
            },
        },
    },
} as ComponentMeta<typeof MediaDropzone>;

const Template: ComponentStory<typeof MediaDropzone> = (args) => (
    <MediaDropzone {...args} />
);

export const Default = Template.bind({});
Default.args = {
    files: [],
    onSave: console.log,
};
