<script>
import { ref, onMounted, computed } from 'vue'
import {useUserStore} from "../store/user"
import {useCandidateStore} from "../store/candidate"
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
import { useQuasar,QSpinnerGears } from 'quasar'
import { api } from '../boot/axios';
import BaseTimer from "../components/BaseTimer.vue";

export default {
  setup () {
    const visible = ref(true)
    const showSimulatedReturnData = ref(true)
     const $q = useQuasar()
  // $q.loading.hide()
        const store = useUserStore();
        const candidatestore = useCandidateStore();
       const router = useRouter()
    function hello () {
      return 'gdfgf'
    }
    const refBaseTimer = ref(null)
    const markscored = ref(0)
    // const timelimit = ref();
    let timePassed = ref(0);
    const submitResult = ref([])
    const numberToChar = (number) => {
      if(number === null) {
        return null
      }
      return String.fromCharCode(number+65)
    }

    const {  questions, userAnswers,token,type,uniquedate } = storeToRefs(store);
    const {  testlog_id , candidate_id,timelimit} = storeToRefs(candidatestore);
    const slideOption = ref([])
    const slide = ref(0)
    const max = ref(0)
    const min = ref(0)
    const lastvalue = ref(0)
    const pagination = ref(0)
    onMounted( async () => {
        //$q.loading.show()
      // timelimit.value = timelimit.value
      if(type.value == 1) {
        await store.getQuestion(testlog_id.value,candidate_id.value)
        
      } else {
        await store.getCustomQuestion(testlog_id.value,candidate_id.value,uniquedate.value)
      }
      
      let i = 0;
//       questions.value.sort(function (x, y) {
//     return x.question_id - y.question_id;
// });

// console.log(questions);

      // slide.value = questions.value[0].question_id
      max.value = questions.value[0].question_id
      //lastvalue.value = questions.value.length - 1
      lastvalue.value = questions.value.length - 1
      //min.value = questions.value[lastvalue.value].question_id
      slideOption.value = questions.value.map((x) => { 
        i++;
        return {'label' : i, 'value' : x.question_id }
      })
      //console.log(questions)
      //console.log(lastvalue)
        $q.loading.hide()
      
          
          visible.value = false
        

    })
    const prev = () => {
      
     const pot = max.value
     //console.log('potvalue',max.value)
     if ( slide.value < pot){
      slide.value  = slide.value - 1
      //console.log('aa',slide.value)   
     }
    }
    const next = () => {
      const pot = min.value
     //console.log('potvalue',pot)
     if ( slide.value > pot){
      slide.value  = slide.value + 1
      //console.log('aa',slide.value)   
     }
    }

    const finish = () => {
        //api.post(`analytic/mail`)
        //$q.loading.show()
        // quwstion_id, uswr_id, uuid, create date time, ans
        // // 
        // user ans -> mysql -> 9/10
         //console.log(userAnswers.value)
      //let adata = userAnswers.value
      //console.log(Object.values(adata))
      //let bdata = []
      //bdata = Object.values(adata)
      //console.log(bdata)
//       if (bdata.includes(null) == true) {
//    console.log("array1 contains null value");
//    alert("attend all the questions and press finish button")
// } else {
   $q.loading.show({
          message: 'Loading...pls wait..',
          boxClass: 'text-white',
          spinnerColor: 'white',
          spinnerSize: 60
        })
           api.post(`analytic/answer_test`, {candidate_id : candidate_id.value, testlog_id : testlog_id.value,userAnswers: userAnswers.value, timelimit : timelimit.value, timepassed: timelimit.value - timePassed.value  },
        {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
}).then(async(res) => {
  if(type.value == 1) {
    await api.post(`analytic/getcustomcandidateqstnmarks`,{candidate_id : candidate_id.value}, 
  {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
}).then( async(res) => {
  console.log(res.data)
  const canddetails = res.data.data
  canddetails.map((val) => {
     console.log(val.totalcorrect)
     markscored.value = val.totalcorrect
  })
  await api.put(`analytic/insertresult`,{ details: canddetails, type: type.value}).catch(err => {
    console.log(err)
  })
})
      // if(markscored.value > 6){
      //   $q.loading.hide()
      //   token.value = ''
      //   router.replace('/resulttwo');
      // } else {
         $q.loading.hide()
        token.value = ''
        router.replace('/result');
      // }  
        
  } else {
       await api.post(`analytic/getcandidateqstnmarks`,{candidate_id : candidate_id.value}, 
  {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
}).then( async (res) => {
   console.log(res.data)
  const canddetails = res.data.data
  canddetails.map((val) => {
     console.log(val.totalcorrect)
     markscored.value = val.totalcorrect
  })
  await api.put(`analytic/insertresult`,{ details: canddetails, type: type.value}).catch(err => {
    console.log(err)
  })
})
        if(markscored.value > 6){
       $q.loading.hide()
        token.value = ''
        router.replace('/resulttwo');

      } else {
         $q.loading.hide()
        token.value = ''
        router.replace('/result');
      } 
  }

})
.catch(res => {
  alert(res.response.data.message || 'server not found')
})


          
      // }
    }
    return {
      currentQuestion: 0,
      slideOption,
      timePassed,
      userAnswers,
      numberToChar,
      questions,
      hello,
      refBaseTimer,
      timelimit,
      submitResult,
      slide,
      prev,
      lastvalue,
      next,
      visible,
      markscored,
      showSimulatedReturnData,
        onSubmit (evt) {
        const formData = new FormData(evt.target)
        const data = []

        for (const [ name, value ] of formData.entries()) {
          data.push({
            name,
            value
          })
        }

        submitResult.value = data
      },
      finish,
  
        submitForm() {
        //console.log('refBaseTimer',refBaseTimer.value)
        timePassed.value = refBaseTimer.value.stopTimer()
        finish();
      },

      gotoContact() {
        let windowFeatures = "left=200,top=200,width=920,height=520";
      let route = router.resolve({ path: "/calc" });
      //console.log(windowFeatures,'kkk')
      window.open(route.href, "mozillaWindow", windowFeatures);
    },
      
  
     myFunction() {
alert("radio selected");
}
    }
  },
  
  components: {
    BaseTimer,
  },
  
}
</script>
<template>
<div class="header">
      <h6></h6>
    </div>

    <BaseTimer ref="refBaseTimer" :TIME_LIMIT="timelimit" :isTimeUp="finish" class="base-timer" />
    <!-- <h8 class=" row justify-center" style="font-weight:bold"></h8><br> -->
    <!-- <div class=" row justify-center">
    <q-btn @click="gotoContact()" class="bg-cyan-8 text-grey-1" label="calculator">
    <q-tooltip
          transition-show="rotate"
          transition-hide="rotate"
        >
          Click this button for calculator
        </q-tooltip>
      </q-btn>
    </div> -->
<!-- <div class="col q-pa-md text-h6 flex text-align: center"> Time Left : {{formatedtimelimit}}</div> -->
<div class="q-pa-lg" >
  <div><p>*Clicking the Finish button will end the test. To go to next question press Next</p></div>
  <!-- <b-card-text>
      Question No.{{currentQuestion + 1}} of {{questions.length}}
    </b-card-text> -->
    <q-card v-if="type == 1"> 
      <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
      <q-card-section v-show="showSimulatedReturnData">
        
<div  class="q-px-lg flex" style="background-color:white;font-weight:50;padding-left:10px" >Question {{ slide + 1}}</div>
<q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-color="primary"
      class="rounded-borders"
      height="493px"
      
    >
    
    <q-carousel-slide v-for="(question, index) in questions" :key="index"  :name="index" class="column no-wrap"  >

      <!-- <q-icon name="1" color="primary" size="56px" /> -->
        <div class="q-mt-md text-center" style="font-weight:bold; font-size: medium; font-style: normal;">
         <q-card class="" full width >
    <q-card-section>
      {{question.question}}
    </q-card-section>
    <q-separator inset/>
    <template v-for="(option, index) in question.options" :key="index"  >
        <q-card-actions >
          <q-card-section flat> {{numberToChar(index)}} :  {{option}}</q-card-section>
        </q-card-actions>
        <q-separator  inset/>
      </template>
    <q-form @submit="onSubmit" class="q-gutter-md" @onchange="myFunction()">
      <q-radio name="selected" v-for="(_, index) in question.options" :key="index" v-model="userAnswers[question.question_id]" :val="index" :label="numberToChar(index)" type="submit"/>

    <div class="q-px-sm">
      Your selection is: <strong>{{ numberToChar(userAnswers[question.question_id]) }}</strong>
    </div>
      <!-- <div>
        <q-btn label="Submit" type="submit" color="primary"/>
      </div> -->
    </q-form>
    <q-card v-if="submitResult.length > 0" flat bordered class="q-mt-md bg-grey-2" >
     
      <q-card-section class="row q-gutter-sm items-center">
        <div
          v-for="(item, index) in submitResult"
          :key="index"
          class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
        >{{ item.name }} = {{ item.value }}</div>
      </q-card-section>
    </q-card>
  </q-card>
        </div>
    </q-carousel-slide>

    
</q-carousel>
<div class="q-px-xm flex flex-center" style="background-color:white">
    <q-btn :disable="!slide" @click="slide--" color="primary" icon="keyboard_double_arrow_left" size="sm">Previous</q-btn>
    <q-btn :disable="slide==lastvalue" @click="slide++" color="primary" icon-right="keyboard_double_arrow_right" size="sm">Next</q-btn>
    </div>
    <div class="q-pa-xm flex" style="background-color:white; place-content: flex-end;">
  <q-btn size="sm" label="Finish" @click="submitForm" class="bg-cyan-8 text-grey-1"/>
   <!-- <q-tooltip
          transition-show="rotate"
          transition-hide="rotate"
        >
          Attend All Questions And Click Finish
          </q-tooltip> -->
  </div>
<!-- <div class="q-pa-sm row justify-center" style="background-color:white">
    </div > -->
    
    <!-- <br> -->
    <!-- <div class="q-px-sm mybutton" >
      
      <q-btn label="Finish" @click="submitForm" class="bg-cyan-8 text-grey-1"> <q-tooltip
          transition-show="rotate"
          transition-hide="rotate"
        >
          Attend All Questions And Click Finish
        </q-tooltip>
      </q-btn></div> -->

  
      </q-card-section>
      </transition>
      <q-inner-loading
        :showing="visible"
        label="Please wait..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />
    </q-card>
    <q-card v-else flat> 
      <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
      <q-card-section v-show="showSimulatedReturnData">
        
<div  class="q-px-lg flex" style="background-color:white;font-weight:50;padding-left:10px" >Question {{ slide + 1}}</div>
<q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-color="primary"
      class="rounded-borders"
      height="493px"
      
    >
    
    <q-carousel-slide v-for="(question, index) in questions" :key="index"  :name="index" class="column no-wrap"  >

      <!-- <q-icon name="1" color="primary" size="56px" /> -->
        <div class="q-mt-md text-center" style="font-weight:bold; font-size: medium; font-style: normal;">
         <q-card class="" full width >
    <q-card-section>
      {{question.question}}
    </q-card-section>
    <q-separator inset/>
    <!-- <template v-for="(option, index) in question.options" :key="index"  >
        <q-card-actions >
          <q-card-section flat> {{numberToChar(index)}} :  {{option}}</q-card-section>
        </q-card-actions>
        <q-separator  inset/>
      </template> -->
      <div class="row justify-center">
<q-form @submit="onSubmit" class="q-gutter-md" @onchange="myFunction()">
      <!-- <q-radio name="selected" v-for="(_, index) in question.options" :key="index" v-model="userAnswers[question.question_id]" :val="index" :label="numberToChar(index)" type="submit"/> -->
      <div class="q-gutter-y-md column row justify-center" style="width: 500px">
              <q-input
              
                v-model="testinstruction"
                outlined
                color="green"
                type="textarea" />
            </div>
    <!-- <div class="q-px-sm">
      Your selection is: <strong>{{ numberToChar(userAnswers[question.question_id]) }}</strong>
    </div> -->
      <!-- <div>
        <q-btn label="Submit" type="submit" color="primary"/>
      </div> -->
    </q-form>
      </div>
    
    <q-card v-if="submitResult.length > 0" flat bordered class="q-mt-md bg-grey-2" >
     
      <q-card-section class="row q-gutter-sm items-center">
        <div
          v-for="(item, index) in submitResult"
          :key="index"
          class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
        >{{ item.name }} = {{ item.value }}</div>
      </q-card-section>
    </q-card>
  </q-card>
        </div>
    </q-carousel-slide>

    
</q-carousel>
<div class="q-px-xm flex flex-center" style="background-color:white">
    <q-btn :disable="!slide" @click="slide--" color="primary" icon="keyboard_double_arrow_left" size="sm">Previous</q-btn>
    <q-btn :disable="slide==lastvalue" @click="slide++" color="primary" icon-right="keyboard_double_arrow_right" size="sm">Next</q-btn>
    </div>
    <div class="q-pa-xm flex" style="background-color:white; place-content: flex-end;">
  <q-btn size="sm" label="Finish" @click="submitForm" class="bg-cyan-8 text-grey-1"/>
   <!-- <q-tooltip
          transition-show="rotate"
          transition-hide="rotate"
        >
          Attend All Questions And Click Finish
          </q-tooltip> -->
  </div>
<!-- <div class="q-pa-sm row justify-center" style="background-color:white">
    </div > -->
    
    <!-- <br> -->
    <!-- <div class="q-px-sm mybutton" >
      
      <q-btn label="Finish" @click="submitForm" class="bg-cyan-8 text-grey-1"> <q-tooltip
          transition-show="rotate"
          transition-hide="rotate"
        >
          Attend All Questions And Click Finish
        </q-tooltip>
      </q-btn></div> -->

  
      </q-card-section>
      </transition>
      <q-inner-loading
        :showing="visible"
        label="Please wait..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />
    </q-card>
</div>

</template>

<style lang="sass" scoped>
.my-card
  width: 500%
  height: 500%
  max-width: 550px


</style>
<style scoped>
.header {
  position: absolute;
  top: 0;
}
.base-timer {
  margin-top: auto;
  margin-left: 1px;
}
</style>
<style scoped>
.q-pa-sm {
  padding: 11px 250px
}
.mybutton {
  position: absolute;
  right: 0;
  bottom: 0;
}
.q-mt-md {
    margin-top: -7px;
}
</style>