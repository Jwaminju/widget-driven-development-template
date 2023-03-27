import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Presenter from './Presenter';

export default {
    title: 'Presenter/GreenHouseEffectStats',
    component: Presenter,
} as ComponentMeta<typeof Presenter>;

const Template: ComponentStory<typeof Presenter> = (args) => <Presenter {...args} />;
export const GreenHouseEffectStats = Template.bind({})

GreenHouseEffectStats.args = {}
