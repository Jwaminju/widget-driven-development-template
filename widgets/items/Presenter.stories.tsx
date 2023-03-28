import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import Presenter from './Presenter';

export default {
    title: 'Presenter/Scene',
    component: Presenter,
} as ComponentMeta<typeof Presenter>;

const Template: ComponentStory<typeof Presenter> = (args) => <Presenter {...args} />;
export const Scene = Template.bind({})

Scene.args = {}
