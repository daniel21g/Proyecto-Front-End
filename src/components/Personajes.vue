<template>
<div >
<div class="row">
 <div v-for="pep in people" :key="pep.name" class="w-100 col-md-4 card text-left" style="">
    <h3 class="card-header">{{pep.name}}</h3>
    <div class="card-body">
    <h4 class="card-title">Especie: {{!pep.specie_name ? 'Buscando...': pep.specie_name.concat(' / ').concat(pep.specie_classification)}}</h4>
    <h6 class="card-subtitle mb-2 text-muted">Planeta: {{pep.homeworld.includes("/") ? 'Buscando...' : pep.homeworld}}</h6>
    <h6 class="card-subtitle mb-2 text-muted">Idioma: {{!pep.language ? 'Buscando...' : pep.language}}</h6>
    <Strong>Peliculas:</Strong> {{!dataReady ? 'Buscando...':''}}
    <ul v-if="dataReady" class="list-group list-group-flush">
     <peliculas v-for="peli in pep.peliculas" :key="peli.episode" :peli="peli" ></peliculas> 
    <!--<li v-for="peli in pep.peliculas" :key="peli.episode" class="list-group-item">Episodio {{peli.episode}}: {{peli.title}}</li>-->
    </ul>
    <!-- <p class="card-text">Algun texto</p>
    <a href="#!" class="btn btn-primary">Go somewhere</a> 
     <li v-for="peli in pep.peliculas" :key="peli.episode" class="list-group-item">{{!pep.peliculas ? 'Buscando Peliculas...': 'Episodio ' + peli.episode +': '+ peli.title}}</li>
     -->
  </div>
  </div>
</div>
<div class="row">
    <div class="col-md-12" >
        <button @click="anterior()" :disabled="prev_page==null" type="button" class="btn btn-primary btn-sm">Anterior</button>
        <button @click="siguiente()"  :disabled="next_page==null" type="button" class="btn btn-primary btn-sm">Siguiente</button>
    </div>
   <!-- <span style="padding-left: 25px;">{{people[100]}}<br>{{species[100]}}</span> -->
</div>
</div>
</template>
<script>
import axios from "axios";
import Peliculas from "./sub_omponents/Peliculas.vue";

export default {
  name: "personajes",
  components: {
    peliculas: Peliculas
  },
  beforeMount() {      
  },
  mounted() {
      //console.log(this.$route.path)
    this.getPeople(this.people_url);
    //this.$forceUpdate();
    //this.llenar(this.people)
  },
  data() {
    return {
      people_url: "https://swapi.co/api/people/",
      species_url: "https://swapi.co/api/species/",
      films_url: "https://swapi.co/api/films/",
      people: [],
      species: [],
      species_prom: [],
      species_prom_fn: [],
      planets: [],
      planets_prom: [],
      planets_prom_fn: [],
      next_page: "",
      prev_page: "",
      pelis: [],
      films: [],
      dataReady: false,

    };
  },
  computed: {
    // a computed getter
    mensaje: function () {
      // `this` points to the vm instance
      return this.titulo
    }
  },
  methods: {
    getPeople(_url) {
      var app = this;
      var aux = [];
      axios
        .get(_url)
        .then(response => {
          this.people = response.data.results;
          this.next_page = response.data.next;
          this.prev_page = response.data.previous;
          response.data.results.forEach(function(val, pos) {
            app.species_prom.push(val.species[0]);
          }); // lleno arreglo de promesas de especies
          app.species_prom = app.species_prom.filter(function(item, pos, self) {
            //elimino repetidos
            return self.indexOf(item) === pos;
          });
          app.species_prom.forEach(function(val, pos) {
            app.species_prom_fn.push(axios.get(val));
          });
          axios //buscar especies
            .all(app.species_prom_fn)
            .then(function(results) {
              // Both requests are now complete
              app.species = results.map(r => r.data);

              app.people.forEach(function(val, pos) {
                //console.log(app.species.length)
                app.species.forEach(function(item, index) {
                  if (val.species[0] == item.url) {
                    val.specie_name = item.name;
                    val.specie_classification = item.classification;
                    val.language = item.language;
                  }
                });
              });
            })
            .catch(error => {
              console.log(error);
            });
          response.data.results.forEach(function(val, pos) {
            // lleno arreglo de promesas de planetas
            app.planets_prom.push(val.homeworld);
          });
          app.planets_prom = app.planets_prom.filter(function(item, pos, self) {
            //elimino repetidos
            return self.indexOf(item) === pos;
          });
          app.planets_prom.forEach(function(val, pos) {
            //lleno promesas de funcion get
            app.planets_prom_fn.push(axios.get(val));
          });
          //app.people.homeworld='Buscando...'
          axios //buscar planetas
            .all(app.planets_prom_fn)
            .then(function(results) {
              // Both requests are now complete
              app.planets = results.map(r => r.data);

              app.people.forEach(function(val, pos) {
                //console.log(app.species.length)
                app.planets.forEach(function(item, index) {
                  if (val.homeworld == item.url) {
                    val.homeworld = item.name;
                  }
                });
              });
            })
            .catch(error => {
              console.log(error);
            });
          //Buscar Peliculas
          axios
            .get(this.films_url)
            .then(response => {
              app.films = response.data.results;
              app.people.forEach(function(val, key) {
                val.peliculas = [];
                val.films.forEach(function(item, index) {
                  app.films.forEach(function(valor, indice) {
                    if (item == valor.url) {
                      val.peliculas.push({
                        title: valor.title,
                        episode: valor.episode_id
                      });
                    }
                  });
                });
              });
              app.dataReady=true
              console.log(app.dataReady)
              //app.pelis=app.people
             /* app.people.forEach(function(item,index){
              console.log(item.peliculas)
              })*/
              
            })
            .catch(error => {
              console.log(error);
            });
          // console.log();
        })
        .catch(error => {
          console.log(error);
        });
        
    },
    siguiente() {
      if (this.next_page != null) {
       
        this.getPeople(this.next_page);
      }
    },
    anterior() {
      if (this.prev_page != null) {
       
        this.getPeople(this.prev_page);
      }
    },
    getSpecies(pep_arr) {
      return axios.get(pep_arr[0].species[0]);
    },
    getPlanet(pep_arr) {
      return axios.get(pep_arr[0].homeworld);
    },
    getFilms() {
      // axios.get().then().catch();
      axios
        .get(this.films_url)
        .then(response => {
          let x = response.data.results;
          return x;
          // console.log(this.films);
        })
        .catch(error => {
          console.log(error);
        });
    }
  } //methods
};
</script>
<style scoped>

</style>

