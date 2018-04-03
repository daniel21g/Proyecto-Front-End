<template>
  <div class="modal" :class="clase(nave.name)"  id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalVerticalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalVerticalLabel">{{nave.manufacturer}}</h5>
                        <button  type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ...
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
