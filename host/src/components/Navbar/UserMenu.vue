<template>
  <div
    class="navbar-nav flex-row align-items-center justify-content-end pr-4 ml-auto"
    :class="{ 'mobile-hide': !isMinimized }"
  >
    <!-- <UserMenuSelector /> -->
  </div>
</template>

<script>
// import UserMenuSelector from '@/components/Navbar/UserMenuSelector.vue'
export default {
  components: {
    // UserMenuSelector,
  },

  props: {
    isMinimized: {
      type: Boolean,
    },
  },

  computed: {
    // ...mapState("im", {
    //   unreadMessages: "unreadMessages",
    // }),
  },
};
</script>

<style lang="scss" scoped>
.unread-messages-status::after {
  position: absolute;
  top: rem(4px);
  right: rem(4px);
  background: $primary-color;
  width: rem(9px);
  height: rem(9px);
  border-radius: 50%;
  pointer-events: none;
  content: "";
}

.nav-link.nuxt-link-active {
  color: $standard-color;
}

#dropdownMenuLink {
  cursor: pointer;
}

.navbar-nav {
  width: 100%;
  .nav-link {
    font-size: $font-size-lg;
  }
}

.nav-item {
  position: relative;
  transition: max-width 0.1s 0.2s ease-out;
  max-width: rem(34px);
  &:after {
    transition: opacity 0.1s ease-in;
  }
}

.mobile-hide {
  .nav-item {
    @include max(440) {
      max-width: 0;
      &:after {
        opacity: 0;
      }
    }
    transition: max-width 0.1s ease-out;
  }
}
</style>
