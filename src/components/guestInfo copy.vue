<script>
import { storeToRefs } from 'pinia'
import { useQuasar,QSpinnerFacebook } from 'quasar'
// import { ref } from 'vue'
import { useUserStore } from '../store/user'
import { useCandidateStore } from '../store/candidate'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../boot/axios';

export default {
  setup () { 
    const $q = useQuasar()
  const router = useRouter()
  // const form = ref(null);
    const store = useUserStore()
    const store_candiate = useCandidateStore()
    const { token} = storeToRefs( store )
    const { candidate_id,testlog_id, company1_id,category1_id } = storeToRefs( store_candiate )
    //console.log(token)
    const start = () => {
       $q.loading.show({
          message: 'Loading...pls wait..',
          boxClass: 'text-white',
          spinnerColor: 'white',
          spinnerSize: 60
        })
        api.post(`analytic/start_test`, {candidate_id : candidate_id.value,company_id : company1_id.value,category_id: category1_id.value},
        {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
}).then(res => {
  testlog_id.value = res.data.testlog_id
 $q.loading.hide()
              router.push('/home');

})
.catch(res => {
  alert(res.response.data.message || 'server not found')
})
      
    }
    return {
      start,
      lorem: 'You have 15 minutes for attending 10 aptitude questions. Kindly have a calculator, paper and pencil ready. You may skip a question in case you do not know the correct answer. Kindly attend the test on a PC or Laptop only not your mobile phone. Click start test to begin your aptitude test. All the best.'
    }
  },
}
</script>


 <template>
  <div class="page-container window-height row justify-center items-center">
    <q-card class="my-card justify-center">
      <q-card-section>
        <div class="text-h6">Note</div>
        
      </q-card-section>

      <q-card-section>
        {{ lorem }}
      </q-card-section>

      <q-separator dark />
      <q-card-actions vertical align="center">
        
        <q-btn class="bg-cyan-8 text-grey-1" label="Start Test" @click="start()" rounded />

        <q-space />

        <!-- <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        /> -->
      </q-card-actions>
    </q-card>
  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
  
.note 
  background-color : #e0e0e0
</style>
