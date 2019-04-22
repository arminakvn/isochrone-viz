import Vue from 'vue'
import App from './App.vue'
    // import mapboxgl from 'mapbox-gl/dist/mapbox-gl.css'
import 'mapbox-gl/dist/mapbox-gl.css'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
