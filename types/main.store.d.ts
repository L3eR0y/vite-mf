import { Ref } from 'vue'
import { User } from "./user";

export interface MainStore {
  counter: number,
  user?: User
}

export interface MainStoreComposable {
  counter: Ref<number | undefined> | undefined,
  user?: Ref<User | undefined> | undefined,
  actions?: { [key: string]: any } | undefined,
  getters?: { [key: string]: any } | undefined,
}