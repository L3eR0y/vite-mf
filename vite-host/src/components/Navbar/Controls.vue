<template>
  <div class="controls d-flex justify-content-center align-items-center">
    <div
      v-if="isShowControl"
      class="control-icon user-select-none d-flex align-items-center"
      :class="{ 'is-active': !minimized }"
      @click="onToggleSideBar()"
    >
      <span>OPEN</span>
      <!-- <i class="sy-icon icon-menu"></i> -->
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    minimized: {
      type: Boolean,
      required: true, 
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
    isShowControl() {
      return true
    },
  },
  methods: {
    onToggleSideBar() {
      this.$emit('toggle-sidebar')
    }
  }
}
</script>

<style lang="scss" scoped>
.control-icon {
  cursor: pointer;
  padding-left: 1.5rem;

  @include max(576) {
    padding-left: 1rem;
  }

  i {
    color: $standard-color;
    font-size: 1rem;
    transform-origin: center;
    transition: all 0.15s ease-in-out;
  }
  &:hover {
    color: $primary-color;
    transition: all 0.15s ease-in-out;
  }
}
.control-icon.is-active {
  color: $primary-color;
}
.divider {
  margin: 0 0.15rem;
}

// Mobile
.dev-stats-control-button {
  @include max(768) {
    display: none;
  }
}
</style>
