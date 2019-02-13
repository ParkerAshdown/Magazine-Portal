<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm8 offset-sm2>
        <h1>Add Product</h1>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <form @submit.prevent="onCreateItem">
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field name="product_title" label="Title" id="product_title" v-model="product_title" box required></v-text-field>
            </v-flex>
          </v-layout>
          
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field name="product_desc" label="Description" id="product_desc" v-model="product_desc" box multi-line required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field name="issue_no" label="Product No." id="issue_no" v-model="issue_no" box></v-text-field>
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
            <v-flex xs12 sm2 offset-sm2>
              <v-checkbox label="Showme" v-model="Showme" @change="onCheckboxChange" box></v-checkbox>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm2 offset-sm2>
                <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn> 
                <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <img :src="product_image" height="150" alt="">
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
              <v-text-field name="Digital_id" label="Digital ID" id="Digital_id" v-model="Digital_id" box></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field name="Print_id" label="Print ID" id="Print_id" v-model="Print_id" box></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm2 offset-sm2>
              <v-checkbox label="Teddy Pattern" v-model="pattern" @change="onCheckboxChange"></v-checkbox>
            </v-flex>
            <v-flex xs12 sm2>
              <v-checkbox label="Bead Project" v-model="project" @change="onCheckboxChange"></v-checkbox>
            </v-flex>
            <v-flex xs12 sm4>
              <v-checkbox label="Bead Premium Project" v-model="premium" @change="onCheckboxChange"></v-checkbox>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field name="premiumdownload" label="Premium Download link" id="premiumdownload" v-model="premiumdownload" box></v-text-field>
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
              <v-text-field name="etsylink" label="Etsy link" id="etsylink" v-model="etsylink" box></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm2 offset-sm2>
              <v-checkbox label="Etsy directory" v-model="etsy" @change="onCheckboxChange"></v-checkbox>
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
      imageUrl: "",
      Magazine: 0,
      Showme: 0,
      Available: 0,
      product_image: "",
      image: null,
      premium: 0,
      pattern: 0,
      project: 0,
      premiumdownload: "",
      etsy: 0,
      etsylink: ""
    };
  },
  computed: {
    formIsValid() {
      return this.product_title !== "" && this.product_desc !== "";
    }
  },
  methods: {
    onCheckboxChange() {
      if (this.Showme === true) {
        this.Showme = 1;
      }
    },
    onCreateItem() {
      if (!this.formIsValid) {
        return;
      }
      if (!this.premium) {
        this.premium = 0;
      } else if (this.premium === true) {
        this.premium = 1;
      }
      if (!this.pattern) {
        this.pattern = 0;
      } else if (this.pattern === true) {
        this.pattern = 1;
      }
      if (!this.project) {
        this.project = 0;
      } else if (this.project === true) {
        this.project = 1;
      }
      if (!this.etsy) {
        this.etsy = 0;
      } else if (this.etsy === true) {
        this.etsy = 1;
      }
      const productData = {
        product_title: this.product_title,
        Digital_id: this.Digital_id,
        Print_id: this.Print_id,
        product_desc: this.product_desc,
        Magazine: this.Magazine,
        Showme: this.Showme,
        Available: this.Available,
        issue_no: this.issue_no,
        magcode: this.magcode,
        product_image: this.image,
        premium: this.premium,
        pattern: this.pattern,
        project: this.project,
        premiumdownload: this.premiumdownload,
        etsy: this.etsy,
        etsylink: this.etsylink
      };
      console.log(this.project);
      this.$store.dispatch("createProduct", productData);
      this.$router.push(`/Product/${this.magcode.toLowerCase()}`);
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      // check file is an image (has . in filename)
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.product_image = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>
