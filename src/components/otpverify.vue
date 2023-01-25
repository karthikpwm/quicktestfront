<script>
import { storeToRefs } from 'pinia'
import { useQuasar,QSpinnerFacebook } from 'quasar'
import { ref } from 'vue'
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
    const { token,type,uniquedate} = storeToRefs( store )
    const { candidate_id,testlog_id, company1_id,category1_id,candidatemail} = storeToRefs( store_candiate )
    const otp = ref()
    console.log(type.value)
    const start = () => {
       $q.loading.show({
          message: 'Loading...pls wait..',
          boxClass: 'text-white',
          spinnerColor: 'white',
          spinnerSize: 60
        })
      
          api.post('guest/otpverify',{otp : otp.value,email : candidatemail.value},
          {
             headers: {
    Authorization: 'Bearer ' + token.value
  }
          }).then(res => {
  let result = res.data.data
  
  if(result === 'true'){
    
      $q.loading.hide()
      router.push('/guestinfo');
  } else {
     $q.loading.hide()
     alert('incorrect')
    } 
 

})
.catch(res => {
  alert('Incorrect OTP')
})
        
        
       
      
    }
    return {
      start,
      otp,
      lorem: 'OTP sent to '+candidatemail.value+'.'
    }
  },
}
</script>


 <template>
  <div class="page-container window-height row justify-center items-center">
    <q-card class="my-card row justify-center">
      <q-card-section>
        <div class="text-h6">Verification</div>
        
      </q-card-section>
      
      <q-card-section>
        <strong>{{lorem}}</strong>
        <div class="row justify-center">
              <q-input autogrow label="OTP here" v-model="otp" style="width: 260px"></q-input>
              </div>
      </q-card-section>

      <q-separator dark />
      <q-card-actions vertical align="center">
        <span>
          <q-btn class="bg-cyan-8 text-grey-1" label="Submit" @click="start()" rounded />&nbsp;&nbsp;&nbsp;
          <q-btn class="bg-cyan-8 text-grey-1" label="Resend" @click="resennd()" />
        </span>
        
        

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
  height: 70%
  
.note 
  background-color : #e0e0e0
</style>
