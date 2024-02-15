<template lang="pug">
.services-wrapper
  .services
    .services__head
      .breadcrumbs 1
      .search 2
      .sort 3
    .services__body
      .cards(v-if="cards.length > 0")
        .cards__card-container(v-for="card in cards") 
          .card.service-card
            .service-card__header
              .service-card__title {{ card.title }}
              .service-card__icon(@click="onFavoritesClick(card)")
                svg(width="19" height="16" viewBox="0 0 19 16" :fill="card.is_favorites ? '#FF0A47' : 'none'" xmlns="http://www.w3.org/2000/svg")
                  path(
                    d="M9.03698 1.74953L9.49991 2.11271L9.96285 1.74953C11.1252 0.837631 12.6609 0.525904 14.0963 0.913215C15.8202 1.39488 17.1564 2.73033 17.625 4.42569C18.0149 6.02274 17.4766 7.70465 16.2196 8.79283L16.2029 8.80731L16.1871 8.82274L9.63646 15.2068C9.63626 15.207 9.63606 15.2072 9.63586 15.2073C9.57607 15.2645 9.47699 15.2644 9.41745 15.2068L9.41727 15.2066L2.81054 8.8206L2.79575 8.8063L2.78019 8.79283C1.52328 7.70466 0.984953 6.02277 1.37477 4.42574C1.84336 2.73035 3.1796 1.39489 4.90348 0.913216C6.33896 0.525904 7.87462 0.837631 9.03698 1.74953Z" 
                    stroke="#FF0A47"
                    stroke-width="1.5"
                  )
            .service-card__body
              .service-card__description {{ card.description }}
            .service-card__footer
              .service-card__notify-counter +{{ card.notifications_count }}
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMainStore }  from '@/stores/main'
const cards = ref<Service[]>([])

const store = useMainStore()

async function availableServices(): Promise<Response> {
  try {
    return fetch(`${import.meta.env.VITE_SERVICES__API_URL}/availables`, {
      method: 'GET',
      headers: {
        Authorization: store.$auth.token || '',
      },
    })
  } catch (e: any) {
    console.error(e.message)
    return Promise.reject()
  }
}

function onFavoritesClick(card: Service) {
  card.is_favorites = !card.is_favorites
}

onMounted(() => {
  availableServices()
    .then(resp => resp.json())
    .then((data) => {
      console.log('DATA: ', data)
      cards.value.push(...(data?.data || []))
    }) 
  }
)

// function searchProfile() {
//   return fetch(`${import.meta.env.VITE_PROFILE__API_URL}/users/profiles/?filter[relationships.user]=${ store.$auth.subject }`, {
//     method: 'GET',
//     headers: {
//       Authorization: store.$auth.token || '',
//     },
//   })
//   .then(resp => resp.json())
//   .then((data: any) => {
//     const profile = data?.data?.[0] || null    
//     profile_store.profile = profile
//     tabs_profile.value = _.cloneDeep(profile)
//     return profile
//   })
// }
</script>

<style scoped lang="scss">
  .services-wrapper {
    width: 100%;
    height: 100%;
    background-color: var(--color-bg-secondary);
    padding: 24px;
  }
  .services {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 28px;

    &__head {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    &__body {
      display: flex;
    }
  }

  .cards {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    // justify-content: space-between;

    &__card-container {
      margin-bottom: 20px;
      width: calc(100% / 3);

      &:nth-child(3n + 1) {
        padding-right: 10px;
      }

      &:nth-child(3n + 2) {
        padding-left: 10px;
        padding-right: 10px;
      }        

      &:nth-child(3n + 3) {
        padding-left: 10px;
      }
    }
  }
  .card {
    height: 208px;
    border: 1px solid #D4D6DB;
    border-radius: 8px;
    background-color:  var(--color-bg-primary);
    padding: 20px;
  }

  .service-card {
    &__header {
      display: flex;
      gap: 20px;
      align-items: center;
      flex-grow: 0;
      flex-shrink: 0;
      .service-card__title {
        font-size: 20px;
        font-weight: 500;
        flex-grow: 1;
      }

      .service-card__icon {
        display: flex;
        flex-shrink: 0;
        flex-grow: 0;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border: 1px solid #D4D6DB;
        border-radius: 50%;
        cursor: pointer;
      }
    }

    .service-card__body {
      flex-grow: 1;
      .service-card__description {}
    }

    .service-card__footer {
      display: flex;
      flex-grow: 0;
      flex-shrink: 0;
      justify-content: flex-start;
      align-items: center;
      .service-card__notify-counter {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        background-color: #FF0A47;
        padding: 0px 8px;
        font-size: 12px;
        line-height: 16px;
        font-weight: 400;
        color: var(--color-text-contrast)
      }
    }

    
  }
</style>
