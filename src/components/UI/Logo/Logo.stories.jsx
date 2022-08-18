import Logo from "./Logo";

export default {
    title: 'Logo',
    component: Logo
}

const Template = (arg) => <Logo {...arg}/>

export const Default = Template.bind({});
Default.args = {
    size: 'md'
}