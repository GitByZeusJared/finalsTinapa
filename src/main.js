import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';

import VueApexCharts from 'vue3-apexcharts'; // ✅ Import ApexCharts

loadFonts();

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(VueApexCharts);                         // ✅ Use the plugin
app.component('apexchart', VueApexCharts);     // ✅ Register component globally

app.mount('#app');
