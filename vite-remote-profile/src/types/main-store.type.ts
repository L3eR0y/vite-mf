import Keycloak from 'keycloak-js'

type UserInfo = {
  email?: string,
  email_verified?: boolean,
  family_name?: string,
  given_name?: string,
  name?: string,
  preferred_username?: string,
  sub?: string,
}

type MainStore = {
  $auth: Keycloak,
  user:  UserInfo,
  [key: string]: any
}

export default MainStore
