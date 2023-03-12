import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Presenter from './Presenter';

export default {
    title: 'Presenter/globe',
    component: Presenter,
} as ComponentMeta<typeof Presenter>;

const Template: ComponentStory<typeof Presenter> = (args) => <Presenter {...args} />;
export const globe = Template.bind({})

globe.args = {}
