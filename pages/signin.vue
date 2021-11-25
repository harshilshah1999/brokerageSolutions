<template>
 <div>
    <form @submit.prevent="userSignIn">
      <h2>Sign Up</h2>

      <div class="mb-4">
        <label for="email">Email</label>
        <input type="text" id="email"  v-model="email"/>
      </div>

      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password"/>
      </div>
      <button>Sign In</button>
    </form>
  </div>
</template>

<!-- The script tag of ~/pages/signin.vue -->

<script>
export default {
  name: "signin",

  data: function() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    userSignIn: function(err) {
      this.$store
        .dispatch("signInWithEmail", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.email = "";
          this.password = "";
        })
        .catch(err => {
          alert(err.message);
        });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>