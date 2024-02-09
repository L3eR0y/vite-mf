import { defineStore } from "pinia";
import { Profile, ProfileStore } from "@/types/profile.type.ts";

export const useProfileStore = defineStore("profile_store", {
    state: (): ProfileStore => {
        return {
            profile: null,
            name: {} as Profile,
        };
    },
    actions: {
        async loadProfile() {
        }
    }
});
