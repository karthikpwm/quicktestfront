import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import pluginRewriteAll from 'vite-plugin-rewrite-all';
{ import('vite').UserConfig }
// https://vitejs.dev/config/
export default defineConfig({
  // base: "/aptitudetest/",
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),


    quasar({
      sassVariables: 'src/quasar-variables.sass'
    }),
    pluginRewriteAll()
  ],
  server: {
    host: '0.0.0.0'
  }
})

