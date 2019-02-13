<template>
  <v-dialog width="80%" persistent v-model="editModal">
        <v-btn small color="primary" slot="activator">Edit</v-btn>
        <v-card>
            <v-container>
                <v-layout>
                    <v-flex xs12>
                        <v-layout row>
                            <v-flex xs12 sm10 offset-sm1>
                                <h1>Edit Magazine</h1>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm10 offset-sm1>
                            <v-text-field name="product_title" label="Title" id="product_title" v-model="editedproduct_title" required box></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm10 offset-sm1>
                            <v-text-field name="Digital_id" label="Digital ID" id="Digital_id" v-model="editedDigital_id" required box></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm10 offset-sm1>
                            <v-text-field name="Print_id" label="Print ID" id="Print_id" v-model="editedPrint_id" required box></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm10 offset-sm1>
                            <v-text-field name="product_desc" label="Description" id="product_desc" v-model="editedproduct_desc" multi-line required box></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm10 offset-sm1>
                            <v-text-field name="issue_no" label="Issue No." id="issue_no" v-model="editedissue_no" box></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm10 offset-sm1>
                            <v-select
                                box
                                label="Mag Code"
                                v-model="editedmagcode"
                                :items="editeditems"
                                :rules="[v => !!v || 'Item is required']"
                                required
                                ></v-select>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm10 offset-sm1>
                            <v-text-field name="editedproduct_image" label="image URL http://" id="editedproduct_image" v-model="editedproduct_image" box></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm10 offset-sm1>
                            <img :src="editedproduct_image" height="150" alt="">
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm2 offset-sm1>
                            <v-checkbox label="Magazine" v-model="editedMagazine" @change="onCheckboxChange"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm2>
                            <v-checkbox label="Showme" v-model="editedShowme" @change="onCheckboxChange"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm2>
                            <v-checkbox label="Available" v-model="editedAvailable" @change="onCheckboxChange"></v-checkbox>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-card-actions>
                                <v-btn type ="submit" @click="editModal = false">Close</v-btn>
                                <v-btn class="primary" :disabled="!formIsValid" @click="onSaveChanges">Save</v-btn>
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
      editModal: false,
      editedproduct_title: this.magazine.product_title,
      editedDigital_id: this.magazine.Digital_id,
      editedPrint_id: this.magazine.Print_id,
      editedproduct_desc: this.magazine.product_desc,
      editedissue_no: this.magazine.issue_no,
      editedmagcode: this.magazine.magcode,
      editeditems: [
        { text: "Catworld", value: "CAT" },
        { text: "Dolls House World", value: "DHW" },
        { text: "Bead", value: "CBM" },
        { text: "Teddy Bear Times", value: "TBT" },
        { text: "American Miniaturist", value: "AMN" },
        { text: "Dollhouse Miniatures", value: "DHM" },
        { text: "Toy Soldier", value: "TOY" }
      ],
      editedproduct_image: this.magazine.product_image,
      editedMagazine: this.magazine.Magazine,
      editedShowme: this.magazine.Showme,
      editedAvailable: this.magazine.Available
    };
  },
  computed: {
    formIsValid() {
      return this.editedproduct_title !== "" && this.editedproduct_desc !== "";
    }
  },
  methods: {
    onCheckboxChange() {
      if (this.editedMagazine === true) {
        this.editedMagazine = 1;
      }
    },
    onSaveChanges() {
      if (!this.formIsValid) {
        return;
      }
      this.editModal = false;
      this.$store.dispatch("updateMagazineData", {
        id: this.magazine.id,
        product_title: this.editedproduct_title,
        Digital_id: this.editedDigital_id,
        Print_id: this.editedPrint_id,
        product_desc: this.editedproduct_desc,
        product_image: this.editedproduct_image,
        issue_no: this.editedissue_no,
        magcode: this.editedmagcode,
        Magazine: this.editedMagazine,
        Showme: this.editedShowme,
        Available: this.editedAvailable
      });
    }
  }
};
</script>


