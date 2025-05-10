<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-8" style="background-color: #E1F5FE; min-height: 100vh;">
        <!-- Added margin-top to create gap between the header and the card -->
        <v-card class="mt-4">
          <v-card-title class="text-h6 font-weight-bold text-teal">Batch History</v-card-title>

          <!-- Search Input (no icon now) -->
          <v-text-field
            v-model="search"
            label="Search Batches"
            class="search-input mb-4"
            outlined
            dense
            hide-details
            :style="searchStyle"
          ></v-text-field>

          <!-- Print Button -->
          <v-btn @click="printTable" color="primary" class="mb-4">
            Print
          </v-btn>

          <!-- Data Table -->
          <v-data-table
            :headers="headers"
            :items="filteredBatches"
            class="elevation-1"
            item-value="batchId"
            dense
          >
            <!-- Column for status -->
            <template v-slot:[`item.status`]="{ item }">
              <v-chip
                :color="getStatusColor(item.status)"
                text-color="white"
                size="small"
              >
                {{ item.status }}
              </v-chip>
            </template>

            <!-- Column for items -->
            <template v-slot:[`item.items`]="{ item }">
              <span>{{ item.items.length }}</span> <!-- Display number of items -->
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'

const headers = [
  { title: 'Batch ID', key: 'batchId' },
  { title: 'Items', key: 'items' },  // New column for items count
  { title: 'Start Time', key: 'startTime' },
  { title: 'End Time', key: 'endTime' },
  { title: 'Duration', key: 'duration' },
  { title: 'Status', key: 'status' }
]

const batches = ref([
  {
    batchId: '001',
    items: ['Item A', 'Item B', 'Item C', 'Item D', 'Item E'], // 5 items
    startTime: '2025-04-20 08:00',
    endTime: '2025-04-20 08:45',
    duration: '45 mins',
    status: 'Completed'
  },
  {
    batchId: '002',
    items: ['Item F', 'Item G', 'Item H', 'Item I', 'Item J'], // 5 items
    startTime: '2025-04-20 09:15',
    endTime: '2025-04-20 10:00',
    duration: '45 mins',
    status: 'Completed'
  },
  {
    batchId: '003',
    items: ['Item K', 'Item L', 'Item M', 'Item N', 'Item O'], // 5 items
    startTime: '2025-04-20 10:30',
    endTime: '',
    duration: '20 mins',
    status: 'In Progress'
  }
])

const search = ref('')

const filteredBatches = computed(() => {
  if (!search.value) return batches.value
  return batches.value.filter(batch => 
    batch.batchId.toLowerCase().includes(search.value.toLowerCase()) ||
    batch.status.toLowerCase().includes(search.value.toLowerCase())
  )
})

const getStatusColor = (status) => {
  if (status === 'Completed') return 'green'
  if (status === 'In Progress') return 'orange'
  return 'grey'
}

const printTable = () => {
  const printContent = document.querySelector('.v-data-table');
  const printWindow = window.open('', '', 'height=500,width=800');
  
  printWindow.document.write('<html><head><title>Batch History</title>');
  printWindow.document.write('<style>body { font-family: Arial, sans-serif; font-size: 14px; } .v-data-table { width: 100%; border-collapse: collapse; } .v-data-table th, .v-data-table td { padding: 8px; text-align: left; border: 1px solid #ddd; } .v-chip { border-radius: 4px; }</style>');
  printWindow.document.write('</head><body>');
  printWindow.document.write(printContent.outerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
}
</script>

<style scoped>
.text-teal {
  color: #009688; /* Teal color for card title */
}

.v-btn {
  transition: background-color 0.3s ease;
}

.v-btn:hover {
  background-color: rgba(255, 255, 255, 0.1); /* Slight hover effect */
}

.v-card {
  border-radius: 12px; /* Rounded corners for cards */
}

.v-data-table {
  background-color: white; /* White background for the table */
}

.v-chip {
  border-radius: 16px; /* Rounded chips for status */
}

/* Search Field Styling */
.search-input {
  max-width: 500px; /* Maximize width to use available space */
  margin-bottom: 16px;
  border-radius: 8px; /* Rounded corners */
}

.search-input .v-text-field__control {
  padding-right: 12px; /* Space for the icon */
}

.search-input .v-text-field__prepend-inner {
  padding-left: 12px; /* Space for the icon */
}

/* Focus Styling for Search Input */
.search-input .v-text-field__control:focus-within {
  border-color: #009688; /* Highlight border on focus */
}

.v-container {
  max-width: 100%; /* Maximizing the width */
}
</style>
