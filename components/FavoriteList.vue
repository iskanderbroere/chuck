<template>
  <ul class="list-reset font-mono mt-4 favorites">
    <li
      v-for="quote in favoriteQuotes"
      :key="quote.id"
      class="rounded overflow-hidden shadow-md flex flex-col justify-between">
      <p class="px-6 py-6">
        {{ quote.joke }}
      </p>
      <footer class="px-6 pb-6">
        <button class="flex text-lg justify-center bg-red-light hover:bg-red text-white font-bold py-2 px-4 rounded mr-2">Remove favorite</button>
      </footer>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  computed: { ...mapState({ favoriteQuotes: "favorites" }) },
  mounted() {
    this.getLocalQuotes()
  },
  methods: { ...mapActions(["getLocalQuotes"]) }
}
</script>

<style>
</style>
