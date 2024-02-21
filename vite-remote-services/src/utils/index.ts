import Vue2 from 'kit/vue'
import { h } from 'vue';

console.log('UTILS')

function bindSlotContext(target = {}, context: any) {
  return Object.keys(target).map(key => {
    const vnode = target[key];
    vnode.context = context;
    return vnode;
  });
}

/*
 * Transform vue2 components to DOM.
 */
export function Vue2ComponentWrapper(WrapperComponent: any, wrapperId: any) {
  let vm: any;
  return {
    mounted() {
      console.log('MOUNTED: ', )
      const vue2_container: any = document.createElement('div')
      vue2_container.setAttribute('id', wrapperId)
      this.$parent.$el.appendChild(vue2_container)

      const __self__: any = this
      const slots = bindSlotContext(__self__.$slots as any, __self__.__self);
      vm = new Vue2({
        render: (h: any) => {
          return h(
            WrapperComponent,
            {
              on: this.$attrs,
              attrs: this.$attrs,
              props: this.$props,
              scopedSlots: this.$scopedSlots,
            },
            slots,
          );
        },
      });
      vm.$mount(`#${wrapperId}`);
    },
    props: WrapperComponent.props,
    render() {
      vm && vm.$forceUpdate();
    }
  };
}
