<template>
  <div>
    <guestuser v-if="verify" />
    <!-- <errorpage v-else /> -->
  </div>
</template>
<script>

import { onMounted, ref } from 'vue'
import { api } from '../boot/axios';
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../store/user'
import { useCandidateStore } from '../store/candidate'
import guestuser from './../components/guestUserDetails.vue'
import errorpage from '../components/errorPageNotFound.vue'

export default ({
  setup() {
    const verify = ref(false)
    const route = useRoute();
    const store = useUserStore()
    const store_candiate = useCandidateStore()
    const {company_id,category_id} = storeToRefs( store )
    const { timelimit } = storeToRefs( store_candiate )
    onMounted(() => {
      api.get('/token/jwtverify/'+ route.params.token)
        .then( res => {
          verify.value = true
         company_id.value = res.data.verify.company_id
         category_id.value = res.data.verify.category_id
         timelimit.value = res.data.verify.timelimit
          //console.log(verify,company_id, 'working')
        })
        .catch(res => {
          console.log(res)
        })
    })
    return {
      verify,
      company_id,
      category_id,
    }
  },
  components: {
    guestuser,
    errorpage
  },
})
</script>
<style scoped>

</style>