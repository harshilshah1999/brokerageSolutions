<template>
    <div>
        <h1>Hi, I'm the header.</h1>
        <nuxt-link to="/post-form">form</nuxt-link>
        <nuxt-link to="/signin">Sign In</nuxt-link>
        <nuxt-link to="/home">Homepage</nuxt-link>
        <button
            @click="signOut"
            class="pl-4 opacity-50 hover:opacity-100"
            v-if="$store.state.user"
        >Sign Out</button>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      user: "user"
    })
  },

  methods: {
    signOut: function(err) {
      this.$store.dispatch("signOut").catch(err => {
        alert(err.message);
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>