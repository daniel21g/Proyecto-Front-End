<template>
<div>
<div class="row">
   <div class="card-columns">
  <!--  <div v-for="pep in people" :key="pep.name" class="col-lg-3 col-md-6 col-xs-12">   -->
      <div v-for="pep in people" :key="pep.name"  class="card text-left" style="">
          <h3 class="card-header">{{pep.name}}</h3>
          <div class="card-body">
          <h4 class="card-title">Especie: {{pep.species.length==0? 'Unknow':!pep.specie_name ? 'Buscando...': pep.specie_name.concat(' / ').concat(pep.specie_classification)}}</h4>
          <h6 class="card-subtitle mb-2 ">Planeta: {{pep.homeworld.includes("/") ? 'Buscando...' : pep.homeworld}}</h6>
          <h6 class="card-subtitle mb-2 ">Idioma: {{!pep.language ? 'Buscando...' : pep.language}}</h6>
        <!--  <Strong>Peliculas:</Strong> {{!dataReady ? 'Buscando...':''}} -->
          <Strong>Peliculas:</Strong>
       <!--   <ul v-if="dataReady" class="list-group list-group-flush">
            <peliculas v-for="peli in pep.peliculas" :key="peli.episode" :peli="peli" ></peliculas> -->
          <ul class="list-group list-group-flush">  
          
          <peliculas2 v-for="(item,index) in pep.films" :key="index" :url="item"></peliculas2>    
          <!--<li v-for="peli in pep.peliculas" :key="peli.episode" class="list-group-item">Episodio {{peli.episode}}: {{peli.title}}</li>-->
          </ul>
          <!-- <p class="card-text">Algun texto</p>
          <a href="#!" class="btn btn-primary">Go somewhere</a> 
          <li v-for="peli in pep.peliculas" :key="peli.episode" class="list-group-item">{{!pep.peliculas ? 'Buscando Peliculas...': 'Episodio ' + peli.episode +': '+ peli.title}}</li>
          -->
        </div>
        </div>
   <!-- </div> -->
   
   </div>

</div>
<div class="row">
  <div class="col-md-12">
<nav class="paginacion fixed-bottom ">
  <ul class="pagination  justify-content-center">
    <li class="page-item" :class="{'disabled':prev_page==null}" >
      <a  @click="anterior()" class="page-link" href="#!" tabindex="-1">Anterior</a>
    </li>
    <li @click="getPeoplePag(people_url_page+pag.id,pag.id)" v-for="pag in paginas" :key="pag.id" class="page-item" :class="{'active':pagina_actual==pag.id}" > <a class="page-link" href="#!">{{pag.id}}</a></li>
    <li class="page-item" :class="{'disabled':next_page==null}" >
      <a @click="siguiente()" class="page-link" href="#!">Siguiente</a>
    </li> 
  </ul>
</nav>
</div>
</div>
<!-- <div class="row">
    <div class="col-md-12" >
        <button ref="anterior" @click="anterior()" :disabled="prev_page==null" type="button" class="btn btn-primary btn-sm">Anterior</button>
        <button ref="siguiente" @click="siguiente()"  :disabled="next_page==null" type="button" class="btn btn-primary btn-sm">Siguiente</button>
    </div>
 
</div> -->
</div>
</template>
<script>
import axios from "axios";
//import Peliculas from "./sub_components/Peliculas.vue";
import Peliculas2 from "./sub_components/Peliculas2.vue";

export default {
  name: "personajes",
  components: {
  //  peliculas: Peliculas,
    peliculas2: Peliculas2

  },
  mounted() {
     this.getPeople(this.people_url,'suma');
   
  },
  data() {
    return {
      people_url: "https://swapi.co/api/people/",
      people_url_page:"https://swapi.co/api/people/?page=",
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
      count: 0,
      paginas: [],
      pagina_actual:0,

    };
  },
  methods: {
    getPeople(_url,metodo) {
      var app = this;
      this.dataReady=false
      axios
        .get(_url)
        .then(response => {
          //console.log(this.paginas.length)
          this.people = response.data.results;
          this.next_page = response.data.next;
          this.prev_page = response.data.previous;
          this.count = Math.ceil(response.data.count/10)
          if(this.paginas.length==0){
          for(let i=1;i<=this.count;i++){
            this.paginas.push({id:i})
          }}
          //console.log(this.paginas)
          response.data.results.forEach(function(val, pos) {
           if(val.species.length>0){app.species_prom.push(val.species[0]);} 
          }); // lleno arreglo de promesas de especies
          app.species_prom = app.species_prom.filter(function(item, pos, self) {
            //elimino repetidos
            return self.indexOf(item) === pos;
          });
          app.species_prom.forEach(function(val, pos) {
            app.species_prom_fn.push(axios.get(val));
          });
          (metodo=='suma')?this.pagina_actual++:this.pagina_actual--
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
        /*  axios
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
           
              
            })
            .catch(error => {
              console.log(error);
            });  */
          // console.log();
        })
        .catch(error => {
          console.log(error);
        });
        
    },
    getPeoplePag(_url,pag) {
      var app = this;
      this.dataReady=false
      axios
        .get(_url)
        .then(response => {
          //console.log(this.paginas.length)
          this.people = response.data.results;
          this.next_page = response.data.next;
          this.prev_page = response.data.previous;
          this.count = Math.ceil(response.data.count/10)
          if(this.paginas.length==0){
          for(let i=1;i<=this.count;i++){
            this.paginas.push({id:i})
          }}
          //console.log(this.paginas)
          response.data.results.forEach(function(val, pos) {
           if(val.species.length>0){app.species_prom.push(val.species[0]);} 
          }); // lleno arreglo de promesas de especies
          app.species_prom = app.species_prom.filter(function(item, pos, self) {
            //elimino repetidos
            return self.indexOf(item) === pos;
          });
          app.species_prom.forEach(function(val, pos) {
            app.species_prom_fn.push(axios.get(val));
          });
         // (metodo=='suma')?this.pagina_actual++:this.pagina_actual--
         this.pagina_actual=pag
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
        /*  axios
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
           
              
            })
            .catch(error => {
              console.log(error);
            });  */
          // console.log();
        })
        .catch(error => {
          console.log(error);
        });
        
    },
    siguiente() {
     // $("#siguiente").unbind("click");
      if (this.next_page != null) {
        //this.paginas=[]
         this.getPeople(this.next_page,'suma');
         //this.pagina_actual++
      }
    },
    anterior() {
    //$("#anterior").unbind("click");
      if (this.prev_page != null) {
       this.getPeople(this.prev_page,'resta');
       //this.pagina_actual--
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
.card{
  max-width: 350px;
  }
  .card-title{
    font-size: 15pt;
  }
  .card-header{
   font-family: Quantum; 
   font-size: 20pt;
   background-color:#292b2c;
   color:white;
  }
  .card-group{
    float:none;
  }
  .card{
    background-color: rgba(255,255,255,0.8)
  }
  /*.card-subtitle{
    color: black;
  }*/
</style>

