<template>
<div class="row">
    <div class="container-fluid">
    <div class="col-md-12">
       <div  class="jumbotron text-left" v-for="film in films" :key="film.episode_id">
        <h1 class="display-4">Episode/ {{film.episode_id}}: {{film.title}}</h1>
        <hr class="my-2">
         <p class="d-inline">{{film.release_date}}</p> / <p class="d-inline">{{film.director}}</p> / <p class="d-inline">{{film.producer}}</p>
         <hr class="my-2">
        <p class="lead">{{film.opening_crawl}}</p>
        <div>
        </div>
        <hr class="my-2">
        <p class="lead">
          <button :disabled="!dataReady" type="button" class="btn btn-primary" :data-target="verClase(film.episode_id)"  data-toggle="modal">Ver personajes</button>
        <peliculamodal v-if="dataReady" :film="film"></peliculamodal>
         </p>
       </div>
    </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import Pelicula_modal from "./sub_omponents/Pelicula_modal.vue";
export default {
  name: "home",
  mounted() {
    this.getPeople();
    this.getFilms();
    //this.getPeopleNames()
  },
  components: {
    peliculamodal: Pelicula_modal
  },
  //props: ['films'],
  data() {
    return {
      films_url: "https://swapi.co/api/films/",
      people_url: "https://swapi.co/api/people/",
      films: [],
      people: [],
      people_prom: [],
      count: "",
      dataReady: false
    };
  },
  methods: {
    getFilms() {
      // axios.get().then().catch();
      axios
        .get(this.films_url)
        .then(response => {
          this.films = response.data.results;
          //console.log(this.count);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getPeople() {
       var app = this
      axios
        .get(this.people_url)
        .then(response => {
          this.people = response.data.results;
          this.count = response.data.count;
          //console.log(Math.ceil(this.count/10))
          for (let i = 1; i <= 9; i++) {
            this.people_prom.push(
              axios.get("https://swapi.co/api/people/?page=" + i)
            );
          }
          //onsole.log(this.people_prom)
          axios
            .all(this.people_prom)
            .then(results => {
              this.people = results.map(r => r.data.results);
              this.people = [].concat.apply([], this.people);
              // console.log(this.people)
              this.films.forEach(function(val, key) {
                val.names = [];
               val.characters.forEach(function(item, index) {
                  app.people.forEach(function(valor, indice) {
                    if (item == valor.url) {
                      val.names.push(valor.name);
                    }
                  });
                });
              });
              app.dataReady=true
              console.log(app.dataReady);
              
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    getPeopleNames() {
      // var app = this
      this.films.forEach(function(val, key) {
        val.names = [];
        val.characters.forEach(function(item, index) {
          this.people.forEach(function(valor, indice) {
            if (item == valor.url) {
              val.names.push(valor.name);
            }
          });
        });
      });
      console.log(this.films);
    },
    verClase(clase) {
      return ".".concat(String(clase));
    }
  }
}; //expport
</script>
<style scoped>

</style>

