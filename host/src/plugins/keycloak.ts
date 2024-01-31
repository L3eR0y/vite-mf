import Keycloak from 'keycloak-js'
import { useMainStore }  from '@/stores/main'

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

export default {
  install: (app, options) => {
    const store = useMainStore()

    const _keycloak = new Keycloak(keycloak_config)
    _keycloak.init(init_options).then((auth: boolean) => {
      console.log('AUTH: ', _keycloak, store)
      if(auth) {
        store.$auth = _keycloak
        _keycloak.loadUserInfo().then((user: Keycloak.KeycloakProfile)=>{
          store.user = user
        })
      }
    })
  }
}
