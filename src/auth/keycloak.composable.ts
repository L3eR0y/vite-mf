import { KeycloakState, KeycloakComposable } from '../../types/keycloak'
import { getKeycloak }  from './keycloak'
import { state, setUser } from './keycloak.state'
import { toRefs } from 'vue'


export const useKeycloak = (): KeycloakComposable => {
  return {
    ...toRefs<KeycloakState>(state),
    keycloak: getKeycloak()
  }
}

