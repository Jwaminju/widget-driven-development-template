import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import gameoversignComponent from './index';

export default {
    title: 'components/GameOverSign',
    component: gameoversignComponent,
} as ComponentMeta<typeof gameoversign>;

const Template: ComponentStory<typeof h.camelize(name)Component> = (args) => <gameoversignComponent {...args} />;
export const gameoversign = Template.bind({})

gameoversign.args = {}
