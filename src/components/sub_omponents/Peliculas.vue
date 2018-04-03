<template>
<li  class="list-group-item">Episodio {{peli.episode}}: {{peli.title}}</li>
  
</template>
<script>
import axios from 'axios'
export default {
  name: 'especie',
  props: ['peli'],
  created(){
     // getSpecies(link)
  },
  data(){
      return{
      _name:'peliculas',
      
      }
  },
   activated(){
   //this.refrescar()
   },
   methods:{
      refrescar(){
      this.$forceUpdate()
       }
  }
}
</script>
