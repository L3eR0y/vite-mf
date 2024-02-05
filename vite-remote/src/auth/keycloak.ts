import { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js'

const keycloak_config: KeycloakConfig = {
  url: 'https://authdev2.synergy.ru/auth',
  clientId: 'public',
  realm: 'clients',
}

const init_options: KeycloakInitOptions = {
  flow: 'standard',
  onLoad: 'login-required',
  scope: ['openid', 'profile', 'email'].join(' ')
}

export {
  keycloak_config as config,
  init_options as options
}