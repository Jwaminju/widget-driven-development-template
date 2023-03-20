import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import TextModalComponent from './index';

export default {
    title: 'components/TextModal',
    component: TextModalComponent,
} as ComponentMeta<typeof TextModal>;

const Template: ComponentStory<typeof h.camelize(name)Component> = (args) => <TextModalComponent {...args} />;
export const TextModal = Template.bind({})

TextModal.args = {}
