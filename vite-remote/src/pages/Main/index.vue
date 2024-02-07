<template lang="pug">
.main-page-wrapper
  .main-container
    .banner.main-block
      Splider(:slides="banners" :options="banner_splider_options")
        template(#slide="{ slide }")
          img.banner-img(:src="slide.src" @click="onBannerClick(slide)" :data-splide-lazy="slide.src")
    .groups
      .groups-tabs(v-if="groups.length")
        .tab(v-for="group in groups" :key="group.id" :class="{ 'active': active_group.id === group.id }")
          .tab--indicator
            BaseIcon(name="dot" :color="active_group.id === group.id ? '#6DD22A' : '#BABCC2'" size="6")
          .tab--title {{ group.title }}
</template>
  
<script setup lang="ts">
  import { reactive, onMounted, nextTick } from 'vue'
  import { useMainStore }  from '@/stores/main'
  import Splider from '@components/Splider/Splider.vue'
  import bannerPlaceholder from '@/assets/images/banners/banner-placeholder-1020.webp'


  const store = useMainStore()

  const active_group: Group = reactive({})

  const banners: Banners = reactive([
    {
      name: 'welcome_banner',
      src: bannerPlaceholder 
    },
  ])

  const groups: Groups = reactive([])

  const banner_splider_options = reactive({
    type: 'loop',
    interval: 5000,
    // prePage: 1,
    perMove: 1,
    pagination: true,
    paginationDirection: 'ltr',
    arrows: false,
    drag: true,
    autoplay: true,
    rewind: true,
  })

  function onBannerClick(banner: { [ key:string ]: any }): void {
    banner.url && window.open(banner.url)
  }

  function getBanners(): Promise<any> {
    return new Promise((resolve, reject) =>
      fetch('https://dev-elka-common-banners-api.c4.syndev.ru/banners/display', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: store.auth.token || '',
        },
      }).then((response) => response.json())
      .then(data => {
        resolve(data)
      })
      .catch((e: any) => {
        reject(e)
      })
    )
  }

  onMounted(() => {
    console.log('META: ', import.meta.env)
    nextTick(() => {
      getBanners()
    })
  })
</script>
  
<style lang="scss" scoped>
.main-page-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: #f7f9fd;
  padding-top: 24px;
  padding-bottom: 24px;
  overflow-y: auto;
  line-height: 20px;
  @include scroll();

  .main-block {
    display: flex;
    margin-bottom: 16px;
    border-radius: 16px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 24px 22px;
    background-color: white;
    overflow: hidden;

    & .title-container {
      display: flex;
      width: 100%;
      margin-bottom: 16px;
      & .title {
        font-size: 24px;
        font-weight: 500;
        line-height: 32px;
      }

      & .navigation {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex: 1;
        // width: 100%;

        .news-button {
          margin-right: 20px;
        }
        .arrows {
          width: 36px;
          height: 36px;
          background-color: #f2f2f2;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 4px;
          cursor: pointer;
          border-radius: 8px;
        }

        .arrows:nth-last-child(1) {
          margin-right: 0;
        }
      }
    }

    & .empty-block {
      width: 100%;
      height: 100%;
      border-radius: 16px;
      background-color: #f7f9fd;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 276px;

      color: #87898f;
      font-size: 16px;

      img {
        margin-bottom: 12px;
      }
    }
  }

  .cards-container {
    width: 100%;

    .cards {
      width: 100%;
      position: relative;

      .card {
        all: unset;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        cursor: pointer;

        width: 232px;
        height: 100%;

        font-size: 20px;
        font-weight: 400;
        color: black;

        // margin-right: 16px;
        border-radius: 16px;
        border: 1px solid #d4d6db;
        padding: 16px 12px;

        .image-container {
          overflow: hidden;
          .card-img {
            max-width: 100%;
            height: auto;
          }
        }
      }
    }
  }

  & .main-container {
    width: 100%;
    padding: 0px 24px;
    max-width: 1068px;

    & .banner {
      display: flex;
      background-color: transparent;
      border: 1px #e3e1e1 solid;
      padding: 0px;

      .banner-img {
        max-width: 1020px;
        width: 100%;
        height: 253px;
      }
    }

    .placeholder {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1020px;
      height: 253px;
      background: white;
      border: none;
    }

    & .groups {
      // 106px
      // height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 16px;

      &-tabs {
        display: flex;
        font-size: 12px;
        font-weight: 400;
        color: #87898f;

        & .tab:nth-child(1) {
          margin-left: 0px;
        }

        & .tab {
          height: 26px;
          border-radius: 8px 8px 0px 0px;
          display: flex;
          padding: 6px 22px 4px 22px;
          background-color: #e7e7e7;
          margin-left: -10px;
          z-index: 0;
          line-height: 16px;
          cursor: pointer;

          &--indicator {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 4px;
          }
        }

        & .active {
          background-color: white;
          font-weight: 500;
          color: #0d1140;
          z-index: 1;
        }
      }

      &-content {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: white;
        width: 100%;
        flex: 1;
        // border-radius: 0px 8px 8px 8px;

        font-size: 28px;
        font-weight: 500;
        line-height: 36px;
        padding: 14px 22px;

        .waving-hand {
          margin-left: 10px;
          width: 32px;
          height: 32px;
          background-image: url('@/assets/images/WavingHand.svg');
          background-repeat: no-repeat;
        }
      }
    }

    & .helpers {
      height: 222px;

      .helpers-container {
        display: flex;
        // justify-content: space-between;
        gap: 12px;
        width: 100%;

        .helper {
          border-radius: 8px;
          background-color: #f7f9fd;
          height: 122px;
          display: flex;
          width: 482px;
          flex-direction: column;
          padding: 13px;

          .profile {
            display: flex;
            margin-bottom: 14px;
            .avatar {
              width: 36px;
              height: 36px;
              border-radius: 50%;
              margin-right: 12px;

              &-red {
                background-image: url('@/assets/images/avatars/RedAvatar.svg');
                background-repeat: no-repeat;
                width: 100%;
                height: 100%;
              }
              &-yellow {
                background-image: url('@/assets/images/avatars/YellowAvatar.svg');
                // background-position: top left;
                background-repeat: no-repeat;
                width: 100%;
                height: 100%;
              }
            }

            .information {
              .name {
                font-size: 14px;
                line-height: 20px;
                font-weight: 500;
              }
              .rank {
                font-size: 12px;
                line-height: 16px;
                font-weight: 400;
                color: #87898f;
              }
            }
          }

          .phones {
            display: flex;
            gap: 12px;
            margin-bottom: 6px;

            .phone {
              display: flex;
              align-items: center;
              border-radius: 12px;
              padding: 2px 6px;
              background-color: #fff;

              .icon {
                margin-right: 6px;
              }
            }
          }

          .emails {
            display: flex;
            gap: 12px;

            .email {
              display: flex;
              align-items: center;
              border-radius: 12px;
              padding: 2px 6px;
              background-color: #fff;

              .icon {
                margin-right: 6px;
              }
            }
          }

          // .profile
          //   .avatar A
          //   .information
          //     .name Крючкова Алиса Валерьевна
          //     .rank Тьютор
          // .phones Phones
          // .emails Emails
        }
      }
    }

    & .favorie-services {
      // height: 376px;
      & .cards-container {
        .cards {
          li {
            .card {
              color: #fff;
              height: 276px;
              &-header {
                all: unset;

                display: flex;
                justify-content: flex-end;
                flex-shrink: 0;
                flex-grow: 0;
                height: 112px;

                .icon {
                  width: 40px;
                  height: 40px;
                  background-color: white;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }

              &-body {
                all: unset;
                flex-shrink: 0;
                flex-grow: 0;
                & .title {
                  margin-bottom: 4px;
                  font-size: 20px;
                  line-height: 28px;
                }

                & .description {
                  font-size: 14px;
                  font-weight: 400;
                  display: -webkit-box;
                  max-width: 100%;
                  -webkit-line-clamp: 5;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                }
              }
            }
          }

          li:nth-child(6n + 1) {
            .card {
              background-color: #2c50ee;
              background-image: url('@/assets/icons/services/main/1n.svg');
              background-position: top left;
              background-repeat: no-repeat;
            }
          }

          li:nth-child(6n + 2) {
            .card {
              background-color: #642080;
              background-image: url('@/assets/icons/services/main/2n.svg');
              background-position: top left;
              background-repeat: no-repeat;
            }
          }

          li:nth-child(6n + 3) {
            .card {
              background-color: #00a6ff;
              background-image: url('@/assets/icons/services/main/3n.svg');
              background-position: top left;
              background-repeat: no-repeat;
            }
          }

          li:nth-child(6n + 4) {
            .card {
              background-color: #ff8c00;
              background-image: url('@/assets/icons/services/main/1n.svg');
              background-position: top left;
              background-repeat: no-repeat;
            }
          }

          li:nth-child(6n + 5) {
            .card {
              background-color: #00a299;
              background-image: url('@/assets/icons/services/main/2n.svg');
              background-position: top left;
              background-repeat: no-repeat;
            }
          }

          li:nth-child(6n + 6) {
            .card {
              background-color: #ff0a47;
              background-image: url('@/assets/icons/services/main/3n.svg');
              background-position: top left;
              background-repeat: no-repeat;
            }
          }

          li:nth-last-child(1) {
            .card {
              margin-right: 0;
              background-color: #0d1140;
              background-image: url('@/assets/icons/services/main/last.svg');
              background-position: top left;
              background-repeat: no-repeat;
            }
          }
        }
      }
    }

    & .student-life {
      // height: 374px;

      & .navigation {
        .news-button {
          display: flex;

          @media (max-width: 744px) {
            display: none;
          }
        }
      }

      & .cards-container {
        .cards {
          .card {
            background-color: #f7f9fd;
            box-shadow: 0px 2px 6px 0px rgba(116, 116, 116, 0.1);
            padding: 12px;
            padding-bottom: 18px;
            height: 289px;

            .image-container {
              width: 100%;
              height: 128px;
              border-radius: 8px;
              background-color: white;
              margin-bottom: 16px;
            }

            .description {
              font-size: 16px;
              font-weight: 500;
              line-height: 22px;
              display: -webkit-box;
              max-width: 100%;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              overflow: hidden;
              margin-bottom: 16px;
            }

            .date-container {
              display: flex;
              align-items: center;
              font-size: 12px;
              font-weight: 16px;
              color: #87898f;

              .calendar-icon {
                margin-right: 6px;
              }
            }
          }
        }

        @media (max-width: 744px) {
          margin-bottom: 16px;
        }
      }

      & .card-actions {
        width: 100%;
        display: none;

        @media (max-width: 744px) {
          display: flex;
          .news-button {
            width: 100%;
          }
        }
      }
    }

    & .news {
      & .navigation {
        .news-button {
          display: flex;

          @media (max-width: 744px) {
            display: none;
          }
        }
      }
      & .cards-container {
        .cards {
          .card {
            background-color: #f7f9fd;
            box-shadow: 0px 2px 6px 0px rgba(116, 116, 116, 0.1);
            padding: 12px;
            padding-bottom: 18px;
            height: 289px;

            .image-container {
              width: 100%;
              height: 128px;
              border-radius: 8px;
              background-color: white;
              margin-bottom: 16px;
            }

            .description {
              font-size: 16px;
              font-weight: 500;
              line-height: 22px;
              display: -webkit-box;
              max-width: 100%;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              overflow: hidden;
              margin-bottom: 16px;
            }

            .date-container {
              display: flex;
              align-items: center;
              font-size: 12px;
              font-weight: 16px;
              color: #87898f;

              .calendar-icon {
                margin-right: 6px;
              }
            }
          }
        }

        @media (max-width: 744px) {
          margin-bottom: 16px;
        }
      }

      & .card-actions {
        width: 100%;
        display: none;

        @media (max-width: 744px) {
          display: flex;
          .news-button {
            width: 100%;
          }
        }
      }
    }
  }
}
.page {
  height: 100%;
}
</style>
  