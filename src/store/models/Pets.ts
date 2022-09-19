export interface Post {
    id: number;
    body: string;
    time: string;
    author: string;
    status: string;
    avatar: string | null
}

export interface Pet {
    id: number
    name: string;
    age: string;
    about: string;
    groupID: number;
    previewImg: string;
    images: string[];
    likes: number,
    location: string;
    sex: boolean;
    type: string;
    weight: string;
    adopt: boolean;
    price?: number
}

export interface Graphic{
    id: number,
    views: number,
    likes: number
}

export interface Statistic {
    name: string,
    img: string,
    likes: number,
    graphic: Graphic[]
}

export interface Group{
    id: number;
    name: string;
    search?: string;
}