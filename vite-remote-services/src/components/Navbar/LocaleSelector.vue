<template>
  <div v-unfocus="closeMenu" class="dropdown mx-2">
    <div class="icon-select d-flex align-items-center user-select-none">
      <div class="title-bage mr-2" v-text="$i18n.locale" />
      <i
        class="sy-icon sy-icon-mini icon-language"
        data-cy="locale-selector"
        @click="expandMenu"
      ></i>
    </div>
    <div class="dropdown-menu" :class="{ show: isExpanded }">
      <a
        v-for="locale in availableLocales"
        :key="locale.code"
        class="dropdown-item d-flex align-items-center"
        :data-cy="`locale-${locale.code}`"
        @click.prevent="changeLocale(locale.code)"
      >
        <span
          class="badge d-inline-flex justify-content-center align-items-center"
        >
          <div class="icons-outlined primary">{{ locale.code }}</div>
        </span>
        <span class="select p-2">{{ locale.name }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isExpanded: false,
    };
  },

  computed: {
    availableLocales() {
      return this.$i18n.locales;
    },
  },

  methods: {
    expandMenu() {
      this.isExpanded = !this.isExpanded;
    },

    closeMenu() {
      this.isExpanded = false;
    },

    changeLocale(code) {
      this.$i18n.setLocale(code);
      this.$dayjs.locale(code);
      this.expandMenu();
    },
  },
};
</script>

<style lang="scss" scoped>
// Animation Mixins
@mixin subsystem-transition-enter {
  @for $i from 0 through 5 {
    &:nth-child(#{$i}) {
      transition: transform 0.2s #{$i * 0.12}s ease-out,
        opacity 0.2s #{$i * 0.12}s ease-out;
    }
  }
}

@mixin subsystem-transition-exit {
  @for $i from 0 through 5 {
    &:nth-child(#{$i}) {
      transition: all 0.1s ease-out, transform 0.15s ease-out,
        opacity 0.15s ease-out;
    }
  }
}

// ParentStyles Customization
.dropdown-bages {
  .title-bage {
    display: block;
  }
}
.dropdown-right {
  .dropdown-menu {
    right: 0;
    left: auto;
  }
}

//

// Style

.select {
  font-weight: $font-weight-bolder;
}

.badge {
  width: 29px;
  height: 29px;
  background: $secondary-color;
}

.title-bage {
  display: none;
  font-size: $font-size-slg;
}

.icon-select {
  position: center;
  height: 100%;
  color: rgb(0, 0, 0, 0.5); //$primary-color;
  &:hover {
    color: $primary-color;
  }
}

.icon {
  margin-top: 0.05rem;
  font-size: 2rem;
}

a {
  cursor: pointer;
  outline: none;
}

.dropdown {
  position: relative;
  cursor: pointer;
  height: 100%;
  & > .icon {
    font-size: 2rem;
  }
}

.dropdown-menu {
  position: absolute;
  display: block;
  opacity: 0;
  border: none;
  border-radius: 4px;
  pointer-events: none;
  transform: scaleY(0.2);
  transform-origin: top;
  transition: transform 0.2s ease-out, opacity 0.2s ease-in;
  transition-delay: 0.15s;
  box-shadow: 4px 6px 16px 0 rgba(0, 0, 0, 0.1);
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
}

.menu-items {
  border-bottom: 0.1em solid #f6f6f6;
}

// Login Screen Styles
.login-locale {
  .icon {
    font-size: 1.4rem;
    padding: 0;
    color: $primary-color;
  }
}

// // Component Animations
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

.locale-selector {
  margin-right: -0.5rem;
}
</style>
