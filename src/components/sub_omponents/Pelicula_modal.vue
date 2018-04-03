<template>
  <div>

            <!-- Modal -->
            <div class="modal" :class="clase(film.episode_id)" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog  modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Personajes:</h5>
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
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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
