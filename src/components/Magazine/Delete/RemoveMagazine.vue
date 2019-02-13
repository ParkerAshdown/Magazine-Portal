<template>
  <v-dialog persistent width="400px" v-model="deleteModal">
        <v-btn small color="error" slot="activator">Delete</v-btn>
        <v-card>
            <v-container>
                <v-layout>
                    <v-flex xs12>
                        <v-layout row>
                            <v-flex xs12 sm10 offset-sm1>
                                <h1>Remove Product</h1>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm10 offset-sm1>
                            <v-card-text>Are you sure you want to delete?</v-card-text>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-card-actions>
                                <v-btn type ="submit" @click="deleteModal = false">Close</v-btn>
                                <v-btn class="error" @click="onRemove">Delete</v-btn>
                            </v-card-actions>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
  </v-dialog>
</template>


<script>
export default {
  props: ["magazine"],
  data() {
    return {
      deleteModal: false
    };
  },
  methods: {
    onRemove() {
      this.deleteModal = false;
      this.$store.dispatch("removeMagazineData", {
        id: this.magazine.id
      });
    }
  }
};
</script>


