<template>

  <div id="app">
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="navbar">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
         <img src="./assets/img/logo.png" width="150" height="40" alt="">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li  class="nav-item" :class="{'active':currentRoute=='/'}" >
               <router-link class="nav-link js-scroll-trigger" to="/"><i class="swg swg-lightsabers-2 swg-2x"></i> Home<span class="sr-only">(current)</span></router-link>
            </li>
                  <li  class="nav-item" :class="{'active':currentRoute=='/peliculas'}">
               <router-link class="nav-link js-scroll-trigger" to="/peliculas"><i class="swg swg-decals-4 swg-2x"></i> Peliculas<span class="sr-only">(current)</span></router-link>
                  </li>
            <li class="nav-item" :class="{'active':currentRoute=='/personajes'}">
               <router-link class="nav-link js-scroll-trigger" to="/personajes"><i class="swg swg-darthvader-o swg-2x"></i> Personajes</router-link>
            </li>
            <li class="nav-item" :class="{'active':currentRoute=='/planetas'}">
              <router-link class="nav-link js-scroll-trigger" to="/planetas"><i class="swg swg-galrep swg-2x"></i> Planetas</router-link>
            </li>
            <li class="nav-item" :class="{'active':currentRoute=='/vehiculos'}">
              <router-link class="nav-link js-scroll-trigger" to="/vehiculos"><i class="swg swg-atat-2 swg-2x"></i> Vehiculos</router-link>
            </li>
             <li class="nav-item" :class="{'active':currentRoute=='/cruceros'}">
              <router-link class="nav-link js-scroll-trigger" to="/cruceros"><i class="swg swg-falcon-3 swg-2x"></i> Cruceros Espaciales</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <header class="py-5 bg-image-full" :style="{backgroundImage: 'url('+currentImage(currentRoute)+')'}" height="50%">

    </header>
    <div class="container-fluid">
   <!-- <home> image:'v-bind:style="{ backgroundImage: 'url(' + image + ')' }"'   </home> -->
      <router-view></router-view>
      
    </div>
  </div>
</template>

<script>
 
export default {
  name: "app",
 
  updated() {
  this.currentRoute= this.$route.path
  //console.log(this.$route.path.replace('/','_'))
  },
  data() {
    return {
     
      currentRoute: this.$route.path,
      image:'/img/_home.jpg'
    }
  },
  computed:{
    //verRuta(){}
  },
  methods: {
   currentImage(path){
     if(this.currentRoute!='/'){
       return '/img/'+this.currentRoute.replace('/','_')+'.jpg'
     }else{return '/img/_home.jpg'}
   }
  }
};
</script>


<style>

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
 
 background-image: url('/img/fondo_estrellas.jpg');
  background-repeat:repeat;
  height: 110%;
  width: 100%;

 
}
@font-face {
  font-family: Superstar_X;
  src: url('./assets/fonts/Starjedi.ttf');
}
@font-face {
  font-family: Starjedi;
  src: url('./assets/fonts/Superstar_X.ttf');
}
#navbar{
font-family: Starjedi;
font-size: 11pt;
}
.bg-image-full {
  background: no-repeat center center scroll;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  -o-background-size: cover;
  height: 300px;
  width: 100%;
  
}
header{
  margin-bottom: 20px;
  max-width:100%;
    max-height:100%;
    width: auto;
    height: auto;
}
/*body {
 min-width:960px;
}*/


</style>
