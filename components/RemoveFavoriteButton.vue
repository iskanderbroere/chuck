<template>
  <button class="flex text-lg justify-center bg-pink-light hover:bg-pink text-white font-bold mt-6 p-2 px-4 rounded mr-2" @click="removeFavoriteQuote(quoteindex)">
    X
  </button>
</template>

<script>
import { mapMutations } from "vuex"

export default {
  props: {
    quoteindex: {
      type: Number,
      default: -1
    }
  },
  methods: {
    ...mapMutations(["removeFavoriteQuote"])
  }
}
</script>
