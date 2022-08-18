import Radio from "./Radio";
import RadioGroup from "./RadioGroup";

export default {
    title: 'RadioGroup',
    component: RadioGroup
}

const Template = (arg) => <RadioGroup {...arg}/>

export const Default = Template.bind({});
Default.args = {
    name: "Sex",
    value: "male",
    children: [<Radio value="male" label="Женщина"/>, <Radio value="female" label="Мужчина"/>]
}