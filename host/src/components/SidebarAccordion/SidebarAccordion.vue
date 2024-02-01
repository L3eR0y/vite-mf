<template>
  <div data-cy="accordion" class="accordion">
    <div data-cy="accordion-head" class="accordion-head w-100">
      <slot name="head" />
    </div>

    <transition
      :name="transitionName"
      @enter="start"
      @after-enter="end"
      @before-leave="onBeforeLeave"
      @before-enter="onBeforeEnter"
      @after-leave="end"
    >
      <div ref="accordion-body" v-if="isExpanded" data-cy="accordion-body" class="text-break">
        <slot name="body" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    expand: {
      type: Boolean,
      default: false
    },
    expandedFromLeftTransition: {
      type: Boolean,
      required: true
    }
  },

  data () {
    return {
      isExpanded: this.expand,
      isExpandedFromLeftTransition: this.expandedFromLeftTransition,
      accordion_height: null
    }
  },

  computed: {
    transitionName () {
      return this.expandedFromLeftTransition ? 'from-left' : 'accordion'
    }
  },

  watch: {
    expand (value) {
      this.isExpanded = value
    },
    expandedFromLeftTransition (value) {
      this.isExpandedFromLeftTransition = value
    }
  },

  methods: {
    onBeforeLeave(el) {
      this.accordion_height = el.scrollHeight+'px'
      el.style.height = el.scrollHeight+'px'
    },
    onBeforeEnter(el) {
      el.style.height = el.scrollHeight+'px'
    },
    start (el) {
      el.style.height = this.accordion_height
    },
    end (el) {
      this.$emit('update:expanded-from-left-transition', false)
    }
  }
}
</script>

<style lang="scss" scoped>
// .sidebar-accordion-item {
//   display: flex;
//   width: 100%;
// }

.accordion-enter-active,
.accordion-leave-active {
  will-change: height, opacity;
  transition: height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.accordion-enter,
.accordion-leave-to {
  height: 0 !important;
  opacity: 0;
}

.from-left-enter-active,
.from-left-leave-active {
  will-change: opacity, height;
  transition: transform 0.15s 0.25s ease-out, opacity 0.15s 0.25s ease-out, height 0.3s ease;
}

.from-left-enter,
.from-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
  height: 0 !important;
}
</style>
