import Keycloak, { KeycloakProfile } from 'keycloak-js'
import { config, options } from '@/auth/keycloak'
import { useMainStore }  from '@/stores/main'

export default {
  install: () => {
    const store = useMainStore()

    const _keycloak = new Keycloak(config)
    _keycloak.init(options).then((auth: boolean) => {
      if(auth) {
        store.$auth = _keycloak
        _keycloak.loadUserInfo().then((user: KeycloakProfile)=>{
          store.user = user
        })
      }
    })
  }
}
