<template>
  <div class="navbar navbar-light justify-content-start flex-nowrap bg-white shadow p-0">
    <Controls :minimized="!visible" @toggle-sidebar="onToggleSideBar"/>
  </div>
</template>

<script>
import { useMainStore }  from '@/stores/main.ts'
import Controls from '@/components/Navbar/Controls.vue'
import UserMenu from '@/components/Navbar/UserMenu.vue'

export default {
  name: 'NavbarComponent',
  components: {
    // SubSystemSelector,
    Controls,
    UserMenu,
  },
  data() {
    return {
      isMinimized: false
    }
  },
  computed: {
    visible() {
      return useMainStore().sidebar.minimized
    }
  },
  methods: {
    onToggleSideBar() {
      this.$emit('toggle-sidebar')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: $navbar-height;
  z-index: 201;

  &-search {
    margin-left: rem(8px);
  }
}
</style>
