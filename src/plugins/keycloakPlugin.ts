import Keycloak from 'keycloak-js'
import { createKeycloak, initKeycloak }  from '../utils/keycloak'

import * as Vue from 'vue'

export default {
   install: async (app: any, options: { [key:string]: any }) => {
    const _keycloak = createKeycloak() 

    app.config.globalProperties.$keycloak = _keycloak
    app.provide('keycloak', _keycloak)
    const _auth = await initKeycloak()
    console.log('AUTH: ', _auth)
  }
}