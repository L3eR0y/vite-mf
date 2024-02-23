declare module '*.webp'
declare module 'vue-material-design-icons'


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

type ProfileTab = {
    code: string,
    title: string,
    component: any
}

type ProfileTabs = {
    [key: string]: ProfileTab
}

