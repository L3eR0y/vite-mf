import { reactive } from 'vue'
import { MainStore } from '../../../types/main.store'
import { User } from '../../../types/user'

export const state = reactive<MainStore>({
  counter: 0,
  user: {}
})

export const getters = {
  user: (): User | undefined => { return state?.user },
  counter: (): number | undefined => { return state?.counter }
}

export const actions = {
  set_user: (user: User): void => { state.user = user },
  increment: (count: number = 0) => { state.counter += count},
  decrement: (count: number = 0) => { state.counter -= count},
}