<template>

  <div id="app">
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">Star Wars</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" :class="{'active':currentRoute=='/'}">
              <router-link class="nav-link js-scroll-trigger" to="/">Home<span class="sr-only">(current)</span></router-link>
                         </li>
            <li class="nav-item" :class="{'active':currentRoute=='/personajes'}">
               <router-link class="nav-link js-scroll-trigger" to="/personajes">Personajes</router-link>
            </li>
            <li class="nav-item" :class="{'active':currentRoute=='/planetas'}">
              <router-link class="nav-link js-scroll-trigger" to="/planetas">Planetas</router-link>
            </li>
            <li class="nav-item" :class="{'active':currentRoute=='/vehiculos'}">
              <router-link class="nav-link js-scroll-trigger" to="/vehiculos">Vehiculos</router-link>
            </li>
             <li class="nav-item" :class="{'active':currentRoute=='/cruceros'}">
              <router-link class="nav-link js-scroll-trigger" to="/cruceros">Cruceros Espaciales</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container-fluid p-0">
   <!-- <home></home> -->
      <router-view></router-view>
      
    </div>
  </div>
</template>

<script>

export default {
  name: "app",
 
  updated() {
  this.currentRoute= this.$route.path
  //console.log(this.$route.path)
  },
  data() {
    return {
     
      currentRoute: this.$route.path
    }
  },
  computed:{
    //verRuta(){}
  },
  methods: {
   
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
}
</style>
