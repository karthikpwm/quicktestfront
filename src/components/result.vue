<template>
<div class="page-container window-height  row justify-center items-center" >
  <div class="q-pa-lg row items-start q-gutter-md" >
  <q-card dark bordered class="child">
      <q-card-section>
        <div class="text-h6" >Thanks, We will Get Back To You</div>
        
      </q-card-section>

      <q-separator dark inset />
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
  max-width: 592px



</style>