<template>
  <v-app>
    <v-main class="pa-6" style="background-color: #E1F5FE;">
      <v-container fluid class="px-6" style="margin-top: 40px;">

        <!-- Daily Production Chart -->
        <v-card class="mb-8" color="white" elevation="2" rounded>
          <v-card-title class="text-h6" style="color: #009688;">
            Daily Production
          </v-card-title>
          <v-card-text>
            <apexchart
              type="bar"
              height="380"
              :options="chartOptionsDays"
              :series="seriesDays"
            />
          </v-card-text>
        </v-card>

        <!-- Weekly Production Chart -->
        <v-card class="mb-8" color="white" elevation="2" rounded>
          <v-card-title class="text-h6" style="color: #009688;">
            Weekly Production
          </v-card-title>
          <v-card-text>
            <apexchart
              type="bar"
              height="380"
              :options="chartOptionsWeeks"
              :series="seriesWeeks"
            />
          </v-card-text>
        </v-card>

        <!-- Monthly Production Chart -->
        <v-card class="mb-8" color="white" elevation="2" rounded>
          <v-card-title class="text-h6" style="color: #009688;">
            Monthly Production
          </v-card-title>
          <v-card-text>
            <apexchart
              type="bar"
              height="380"
              :options="chartOptionsMonths"
              :series="seriesMonths"
            />
          </v-card-text>
        </v-card>

        <!-- Sensor Notification Table (Unchanged) -->
        <v-card class="mx-auto mt-8" color="white" max-width="1000" elevation="2">
          <v-card-title class="text-h6 font-weight-medium">
            Broken Sensors Notification
          </v-card-title>

          <v-data-table
            :headers="sensorHeaders"
            :items="sensorData"
            class="elevation-1"
            hide-default-footer
          >
            <template #item="{ item }">
              <tr>
                <td>{{ item.id }}</td>
                <td>{{ item.location }}</td>
                <td>
                  <v-chip color="green" text-color="white" size="small">
                    {{ item.status }}
                  </v-chip>
                </td>
                <td>{{ item.updated }}</td>
              </tr>
            </template>

            <template #no-data>
              <v-alert color="#009688" text>
                No sensor issues detected.
              </v-alert>
            </template>
          </v-data-table>
        </v-card>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
const seriesDays = [
  {
    name: 'Products',
    data: [120, 140, 100, 160, 130],
  },
];

const seriesWeeks = [
  {
    name: 'Products',
    data: [540, 600, 720, 690, 800],
  },
];

const seriesMonths = [
  {
    name: 'Products',
    data: [2200, 2500, 1800, 2000, 2400],
  },
];

const baseChartOptions = {
  chart: {
    type: 'bar',
    toolbar: { show: false },
    foreColor: '#009688',
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: '55%',
      distributed: true,
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '14px',
      fontWeight: 'bold',
      colors: ['#FFFFFF'],
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#009688',
        fontSize: '14px',
      },
    },
    title: {
      text: 'Products Produced',
      style: {
        color: '#009688',
        fontSize: '14px',
      },
    },
  },
  grid: {
    borderColor: '#E0E0E0',
  },
  colors: ['#009688'],
  tooltip: {
    theme: 'dark',
    x: { show: false },
  },
};

const chartOptionsDays = {
  ...baseChartOptions,
  xaxis: {
    categories: ['3 days ago', '4 days ago', '5 days ago', '6 days ago', '7 days ago'],
    labels: {
      style: {
        colors: '#009688',
        fontSize: '14px',
      },
    },
  },
};

const chartOptionsWeeks = {
  ...baseChartOptions,
  xaxis: {
    categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    labels: {
      style: {
        colors: '#009688',
        fontSize: '14px',
      },
    },
  },
};

const chartOptionsMonths = {
  ...baseChartOptions,
  xaxis: {
    categories: ['January', 'February', 'March', 'April', 'May'],
    labels: {
      style: {
        colors: '#009688',
        fontSize: '14px',
      },
    },
  },
};

const sensorHeaders = [
  { title: 'Sensor ID', key: 'id' },
  { title: 'Location', key: 'location' },
  { title: 'Status', key: 'status' },
  { title: 'Last Updated', key: 'updated' },
];

const sensorData = [
  { id: 'S1', location: 'First', status: 'Working', updated: '2025-05-03 10:00' },
  { id: 'S2', location: 'Second', status: 'Working', updated: '2025-05-03 10:00' },
  { id: 'S3', location: 'Third', status: 'Working', updated: '2025-05-03 10:00' },
  { id: 'S4', location: 'Fourth', status: 'Working', updated: '2025-05-03 10:00' },
  { id: 'S5', location: 'Fifth', status: 'Working', updated: '2025-05-03 10:00' },
];
</script>

<style scoped>
.v-card {
  border-radius: 12px;
}

.v-divider {
  background-color: #009688;
}

.v-btn:hover {
  background-color: #005b4f;
}

.v-card-title {
  font-weight: bold;
}

.v-card-text {
  padding-top: 0;
}
</style>
