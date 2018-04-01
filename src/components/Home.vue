<template>
<div class="row">
    <div class="container-fluid">
    <div class="col-md-12">
       <div  class="jumbotron text-left" v-for="film in films" :key="film.episode_id">
        <h1 class="display-4">{{film.title}}</h1>
        <p class="lead">{{film.opening_crawl.substr(0,100)+'...'}}</p>
        <hr class="my-2">
        <p>{{film.director}}</p>
         <p class="lead">
          <a class="btn btn-primary btn-lg" href="#!" role="button">Some action</a>
         </p>
       </div>
    </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'home',
    mounted(){
        this.getFilms()
    },
    //props: ['films'],
    data() {
    return {
      films_url: "https://swapi.co/api/films/",
      films: [],
     
    }
  },
   methods: {
getFilms() {
      // axios.get().then().catch();
      axios
        .get(this.films_url)
        .then(response => {
           this.films= response.data.results
           
          //console.log(this.count);       
        })
        .catch(error => {
          console.log(error);
        });
   }
  
}
}//expport
</script>
<style scoped>

</style>

