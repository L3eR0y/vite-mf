<template>
  <div :class="{ 'mb-1': isExpanded }" class="sidebar-menu-item">
    <slot v-bind="this">
      <SideBarAccordion
        :expand="expanded && !isMinimized"
        :expanded-from-left-transition.sync="expandedFromLeftTransition"
      >
        <template #head>
          <NavItem :item="item" :is-minimized="isMinimized" @click.native="handleMenuItemClick" />
        </template>

        <template #body>
          <div class="submenu-container ml-3 px-3">
            <NavItem
              v-for="(submenuItem, index) in item.submenu"
              :key="submenuItem.route + index"
              :is-minimized="isMinimized"
              is-submenu-item
              class="submenu-item"
              :item="submenuItem"
              @click="handleSubmenuItemClick(submenuItem)"
            />
          </div>
        </template>
      </SideBarAccordion>
    </slot>
  </div>
</template>

<script>
export default {
  components: {
    SideBarAccordion: () => import('~/components/ui/SideBarAccordion'),
    NavItem: () => import('~/components/BaseComponents/BaseNavItem'),
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
    isMinimized: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      isExpanded: false,
      expandedFromLeftTransition: false,
    }
  },

  computed: {
    expanded() {
      return !!this.isPartOf && this.item?.submenu?.length > 0
    },
    isPartOf() {
      const regExp = new RegExp(`^${this.item.route}`, 'gi')
      return this.$route?.name?.match(regExp)
    },
  },

  methods: {
    /**
     * Проверяем, требуется ли сворачивание сайдбара. Сворачивание необходимо в 2 случаях - если изначально
     * сайдбар был свернут ( localStorage.getItem('minimized') === 'true'), и сейчас находится
     * в развернутом состоянии только в результате клика на пункт меню, содержащий подпункты.
     * И если ширина экрана менее 768
     */
    minimizeIfRequired() {
      if (localStorage.getItem('minimized') === 'true' || document.body.clientWidth < 768) {
        this.$nuxt.$emit('minimizemenu', true)
      }
    },

    /**
     * Если у кликнутого пункта меню нет подпунктов, то проверяем необходимость сворачиваения в minimizeIfRequired.
     * Если у кликнутого пункта меню есть подпункты, то проверяем, свернут ли сайдбар. Если сайдбар не свернут, то просто
     * раскрываем аккордеон. Если сайдбар свернут, то раскрываем сайдбар и аккордеон, а так же сворачиваем
     * все остальные пункты меню - с помощью collapse-all-menu-items устанавливаем для них isExpanded = false
     */
    async handleMenuItemClick() {
      this.$store.commit('ui/SET_SIDEBAR_ACTIVE_ITEM', this.item?.route || '')
      if (this.item.link) {
        window.open(this.item.link)
      } else if (this.item?.type === 'go2page' || this.item?.route) {
        if (this.$route.name !== this.item.route) {
          await this.$router.push({ name: this?.item?.route })
          this.$nextTick(() => {
            this.isExpanded = true
          })
        }
      } else if (this.item?.type === 'function') {
        this.item?.action()
      }

      this.$nuxt.$emit('collapse-all-menu-items', this.item)

      // if (!this.item.submenu?.length) {
      //   this.minimizeIfRequired()
      //   return
      // }

      // if (this.isMinimized) {
      //   this.$nuxt.$emit('minimizemenu', false)

      //   this.expandedFromLeftTransition = true
      //   this.isExpanded = true

      //   return
      // }

      this.isExpanded = !this.isExpanded
    },

    async handleSubmenuItemClick(submenuItem) {
      if (submenuItem?.type === 'go2page' || submenuItem?.route) {
        if (this.$route?.name !== submenuItem?.route) {
          await this.$router.push({ name: submenuItem?.route })
          this.$nextTick(() => {
            this.isExpanded = true
          })
        }
      } else if (submenuItem?.type === 'function') {
        submenuItem.action()
      }
      this.minimizeIfRequired()
    },
  },

  created() {
    this.$nuxt.$on('collapse-all-menu-items', (item) => {
      if (item.route === this.item.route) {
        return
      }

      this.isExpanded = false
    })

    this.$nuxt.$on('minimizemenu', (minimized) => {
      if (minimized) {
        return
      }
      this.expandedFromLeftTransition = true
    })
  },
}
</script>

<style scoped lang="scss">
.submenu-container {
  border-left: 1px solid $sidebar-color-vertical-separator;
}
</style>
