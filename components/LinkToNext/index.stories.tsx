import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import LinkToNextComponent from './index';

export default {
    title: 'components/LinkToNext',
    component: LinkToNextComponent,
} as ComponentMeta<typeof LinkToNext>;

const Template: ComponentStory<typeof h.camelize(name)Component> = (args) => <LinkToNextComponent {...args} />;
export const LinkToNext = Template.bind({})

LinkToNext.args = {}
