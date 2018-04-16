<template>
<li  class="list-group-item">Episodio {{peli.episode}}: {{peli.title}}</li>
  
</template>
<script>
import axios from 'axios'
export default {
  name: 'especie',
  props: ['peli'],
 
}
</script>
