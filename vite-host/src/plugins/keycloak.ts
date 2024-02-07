import { Auth } from '@/auth/Auth'
import { config } from '@/auth/keycloak'

export default {
  // @ts-ignore
  install: async () => {    
    const keycloak = new Auth(config)
    keycloak.login()
  }
}
