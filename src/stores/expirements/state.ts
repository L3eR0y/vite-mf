import { reactive } from "vue"

export const state = reactive({
  ex_counter: 0,
  ex_countr_2: 1
})

export const getters = {
  ex1: () => { return state?.ex_counter },
  ex2: () => { return state?.ex_countr_2 }
}

export const actions = {
  i1: (count: number = 0) => { state.ex_counter += count},
  i2: (count: number = 0) => { state.ex_countr_2 += count},
  d1: (count: number = 0) => { state.ex_counter -= count},
  d2: (count: number = 0) => { state.ex_countr_2 -= count},
}