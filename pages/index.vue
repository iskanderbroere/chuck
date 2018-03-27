<template>
  <main class="container-grid container mx-auto">
    <random-quote-list />
    <favorite-list />
  </main>
</template>

<script>
import FavoriteList from "~/components/FavoriteList"
import RandomQuoteList from "~/components/RandomQuoteList"

export default {
  components: {
    FavoriteList,
    RandomQuoteList
  }
}
</script>

<style>
.container-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
</style>
