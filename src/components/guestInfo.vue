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
    const { token,type,uniquedate} = storeToRefs( store )
    const { candidate_id,testlog_id, company1_id,category1_id} = storeToRefs( store_candiate )
    console.log(type.value)
    const start = () => {
       $q.loading.show({
          message: 'Loading...pls wait..',
          boxClass: 'text-white',
          spinnerColor: 'white',
          spinnerSize: 60
        })
        if(type.value == 1) {
          api.post('analytic/start_test2',{candidate_id : candidate_id.value,company_id : company1_id.value,uniquedate : uniquedate.value},
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
        else  {
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
       
      
    }
    return {
      start,
      lorem: 'You have 15 minutes for attending 10 aptitude questions. Kindly have a calculator, paper and pencil ready. You may skip a question in case you do not know the correct answer. Click start test to begin your aptitude test. All the best.'
    }
  },
}
</script>


 <template>
  <q-page><div style="background-color: white">
    <div><br>
      <p class="text-h6 row justify-center">Quick Test</p>
    </div><q-separator/> <br>
    <div class="row justify-center items-center">
    <q-card class="my-card justify-center" flat>
      <q-card-section>
        <div class="general">General Aptitude Test</div>
        
      </q-card-section>
     <q-separator/>
      <q-card-section>
        <p class="testinstruction">Test Instructions</p>
        {{ lorem }}
        
      </q-card-section>
      <q-separator dark />
      <q-card-section>
        <p class="testinstruction">Test Format</p>
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="format" flat bordered>
      <q-card-section>
        <div class="cardinside" style="text-align:center">No. of Questions</div>
      </q-card-section></q-card>
      <q-card class="format" flat bordered>
      <q-card-section>
        <div class="cardinside" style="text-align:center">TimeLimit</div>
      </q-card-section>
    </q-card>
    <q-card class="format" flat bordered>
      <q-card-section>
        <div class="cardinside" style="text-align:center">TotalGrade</div>
      </q-card-section>
    </q-card>
    <q-card class="format" flat bordered>
      <q-card-section>
        <div class="cardinside" style="text-align:center">PassGrade</div> 
      </q-card-section>
    </q-card>
        </div>

      </q-card-section>
      <q-card-actions vertical align="center">
        
        <q-btn  label="Start Test" color="brand" @click="start()" rounded />

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
  </div>
    
  </q-page>
  
</template>
<style>
.bg-brand {
  background: #16A34A !important
}
.format{
  width: 100%;
  max-width: 300px;
  height:122px;
  border-radius: 12px;
}
.general{
  font-weight: 500;
font-size: 18px;
line-height: 100%;
/* identical to box height, or 18px */

letter-spacing: -0.005em;

color: #161616;
}
.cardinside{
  font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 100%;
letter-spacing: -0.007em;
color: #7A7A7A;
}
.testinstruction{
  font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 100%;
letter-spacing: -0.007em;
color: #7A7A7A;
}
</style>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 700px
  height: 600px
  
.note 
  background-color : #e0e0e0

  
</style>
