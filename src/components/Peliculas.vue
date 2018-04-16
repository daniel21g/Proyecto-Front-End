<template>
   <div class="container-fluid">
      <div>
        
       <div  class="jumbotron text-left row" v-for="film in films" :key="film.episode_id">
         <div class="col-sm-9">
        <h1 class="display-6 titulo">Episode {{film.episode_id}}: {{film.title}}</h1>
        <hr class="my-2">
         <p class="d-inline titulos"><i class="fa fa-calendar"></i> Estreno: {{film.release_date}} / </p> <p class="d-inline titulos"><i class="fa fa-bullhorn"></i> Director: {{film.director}} / </p> <p class="d-inline titulos"><i class="fa fa-users"></i> Producción: {{film.producer}}</p>
         <hr class="my-2">
        <p class="lead sinopsis">{{film.opening_crawl.substr(0,1000)+'...'}}</p>
        <div>
        </div>
        <hr class="my-2">
        <p class="lead">
          <button :disabled="!dataReady" type="button" class="btn btn-info" :data-target="verClase(film.episode_id)"  data-toggle="modal">Ver personajes</button>
        <peliculamodal v-if="dataReady" :film="film"></peliculamodal>
         </p>
         </div>
         <div class="col-sm-3 d-none d-sm-block img">
      <img :src="image+film.episode_id+'.jpg'" width="100%" height="100%"/>
    </div>
       </div>
     
  </div>

</div>
    
    
   

</template>

<script>
import axios from "axios";
import Pelicula_modal from "./sub_components/Pelicula_modal.vue";

export default {
  name: "peliculas",
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
      dataReady: false,
      image:"/img/ep"
         };
  },
  methods: {
    getFilms() {
      // axios.get().then().catch();
      axios
        .get(this.films_url)
        .then(response => {
          this.films = response.data.results;

          this.films.forEach(function(item,index){
                item.anio=parseInt(item.release_date.substr(0,4))
               // console.log(item.anio)
          })
          this.films.sort(function(a,b) {return (a.anio > b.anio) ? 1 : ((a.anio > b.anio) ? -1 : 0);} );
         // console.log(this.films);
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
          this.count = Math.ceil(response.data.count/10);
          //console.log(Math.ceil(this.count/10))
          for (let i = 1; i <= this.count; i++) {
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
             // console.log(app.dataReady);
              
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
    //  console.log(this.films);
    },
    verClase(clase) {
      return ".".concat(String(clase));
    }
  }
}; //expport
</script>
<style scoped>
 /*.row{
  background-image: url('../assets/img/fondo_estrellas.jpg');
  background-repeat: repeat;
}*/
.img {
    width:auto;
    height:auto;
    max-width:100%;
    max-height:90%;
    
}
.jumbotron{
  max-height: 450px;
  background-color: rgba(255,255,255,0.8);
  padding: 25px;
  
}
.sinopsis{
 font-size: 1.3vw;

}
.titulo{
  font-size: 3.6vw;
}
.titulos{
font-size: 1.3vw;
}
.btn{
font-size: 1.3vw;
}
</style>

