

<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Magazine Portal</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-menu offset-y  v-if="userIsAuthenticated">
          <v-btn flat slot="activator">View Magazines</v-btn>
          <v-list>
            <v-list-tile v-for="item in subMenuItems" :key="item.subtitle" :to="item.link" @click="">
              <v-list-tile-title>{{ item.subtitle }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-menu offset-y  v-if="userIsAuthenticated">
          <v-btn flat slot="activator">View Products</v-btn>
          <v-list>
            <v-list-tile v-for="item in subprodMenuItems" :key="item.subtitle" :to="item.link" @click="">
              <v-list-tile-title>{{ item.subtitle }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link" @click="">
          {{ item.title }}
        </v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar> 

    <v-navigation-drawer temporary absolute v-model="sideNav">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link" @click="">
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.subtitle" :to="item.link" @click="" v-if="userIsAuthenticated">
          <v-list-tile-title>{{ item.subtitle }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-title v-if="userIsAuthenticated" @click="onLogout">Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <main>
      <router-view></router-view>
    </main>
    
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false,
      subMenuItems: [
        { subtitle: "Bead", link: "/magazine/cbm" },
        { subtitle: "Dolls House World", link: "/magazine/dhw" },
        { subtitle: "Teddy Bear Times", link: "/magazine/tbt" },
        { subtitle: "Catworld", link: "/magazine/cat" },
        { subtitle: "Toy soldier", link: "/magazine/toy" },
        { subtitle: "American Miniaturist", link: "/magazine/amn" },
        { subtitle: "Dollhouse Miniatures", link: "/magazine/dhm" }
      ],
      subprodMenuItems: [
        { subtitle: "Bead", link: "/product/cbm" },
        { subtitle: "Dolls House World", link: "/product/dhw" },
        { subtitle: "Teddy Bear Times", link: "/product/tbt" },
        { subtitle: "Catworld", link: "/product/cat" },
        { subtitle: "American Miniaturist", link: "/product/amn" }
      ]
    };
  },
  computed: {
    menuItems() {
      let menuItems = [{ title: "Sign In", link: "/user/signin" }];
      if (this.userIsAuthenticated) {
        menuItems = [
          { title: "Add Magazine", link: "/magazine/create" },
          { title: "Add Product", link: "/product/createitem" }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
