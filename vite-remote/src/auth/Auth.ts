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

  private init(init_options: KeycloakInitOptions): Promise<Keycloak> {
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
        resolve(this.keycloak)
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

  public login(): Promise<any> {
    return new Promise((resolve) => {
      this.init(this.buildInitParams()).then((kc)=>{
        this.store.$auth = kc
        resolve(kc)
      })
    })
  }

  public logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('exp');
    this.keycloak.logout();
  }


  // _keycloak.init({...options, onLoad: 'login-required' }).then((auth: boolean) => {
  //   if(auth) {
      
  //   localStorage.setItem(
  //       this.localStorageMapping.refresh_token,
  //       this.keycloak.refreshToken
  //   );
  //   }


  //   if(!auth) {
  //     console.log('FALSE!')
  //     window.location.reload()
  //   } else {
  //     store.$auth = _keycloak
  //     _keycloak.loadUserInfo().then((user: KeycloakProfile)=>{
  //       store.user = user
  //       console.log('USER: ', _keycloak)
  //     })
  //   }


    
  //   // store.$auth = _keycloak
  //   // localStorage.setItem('kc_token', _keycloak.token || '');
  //   // localStorage.setItem('kc_refreshToken', _keycloak.refreshToken || '');

  //   // if(auth) {
  //   //   console.log('AUTH: ', auth, _keycloak)
  //   //   _keycloak.loadUserInfo().then((user: KeycloakProfile)=>{
  //   //     store.user = user
  //   //     store.some_string = _keycloak.authenticated
  //   //   })
  //   // } else {
  //   //   console.log('AUTH: ', auth)
  //   // }
  // })
}
