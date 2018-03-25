<template>
  <div class="container container-grid mx-auto">
    <ul class="list-reset font-mono mt-4 posts">
      <li
        v-for="post in posts"
        :key="post.id"
        class="rounded overflow-hidden shadow-md flex flex-col justify-between">
        <p class="px-6 py-6">
          {{ post.joke }}
        </p>
        <footer class="px-6 pb-6">
          <button class="flex text-lg justify-center bg-pink-light hover:bg-pink text-white font-bold py-2 px-4 rounded mr-2">Add favorite
          </button>
        </footer>
      </li>
    </ul>
    <ul class="list-reset font-mono mt-4 favorites">
      <li
        v-for="post in posts"
        :key="post.id"
        class="rounded overflow-hidden shadow-md flex flex-col justify-between">
        <p class="px-6 py-6">
          {{ post.joke }}
        </p>
        <footer class="px-6 pb-6">
          <button class="flex text-lg justify-center bg-red-light hover:bg-red text-white font-bold py-2 px-4 rounded mr-2">Remove favorite</button>
        </footer>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData() {
    let data = await fetch("http://api.icndb.com/jokes/random/10")
    let jsonData = await data.json()
    console.log(jsonData)
    return { posts: jsonData.value }
  }
}
</script>

<style lang="postcss">
.container-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  grid-template-areas: "posts posts favorites";
}
ul.posts {
  grid-area: posts;
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
