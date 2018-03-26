<template>
  <section>
    <h1 class="py-4 font-sans">Random quotes</h1>
    <button class="inline-flex text-lg hover:bg-grey-lighter border border-grey-darker border-2 justify-center font-bold py-2 px-4 rounded my-2 mr-2" @click="fetchRandomQuotes()">Get quotes</button>
    <button class="inline-flex text-lg hover:bg-grey-lighter border border-grey-darker border-2 justify-center font-bold py-2 px-4 rounded my-2 mr-2" @click="fetchAtInterval()">{{ fetching ? "Pause" : "Start" }}</button>
    <transition-group tag="ul" name="fade" class="list-reset font-sans mb-4 quotes">
      <li
        v-for="quote in randomQuotes"
        :key="quote.id"
        class="rounded overflow-hidden shadow-md flex flex-col justify-between border-grey-darker border border-2">
        <p class="px-6 py-6">
          {{ quote.joke }}
        </p>
        <footer class="px-6 pb-6">
          <add-favorite-button v-if="!quote.favorite" :quote="quote" />
          <p v-else>LOVE IT</p>
        </footer>
      </li>
    </transition-group>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex"
import AddFavoriteButton from "~/components/AddFavoriteButton"

export default {
  components: {
    AddFavoriteButton
  },
  computed: {
    ...mapState({ randomQuotes: "quotes", fetching: "fetching" })
  },
  // mounted() {
  //   this.fetchRandomQuotes()
  // },
  methods: {
    ...mapActions(["fetchRandomQuotes", "fetchAtInterval"])
  }
}
</script>

<style scoped>
section {
  grid-column: span 2;
}
ul.quotes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
}
button {
}
</style>
