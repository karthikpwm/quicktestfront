<script setup>
import { storeToRefs } from 'pinia'
import { useQuasar,QSpinnerFacebook } from 'quasar'
import { ref, onMounted } from 'vue'
import { useUserStore } from '../store/user'
import { useCandidateStore } from '../store/candidate'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../boot/axios';

     const testinstruction = ref()
     const passgrade = ref()
     const testname =ref()
    const $q = useQuasar()
  const router = useRouter()
  // const form = ref(null);
    const store = useUserStore()
    const store_candiate = useCandidateStore()
    const { token,type,uniquedate} = storeToRefs( store )
    const { candidate_id,testlog_id, company1_id,category1_id,timelimit} = storeToRefs( store_candiate )
    console.log(type.value)
    onMounted(() => {
      getcategory();
     
  })
  const getcategory = async() => {
    //await api .post(`api/getcategory`,{companyId : company1_id.value},
   await api .post(`api/category/list`,{companyId : JSON.stringify(company1_id.value)},
       { headers: {
          Authorization: 'Bearer ' + token.value
        }
      }
        
        ).then( (res) => {
          console.log(res)
          let combinedcategories = []
      
          res.data.categories.map((res) => {
        console.log(res)
        combinedcategories.push(res)
      })
       
  
      res.data.commonCategory.map((res) => {
        console.log(res)
        combinedcategories.push(res)
      })
          //let result = res.data.categories
          let result = combinedcategories
          result.map((x  => {
            timelimit.value =  x.timeLimit
          testinstruction.value = x.instruction
          passgrade.value = x.passMark
          testname.value = x.name
          //console.log(testinstruction.value,res.data.categories.timeLimit)
          } ))
          
         }).catch( (res) => {
          console.log(res)
         })
  }
    const start = () => {
       $q.loading.show({
          message: 'Loading...pls wait..',
          boxClass: 'text-white',
          spinnerColor: 'white',
          spinnerSize: 60
        })
        if(type.value != 'MCQ') {
          api.post('analytic/start_test',{candidate_id : candidate_id.value,company_id : company1_id.value,category_id: category1_id.value},
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
           //api.post(`analytic/start_test2`, {candidate_id : candidate_id.value,company_id : company1_id.value,category_id: category1_id.value},
       //api .post(`api/getquestion`,{categoryId : 1},
           {
  // headers: {
  //   Authorization:  token.value
 // }
//}).then(res => {
  //testlog_id.value = res.data.testlog_id
 $q.loading.hide()
              router.push('/home');

//})
//.catch(res => {
 // $q.loading.hide()
  //alert(res.response.data.message || 'server not found')
//})
           }
        }
       
      
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
        {{ testinstruction }}
        
      </q-card-section>
      <q-separator dark />
      <q-card-section>
        <p class="testinstruction">Test Format</p>
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="format" flat bordered>
      <q-card-section>
        <div class="cardinside" style="text-align:center">No. of Questions</div>
        
      </q-card-section>
      <q-card-section>
        <div class="justify-center" style="display:flex">10</div>
        </q-card-section></q-card>
      <q-card class="format" flat bordered>
      <q-card-section>
        <div class="cardinside" style="text-align:center">TimeLimit</div>
        
      </q-card-section>
      <q-card-section>
        <div class="justify-center" style="display:flex">{{ timelimit }}</div>
      </q-card-section>
    </q-card>
    <q-card class="format" flat bordered>
      <q-card-section>
        <div class="cardinside" style="text-align:center">TotalGrade</div>
        
      </q-card-section>
      <q-card-section>
        <div class="justify-center" style="display:flex">10</div>
      </q-card-section>
    </q-card>
    <q-card class="format" flat bordered>
      <q-card-section>
        <div class="cardinside" style="text-align:center">PassGrade</div> 
        
      </q-card-section>
      <q-card-section>
        <div class="justify-center" style="display:flex">{{ passgrade }}</div>
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
