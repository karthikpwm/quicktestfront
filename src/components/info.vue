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
    const { candidate_id,testlog_id, company_id } = storeToRefs( store_candiate )
    //console.log(token)
    const start = () => {
      //  $q.loading.show({
      //     spinner: QSpinnerFacebook,
      //     spinnerColor: 'yellow',
      //     spinnerSize: 140,
      //     backgroundColor: 'purple',
      //     message: 'Some important process is in progress. Hang on...',
      //     messageColor: 'black'
      //   })
        api.post(`analytic/start_test`, {candidate_id : candidate_id.value,company_id : company_id.value},
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
    }
  },
}
</script>


 <template>
  <div class="page-container window-height row justify-center items-center">
    <div class="row justify-center">
    <q-card class="my-card-align=“center”" flat bordered>
      <q-img
        src=""
        img-alt="Image"
        img-top
        style="max-width: 4rem;"
        class="mb-2"
      />

      <q-card-section >
        <div class="text-overline text-orange-9"></div>
        <div class="text-h7 q-mt-sm q-mb-xs">Note</div>
        <div class="text-h6 text-center self-center">
         You have 20 minutes for attending 10 aptitude questions. Click start test to begin your test.
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="dark" label="" />
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

      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subitle2">
            {{ lorem }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
  

.note 
  background-color : #e0e0e0
</style>
