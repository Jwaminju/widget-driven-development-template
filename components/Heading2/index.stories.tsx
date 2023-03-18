import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Heading1Component from './index';

export default {
    title: 'components/Heading1',
    component: Heading1Component,
} as ComponentMeta<typeof Heading1>;

const Template: ComponentStory<typeof h.camelize(name)Component> = (args) => <Heading1Component {...args} />;
export const Heading1 = Template.bind({})

Heading1.args = {}
