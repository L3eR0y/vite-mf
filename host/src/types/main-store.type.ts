import Keycloak from 'keycloak-js'

type MainStore = {
  $auth: Keycloak,
  user:  Keycloak.KeycloakProfile,
  [key: string]: any
}

export default MainStore
