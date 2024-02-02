import Keycloak from 'keycloak-js'

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
