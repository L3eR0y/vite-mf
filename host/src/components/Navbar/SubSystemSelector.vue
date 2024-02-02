<template>
  <div
    class="dropdown pl-4 pr-0 pr-sm-4 d-md-block user-select-none"
    @click="onSubsystemClick"
  >
    <button
      v-if="currentSubsystem"
      id="dropdownMenuButton"
      class="system-switcher d-flex align-items-center justify-content-start btn"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <object
        type="image/svg+xml"
        :data="currentSubsystem.icon"
        width="26"
        class="navbrand-logo-icon mr-sm-2"
      />

      <span
        class="navbar-brand-name d-flex align-items-center"
        :class="{
          'is-minimized': minimized,
        }"
      >
        <span class="navbar-brand d-flex align-items-center user-select-none">
          <span class="default-system">
            Synergy
          </span>
          <strong :class="{ 'ml-1': true }">
            <font :color="currentSubsystem.color">
              {{ currentSubsystem.name }}
            </font>
          </strong>
        </span>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    minimized: {
      type: Boolean,
    },
  },

  data() {
    return {
      availableSubsystems: [],
      show: true,
      subsystems: [
        {
          name: 'LK',
          link: '/',
          color: '#DE0A26',
          icon: require('@/assets/images/subsystems/connect.svg'),
        },
      ],
    }
  },

  computed: {
    currentSubsystem() {
      return this.subsystems[0]
    },
  },

  created() {},
  methods: {
    onSubsystemClick() {
      this.$router.push(`${this.currentSubsystem.link || '/'}`)
    },
    closeMenu() {
      this.show = false
    },
  },
}
</script>

<style lang="scss" scoped>
// Animation Mixins
@mixin subsystem-transition-enter {
  @for $i from 1 through 3 {
    &:nth-child(#{$i}) {
      transition: transform 0.2s #{$i * 0.22}s ease-out,
        opacity 0.2s #{$i * 0.22}s ease-out;
    }
  }
}

@mixin subsystem-transition-exit {
  @for $i from 1 through 3 {
    &:nth-child(#{$i}) {
      transition: all 0.1s ease-out, transform 0.15s ease-out,
        opacity 0.15s ease-out;
    }
  }
}

.navbar {
  .system-switcher {
    width: 100%;
    outline: none;
    background: 0;
    border: none;
    padding: 0;
    @include phone {
      width: rem(22);
      height: rem(22);
    }

    &::after {
      position: absolute;
      content: "";
      right: 0;
      width: rem(1px);
      height: rem(24px);
      background: #ecf2f3;
    }
  }
  .navbar-brand {
    padding-top: 0.3125rem;
    font-size: $font-size-lg;
    color: $gray-color;
    box-shadow: none;
    strong {
      font-weight: $font-weight-bold;
      letter-spacing: 0.05rem;
    }

    img {
      position: relative;
      top: -2px;
    }
  }
  a {
    outline: none;
  }
  .menu {
    display: block;
    opacity: 0;
    width: 90%;
    left: 5%;
    border: none;
    border-radius: 4px;
    pointer-events: none;
    transform: scale3d(1, 0.2, 1);
    transform-origin: top;
    transition: transform 0.25s ease-in, opacity 0.25s ease-out;
    transition-delay: 0.15s;
    box-shadow: 4px 6px 16px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    float: left;
  }
  .dropdown-item {
    height: rem(43px);
    text-decoration: none;
    color: $gray-color;
    font-size: $font-size;
    letter-spacing: 0;
    line-height: 1.2;
    padding: 0.65rem 0.8rem;
    opacity: 0;
    transform: translateX(35px);
    &:active {
      background-color: $white-hover;
    }
    @include subsystem-transition-exit();
    .dropdown-logo {
      width: rem(22px);
    }
  }
  .subsystem {
    font-weight: $font-weight-bolder;
  }
  .image {
    width: rem(34px);
    height: rem(34px);
    padding-right: rem(10px);
    transform: translateY(-2px);
  }
}

.dropdown {
  min-width: $sidebar-width;
  @include max(768) {
    min-width: auto;
  }
}
// Component Animations
.menu.show {
  opacity: 1;
  pointer-events: all;
  transform: scale3d(1, 1, 1);
  transition: transform 0.2s ease-out, opacity 0.2s ease-in;
  transition-delay: 0.1s;
}

.menu .dropdown-item object {
  display: none;
}

.menu.show .dropdown-item {
  opacity: 1;
  transform: translateX(0);
  @include subsystem-transition-enter();

  object {
    display: block;
    transition: all 0.1s ease;
    transition-delay: 1s;
  }
}

@include dropdown-icon;

.navbrand-logo-icon {
  pointer-events: none;
}

// Mobile Version
.system-switcher {
  &::after {
    @include max(576) {
      display: none;
    }
  }
}

.navbar-brand-name {
  max-width: rem(300px);
  width: 100%;
  transition: max-width 0.25s 0.05s ease-in;
}

.navbar-brand-name {
  overflow: hidden;
  @include max(576) {
    &.is-minimized {
      max-width: 0;
      width: auto;
      transition: max-width 0.33s ease-out;
    }
  }
}
</style>
