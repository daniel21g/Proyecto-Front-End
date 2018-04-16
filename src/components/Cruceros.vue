<template>
<div>
<div class="row">
    <div class="container">
    <div class="col-md-12">
  <table class="table table-hover table-xs-responsive">
  <thead class="thead-dark">
    <tr>
      <th>Nombre</th>
      <th>Modelo</th>
      <th>Fabricante</th>
      <th>Tripulacion</th>
      <th>Pasajeros</th>
      </tr>
  </thead>
  <tbody>
    <tr v-for="nav in starships" :key="nav.name">
      <th >{{nav.name}}</th>
      <td>{{nav.model}}</td>
      <td>{{nav.manufacturer}}</td>
      <td>{{nav.crew}}</td>
      <td>{{nav.passengers}}</td>
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
                  <li @click="getStarshipsPag(starships_url_pag+pag.id,pag.id)" v-for="pag in paginas" :key="pag.id" class="page-item" :class="{'active':pagina_actual==pag.id}" > <a class="page-link" href="#!">{{pag.id}}</a></li>
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
     <!--   <div class="row">
            <div class="col-md-12" >
                <button @click="anterior()" :disabled="prev_page==null"  type="button" class="btn btn-primary btn-sm">Anterior</button>
                <button @click="siguiente()" :disabled="next_page==null"  type="button" class="btn btn-primary btn-sm">Siguiente</button>
            </div>
         
        </div>  -->

</div>
</template>
<script>
import axios from "axios";
export default {
  name: "cruceros",
  mounted() {
    this.getStarships(this.starships_url,'suma');
  },
  data() {
    return {
      starships_url: "https://swapi.co/api/starships/",
      starships_url_pag: "https://swapi.co/api/starships/?page=",
      starships: [],
      next_page: "",
      prev_page: "",
      paginas:[],
      count:0,
      pagina_actual:0,
    };
  },
  methods: {
    getStarships(url,metodo) {
      var app = this;
      axios
        .get(url)
        .then(response => {
          this.starships = response.data.results;
          this.next_page = response.data.next;
          this.prev_page = response.data.previous;
          //console.log(this.planets);
           this.count = Math.ceil(response.data.count/10)
           if(this.paginas.length==0){
          for(let i=1;i<=this.count;i++){
            this.paginas.push({id:i})
          }}
           (metodo=='suma')?this.pagina_actual++:this.pagina_actual--
        })
        .catch(error => {
          console.log(error);
        });
    },
getStarshipsPag(url,pag) {
      var app = this;
      axios
        .get(url)
        .then(response => {
          this.starships = response.data.results;
          this.next_page = response.data.next;
          this.prev_page = response.data.previous;
          //console.log(this.planets);         
           //(metodo=='suma')?this.pagina_actual++:this.pagina_actual--
           this.pagina_actual=pag
        })
        .catch(error => {
          console.log(error);
        });
    },
    siguiente() {
      if (this.next_page != null) {
        this.getStarships(this.next_page,'suma');
      }
    },
    anterior() {
      if (this.prev_page != null) {
        this.getStarships(this.prev_page,'resta');
      }
    }
  }
};
</script>
<style scoped>
.table{
  background-color: rgba(255,255,255,0.8);
  border-radius: 5px;
}
h1 {
 margin: 0 auto;
}
thead{
  font-family: Quantum;
    font-size: 20px;
}
a{
  background-color: rgba(255,255,255,0.8);
  color:black;
  font-weight: bold;
}
/*.col-md-10{
    margin: 0 auto;
}*/
</style>
