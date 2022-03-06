<template>
  <v-app dark>
    <TopNavigation />
    <v-main class="ultra-light-blue-bg">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "~/components/Header";
import topNavigation from "~/components/TopNavigation";

export default {
  components: {
    Header,
    topNavigation,
  },
};
</script>
<style>
html {
  overflow-y: auto;
}
.ultra-light-blue-bg {
  background-color: #1e27380b;
}
</style>
