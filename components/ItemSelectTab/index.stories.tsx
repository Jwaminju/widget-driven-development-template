import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import ItemSelectTabComponent from './index';

export default {
    title: 'components/ItemSelectTab',
    component: ItemSelectTabComponent,
} as ComponentMeta<typeof ItemSelectTab>;

const Template: ComponentStory<typeof h.camelize(name)Component> = (args) => <ItemSelectTabComponent {...args} />;
export const ItemSelectTab = Template.bind({})

ItemSelectTab.args = {}
