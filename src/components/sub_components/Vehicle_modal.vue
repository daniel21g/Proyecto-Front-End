<template>
  <div class="modal fade" :class="clase(nave.name)"  id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalVerticalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalVerticalLabel">Descripcion</h5>
                        <button  type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                    <div class="modal-body">
                        <dl class="dl-horizontal">
                            <div class="row">
                                <dt class="col-3 text-left" >Fabricante: </dt>
                                <dd class="col-9 text-left">{{nave.manufacturer}}</dd>
                        </div>
                        <div class="row">
                                <dt class="col-3 text-left" >Nombre: </dt>
                                <dd class="col-9 text-left">{{nave.name}}</dd>
                        </div>
                         <div class="row">
                                <dt class="col-3 text-left" >Modelo: </dt>
                                <dd class="col-9 text-left">{{nave.model}}</dd>
                        </div>   
                        <div class="row">
                                <dt class="col-3 text-left" >Clase: </dt>
                                <dd class="col-9 text-left">{{nave.vehicle_class}}</dd>
                        </div>                           
                         <div class="row">
                                <dt class="col-3 text-left" >Longitud: </dt>
                                <dd class="col-9 text-left">{{nave.length}}</dd>
                        </div> 
                        <div class="row">
                                <dt class="col-3 text-left" >Pasajeros: </dt>
                                <dd class="col-9 text-left">{{nave.passengers}}</dd>
                        </div>     
                        <div class="row">
                            <dt class="col-3 text-left">Tripulacion: </dt>
                            <dd class="col-9 text-left" v-text="nave.crew"></dd>
                        </div>                 
                       
                        </dl>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-danger" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>
</template>
<script>
export default {
  name: 'vehicle_modal',
  data(){
      return{
          
      }
  },
  props: ['nave'] ,
  methods:{
      clase(clase){
return clase.replace(/\s/g,'').replace(/[^a-zA-Z ]/g, "")
      }
  }
}
</script>
<style scoped>
.modal-header {
    background-color: rgb(116, 116, 116);
    font-family: Quantum;
    color:antiquewhite;
    font-size: 30px;
    
}
@font-face {
  font-family: Quantum;
  src: url('../../assets/fonts/Quantum.otf');
}


</style>






