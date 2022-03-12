<template>
  <div>
    <v-app-bar color="#3d4553" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Whiteline Realtors</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn class="ma-1" plain to="/">
        <v-icon left> mdi-home </v-icon>
        Home
      </v-btn>
      <v-btn class="ma-1" plain to="/signin">
        <v-icon left> mdi-archive-plus </v-icon>
        Sign In
      </v-btn>
      <v-btn class="ma-1" plain to="/listings">
        <v-icon left> mdi-archive-plus </v-icon>
        Post Property
      </v-btn>
      <v-btn class="ma-1" plain>
        <v-icon left> mdi-phone </v-icon>
        Contact Us
      </v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-face-man</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      { title: "Favourites" },
      { title: "Viewed Properties" },
      { title: "Visited Propeties" },
      { title: "Enquired Properties" },
      { title: "Suggested Propeties" },
      { title: "Logout" },
    ],
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style></style>
