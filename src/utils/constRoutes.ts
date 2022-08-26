export const LOGIN_ROUTE = '/login';
export const REGISTRATION_ROUTE = '/registration';
export const START_ROUTE = '/';
export const HOME_ROUTE = {
    path: '/home',
    title: 'Home'
}

export const PETS_ROUTE = {
    path: '/pets',
    title: 'Питомцы'
}

export const PETS_DETAIL = {
    path: '/pets/:id',
    title: 'Питомцы'
}

export const PROFILE_ROUTE = {
    path: '/profile',
    title: 'Профиль'
}

export const CHAT_ROUTE = {
    path: '/chat',
    title: 'Home'
}

export const BLOG_ROUTE = {
    path: '/blog',
    title: 'Новости'
}

export const ERROR_ROUTE = {
    path: '*',
    title: '404'
}

export const routesLayout = [HOME_ROUTE, PETS_ROUTE, PETS_DETAIL, PROFILE_ROUTE, CHAT_ROUTE, BLOG_ROUTE, ERROR_ROUTE]