<template>
<div>
<div class="row">
    <div class="container">
    <div class="col-md-12">
  <h1>Cruceros Espaciales</h1>
  <table class="table table-hover">
  <thead class="thead-dark">
    <tr>
      <th>Modelo</th>
      <th>Fabricante</th>
      <th>Tripulacion</th>
      <th>Pasajeros</th>
      </tr>
  </thead>
  <tbody>
    <tr v-for="nav in starships" :key="nav.name">
      <th >{{nav.model}}</th>
      <td>{{nav.manufacturer}}</td>
      <td>{{nav.crew}}</td>
      <td>{{nav.passengers}}</td>
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
export default {
  name: "cruceros",
  mounted() {
    this.getStarships(this.starships_url);
  },
  data() {
    return {
      starships_url: "https://swapi.co/api/starships/",
      starships: [],
      next_page: "",
      prev_page: ""
    };
  },
  methods: {
    getStarships(url) {
      var app = this;
      axios
        .get(url)
        .then(response => {
          this.starships = response.data.results;
          this.next_page = response.data.next;
          this.prev_page = response.data.previous;
          //console.log(this.planets);
        })
        .catch(error => {
          console.log(error);
        });
    },

    siguiente() {
      if (this.next_page != null) {
        this.getStarships(this.next_page);
      }
    },
    anterior() {
      if (this.prev_page != null) {
        this.getStarships(this.prev_page);
      }
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
