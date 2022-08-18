import Checkbox from "./Checkbox";

export default {
    title: 'Checkbox',
    component: Checkbox
}

const Template = (arg) => <Checkbox {...arg}/>

export const Default = Template.bind({});
Default.args = {
    checked: true
}