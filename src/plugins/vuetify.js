// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    themes: {
      light: {
        primary: '#009688',  // Teal
        secondary: '#00BCD4',  // Cyan
        accent: '#03A9F4',  // Light Blue
        background: '#E1F5FE',  // Light Blue background for pages
        surface: '#FFFFFF',  // White surface for cards and other components
        error: '#D32F2F',  // Red for errors
        info: '#0288D1',  // Blue for info
        success: '#388E3C',  // Green for success
        warning: '#FBC02D',  // Yellow for warnings
      },
    },
  },
})
 // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides