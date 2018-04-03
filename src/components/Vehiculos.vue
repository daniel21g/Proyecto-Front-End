<template>
<div>
<div class="row">
    <div class="container">
    <div class="col-md-12">
  <h1>Vehiculos</h1>
  
            <table class="table table-sm">
            <thead>
                <tr>
                <th>Fabricante</th>
                <th>Modelo</th>
                <th>+</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="nave in vehicles" :key="nave.name">
                <td class="text-left">{{nave.manufacturer}}</td>
                <td class="text-left">{{nave.name}}</td>
                <td>
               <!--<button type="button" class="btn btn-primary" data-target=".modal"  data-toggle="modal">Ver mas...</button>-->
               <button type="button" class="btn btn-primary" :data-target="verClase(nave.name)"  data-toggle="modal">Ver mas</button>
               <vehicleModal  :nave="nave"></vehicleModal>
                </td>
                </tr>
               
               
            </tbody>
            </table>


</div>
</div>
</div>
<div class="row">
    <div class="col-md-12" >
        <button @click="anterior()" :disabled="prev_page==null"  type="button" class="btn btn-primary btn-sm">Anterior</button>
        <button @click="siguiente()" :disabled="next_page==null"  type="button" class="btn btn-primary btn-sm">Siguiente</button>
    </div>
   <!-- <span style="padding-left: 25px;">{{people[100]}}<br>{{species[100]}}</span> -->
</div>

</div>
</template>
<script>
import axios from "axios";
import Vehicle_modal from './sub_omponents/Vehicle_modal.vue'
export default {
  name: "vehiculos",
  mounted() {
    this.getVehicles(this.vehicles_url);
  },
  data() {
    return {
      vehicles_url: "https://swapi.co/api/vehicles/",
      vehicles: [],
      next_page: "",
      prev_page: "",
      modalActivo: '',
      show:false,
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
    getVehicles(url) {
      var app = this;
      axios
        .get(url)
        .then(response => {
          this.vehicles = response.data.results;
          this.next_page = response.data.next;
          this.prev_page = response.data.previous;
          //console.log(this.vehicles);
        })
        .catch(error => {
          console.log(error);
        });
    },

    siguiente() {
      if (this.next_page != null) {
        this.getVehicles(this.next_page);
      }
    },
    anterior() {
      if (this.prev_page != null) {
        this.getVehicles(this.prev_page);
      }
    },
    verClase(clase){
     return '.'.concat(clase.replace(/\s/g,'').replace(/[^a-zA-Z ]/g, ""))
    }
  }
};
</script>
<style scoped>
h1 {
  margin: 0 auto;
}
/*.col-md-10{
    margin: 0 auto;
}*/
</style>