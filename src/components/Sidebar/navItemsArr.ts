import { BLOG_ROUTE, CHAT_ROUTE, HOME_ROUTE, PETS_ROUTE, PROFILE_ROUTE } from '../../utils/constRoutes';
import HomeIcon from './icons/Home.svg';
import PetsIcon from './icons/Pets.svg';
import BlogIcon from './icons/Blog.svg';
import ChatIcon from './icons/Chat.svg';
import ProfileIcon from './icons/Profile.svg';

export const navItemsArr = [
    {
        icon: ProfileIcon,
        title: 'Profile',
        path: PROFILE_ROUTE.path
    },
    {
        icon: PetsIcon,
        title: 'Pets',
        path: PETS_ROUTE.path
    },
    {
        icon: HomeIcon,
        title: 'Home',
        path: HOME_ROUTE.path
    },
    {
        icon: BlogIcon,
        title: 'Blog',
        path: BLOG_ROUTE.path
    },
    {
        icon: ChatIcon,
        title: 'Chat',
        path: CHAT_ROUTE.path
    }
]