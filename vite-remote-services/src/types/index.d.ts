declare module '*.webp'
declare module '@synergy/*'
declare module 'ui-kit-bundler'

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

