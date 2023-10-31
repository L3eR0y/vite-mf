<template lang="pug">
label
  input(
    v-model="optionValue"
    class="radio styled"
    :class="{ disabled, 'mr-3': label }"
    type="radio"
    :value="optionId"
    :style="inputStyles"
  )
  span() {{ label }}
</template>

<script>
  import { defineComponent } from 'vue'
  export default defineComponent ({
    name: 'RadioButton',
    model: {
      prop: 'value',
      event: 'change',
    },
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      value: {
        type: [Number, String],
        default: null,
      },
      optionId: {
        type: [Number, String],
        default: null,
      },
      size: {
        type: String,
        default: '25px',
      },
      label: {
        type: [String, Number],
        default: 'Label',
      },
    },
    computed: {
      optionValue: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('change', val)
        },
      },
      inputStyles() {
        return {
          width: this.size,
          height: this.size
        }
      }
    },
  })
</script>

<style lang="scss" scoped>
  .radio-label {
    cursor: pointer;
    &.invalid.failed {
      .radio {
        border: 1px solid red;
      }
    }
  }

  .radio {
    position: relative;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 50%;
    flex: none;
  }

  .radio:checked:after {
    content: "";
    position: absolute;
    width: 50%;
    height: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }

  .radio:not(.disabled) {
    background: #ffffff;
    border: 1px solid rgba(0, 16, 61, 0.12);
    box-sizing: border-box;
    border-radius: 999px;
    cursor: pointer;

    &:checked {
      &:after {
        background: white;
      }
    }
  }

  .radio.disabled {
    opacity: 1 !important;

    // &:checked {
    //   background: $gray-color-11;
    //   &:after {
    //     background: $white-color;
    //   }
    // }

    // &:not(:checked) {
    //   border: 1px solid $gray-color-12;
    // }
  }

  .text {
    // @include phone() {
    //   font-size: 16px;
    //   line-height: 22px;
    // }
  }
</style>