import Keycloak, { KeycloakConfig, KeycloakInitOptions, KeycloakOnLoad } from "keycloak-js"
// import { StoreDefinition } from 'pinia'
import { useMainStore }  from '@/stores/main'
// import type { LocalStorageMapping } from "@/auth/LocalStorageMap"

export class Auth {
  private keycloak: Keycloak;
  private store: any

  public constructor(config: KeycloakConfig) {
    this.keycloak = new Keycloak(config)
    this.store = useMainStore()

    if(localStorage.getItem("access_token") !== null) {
      this.login()
    }
  }

  private init(init_options: KeycloakInitOptions): Promise<any> {
    return new Promise((resolve) => {

      //@ts-ignore
      !this.keycloak?.didInitialize && this.keycloak
      .init(init_options)
      .then((authenticated: boolean) => {
        if(authenticated) {
          localStorage.setItem('access_token', this.keycloak.token || '')
          localStorage.setItem('refresh_token', this.keycloak.refreshToken || '')
          localStorage.setItem('exp', this.keycloak.tokenParsed?.exp?.toString() || '')

          this.keycloak
            .updateToken(5)
            .then((refreshed: boolean) => {
              if(refreshed) {
                localStorage.setItem('access_token', this.keycloak.token || '')
                localStorage.setItem('refresh_token', this.keycloak.refreshToken || '')
                localStorage.setItem('exp', this.keycloak.tokenParsed?.exp?.toString() || '')
              }
            })
          
          this.keycloak.onTokenExpired = () => {
            this.keycloak
              .updateToken(5)
              .then((refreshed: boolean) => {
                if(refreshed) {
                  localStorage.setItem('access_token', this.keycloak.token || '')
                  localStorage.setItem('refresh_token', this.keycloak.refreshToken || '')
                  localStorage.setItem('exp', this.keycloak.tokenParsed?.exp?.toString() || '')
                }
              })
          }
        }
        resolve(true)
      })
      .catch((e) => {
        console.error(e)
      })
    })
  }

  private buildInitParams(onLoad: KeycloakOnLoad = 'login-required'): KeycloakInitOptions {
    return {
      flow: 'standard',
      enableLogging: true,
      scope: ['openid', 'profile', 'email'].join(' '),
      onLoad,
      token: localStorage.getItem('access_token') || undefined,
      refreshToken: localStorage.getItem('refresh_token') || undefined,
    }
  }

  public login()  { 
    const init_params = this.buildInitParams()   
    this.init(init_params).then(() => {
      this.store.$auth = this.keycloak
    })
    // return new Promise(() => { 
    //   const init_params = this.buildInitParams()
    //   this.init(init_params).then((done: boolean)=>{
    //     this.store.$auth = this.keycloak
    //     return done
    //   })
    // })
  }

  public logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('exp');
    this.keycloak.logout();
  }
}
