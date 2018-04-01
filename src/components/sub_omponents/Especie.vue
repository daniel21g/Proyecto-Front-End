<template>
<p class="card-text">
     {{link}}
    </p>
  
</template>
<script>
import axios from 'axios'
export default {
  name: 'especie',
  props: ['link'],
  created(){
     // getSpecies(link)
  },
  data(){
      return{
      _name:'',
      classification:'',
      }
  },
  methods:{
      getSpecies (specie_url){
      axios.get(specie_url).then(response=>{
          this._name=response.data.name
          this.classification.response.data.classification
      }).catch(error=>{
          console.log(error)
      })
    }
  }
}
</script>
