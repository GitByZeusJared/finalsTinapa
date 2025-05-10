<template>
  <v-app>
    <v-main>
      <v-container fluid class="py-12" style="background: linear-gradient(135deg, #f0f4f8, #ffffff);">
        
        <!-- Top Section: Batches Completed, Main Sensor, and Batch In Process -->
        <v-row dense justify="space-between" align="stretch" spacing="6">
          <!-- Batches Completed -->
          <v-col cols="12" md="4" class="d-flex">
            <v-card class="dashboard-card flex-grow-1">
              <v-card-title class="card-title">Batches Completed</v-card-title>
              <v-card-text class="text-center">
                <div class="text-h3 font-weight-bold text-teal">4</div>
                <div class="text-caption text-muted">Successful batches today</div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Main Sensor -->
          <v-col cols="12" md="4" class="d-flex">
            <v-card class="dashboard-card flex-grow-1">
              <v-card-title class="card-title">
                <v-icon left class="mr-2" color="teal darken-2">mdi-cloud</v-icon>
                Smoke Remaining
              </v-card-title>
              <v-card-text class="text-center">
                <v-progress-circular
                  :model-value="smokeValue"
                  size="120"
                  width="10"
                  color="teal"
                  rotate="360"
                >
                  {{ smokeValue }}%
                </v-progress-circular>
                <div class="text-caption mt-3 text-muted">Status: Sufficient</div>
                <v-progress-linear
                  class="mt-4"
                  color="teal"
                  height="6"
                  rounded
                  :model-value="smokeValue"
                ></v-progress-linear>
                <div class="text-caption mt-4">
                  <strong>Main Sensor Status: Sufficient</strong>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Batch In Process -->
          <v-col cols="12" md="4" class="d-flex">
            <v-card class="dashboard-card flex-grow-1">
              <v-card-title class="card-title">Batch In Process</v-card-title>
              <v-card-text class="text-center">
                <div class="text-h3 font-weight-bold text-teal">1</div>
                <div class="text-caption mb-4 text-muted">Currently cooking</div>
                <div>
                  <div class="text-caption text-muted">Time Remaining</div>
                  <div class="text-h5 font-weight-bold text-teal">{{ formattedCountdown }}</div>
                </div>
                <div class="d-flex justify-center mt-4">
                  <v-btn @click="startTimer" class="mr-4" color="teal" text dark rounded>
                    Load
                  </v-btn>
                  <v-btn @click="stopTimer" color="teal" text dark rounded>
                    Unload
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Bottom Section: Notification and Rack Sensor -->
        <v-row dense justify="space-between" align="stretch" spacing="6">
          <!-- Notifications -->
          <v-col cols="12" md="6" class="d-flex">
            <v-card class="dashboard-card notification-card flex-grow-1" style="height: 450px;">
              <v-card-title class="card-title">
                <v-icon left class="mr-2" color="teal darken-2">mdi-bell-ring</v-icon>
                Notifications
              </v-card-title>
              <v-card-text>
                <v-list dense>
                  <v-list-item v-for="(notif, index) in notifications" :key="index" class="notification-item">
                    <v-list-item-content>
                      <v-list-item-title class="notification-title">{{ notif.title }}</v-list-item-title>
                      <v-list-item-subtitle class="notification-time">{{ notif.time }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Rack Sensor Readings -->
          <v-col cols="12" md="6" class="d-flex">
            <v-card class="dashboard-card rack-sensor-card flex-grow-1" style="height: 450px; overflow-y: auto;">
              <v-card-title class="card-title">
                <v-icon left class="mr-2" color="teal darken-2">mdi-rack</v-icon>
                Rack Sensor Readings
              </v-card-title>
              <v-card-text>
                <v-list dense>
                  <v-list-item v-for="(rack, index) in rackSensors" :key="index" class="rack-sensor-item">
                    <v-list-item-content>
                      <v-list-item-title class="sensor-title">
                        Rack {{ index + 1 }} Sensor:
                      </v-list-item-title>
                      <v-list-item-subtitle class="sensor-status">
                        <v-icon v-if="rack != null && rack !== ''" class="status-icon" color="green">mdi-check-circle</v-icon>
                        <v-icon v-else class="status-icon" color="red">mdi-alert-circle</v-icon>
                        <span>{{ rack == null || rack === '' ? 'Unavailable' : 'Available' }}</span>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'

const smokeValue = ref(90)
const rackSensors = ref([65, 72, 80, null, 95])
const notifications = ref([
  { title: 'Batch 3 completed successfully.', time: '2 minutes ago' },
  { title: 'Rack 2 sensor status: Available.', time: '10 minutes ago' },
  { title: 'Smoke level optimal.', time: '15 minutes ago' },
])

const formattedCountdown = computed(() => {
  const hours = String(Math.floor(secondsLeft.value / 3600)).padStart(2, '0')
  const minutes = String(Math.floor((secondsLeft.value % 3600) / 60)).padStart(2, '0')
  const seconds = String(secondsLeft.value % 60).padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
})

let secondsLeft = ref(1200)

const startTimer = () => {
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    if (secondsLeft.value > 0) {
      secondsLeft.value--
    }
  }, 1000)
}

const stopTimer = () => {
  clearInterval(timerInterval)
}

const timerInterval = null
</script>

<style scoped>
.dashboard-card {
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.dashboard-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
}

.card-content {
  flex-grow: 1;
}

.rack-sensor-item {
  padding: 12px;
  background-color: #f9fafb;
  margin-bottom: 8px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.rack-sensor-item:hover {
  background-color: #e1f5fe;
}

.sensor-title {
  font-size: 16px;
  font-weight: 500;
}

.sensor-status {
  font-size: 14px;
  display: flex;
  align-items: center;
}

.status-icon {
  margin-right: 8px;
}

.notification-card {
  max-height: 450px;
  overflow-y: auto;
  background-color: #ffffff;
}

.notification-item {
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
}

.notification-item:hover {
  background-color: #f0f0f0;
}

.notification-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.notification-time {
  font-size: 13px;
  color: #777;
  margin-top: 4px;
}

.rack-sensor-card {
  background-color: #ffffff;
  height: 450px;
  overflow-y: auto;
}

</style>
