import { defineStore } from "pinia";

type UiStore = {
    available_services: object,
    favourite_services: any[],
    tools:object
}

export const useUiStore = defineStore("ui_store", {
    state: (): UiStore => {
        return {
            available_services: {},
            favourite_services: [],
            tools:{}
        };
    },
    actions: {

    }
});