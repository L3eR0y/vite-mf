import Keycloak from 'keycloak-js'

type MainStore = {
  $auth: Keycloak,
  user:  any,
  [key: string]: any
}

export type {
  MainStore,  
}
