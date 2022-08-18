import Avatar from "./Avatar";

export default {
    title: 'Avatar',
    component: Avatar
}

const Template = (arg) => <Avatar {...arg}/>

export const Default = Template.bind({});
Default.args = {
    name: 'Nikita'
}