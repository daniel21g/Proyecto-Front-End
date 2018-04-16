<template>
<div>
<div class="row">
    <div class="container">
    <div class="col-md-12">  
            <table class="table table-sm table-hover">
            <thead class="thead-dark">
                <tr>
                <th>Nombre</th>
                <th>Modelo</th>
                <th>+</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="nave in vehicles" :key="nave.name">
                <th class="text-left">{{nave.name}}</th>
                <td class="text-left">{{nave.model}}</td>
                <td>
               <!--<button type="button" class="btn btn-primary" data-target=".modal"  data-toggle="modal">Ver mas...</button>-->
               <button type="button" class="btn btn-warning" :data-target="verClase(nave.name)"  data-toggle="modal">Ver mas</button>
               <vehicleModal  :nave="nave"></vehicleModal>
                </td>
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
                  <li @click="getVehiclesPag(vehicles_url_pag+pag.id,pag.id)" v-for="pag in paginas" :key="pag.id" class="page-item" :class="{'active':pagina_actual==pag.id}" > <a class="page-link" href="#!">{{pag.id}}</a></li>
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
import Vehicle_modal from './sub_components/Vehicle_modal.vue'
export default {
  name: "vehiculos",
  mounted() {
    this.getVehicles(this.vehicles_url,'suma');
  },
  data() {
    return {
      vehicles_url: "https://swapi.co/api/vehicles/",
      vehicles_url_pag: "https://swapi.co/api/vehicles/?page=",
      vehicles: [],
      next_page: "",
      prev_page: "",
      modalActivo: '',
      show:false,
      paginas:[],
      count:0,
      pagina_actual:0,
    };
  },
  computed:{
   /* verClase(clase){
     return '.'.concat(clase)
    }*/
  },
  components:{
      vehicleModal: Vehicle_modal
  },
  methods: {
    getVehicles(url,metodo) {
      var app = this;
      axios
        .get(url)
        .then(response => {
          this.vehicles = response.data.results;
          this.next_page = response.data.next;
          this.prev_page = response.data.previous;
          //console.log(this.vehicles);
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
getVehiclesPag(url,pag) {
      var app = this;
      axios
        .get(url)
        .then(response => {
          this.vehicles = response.data.results;
          this.next_page = response.data.next;
          this.prev_page = response.data.previous;
          //console.log(this.vehicles);
           this.count = Math.ceil(response.data.count/10)
           if(this.paginas.length==0){
          for(let i=1;i<=this.count;i++){
            this.paginas.push({id:i})
          }}
          // (metodo=='suma')?this.pagina_actual++:this.pagina_actual--
          this.pagina_actual=pag
        })
        .catch(error => {
          console.log(error);
        });
    },
    siguiente() {
      if (this.next_page != null) {
        this.getVehicles(this.next_page,'suma');
      }
    },
    anterior() {
      if (this.prev_page != null) {
        this.getVehicles(this.prev_page,'resta');
      }
    },
    verClase(clase){
     return '.'.concat(clase.replace(/\s/g,'').replace(/[^a-zA-Z ]/g, ""))
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
  background-color: rgba(255,255,255,0.8)
}
/*.col-md-10{
    margin: 0 auto;
}*/
</style>