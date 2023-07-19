<template lang="pug">
.app-wrapper
    .app-wrapper--header
        NavigationBar
    .app-wrapper--body
        .side_bar
            .side_bar__rlink(@click="onRLinkClick('app1')") Все доступные сервисы
            .side_bar__rlink(@click="onRLinkClick('remote-app')") REMOTE APP
        .main
            router-view
</template>
    
<script setup lang="ts">
import NavigationBar from '../components/NavigationBar/index.vue'
import { useRouter } from 'vue-router'
import { inject } from 'vue'

const router = useRouter()

function onRLinkClick(name: string) {
    router.push({name})
}

</script>
    
<style scoped lang="scss">
    .app-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
    
        &--header {
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 900;
        }
    
        &--body {
            display: flex;
            height: 100%;
            background-color: rgb(245, 245, 245);
    
            & .side_bar {
                width: 17.5rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 1rem 0 1rem 1rem;
                box-shadow: 0 10px 10px rgba(0,0,0,.05);
                background-color: rgb(255, 255, 255);

                &__rlink {
                    width: 100%;
                    display: flex;
                    background-color: #fff2f3;
                    color: #de0a26;
                    font-size: .88rem;
                    padding: 1rem 1.5rem;
                    box-sizing: border-box;
                    border-radius: 8px;
                    height: 3.3rem;
                    margin-right: 1rem;
                    margin-bottom: .25rem;
                    text-decoration: none;
                    align-items: center;
                    font-weight: bold;
                    cursor: pointer;
                }
            }

            & .main {
                height: 100%;
                width: 100%;
                box-sizing: border-box;
                padding: 1rem;
            }
        }
    
        &--footer {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    
    
    
        &--view-container {
            width: 90%;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px black solid;
        }
    }
</style>