import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Importing the React plugin for Vite

// Define the Vite configuration object
// https://vitejs.dev/config/
export default defineConfig({
  // Specify an array of plugins to be used in the configuration
  plugins: [
    react() // Using the React plugin to enable support for React in the project
  ],
})
