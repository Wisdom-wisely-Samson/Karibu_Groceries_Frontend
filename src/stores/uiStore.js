import { defineStore } from "pinia";

export const useUIStore = defineStore("ui", {
  state: () => ({
    loading: false
  }),

  actions: {

    startLoading() {
      this.loading = true;
    },

    stopLoading() {
      this.loading = false;
    }

  }
});
