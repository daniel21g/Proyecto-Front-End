<template>
<div>
<div class="row">
    <div class="container">
    <div class="col-md-12 tabla">
  <table class="table table-hover table-sm-responsive">
  <thead class="thead-dark">
    <tr class="d-flex">
      <th class="col-2">Nombre</th>
      <th class="col-2">Diametro</th>
      <th class="col-2">Clima</th>
      <th class="col-2">Terreno</th>
      <th class="col-2">Superficie de Agua</th>
      <th class="col-2">Población</th>
    </tr>
  </thead>
  <tbody>
    <tr class="d-flex" v-for="pla in planets" :key="pla.name">
      <th class="col-2" >{{pla.name}}</th>
      <td class="col-2">{{pla.diameter}}</td>
      <td class="col-2">{{pla.climate}}</td>
      <td class="col-2">{{pla.terrain}}</td>
      <td class="col-2">{{pla.surface_water}}</td>
      <td class="col-2">{{pla.population}}</td>
      </tr>
    
  </tbody>
  </table>
  <div class="row">
    <div class="col-md-12" >
        <nav class="paginacion">
        <ul class="pagination pagination-sm justify-content-center">
          <li class="page-item" :class="{'disabled':prev_page==null}" >
            <a  @click="anterior()" class="page-link" href="#!" tabindex="-1">Anterior</a>
          </li>
          <li @click="getPlanetsPag(planets_url_pag+pag.id,pag.id)" v-for="pag in paginas" :key="pag.id" class="page-item" :class="{'active':pagina_actual==pag.id}" > <a class="page-link" href="#!">{{pag.id}}</a></li>
          <li class="page-item" :class="{'disabled':next_page==null}" >
            <a @click="siguiente()" class="page-link" href="#!">Siguiente</a>
          </li> 
        </ul>
        </nav>
    </div>
</div>
</div>
</div>
</div>
<!-- <div class="row">
    <div class="col-md-12" >
        <button @click="anterior()" :disabled="prev_page==null"  type="button" class="btn btn-primary btn-sm">Anterior</button>
        <button @click="siguiente()" :disabled="next_page==null"  type="button" class="btn btn-primary btn-sm">Siguiente</button>
    </div>
</div> -->

</div>
</template>
<script>
import axios from "axios";
export default {
  name: "planetas",
  mounted() {
    this.getPlanets(this.planets_url,'suma');
  },
  data() {
    return {
      planets_url: "https://swapi.co/api/planets/",
      planets_url_pag:'https://swapi.co/api/planets/?page=',
      planets: [],
      next_page: "",
      prev_page: "",
      paginas:[],
      count:0,
      pagina_actual:0,
    };
  },
  methods: {
    getPlanets(url,metodo) {
      var app = this;
      axios
        .get(url)
        .then(response => {
          this.planets = response.data.results;
          this.next_page = response.data.next;
          this.prev_page = response.data.previous;
          this.count = Math.ceil(response.data.count/10)
           if(this.paginas.length==0){
          for(let i=1;i<=this.count;i++){
            this.paginas.push({id:i})
          }}
           (metodo=='suma')?this.pagina_actual++:this.pagina_actual--
          //console.log(this.planets);
        })
        .catch(error => {
          console.log(error);
        });
    },
getPlanetsPag(url,pag) {
      var app = this;
      axios
        .get(url)
        .then(response => {
          this.planets = response.data.results;
          this.next_page = response.data.next;
          this.prev_page = response.data.previous;
          this.count = Math.ceil(response.data.count/10)
           if(this.paginas.length==0){
          for(let i=1;i<=this.count;i++){
            this.paginas.push({id:i})
          }}
          // (metodo=='suma')?this.pagina_actual++:this.pagina_actual--
          this.pagina_actual=pag
          //console.log(this.planets);
        })
        .catch(error => {
          console.log(error);
        });
    },
    siguiente() {
      if (this.next_page != null) {
        this.getPlanets(this.next_page,'suma');
      }
    },
    anterior() {
      if (this.prev_page != null) {
        this.getPlanets(this.prev_page,'resta');
      }
    }
  }
};
</script>
<style scoped>
h1 {
 margin: 0 auto;
}
td{
overflow: hidden;
}
.row{
    background-image: url('/img/fondo_estrellas.jpg');
  background-repeat:repeat;
}
.table{
  background-color: rgba(255,255,255,0.8);
  border-radius: 5px;
}
thead{
  font-family: Quantum;
    font-size: 19px;
}
tbody{
  font-size: 16px;
}
a{
  background-color: rgba(255,255,255,0.8)
}
/*.col-md-10{
    margin: 0 auto;
}*/
</style>

