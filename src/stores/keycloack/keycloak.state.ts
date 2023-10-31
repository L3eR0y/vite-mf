import { KeycloakState, KeycloakTokenParsed } from '../../../types/keycloak'
import { reactive } from 'vue'

export const state = reactive<KeycloakState>({
  isAuthenticated: false,
  token: '',
  user: {}
})

export const isAuthenticated = (value: boolean): void => {
  state.isAuthenticated = value
}

export const setUser = (user: KeycloakTokenParsed): void => {
  state.user = user
}

export const getUser = (): KeycloakTokenParsed | undefined => {
  return state?.user
}