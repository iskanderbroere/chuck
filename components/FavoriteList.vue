<template>
  <transition-group name="fade" tag="ul" class="list-reset font-mono my-4 favorites">
    <li v-for="quote in favoriteQuotes"
        :key="quote.id"
        class="rounded overflow-hidden shadow-md flex flex-col bg-pink-lightest justify-between border-grey-darker border border-2">
      <p class="px-6 py-6">
        {{ quote.joke }}
      </p>
    </li>
  </transition-group>
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
ul {
  grid-column: span 1;
  display: grid;
  grid-gap: 1rem;
}
</style>
