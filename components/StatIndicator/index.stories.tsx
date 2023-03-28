import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import StatIndicatorComponent from './index';

export default {
    title: 'components/StatIndicator',
    component: StatIndicatorComponent,
} as ComponentMeta<typeof StatIndicator>;

const Template: ComponentStory<typeof h.camelize(name)Component> = (args) => <StatIndicatorComponent {...args} />;
export const StatIndicator = Template.bind({})

StatIndicator.args = {}
