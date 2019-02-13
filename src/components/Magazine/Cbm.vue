<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>Bead Magazine</h1>
        <v-layout>
          <v-flex xs12 class="text-xs-center">
            <v-progress-circular indeterminate color="primary" v-if="loading" :size="50"></v-progress-circular>
          </v-flex>
        </v-layout>
        <v-card v-for="magazine in magazines" v-if="magazine.Magazine" :key="magazine.id">
          <v-container fluid>
            <v-layout row>
              <v-flex xs3 sm2 md1>
                <v-card-media
                      :src="magazine.product_image"
                      height="78px"
                      contain
                    ></v-card-media>
              </v-flex>
              <v-flex xs6 sm8 md9>
                <v-card-title primary-title class="pt-0 pb-0">
                  <div>
                    <h3>{{ magazine.product_title }}</h3>
                    <div>{{ magazine.product_desc | truncate(250) }}</div>
                    <div>ID: {{ magazine.id }}</div>
                  </div>
                </v-card-title>
              </v-flex>
              <v-flex xs3 sm2 md2 v-if="userIsAuthenticated">
                <v-card-text class="pt-0 pb-0">
                  <div>
                    <div>
                      <app-edit-magazine-details :magazine="magazine">Edit</app-edit-magazine-details>
                    </div>
                    <div>
                      <app-remove-magazine :magazine="magazine">Delete</app-remove-magazine>
                    </div>
                  </div>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    magazines() {
      return this.$store.getters.loadedMagazines.filter(function(mag) {
        return mag.magcode === "CBM";
      });
    },
    loading() {
      return this.$store.getters.loading;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  }
};
</script>
