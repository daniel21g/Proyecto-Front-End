<template>
<div class="row">
    <div class="col-md-12">
       <div  class="jumbotron text-left" v-for="film in films" :key="film.episode_id">
        <h1 class="display-4">{{film.title}}</h1>
        <p class="lead">{{film.opening_crawl.substr(0,50)+'...'}}</p>
        <hr class="my-2">
        <p>{{film.director}}</p>
         <p class="lead">
          <a class="btn btn-primary btn-lg" href="#!" role="button">Some action</a>
         </p>
       </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'home',
    props: ['films'],
   data(){},
   methods: {

   }
  
}
</script>
<style scoped>

</style>

