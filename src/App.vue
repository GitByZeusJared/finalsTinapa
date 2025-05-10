<template>
  <v-app>
    <!-- Conditionally render the Sidebar if not on the login page -->
    <Sidebar v-if="!isLoginPage" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from './components/SidebarVue.vue'

export default {
  name: 'App',
  components: {
    Sidebar
  },
  computed: {
    // Check if the current route is login
    isLoginPage() {
      return this.$route.name === 'login'; // Adjust this to your login route's name
    }
  }
}
</script>
