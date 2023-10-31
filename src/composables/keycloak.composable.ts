import { KeycloakState, KeycloakComposable } from '../../types/keycloak'
import { getKeycloak }  from '../auth/keycloak'
import { state, setUser } from '../stores/keycloack/state'
import { toRefs } from 'vue'


export const useKeycloak = (): KeycloakComposable => {
  return {
    ...toRefs<KeycloakState>(state),
    keycloak: getKeycloak()
  }
}

