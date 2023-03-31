import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import ItemCardWrapComponent from './index';

export default {
    title: 'components/ItemCardWrap',
    component: ItemCardWrapComponent,
} as ComponentMeta<typeof ItemCardWrap>;

const Template: ComponentStory<typeof h.camelize(name)Component> = (args) => <ItemCardWrapComponent {...args} />;
export const ItemCardWrap = Template.bind({})

ItemCardWrap.args = {}
