<template lang="pug">
.sui-input
  input.sui-input__control(v-model="input_value")
  .sui-input__right-slot
  .sui-input__counter(v-if="counterIsVisible") {{ inputValue.length }} /{{maxCounterValue}}
</template>


<script>
export default {
  props: {
    counterIsVisible:{
      type:Boolean,
      default:false
    },
    maxCounterValue:{
      type:Number,
      default:0
    },
    unmasked:{
      type:Boolean,
      default:false
    },
    mask:{
      type:[String,null,Object],
      default:null
    },
    isTextarea:{
      type:Boolean,
      default:false
    },
    noPadding:{
      type:Boolean,
      default:false
    },
    minHeight:{
      type:Number,
      default:84
    },
    type:{
      type:String,
      default:'text'
    },
    isPassword:{
      type:Boolean,
      default:false
    },
    placeholder:{
      type:String,
      default:''
    },
    label:{
      type:String,
      default:''
    },
    name:{
      type:String,
      default:''
    },
    actionsAreVisible: {
      type: Boolean,
      default: true,
    },
    validationRules:{
      type:Object,
      default:()=>({})
    },
    validationMode: {
      type: String,
      default: 'passive',
      validator(value) {
        return ['aggressive', 'passive', 'lazy', 'eager'].includes(value)
      },
    },
    service:{
      type:String,
      default:''
    },
    value: {
      type: [Number, String],
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    actions: {
      type: Array,
      default: () => [],
    },
    actionsTrigger:{
      type:String,
      default:'click',
      validator: (val) => {
        return ['click', 'hover'].includes(val)
      }
    },
    isInline: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    return {}
  }
}
</script>

<style scoped lang="scss">
@mixin placeholder {
  &::-webkit-input-placeholder { @content; }
  &:-moz-placeholder           { @content; }
  &::-moz-placeholder          { @content; }
  &:-ms-input-placeholder      { @content; }
}

.sui-input {
  width: 100%;
  position: relative;
  height: rem(52px);


}
</style>
