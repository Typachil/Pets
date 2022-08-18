import SearchBar from "./SearchBar";

export default {
    title: 'SearchBar',
    component: SearchBar
}

const Template = (arg) => <SearchBar {...arg}/>

export const Default = Template.bind({});
Default.args = {
    darkTheme: false
}