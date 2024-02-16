export const enum ImageSize {
    LG = 1020,
    MD = 696,
    SM = 351,
}

export type Image = {
    id:string,
    url: string,
    name:string,
    filename: string,
    content_type: string,
    byte_size: number
}
