<template>
  <div>
    <form @submit.prevent="userSignUp">
      <h2>Sign Up</h2>

      <div class="mb-4">
        <label for="email">Email</label>
        <input type="text" id="email" v-model="email" />
      </div>

      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button>Sign Up</button>
    </form>
  </div>
</template>
<script>
export default {
  components: {},

  data: function () {
    return {
      email: '',
      password: '',
    }
  },

  methods: {
    userSignUp: function (err) {
      this.$store
        .dispatch('signUp', {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.email = ''
          this.password = ''
          //if you wanted to redirect after sign in you'd do that here with this.$router.push('/pagename')
        })
        .catch((err) => {
          alert(err.message)
        })
    },
  },
}
</script>