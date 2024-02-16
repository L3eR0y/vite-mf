type AvailableService = {
    author:null | string,
    description:string,
    icon_url:string,
    id: string,
    is_favorites:boolean,
    is_visible:boolean,
    link:string,
    notifications_count:number,
    position:number,
    priority:number,
    state:string,
    system:null | string,
    title:string,
    type:null | string,
    version:null | string,
}

type JsonAvailableService = {
    data?:{
        data?:AvailableService[]
    }
}