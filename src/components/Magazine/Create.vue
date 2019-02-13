<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm8 offset-sm2>
        <h1>Add Magazine</h1>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <form @submit.prevent="onCreateMagazine">
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field name="product_title" label="Title" id="product_title" v-model="product_title" box required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field name="Digital_id" label="Digital ID" id="Digital_id" v-model="Digital_id" box required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field name="Print_id" label="Print ID" id="Print_id" v-model="Print_id" box required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field name="product_desc" label="Description" id="product_desc" v-model="product_desc" box multi-line required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field name="issue_no" label="Issue No." id="issue_no" v-model="issue_no" box></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-select
                  box
                  label="Mag Code"
                  v-model="magcode"
                  :items="items"
                  :rules="[v => !!v || 'Item is required']"
                  required
                ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field name="product_image" label="image URL http://" id="product_image" v-model="product_image" box></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <img :src="product_image" height="150" alt="">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm2 offset-sm2>
              <v-checkbox label="Magazine" v-model="Magazine" @change="onCheckboxChange"></v-checkbox>
            </v-flex>
            <v-flex xs12 sm2>
              <v-checkbox label="Showme" v-model="Showme" value=1 @change="onCheckboxChange"></v-checkbox>
            </v-flex>
            <v-flex xs12 sm2>
              <v-checkbox label="Available" v-model="Available" value=1 @change="onCheckboxChange"></v-checkbox>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-btn class="primary" :disabled="!formIsValid" type ="submit">Create</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template> 

<script>
export default {
  data() {
    return {
      product_title: "",
      Digital_id: "",
      Print_id: "",
      product_desc: "",
      issue_no: "",
      magcode: null,
      items: [
        { text: "Catworld", value: "CAT" },
        { text: "Dolls House World", value: "DHW" },
        { text: "Bead", value: "CBM" },
        { text: "Teddy Bear Times", value: "TBT" },
        { text: "American Miniaturist", value: "AMN" },
        { text: "Dollhouse Miniatures", value: "DHM" },
        { text: "Toy Soldier", value: "TOY" }
      ],
      product_image: "",
      Magazine: 0,
      Showme: 0,
      Available: 0
    };
  },
  computed: {
    formIsValid() {
      return this.product_title !== "" && this.product_desc !== "";
    }
  },
  methods: {
    onCheckboxChange() {
      if (this.Magazine === true) {
        this.Magazine = 1;
      }
    },
    onCreateMagazine() {
      if (!this.formIsValid) {
        return;
      }

      if (this.Showme === true || "1") {
        this.Showme = 1;
      }
      if (this.Available === true || "1") {
        this.Available = 1;
      }
      const magazineData = {
        product_title: this.product_title,
        Digital_id: this.Digital_id,
        Print_id: this.Print_id,
        product_desc: this.product_desc,
        issue_no: this.issue_no,
        magcode: this.magcode,
        product_image: this.product_image,
        Magazine: this.Magazine,
        Showme: this.Showme,
        Available: this.Available
      };
      this.$store.dispatch("createMagazine", magazineData);
      this.$router.push(`/magazine/${this.magcode.toLowerCase()}`);
    }
  }
};
</script>
