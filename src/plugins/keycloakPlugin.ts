import Keycloak from 'keycloak-js'
import { createKeycloak, initKeycloak }  from '../utils/keycloak'

import * as Vue from 'vue'

export default {
   install: async (app: any, options: { [key:string]: any }) => {
    const _keycloack = createKeycloak() 

    app.config.globalProperties.$keycloak = _keycloack

    const _auth = await initKeycloak()
    console.log('AUTH: ', _auth)
  }
}