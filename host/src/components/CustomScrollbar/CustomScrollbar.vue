<template>
  <div class="colored-scroll">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.colored-scroll {
  overflow-y: auto;
  transition: visibility 0.2s;

  &:hover {
    transition: visibility 0s 0.2s;
  }

  @include scroll();
}

.content,
.colored-scroll:hover,
.colored-scroll:focus {
  visibility: visible;
}
</style>
