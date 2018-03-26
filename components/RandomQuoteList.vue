<template>
  <section>
    <h1 class="py-4 font-sans">Random quotes</h1>
    <transition-group tag="ul" name="fade" class="list-reset font-sans mb-4 quotes">
      <li
        v-for="quote in randomQuotes"
        :key="quote.id"
        class="rounded overflow-hidden shadow-md flex flex-col justify-between border-grey-darker border border-2">
        <p class="px-6 py-6">
          {{ quote.joke }}
        </p>
        <footer class="px-6 pb-6">
          <favorite-button :quote="quote" />
        </footer>
      </li>
    </transition-group>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex"
import FavoriteButton from "~/components/FavoriteButton"

export default {
  components: {
    FavoriteButton
  },
  computed: { ...mapState({ randomQuotes: "quotes" }) },
  mounted() {
    this.fetchRandomQuotes()
  },
  methods: { ...mapActions(["fetchRandomQuotes"]) }
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
</style>
