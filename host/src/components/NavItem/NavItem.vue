<template>
  <li class="nav-item user-select-none" :class="navItemStatus">
    <div
      class="nav-link d-flex align-items-center"
      v-if="visible"
      :data-cy="`nav-${item.title}`"
      :class="{
        active: activeClass,
        disabled: !!disabled,
        'is-minimized': isMinimized,
        'submenu-item': isSubmenuItem,
      }"
      @click="onNavClick"
    >
      <Icon :name="item.icon.name || 'services'" :color="activeClass ? '#FF0141' : item.icon.color" />
      <!-- <template v-if="typeof item.icon === 'object'">
        <Icon :name="item.icon.name || 'services'" :color="activeClass ? '#FF0141' : item.icon.color" />
      </template>
      <template v-else>
        <span v-if="item.icon" class="icon-muted d-flex">
          <i :class="['sy-icon', item.icon]" />
        </span>
      </template> -->

      <span class="nav-item-label" :class="{ 'ml-3': !isSubmenuItem }">
        {{ translatedTitle }}
      </span>
    </div>
  </li>
</template>

<script>
import Icon from '@components/Icon/Icon.vue'
export default {
  components: {
    Icon,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    isSubmenuItem: {
      type: Boolean,
      default: false,
    },
    isMinimized: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['click'],

  computed: {
    activeClass() {
      const regExp = new RegExp(`^${this.item.route}(?:-|$)`)
      const result = this?.item?.route && !!this.$route?.name?.match(regExp)
      return result
    },

    disabled() {
      return !!this.item?.disabled
    },

    visible() {
      return this.item && this.item.visible === false ? false : true
    },

    hasSubmenu() {
      return this.item?.submenu?.length > 0
    },

    translatedTitle() {
      if (this.isSubmenuItem) {
        return this.item.locale
          ? this.$t(this.item.locale)
          : this.$t(`pages.${this.item.route.toLowerCase().split('-').join('.')}.title`)
      }
      return this.item.title
    },

    navItemStatus() {
      return {
        'main-menu-nav active': this.activeClass && !this.isSubmenuItem,
        'subnav-item': this.isSubmenuItem,
        'is-minimized': this.isMinimized,
      }
    },
  },
  methods: {
    onNavClick() {
      !this.disabled && this.$emit('click')
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-item {
  display: block;
  // margin-right: rem(16px);
  margin-bottom: rem(4px);
  min-width: 56px;
  cursor: pointer;

  &.subnav-item {
    margin-right: 0;
  }
}

.nav-link {
  color: $gray-color-7;
  width: 100%;
  text-decoration: none !important;
  padding: 18px 16px;
  font-size: $font-size-slg;
  height: rem(53px);
  border-radius: 10px;

  &.submenu-item {
    font-size: $font-size;
    height: auto;
    padding: 0.6rem 2rem;
  }

  &:hover {
    text-decoration: none;
    background-color: $sidebar-color-item-hover;

    &.is-minimized {
      background-color: transparent;
    }
  }

  &.active {
    color: $sidebar-color-item-text-active;
    background-color: $sidebar-color-item-active;
  }


  .nav-item-label {
    transition: transform 0.15s 0.25s ease-out, opacity 0.15s 0.25s ease-out, font-size 0.01s 0.25s ease-out;

    word-break: normal;
    overflow-wrap: break-word;
    font-weight: $font-weight-semibold;
  }

  &.submenu-item {
    .nav-item-label {
      font-weight: $font-weight-normal;
    }
  }

  .icon-muted {
    font-size: 1rem;
    color: inherit;
  }

  &.is-minimized {
    .nav-item-label {
      opacity: 0;
      font-size: 0;
      pointer-events: none;
      transform: translateX(-20px);
      transition: transform 0.15s ease-out, font-size 0.01s 0.14s, opacity 0.12s ease-out;
    }
  }
}
</style>
