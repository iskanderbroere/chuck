<template>
  <div class="container container-grid mx-auto">
    <ul class="list-reset font-mono mt-4 quotes">
      <li
        v-for="quote in quotes"
        :key="quote.id"
        class="rounded overflow-hidden shadow-md flex flex-col justify-between">
        <p class="px-6 py-6">
          {{ quote.joke }}
        </p>
        <footer class="px-6 pb-6">
          <favorite-button :quote="quote" />
        </footer>
      </li>
    </ul>
    <favorite-list />
  </div>
</template>

<script>
import FavoriteButton from "~/components/FavoriteButton"
import FavoriteList from "~/components/FavoriteList"

export default {
  async asyncData() {
    const data = await fetch("http://api.icndb.com/jokes/random/10")
    const jsonData = await data.json()
    return { quotes: jsonData.value }
  },
  components: {
    FavoriteButton,
    FavoriteList
  }
}
</script>

<style lang="postcss">
.container-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  grid-template-areas: "quotes quotes favorites";
}
ul.quotes {
  grid-area: quotes;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
}
ul.favorites {
  grid-area: favorites;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}
</style>
