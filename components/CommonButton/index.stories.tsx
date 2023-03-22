import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import buttonComponent from './index';

export default {
    title: 'components/CommonButton',
    component: buttonComponent,
} as ComponentMeta<typeof button>;

const Template: ComponentStory<typeof h.camelize(name)Component> = (args) => <buttonComponent {...args} />;
export const button = Template.bind({})

button.args = {}
