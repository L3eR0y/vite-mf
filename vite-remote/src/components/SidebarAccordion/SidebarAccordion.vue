<template>
  <div data-cy="accordion" class="accordion">
    <div data-cy="accordion-head" class="accordion-head w-100">
      <slot name="head" />
    </div>

    <transition
      :name="transitionName"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @before-enter="start"
      @after-leave="end"
    >
      <div v-if="isExpanded" data-cy="accordion-body" class="text-break">
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
      isExpandedFromLeftTransition: this.expandedFromLeftTransition
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
    start (el) {
      el.style.height = `${el.scrollHeight}px`
    },
    end () {
      this.$emit('update:expanded-from-left-transition', false)
    }
  }
}
</script>

<style lang="scss" scoped>
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
  transition: transform 0.15s 0.25s ease-out, opacity 0.15s 0.25s ease-out,
    height 0.3s ease;
}

.from-left-enter,
.from-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
  height: 0 !important;
}
</style>
