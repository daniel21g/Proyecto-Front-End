<template>
<li  class="list-group-item">Episodio {{pelicula.episode_id}}: {{pelicula.title}}</li>
  
</template>
<script>
import axios from 'axios'
export default {
  name: 'peliculas2',
  props: ['url'],
  data(){
      return{
          pelicula:[]
      }
  },
  mounted(){
      this.getFilms(this.url)
  },
  methods:{
      getFilms(_url){
       axios.get(_url).then(response=>{
           this.pelicula=response.data

       }).catch(err=>{
           console.log(err)
       })
      }
  }
  
  
}
</script>
<style scoped>
li{
    background-color: rgba(255,255,255,0)
}
</style>
