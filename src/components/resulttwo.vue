<template>
<div class="page-container window-height  row justify-center items-center" >
  <div class="q-pa-xm row items-start q-gutter-md" >
  <q-card dark bordered class="my-card">
      <q-card-section vertical align="center">
        <div class="text-h6" >Plz Send Your Resume To hre@indtextile.in, We will Get Back To You, Thanks</div>
        
      </q-card-section>

      
      <div class="text-subtitle2"> </div>
      <q-card-section>
        {{ lorem }}
      </q-card-section>
    </q-card>
  </div>
</div>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
export default {
  setup () {
    
    // const frontpage = ref(false)
    
    return {
      // frontpage,
      lorem: '',
      
    }
  }
}
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px



</style>