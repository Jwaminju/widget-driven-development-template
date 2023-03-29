import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import ItemSpecCardComponent from './index';

export default {
    title: 'components/ItemSpecCard',
    component: ItemSpecCardComponent,
} as ComponentMeta<typeof ItemSpecCard>;

const Template: ComponentStory<typeof h.camelize(name)Component> = (args) => <ItemSpecCardComponent {...args} />;
export const ItemSpecCard = Template.bind({})

ItemSpecCard.args = {}
