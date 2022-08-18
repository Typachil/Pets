import Select from './Select';
import SelectItem from './SelectItem';

export default {
    title: 'Select',
    component: Select,
};

const Template = (arg) => <Select {...arg} />;

export const Default = Template.bind({});
Default.args = {
    name: 'Age',
    value: 'Двадцать',
    children: [
        <SelectItem value='Десять' disabled={true}>Десять</SelectItem>, 
        <SelectItem value='Двадцать'>Двадцать</SelectItem>,
        <SelectItem value='Тридцать'>Тридцать</SelectItem>],
};
