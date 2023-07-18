import Keycloak from 'keycloak-js'
import * as Vue from 'vue'

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

async function initKeycloak(): Promise<boolean | undefined> {
  const _auth = await $keycloak?.init(init_options)
  return _auth
}

export {
  createKeycloak,
  initKeycloak
}