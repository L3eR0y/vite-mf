<template>
  <div id="profile-avatar" class="d-flex avatar ml-2">
    <span
      v-if="!noBadge"
      class="status-badge"
      :class="{ online: badgeState }"
      :style="{
        height: bageSize + 'px',
        width: bageSize + 'px',
        right: bageX + 'rem',
        top: bageY + 'rem',
        border: noBorder ? 'none' : '',
        background: badgeState && badgeColor,
      }"
    />
    <transition mode="out-in" name="av">
      <AvatarImage :width="parseInt(avatarSize)" :height="parseInt(avatarSize)" :avatar-data="userAvatar" />
    </transition>
  </div>
</template>

<script>
import AvatarImage from '@components/AvatarImage/AvatarImage.vue'
import DefaultAvatar from '@/assets/images/avatars/default-avatar.svg?inline'

export default {
  name: 'AvatarComponent',
  components: { AvatarImage },
  props: {
    noBadge: {
      type: Boolean,
    },
    avatarSize: {
      type: [String, Number],
      default: '32',
    },
    bageSize: {
      type: [String, Number],
      default: '14',
    },
    bageX: {
      type: [String, Number],
      default: '-0.5',
    },
    bageY: {
      type: [String, Number],
      default: '0',
    },
    avatar: {
      type: [Object, String],
      default: null,
    },
    badgeState: {
      type: Boolean,
      default: false,
    },
    noBorder: {
      type: Boolean,
      default: false,
    },
    badgeColor: {
      type: String,
      default: '',
    },
  },

  computed: {
    userAvatar() {
      if (this.avatar) {
        return this.avatar
      }
      // let profile = this.$store.getters['profile/profile']

      // if (profile && profile?.attributes?.avatar?.url) {
      //   return {
      //     src: profile.attributes.avatar.url,
      //     color: 'transparent',
      //   }
      // } else {
      //   return { component: DefaultAvatar, color: 'transparent' }
      // }
      return { src: DefaultAvatar, color: 'transparent' }
    },
  },
}
</script>

<style lang="scss" scoped>
.avatar {
  position: relative;
  display: inline-block;
}
.status-badge {
  border: rem(2px) solid white;
  position: absolute;
  border-radius: 50%;
  background: $gray-color;

  &.online {
    background: $success-color;
  }
}

.av-enter-active {
  transition: transform 0.6s cubic-bezier(0.5, -0.75, 0.7, 2), opacity 0.4s ease-out;
  transition-delay: 3s;
}
.av-leave-active {
  transition: transform 0.6s cubic-bezier(0.5, -0.75, 0.7, 2), opacity 0.4s ease-out;
}
.av-leave-to,
.av-enter {
  transform: scale(0);
  opacity: 0;
}
</style>
