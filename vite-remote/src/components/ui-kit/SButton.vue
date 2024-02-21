<template lang="html">
    <component class="sui-button"
               :is="getComponent"
               v-bind="getProps"
               :disabled="disabled"
               :class="[buttonClasses]"
               @click="$emit('onClick')">
        <slot />
    </component>
</template>

<script lang="ts" setup>
import {computed,defineProps, defineEmits,withDefaults} from "vue";

enum Class {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    TERTIARY = 'tertiary',
    LIGHT = 'light',
    ICON = 'icon',
    TRANSPARENT = 'transparent'
}

enum Type {
    A = 'a',
    BUTTON = 'button',
    ROUTER_LINK = 'router_link',
}
interface Props {
    href?: string,
    to?: string,
    disabled?:boolean,
    variant: Class,
    size?: string,
    wide?: boolean,
    type?:Type
}


//https://stackoverflow.com/questions/76322580/after-update-of-vue-3-withdefaults-throws-a-typescript-error

const props = withDefaults(defineProps<Props>(), {
    disabled:false, variant:Class.PRIMARY, size:'small', type:Type.BUTTON
})

const emits = defineEmits<{ (e: "onClick"): void }>();


const getComponent = computed(() => {
    if(props.href){
        return 'a'
    } else if(props.to && Object.keys(props.to).length){
        return 'router-link'
    } else {
        return 'button'
    }
})

const getProps = computed(() => {
    if(props.href){
        return {href:props.href, target:'_blank'}
    } else if(props.to && Object.keys(props.to).length){
        return {to:props.to}
    } else {
        return {type:props.type}
    }
})

const buttonClasses = computed(()=> {
    return [`sui-button--${props.variant}`, `sui-button--${props.size}`,{'sui-button--wide':props.wide}]
})

</script>

<style scoped lang="scss">
.sui-button {
    padding: 0 rem(27px);
    display: inline-flex;
    align-items:center;
    justify-content:center;
    border:rem(1px) solid transparent;
    cursor:pointer;
    border-radius: var(--radius-button);
    transition: background-color .2s;
    background-color: transparent;
    text-decoration: none;
    font-family: inherit;
    &--large {
        min-height: rem(42px);
        &:deep() {
            font-size: var(--font-button-l);
        }
    }
    &--medium {
        min-height: rem(40px);
        &:deep() {
            font-size: var(--font-button-m);
        }
    }
    &--small {
        min-height: rem(38px);
        &:deep() {
            font-size: var(--font-button-s);
        }
    }
    &--wide {
        width: 100%;
    }
    &:disabled {
        cursor: auto;
    }
    &--primary {
        color:var(--color-text-contrast);
        background-color: var(--color-button-normal);
        &:hover:not(:disabled) {
            box-shadow: var(--box-shadow-button-primary);
            border-color:var(--color-button-primary);
        }
        &:active:not(:disabled) {
            background-color: var(--color-button-primary-active);
            box-shadow: none;
        }
        &:disabled {
            background-color: var(--color-button-disabled);
            color:var(--color-button-text-disabled);
        }
    }
    &--secondary {
        background-color: transparent;
        border-color:var(--color-button-normal);
        color:var(--color-text-accent);
        &:hover:not(:disabled) {
            box-shadow: var(--box-shadow-button-secondary);
        }
        &:active:not(:disabled) {
            border-color:var(--color-button-primary-active);
            color:var(--color-button-primary-active);
            box-shadow: var(--box-shadow-button-secondary);
        }
        &:disabled {
            border-color:var(--color-button-disabled);
            color:var(--color-button-text-disabled);
        }
    }
    &--tertiary {
        background-color: transparent;
        border-color:transparent;
        color:var(--color-button-primary);
        &:hover:not(:disabled) {
            color:var(--color-button-tertiary-hover);
        }
        &:active:not(:disabled) {
            color:var(--color-button-primary-active);
        }
        &:disabled {
            color:var(--color-button-text-disabled);
        }
    }
    &--light {
        color:var(--color-text-contrast);
        background-color: var(--color-lbutton-light);
        &:hover:not(:disabled) {
            box-shadow: var(--box-shadow-button-light);
            background-color: var(--color-lightbutton-hover);
        }
        &:active:not(:disabled) {
            background-color: var(--color-lightbutton-active);
            box-shadow: none;
        }
        &:disabled {
            background-color: var(--color-button-disabled);
            color:var(--color-button-text-disabled);
        }
    }
    &--icon {
        color:var(--color-text-contrast);
        background-color: var(--color-lbutton-light);
        &.sui-button {
            padding: 0 rem(8px);
            //&--large {
            //  padding: 0 rem(13px);
            //}
            //&--medium {
            //  padding: 0 rem(12px);
            //}
            //&--small {
            //  padding: 0 rem(11px);
            //}
        }
        &:hover:not(:disabled) {
            box-shadow: var(--box-shadow-button-light);
            background-color: var(--color-lightbutton-hover);
        }
        &:active:not(:disabled) {
            background-color: var(--color-lightbutton-active);
            box-shadow: none;
        }
        &:disabled {
            background-color: var(--color-button-disabled);
            color:var(--color-icon-secondary);
        }
    }
    &--transparent {
        color:var(--color-icon-tertiary);
        background-color: transparent;
        padding: rem(3px);
        min-height: auto;
        &:hover:not(:disabled) {
            color: var(--color-icon-accent);
        }
    }
}
</style>