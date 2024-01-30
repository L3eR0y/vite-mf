<template>
  <div
    v-click-outside="close"
    class="dropdown d-flex align-items-center"
    data-cy="user-menu-dropdown"
    @click="show = !show"
  >
    <Avatar :badge-state="$webSockets.state === STATE_OPEN" role="button" aria-haspopup="true" aria-expanded="false" />

    <transition name="nav-user-menu" mode="out-in">
      <div class="d-block dropdown-menu" :class="{ show }" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item d-flex align-items-center" @click.prevent="profile()">
          <span class="badge d-inline-flex justify-content-center align-items-center">
            <i class="sy-icon icon-user"></i>
          </span>
          <span class="select">
            {{ $t('layout.user_menu.profile') }}
          </span>
        </a>
        <a class="dropdown-item d-flex align-items-center" @click.prevent="logout">
          <span class="badge d-inline-flex justify-content-center align-items-center">
            <i class="sy-icon icon-log-out"></i>
          </span>
          <span class="select">{{ $t('layout.user_menu.sign-out') }}</span>
        </a>
      </div>
    </transition>
  </div>
</template>

<script>
import { STATE_OPEN } from '~/consts/socket-consts'

export default {
  components: {
    Avatar: () => import('~/components/ui/Avatar'),
  },

  data() {
    return {
      show: false,
    }
  },

  methods: {
    logout() {
      // Workaround to clear the session data in browser after logging out.
      this.$router.push({ path: '/logout' })
    },

    profile() {
      // this.$nuxt.$emit("open-profile", openSettings);
      if (this.$route.name !== 'profile') this.$router.push({ name: 'profile' })
    },

    close() {
      this.show = false
    },
  },

  created() {
    this.STATE_OPEN = STATE_OPEN
  },
}
</script>

<style lang="scss" scoped>
// Animation Mixins
@mixin subsystem-transition-enter {
  @for $i from 0 through 5 {
    &:nth-child(#{$i}) {
      transition: transform 0.2s #{$i * 0.12}s ease-out, opacity 0.2s #{$i * 0.12}s ease-out;
    }
  }
}

@mixin subsystem-transition-exit {
  @for $i from 0 through 5 {
    &:nth-child(#{$i}) {
      transition: all 0.1s ease-out, transform 0.15s ease-out, opacity 0.15s ease-out;
    }
  }
}

.select {
  font-weight: $font-weight-bolder;
  padding: 0.5rem;
  @include max(768) {
    font-size: rem(12px);
    padding: 0.25rem 0.5rem;
  }
}

.badge {
  width: rem(29px);
  height: rem(29px);
  @include max(768) {
    width: rem(22px);
    height: rem(22px);
  }
}

.icon-menu {
  position: center;
  color: $primary-color;
}

.avatar-image {
  margin-top: -17px;
}

a {
  cursor: pointer;
  outline: none;
}

.dropdown-menu {
  position: absolute;
  opacity: 0;
  left: rem(-100px);
  border: none;
  border-radius: 4px;
  pointer-events: none;
  transform: scaleY(0.2);
  transform-origin: top;
  transition: transform 0.25s ease-in, opacity 0.25s ease-out;
  transition-delay: 0.15s;
  box-shadow: 4px 6px 16px 0 rgba(0, 0, 0, 0.1);
  @include max(768) {
    padding: 0;
  }
}

.dropdown-item {
  text-decoration: none !important;
  color: $gray-color;
  font-size: $font-size-sm;
  padding: 0.65rem 0.8rem;
  opacity: 0;
  transform: translateX(20px);
  &:active {
    background-color: $white-hover;
  }
  @include subsystem-transition-exit();
  @include max(768) {
    padding: 0.375rem;
  }
}

.menu-items {
  border-bottom: 0.1em solid #f6f6f6;
}

// Component Animations
.dropdown-menu.show {
  opacity: 1;
  pointer-events: all;
  transform: scaleY(1);
  transition: transform 0.2s ease-out, opacity 0.2s ease-in;
}
.dropdown-menu.show .dropdown-item {
  opacity: 1;
  transform: translateX(0);
  @include subsystem-transition-enter();
}
</style>
