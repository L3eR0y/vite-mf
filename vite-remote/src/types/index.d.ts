declare module '*.webp'
import type {Image,ImageSize} from "@/types/images.ts";


export type Group = {
    id?: string,
    title?: string
}


export type Banner = {
    name: string,
    url: string,
    src?:string,
    images: Record<ImageSize, Image>[]
}


export type Groups = Group[]
export type Banners = Banner[]