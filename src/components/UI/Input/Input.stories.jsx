import Input from "./Input";

export default {
    title: 'Input',
    component: Input
}

const Template = (arg) => <Input {...arg}/>

export const Default = Template.bind({});
Default.args = {
    valid: false,
    placeholder: "Что-то",
    errorMessage: ''
}