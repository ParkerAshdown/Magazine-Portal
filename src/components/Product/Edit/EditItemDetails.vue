<template>
  <v-dialog width="80%" persistent v-model="editModal">
        <v-btn small color="primary" slot="activator">Edit</v-btn>
        <v-card>
            <v-container>
                <v-layout>
                    <v-flex xs12>
                        <v-layout row>
                            <v-flex xs12 sm10 offset-sm1>
                                <h1>Edit Product</h1>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm8 offset-sm2>
                            <v-text-field name="product_title" label="Title" id="product_title" v-model="editedproduct_title" box required></v-text-field>
                            </v-flex>
                        </v-layout>
                        
                        <v-layout row>
                            <v-flex xs12 sm8 offset-sm2>
                            <v-text-field name="product_desc" label="Description" id="product_desc" v-model="editedproduct_desc" box multi-line required></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm8 offset-sm2>
                            <v-text-field name="issue_no" label="Product No." id="issue_no" v-model="editedissue_no" box></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm8 offset-sm2>
                            <v-select
                                label="Mag Code"
                                v-model="editedmagcode"
                                :items="editeditems"
                                :rules="[v => !!v || 'Item is required']"
                                required
                                ></v-select>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm2 offset-sm2>
                            <v-checkbox label="Showme" v-model="editedShowme" @change="onCheckboxChange" box></v-checkbox>
                            </v-flex>
                        </v-layout> 
                        
                        <v-layout row>
                            <v-flex xs12 sm8 offset-sm2>
                            <img :src="magazine.product_image" height="100" alt="">
                            </v-flex>
                        </v-layout>
                        
                        
                        <v-layout row wrap>
                            <v-flex xs12 sm8 offset-sm2>
                            <h2 class="mt-3">Patterns and Projects</h2>
                            <v-divider></v-divider>
                            </v-flex>
                        </v-layout>
                        
                        <v-layout row>
                            <v-flex xs12 sm8 offset-sm2>
                            <v-text-field name="Digital_id" label="Digital ID" id="Digital_id" v-model="editedDigital_id" box></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm8 offset-sm2>
                            <v-text-field name="Print_id" label="Print ID" id="Print_id" v-model="editedPrint_id" box></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm2 offset-sm2>
                            <v-checkbox label="Teddy Pattern" v-model="editedpattern" @change="onCheckboxChange"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm2>
                            <v-checkbox label="Bead Project" v-model="editedproject" @change="onCheckboxChange"></v-checkbox>
                            </v-flex>
                            <v-flex xs12 sm4>
                            <v-checkbox label="Bead Premium Project" v-model="editedpremium" @change="onCheckboxChange"></v-checkbox>
                            </v-flex>
                            
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm8 offset-sm2>
                            <v-text-field name="premiumdownload" label="Premium Download link" id="premiumdownload" v-model="editedpremiumdownload" box></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs12 sm8 offset-sm2>
                            <h2 class="mt-3">Etsy Directory</h2>
                            <v-divider></v-divider>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm8 offset-sm2>
                            <v-text-field name="etsylink" label="Etsy link" id="etsylink" v-model="editedetsylink" box></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm2 offset-sm2>
                            <v-checkbox label="Etsy directory" v-model="editedetsy" @change="onCheckboxChange"></v-checkbox>
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
      editedmagazine: this.magazine.Magazine,
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
      editedAvailable: this.magazine.Available,
      editedShowme: this.magazine.Showme,
      editedpremium: this.magazine.premium,
      editedpattern: this.magazine.pattern,
      editedproject: this.magazine.project,
      editedpremiumdownload: this.magazine.premiumdownload,
      editedetsy: this.magazine.etsy,
      editedetsylink: this.magazine.etsylink
    };
  },
  computed: {
    formIsValid() {
      return this.editedproduct_title !== "" && this.editedproduct_desc !== "";
    }
  },
  methods: {
    onCheckboxChange() {
      if (this.editedetsy === true || this.editedetsy == "1") {
        this.editedetsy = 1;
      } else {
        this.editedetsy = 0;
      }
      if (this.editedpattern === true || this.editedpattern == "1") {
        this.editedpattern = 1;
      } else {
        this.editedpattern = 0;
      }
      if (this.editedproject === true || this.editedproject == "1") {
        this.editedproject = 1;
      } else {
        this.editedproject = 0;
      }
      if (this.editedpremium === true || this.editedpremium == "1") {
        this.editedpremium = 1;
      } else {
        this.editedpremium = 0;
      }
    },
    onSaveChanges() {
      if (!this.formIsValid) {
        return;
      }
      if (!this.editedpremiumdownload) {
        this.editedpremiumdownload = "0";
      }
      if (!this.editedpremium) {
        this.editedpremium = 0;
      }
      if (!this.editedproject) {
        this.editedproject = 0;
      }
      if (!this.editedetsy) {
        this.editedetsy = 0;
      }
      if (!this.editedetsylink) {
        this.editedetsylink = "0";
      }
      this.editModal = false;
      this.$store.dispatch("updateProductData", {
        id: this.magazine.id,
        product_title: this.editedproduct_title,
        Digital_id: this.editedDigital_id,
        Print_id: this.editedPrint_id,
        product_desc: this.editedproduct_desc,
        issue_no: this.editedissue_no,
        magcode: this.editedmagcode,
        product_image: this.editedproduct_image,
        Available: this.editedAvailable,
        Showme: this.editedShowme,
        Magazine: this.editedmagazine,
        premium: this.editedpremium,
        pattern: this.editedpattern,
        project: this.editedproject,
        premiumdownload: this.editedpremiumdownload,
        etsy: this.editedetsy,
        etsylink: this.editedetsylink
      });
    }
  }
};
</script>


