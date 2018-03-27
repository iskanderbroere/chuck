<template>
  <main>
    <h1>{{ this.$store.state.user ? "Hi, " + this.$store.state.user.username : "You're nobody, please login" }}</h1>
    <form @submit.prevent="submit()">
      <input
        v-model="username"
        type="text"
        placeholder="Enter your username"
      >
      <input
        v-model="password"
        type="password"
        placeholder="Enter your password"
      >
      <button type="submit">Log in</button>
    </form>
    <ul>
      <li v-for="(e, index) in this.$store.state.errors" :key="index">{{ e }}</li>
    </ul>
  </main>
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
