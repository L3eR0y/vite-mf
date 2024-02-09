import { defineStore } from "pinia";
import { NewsStore } from "@/types/news.type.ts";

export const useNewsStore = defineStore("news_store", {
    state: (): NewsStore => {
        return {
        };
    },
    actions: {

    }
});
