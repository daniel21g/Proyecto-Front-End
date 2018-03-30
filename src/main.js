import Vue from 'vue'
import App from './App.vue'
import 'jquery'
import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes=[
  {path: '/home', component: Home},    //creo las rutas
  /*{path: '/awards', component: Awards},
  {path: '/education', component: Education},
  {path: '/experiences', component: Experiences},
  {path: '/interest', component: Interest},
  {path: '/skills', component: Skills},*/
]

new Vue({
  render: h => h(App)
}).$mount('#app')
