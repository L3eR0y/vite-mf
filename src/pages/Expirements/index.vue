<template lang="pug">
table(width="100%" style="width: 100%; height: 100%; background-color: white;")
  tr
    td(height="100%")
      table(style="width: 100%; max-width: 600px; min-width: 400px; margin-left: auto; margin-right: auto")
        tr
          table(style="background-color:#f5f5f5; width:100%; height: 80px;")
            tr
              td
        tr
          td
            p Здравствуйте!
            p Мы уже создали для Вас Личный кабинет, где Вы сможете посмотреть ознакомительный курс об Университете.
            p Чтобы завершить регистрацию Личного кабинета, пройдите по ссылке, актуализируйте свои личные данные и задайте пароль.
            p Нажмите для продолженения регистрации.
            p Внимание! Ссылка действительна 12 часов
            p После того, как вы завершите регистрацию, Личный кабинет будет доступен Вам по ссылке.
            p Благодарим вас за доверие к Университету «Синергия» и желаем успехов в обучении!
        tr
          td
        tr
          td
            table(style="background-color:#252525; width:100%; height: 148px;")
              tr
                td
                  table(style="margin-left: auto; margin-right: auto; font-size: 13px; color: white;")
                    tr
                      td
                        p © 1988 — 2023, Университет «Синергия». Все права защищены.
</template>
  
<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useExpirements } from '../../composables'

const { actions, getters } = useExpirements()

const c1 = computed(() => {
  return getters?.ex1() || 0
})

const c2 = computed(() => {
  return getters?.ex2() || 0
})
</script>

<style lang="scss" scoped>

table {
  border: 1px black solid;
  border-spacing: 0;
  tr {
    box-sizing: border-box;
    td {
      padding: 0;
    }
  }
}
</style>