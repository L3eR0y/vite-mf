declare module '*.webp'

type Group = {
    id?: string,
    title?: string
}

type Banner = {
    name: string,
    src: string
}

type Groups = Group[]
type Banners = Banner[]