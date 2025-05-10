<template>
  <div> <!-- Wrapper added to resolve the multiple root error -->

    <!-- Sidebar -->
    <v-navigation-drawer
      app
      permanent
      width="250"
      dark
      class="dashboard-sidebar"
    >
      <v-list dense class="d-flex flex-column justify-space-between h-100">
        <div>
          <!-- Application Title -->
          <v-list-item class="text-white">
            <v-list-item-title class="text-h6 font-weight-bold">ASFM</v-list-item-title>
          </v-list-item>

          <v-divider class="my-2"></v-divider>

          <!-- Navigation Label -->
          <v-list-subheader class="text-white text-uppercase">Navigation</v-list-subheader>

          <!-- Dashboard -->
          <v-list-item link @click="navigateTo('home')" class="text-white" :ripple="false">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>

          <!-- History -->
          <v-list-item link @click="navigateTo('history')" class="text-white" :ripple="false">
            <v-list-item-icon>
              <v-icon>mdi-history</v-icon>
            </v-list-item-icon>
            <v-list-item-title>History</v-list-item-title>
          </v-list-item>

          <!-- Statistics -->
          <v-list-item link @click="navigateTo('stats')" class="text-white" :ripple="false">
            <v-list-item-icon>
              <v-icon>mdi-chart-bar</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Statistics</v-list-item-title>
          </v-list-item>
        </div>

        <!-- Logout -->
        <v-list-item link @click="confirmLogout" class="text-white" :ripple="false">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Logout Confirmation Dialog -->
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title class="headline text-teal">Log Out?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="grey" @click="cancelLogout">Cancel</v-btn>
          <v-btn text color="teal" @click="logout">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div> <!-- End of wrapper -->
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth';

const router = useRouter();
const dialog = ref(false);

const navigateTo = (route) => {
  router.push({ name: route });
};

const confirmLogout = () => {
  dialog.value = true;
};

const cancelLogout = () => {
  dialog.value = false;
};

const logout = async () => {
  try {
    await signOut(getAuth());
    dialog.value = false;
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>

<style scoped>
.dashboard-sidebar {
  background: linear-gradient(to bottom, #00695c, #004d40);
}

.v-list-item {
  border-radius: 8px;
  transition: background-color 0.3s;
}

.v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.v-icon {
  margin-right: 8px;
}
</style>
