<template>
  <div>

            <!-- Modal -->
            <div class="modal fade" :class="clase(film.episode_id)" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog  modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Personajes:</h5>
                    <span class="badge badge-secondary">{{film.names.length}}</span>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <ul class="list-inline">
                    <li v-for="name in film.names" :key="name" class="list-inline-item">{{name}} / </li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-success" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>

  </div>
</template>
<script>
export default {
  name: 'pelicula_modal',
  props: ['film'],
  methods:{
      clase(clase){
        return String(clase)
      }
  }
}
</script>
<style scoped>
@font-face {
  font-family: Quantum;
  src: url('../../assets/fonts/Quantum.otf');
}
.modal-header {
     background-color: rgb(116, 116, 116);
    font-family: Quantum;
    color:white;
    
    }
    .badge{
      font-size: 2.4vw;  
      border: none;
    }
    .modal-title{
        font-size: 2vw;
    }
.modal-body{
    font-size: 1.7vw;
}
</style>

