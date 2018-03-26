<template>
  <section>
    <h1 class="py-4 font-sans">Favorite quotes ({{ favoriteQuotes.length }})</h1>
    <transition-group name="fade" tag="ul" class="list-reset font-sans mb-4 favorites">
      <li v-for="(quote, index) in favoriteQuotes"
          :key="quote.id"
          class="rounded overflow-hidden shadow-md flex flex-col bg-pink-lightest justify-between border-grey-darker border border-2">
        <p class="p-6">
          {{ quote.joke }}
          <remove-favorite-button :quoteindex="index" :quote="quote" />
        </p>
      </li>
    </transition-group>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex"
import RemoveFavoriteButton from "~/components/RemoveFavoriteButton"

export default {
  components: {
    RemoveFavoriteButton
  },
  computed: { ...mapState({ favoriteQuotes: "favorites" }) },
  mounted() {
    this.getLocalQuotes()
  },
  methods: { ...mapActions(["getLocalQuotes"]) }
}
</script>

<style scoped>
ul {
  grid-column: span 1;
  display: grid;
  grid-gap: 1rem;
}
</style>
