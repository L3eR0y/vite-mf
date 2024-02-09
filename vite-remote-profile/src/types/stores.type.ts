import Keycloak from 'keycloak-js'

type MainStore = {
  $auth: Keycloak,
  user:  UserInfo,
  [key: string]: any
}

type ProfileStore = {
  profile?: Object,
  educationLevel?: string,
  processState?: string,
  documentTypes?: { [key: string]: any }[],
  personalDocumentTypes?: { [key: string]: any }[],
  educationDocumentTypes?: { [key: string]: any }[],
  userBriefInfo?: { [key: string]: any },

  user?: ProfileUser,

  docs?: {
    documentType: any,
    noSnils: boolean,
  },
  documents?: { [key: string]: any }[],
}

type ProfileUser = {
  name?: string,
  surname?: string,
  patronymic?: string,
  noPatronymic?: boolean,
  phone?: string,
  phoneAdditional?: string,
  email?: string,
  emailAdditional?: string,
  gender?: { 
    id?: string, 
    name?: string 
  },
  birthday?: string,
  birthplace?: string,
  sameAsRegistration?: false,
  socials?: {
    vk?: string,
    fb?: string,
    tg?: string,
    ok?: string,
  },
  residence: {
    country?: string,
    region?: string,
    locality?: string,
    street?: string,
    house?: string,
    building?: string,
    apartment?: string,
    without_room: false,
    postalCode?: string,
  },
  registration: {
    country?: string,
    region?: string,
    locality?: string,
    street?: string,
    house?: string,
    building?: string,
    apartment?: string,
    without_room: false,
    postalCode?: string,
  },
}

export type {
  MainStore,
  ProfileStore
}
