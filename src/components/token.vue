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
import { isNull } from 'lodash';

export default ({
  setup() {
    const verify = ref(false)
    const route = useRoute();
    const store = useUserStore()
    const store_candiate = useCandidateStore()
    const {company_id,category_id, type,uniquedate,token} = storeToRefs( store )
    const { timelimit } = storeToRefs( store_candiate )
    const candidatetoken = route.params.token
    console.log(candidatetoken)
    onMounted(() => {

      api .post(`api/auth/verifyLinkToken`,{token : route.params.token}).then( (res) => {
        console.log(res)
        verify.value = true
        company_id.value = res.data.token.userId
        category_id.value = res.data.token.categoryId
        type.value = res.data.token.type
        token.value = route.params.token
      }).catch( (res) => {
        console.log(res)
      })
      // api
      // .get('/token/jwtverify/'+ route.params.token)

      //   .then( res => {
      //     console.log(res)
      //     verify.value = true
      //    company_id.value = res.data.verify.company_id
      //    if(res.data.verify.category_id == 'NULL')
      //    {
      //     category_id.value = null
      //    } else { 
      //     category_id.value = res.data.verify.category_id
      //    }
         
      //    timelimit.value = res.data.verify.timelimit
      //    type.value = res.data.verify.type
      //    uniquedate.value = res.data.verify.toDate
      //     console.log(verify,company_id, 'working')
      //   })
      //   .catch(res => {
      //     console.log(res)
      //   })
    })
    return {
      verify,
      company_id,
      category_id,
      type,
      uniquedate,
      candidatetoken
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