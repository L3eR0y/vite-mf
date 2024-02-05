import { KeycloakProfile } from 'keycloak-js'
import { useMainStore }  from '@/stores/main'

export default {
  // @ts-ignore
  install: (app: any, options: any) => {
    const store = useMainStore()
    store.$auth = options.keycloak

    options.keycloak.loadUserInfo().then((user: KeycloakProfile)=>{
      store.user = user
    })
  }
}
