<template>
<div>
<div class="row">
 <div v-for="pep in people" :key="pep.name" class="w-100 col-md-4 card text-left" style="">
    <h3 class="card-header">{{pep.name}}</h3>
    <div class="card-body">
    <h4 class="card-title">Especie: {{pep.specie_name}} / {{pep.specie_classification}}</h4>
    <h6 class="card-subtitle mb-2 text-muted">{{pep.homeworld}}</h6>
    <!-- <especie :link="pep.species[0]" ></especie> -->
    <p class="card-text">Algun texto</p>
    <a href="#!" class="btn btn-primary">Go somewhere</a>
  </div>
  </div>
</div>
<div class="row">
    <div class="col-md-12" >
        <button @click="anterior()" :disabled="prev_page==null" type="button" class="btn btn-primary btn-sm">Anterior</button>
        <button @click="siguiente()" :disabled="next_page==null" type="button" class="btn btn-primary btn-sm">Siguiente</button>
    </div>
    <span style="padding-left: 25px;">{{people[100]}}<br>{{species[100]}}</span>
</div>
</div>
</template>
<script>
import axios from "axios";
import Especie from "./sub_omponents/Especie.vue";

export default {
  name: "personajes",
  components: {
    especie: Especie
  },
  beforeMount() {
    //this.getSpecies(this.species_url)
    //this.getSpecies(this.species_next_page)
  },
  mounted() {
    this.getPeople(this.people_url);
    //this.llenar(this.people)
  },
  data() {
    return {
      people_url: "https://swapi.co/api/people/",
      species_url: "https://swapi.co/api/species/",
      people: [],
      species: [],
      species_prom: [],
      species_prom_fn: [],
      next_page: "",
      prev_page: "",
      count: 0
    };
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
          //this.species_prom= response.data.results
          //this.count= math.ceil(response.data.count/10)
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
          axios.all(app.species_prom_fn).then(function(results) {
            // Both requests are now complete
            app.species = results.map(r => r.data);

            app.people.forEach(function(val, pos) {
              //console.log(app.species.length)
              app.species.forEach(function(item, index) {
                if (val.species[0] == item.url) {
                  val.specie_name = item.name
                  val.specie_classification = item.classification
                }
              });
            });
          });
          /*
           let urlArray = [] // unknown # of urls (1 or more)

let promiseArray = urlArray.map(url => axios.get(url)); // or whatever
axios.all(promiseArray)
.then(function(results) {
  let temp = results.map(r => r.data);
  …
});
           
           
           
           
           console.log(this.count)
           uniqueArray = a.filter(function(item, pos, self) {
          return self.indexOf(item) == pos;
            })
           */
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
    prueba(arr) {
      axios
        .get(arr[0].species[0])
        .then(response => {
          this.species.push(response.data.name);
          return axios.get(arr[1].species[1]); // using response.data
        })
        .then(response => {
          this.species.push(response.data.name);
          // console.log('Response', response);
        });
    },
    llenar(arr) {
      var app = this;
      for (let i = 0; i >= arr.length; i++) {
        app.species_prom.push(arr[i].species[0]);
      }
    }
  } //methods
};
</script>
<style scoped>

</style>

