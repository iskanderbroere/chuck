<template>
  <div class="h-screen font-sans">
    <main class="container mx-auto h-full flex justify-center items-center">
      <form class="w-1/3" @submit.prevent="submit()">
        <h1 v-if="!this.$store.state.user" class="font-hairline mb-6 text-center">You're nobody, please login</h1>
        <h1 v-else class="font-hairline mb-6 text-center">{{ "Hi, " + this.$store.state.user.username }}</h1>
        <input
          v-model="username"
          type="text"
          class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow-md mb-4"
          placeholder="Enter your username"
        >
        <input
          v-model="password"
          type="password"
          class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow-md mb-4"
          placeholder="Enter your password"
        >
        <button type="submit" class="bg-teal-dark hover:bg-teal text-white font-bold py-2 px-4 rounded mb-4 mr-2 shadow-md" @click.prevent="submit()">Log in</button>
        <nuxt-link class="bg-teal-dark hover:bg-teal text-white font-bold py-2 px-4 rounded mb-4 shadow-md" to="/">Home</nuxt-link>
        <ul class="list-reset text-red">
          <li v-for="(e, index) in this.$store.state.errors" :key="index">{{ e }}</li>
        </ul>
      </form>
    </main>
    <footer>
      <nuxt-link class="inline-flex text-lg hover:bg-grey-lighter border border-grey-darker border-2 justify-center font-bold py-2 px-4 rounded my-2 mr-2" to="/">Home</nuxt-link>
    </footer>
  </div>
</template>

<script>
import validate from "~/utils/password"

export default {
  data() {
    return {
      username: "Chuck Norris",
      password: "abcaabb"
    }
  },
  methods: {
    async submit() {
      const user = {
        username: this.username,
        password: this.password
      }
      try {
        const val = await validate(user.password)
        if (val) {
          this.$store.commit("resetErrors")
          this.$store.commit("setUser", user)
        }
      } catch (e) {
        this.$store.commit("setError", e.message)
      }
    }
  }
}
</script>

<style>
</style>
