<template>
  <button class="flex text-lg justify-center bg-pink-light hover:bg-pink text-white font-bold py-2 px-4 rounded mr-2" @click="addFavorite(quote)">
    Add favorite {{ quote.id }}
  </button>
</template>

<script>
import { mapActions } from "vuex"

export default {
  props: {
    quote: {
      type: Object,
      default: () => {
        return {
          id: null,
          joke: "This is definitely not a joke"
        }
      }
    }
  },
  methods: {
    ...mapActions(["addFavorite"])
  }
}
</script>
