<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm12 text-xs-center>
        <h1>Magazine portal</h1>
        <v-btn large router v-if="!userIsAuthenticated" to="/user/signin">Sign in</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  }
};
</script>