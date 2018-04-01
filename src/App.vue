<template>

  <div id="app">
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">Star Wars</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <router-link class="nav-link js-scroll-trigger" to="/">Home<span class="sr-only">(current)</span></router-link>
             
            </li>
            <li class="nav-item">
               <router-link class="nav-link js-scroll-trigger" to="/personajes">Personajes</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link js-scroll-trigger" to="/planetas">Planetas</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Vehiculos</a>
            </li>
             <li class="nav-item">
              <a class="nav-link" href="#">Cruceros Espaciales</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container-fluid p-0">
   <!-- <home></home> -->
      <router-view></router-view>
      
    </div>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import axios from "axios";
export default {
  name: "app",
  components: {
    home: Home,
  },
  mounted() {
  // this.getFilms();
  },
  data() {
    return {
      films_url: "https://swapi.co/api/films/",
      films: [],
    }
  },
  methods: {
    getFilms() {
      // axios.get().then().catch();
      axios
        .get(this.films_url)
        .then(response => {
           this.films= response.data.results
          console.log(this.films);
          // this.misdatos = response.data.datos;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
