import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import Presenter from './Presenter';

export default {
    title: 'Presenter/auth',
    component: Presenter,
} as ComponentMeta<typeof Presenter>;

const Template: ComponentStory<typeof Presenter> = (args) => <Presenter {...args} />;
export const hello = Template.bind({})

hello.args = {}
