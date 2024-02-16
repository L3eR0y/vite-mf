declare module '*.webp'
import type {Image,ImageSize} from "@/types/images.ts";
import {User} from "@/types/user.type.ts";


interface Group extends User {
    id: string,
    title: string
}


export type Banner = {
    name: string,
    url: string,
    src?:string,
    images: Record<ImageSize, Image>[]
}


export type Groups = Group[]
export type Banners = Banner[]