<template>
  <div class="sidebar-container" :class="{ minimized: minimized }">
    <div class="sidebar-main">
      <CustomScrollbar class="sidebar-menu-container">
        <SidebarItem
          v-for="(item, index) in options"
          :key="`${item.route} ${index}`"
          :item="item"
          :minimized="minimized"
        />
      </CustomScrollbar>
      <SidebarItem
        style="padding-left: 1rem; padding-top: 16px; padding-bottom: 16px"
        :key="`sidebar-feedback-button`"
        :item="{}"
        :minimized="false"
      >
        <div 
          class="feedback-link"
          :class="{
            'is-minimized': minimized,
          }"
          @click="onFeedbackClick"
        >
          <Icon name="question" />
          <div>Обратная связь</div>
          <a ref="feedback-link" style="display: none" href="mailto:lms@synergy.ru" to="mailto:lms@synergy.ru"></a>
        </div>
      </SidebarItem>
    </div>
    <div class="mobile-background" @click="onMobileBackgroundClick()" />
  </div>
</template>

<script>
import Icon from '@components/Icon/Icon.vue'
import CustomScrollbar from '@components/CustomScrollbar/CustomScrollbar.vue'
import SidebarItem from '@components/SidebarItem/SidebarItem.vue'

export default {
  components: {
    Icon,
    CustomScrollbar,
    SidebarItem
  },
  props: {
    options: {
      type: Array,
      required: false,
      default: () => [],
    },
    minimized: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  data() {
    return {
      menuItems: [],
      isMinimized: false,
    }
  },
  computed: {
    
  },
  methods: {
    setIsMinimized(event) {
      this.isMinimized = event
    },
    onMobileBackgroundClick() {
      this.$emit('toggle-sidebar')
    },
    onFeedbackClick() {
      this.$refs?.['feedback-link'].click()
    },
  },
  beforeDestroy() {},
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  width: $sidebar-width;
  position: relative;
  height: 100%;
  transition: width 0.3s ease-out;
  @include max(1199) {
    position: fixed;
    z-index: 1;
  }
}

.sidebar-main {
  display: flex;
  flex-direction: column;
  width: $sidebar-width;
  top: $navbar-height;
  bottom: 0;
  left: 0;
  padding: 0;
  height: calc(100% - #{$navbar-height});
  background: $white-color;
  transition: width 0.3s ease-out, left 0.3s 0.13s ease-out;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.05);
}

.sidebar-menu-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: $white-color;
  padding: 16px;
  padding-right: 8px;

  // d-flex flex-column align-content-start
}

.mobile-background {
  @include max(1199) {
    position: absolute;
    width: 100vw;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    transition: opacity 0.25s ease-out;
    height: 100vh;
    opacity: 1;
  }
}

.minimized {
  .mobile-background {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease-out;
  }

  @media (max-width: 1199px) {
    pointer-events: none;
  }
}

.minimized .sidebar-main,
.minimized {
  width: $sidebar-width-minimized;
  transition: width 0.3s ease-in-out, left 0.25s ease-in-out;
  z-index: 0;
}

.minimized .sidebar-main {
  @include max(1199) {
    left: -$sidebar-width-minimized;
  }
}

.custom-logo-object {
  margin-left: -1rem;
  max-width: 80%;
  width: rem(120px);
}

.feedback-link {
  transition: transform 0.15s 0.25s ease-out, opacity 0.15s 0.25s ease-out, font-size 0.01s 0.25s ease-out;
  word-break: normal;
  overflow-wrap: break-word;
  font-weight: $font-weight-semibold;
  padding: 1rem;
  font-size: 0.88rem;
  height: 3.3125rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 1rem;
  color: #ff0a47;
  border: 1px solid #ff0a47;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  &:hover {
    &.is-minimized {
      background-color: transparent;
    }
  }
}

.is-minimized {
  opacity: 0;
  font-size: 0;
  pointer-events: none;
  transform: translateX(-20px);
  transition: transform 0.15s ease-out, font-size 0.01s 0.14s, opacity 0.12s ease-out;
}
</style>
