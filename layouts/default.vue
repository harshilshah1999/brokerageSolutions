<template>
  <v-app dark>
    <!-- <Header /> -->
    <!-- <TopNavigation /> -->
    <v-main>
      <!-- <v-container> -->
        <Nuxt />
      <!-- </v-container>  -->
    </v-main>
  </v-app>
</template>

<script>
import Header from "~/components/Header";
import topNavigation from "~/components/TopNavigation";

export default {
  components: {
    Header,
    topNavigation
  }
};
</script>
<style>
  html{
    overflow-y: auto;
  }
</style>
