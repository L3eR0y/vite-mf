declare module '*.webp'

type Group = {
    id?: string,
    title?: string
}

type Banner = {
    name: string,
    url: string,
    images: Record<number, Image>[]
}


type Image = {
    id:string,
    url: string,
    name:string,
    filename: string,
    content_type: string,
    byte_size: number
}


type Groups = Group[]
type Banners = Banner[]