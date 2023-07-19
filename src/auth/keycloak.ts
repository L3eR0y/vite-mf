import Keycloak from 'keycloak-js'
import { isAuthenticated, setUser } from './keycloak.state'


const keycloak_config: Keycloak.KeycloakConfig = {
  url: 'https://authdev2.synergy.ru/auth',
  clientId: 'public',
  realm: 'clients',  
}

const init_options: Keycloak.KeycloakInitOptions = {
  flow: 'standard',
  onLoad: 'login-required',
  scope: ['openid', 'profile', 'email'].join(' ')
}

let $keycloak: Keycloak | undefined = undefined

function createKeycloak(): Keycloak {
  $keycloak = new Keycloak(keycloak_config)
  return $keycloak
}

async function initKeycloak(): Promise<void> {
  try {
    let _authenticated = await $keycloak?.init(init_options)
    isAuthenticated(_authenticated || false)
    $keycloak?.idTokenParsed && setUser($keycloak?.idTokenParsed)
  } catch(error: any) {
    isAuthenticated(false)
  }
}

function getKeycloak(): Keycloak | undefined {
  return $keycloak
}

export {
  createKeycloak,
  initKeycloak,
  getKeycloak
}