<template lang="pug">
    .splide
        .splide__track
            ul.splide__list
                li.splide__slide(v-for="(slide, index) in slides" :key="index")
                    slot(name="slide" :slide="slide") {{ slide }}
</template>

<script>
import '@splidejs/splide/dist/css/splide.min.css'
import Splide from '@splidejs/splide'

export default {
    name: 'SpliderComponent',
    props: {
        slides: {
            type: Array,
            required: false,
            default: () => [],
        },
        extensions: {
            type   : Object,
            default: () => ( {} ),
        },
        transition: {
            type   : Function,
            default: null,
        },
        options: {
            type: Object,
            required: false,
            default: () => ({
                type: 'loop',
                prePage: 1,
                autoWidth: true,
                perMove: 1,
                arrows: true,
                drag: true,
            }),
        },
    },
    data() {
        return {
            splider: null,
            EVENTS: [
                'mounted',
                'updated',
                'move',
                'moved',
                'drag',
                'dragged',
                'visible',
                'hidden',
                'active',
                'inactive',
                'click',
                'arrows:mounted',
                'arrows:updated',
                'pagination:mounted',
                'pagination:updated',
                'navigation:mounted',
                'autoplay:play',
                'autoplay:pause',
                'autoplay:playing',
                'lazyload:loaded',
            ],
        }
    },
    computed: {
        index() {
            return this.splider.index
        },
        length() {
            return this.splider.length
        },
    },
    watch: {
        slides: function (nV) {
            this.refresh()
        },
    },
    methods: {
        slideRight() {
            this.splider.go('>')

            //закомменть строчку ниже чтобы увидеть разницу в анимации
           this.splider.refresh()

            // this.setArrowsVisibility()
        },
        slideLeft() {
            this.splider.go('<')

            //закомменть строчку ниже чтобы увидеть разницу в анимации
            this.splider.refresh()
            // this.setArrowsVisibility()
        },
        refresh() {
            this.splider.options = this.options
            // console.log('OPTIONS: ', this.options)
            this.$nextTick(() => {
                this.splider.refresh()
            })
        },
        bind() {
            this.EVENTS.forEach((event) => {
                this.splider.on(event, (...args) => {
                    this.$emit(`${event}`, this.splide, ...args)
                })
            })
        },
    },

    mounted() {
        this.splider = new Splide(this.$el, this.options || {})
        this.bind()
        this.splider.mount(this.extensions, this.transition)
    },
    created() {},
}


</script>

<style scoped lang="scss">
.splide {
  width: 100%;
  height: 100%;

  &__track {
    width: 100%;
    height: 100%;
  }

  &__progress__bar {
    height: 3px;
    background: #ccc;
  }
}
</style>
