import Keycloak from 'keycloak-js'
import { createKeycloak, initKeycloak }  from '../auth/keycloak'
import {reactive, resolveComponent} from 'vue';

let $keycloak: Keycloak | undefined = undefined

export default {
  install: async (app: any, options: { [key:string]: any }) => {
    $keycloak = createKeycloak()
    app.config.globalProperties.$keycloak = $keycloak
    app.provide('keycloak', $keycloak)    
    await initKeycloak()
  }
}