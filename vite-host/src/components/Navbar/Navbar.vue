<template lang="pug">
.navbar.navbar-light.justify-content-start.flex-nowrap.bg-white.p-0
  SubSystemSelector(:minimized="minimized")
  Controls(:minimized="minimized" @toggle-sidebar="onToggleSideBar")
  UserMenu(:minimized="minimized")
</template>

<script>
import { useMainStore }  from '@/stores/main.ts'
import Controls from '@components/Navbar/Controls.vue'
import UserMenu from '@components/Navbar/UserMenu.vue'
import SubSystemSelector from '@components/Navbar/SubSystemSelector.vue'

export default {
  name: 'NavbarComponent',
  components: {
    SubSystemSelector,
    Controls,
    UserMenu,
  },
  data() {
    return {
      store: null,
      isMinimized: false
    }
  },
  computed: {
    minimized() {
      return this.store.sidebar.minimized
    }
  },
  methods: {
    onToggleSideBar() {
      this.$emit('toggle-sidebar')
    }
  },
  created() {
    this.store = useMainStore()
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: $navbar-height;
  box-shadow: 0 .125rem 1rem 0 rgba(0,0,0,.05)!important;
  z-index: 201;

  &-search {
    margin-left: rem(8px);
  }
}
</style>
