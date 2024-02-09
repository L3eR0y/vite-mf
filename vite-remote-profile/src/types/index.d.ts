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

type UserInfo = {
    email?: string,
    email_verified?: boolean,
    family_name?: string,
    given_name?: string,
    name?: string,
    preferred_username?: string,
    sub?: string,
}