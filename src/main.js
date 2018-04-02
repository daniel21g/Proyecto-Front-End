import Vue from 'vue'
import App from './App.vue'
import 'jquery'
import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Personajes from './components/Personajes.vue'
import Planetas from './components/Planetas.vue'
import Vehiculos from './components/Vehiculos.vue'
import Cruceros from './components/Cruceros.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes=[
  {path: '/', component: Home},    //creo las rutas
  {path: '/personajes', component: Personajes},
  {path: '/planetas', component: Planetas},
  {path: '/vehiculos', component: Vehiculos},
{path: '/cruceros', component: Cruceros},
  ]
const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
