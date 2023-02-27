<template>
  <div class="q-pa-md">
    <div>Candidate ID: {{this.candidateId}}&nbsp;&nbsp; candidate name : {{candname}}  </div>
    <div class="q-mt-md" v-if="selected.length>0">
      Candidate Name: {{ selected[0]['candidatename'] }}
    </div>
    
    <q-table
    
      :rows="rows"
      auto-width
      wrap-cells
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[0]"
      @row-click="onRowClick" 
      
      v-model:selected="selected"
      >
      <template v-slot:body="props">
      <q-tr :props="props">
      <q-td key="name" :props="props">
            {{ props.row.question}}
            
          </q-td>
          <!-- <q-td key="correct" :props="props">
            {{ props.row.correct }}
           
          </q-td>
          <q-td key="icon" :props="props">
            {{ props.row.icon }}
           
          </q-td> -->
          
          <q-td key="actions" :props="props" style="width:131px" >
             <q-btn v-if="props.row.icon === 'true'" text-color="green" text="Print" icon="check"  flat round dense></q-btn>
             <q-btn v-else-if="props.row.icon === 'false'" text-color="red" icon="clear"  flat round dense></q-btn>
              <div v-else>{{ JSON.parse(props.row.answer) }}</div>
          </q-td> 
          
      </q-tr>
      </template>
    </q-table>
      
  </div>

</template>
<script>
import { computed, onMounted, ref,getCurrentInstance } from '@vue/runtime-core';
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/user";
import { api } from '../boot/axios';
import { useRouter } from 'vue-router'


export default {
  name : 'cresult',
  
  data(){
    return {
      candidateId:this.$route.params.id,
      categoryid:this.$route.params.catid
      }

  },
  setup () {
    
    const store = useUserStore();
    const { token, admin, remainingcredit, controllingbanner } = storeToRefs(store);
    const router = useRouter()
    const rows = ref([])
    const candname = ref()
    const displayicon = ref()
  
    onMounted(() => {
      let cid = getCurrentInstance().data.candidateId
      let categoryid = getCurrentInstance().data.categoryid
      console.log(token)
 api .post(`api/getTestResults`,{categoryId : categoryid, candidateId : cid},
 {
  headers: {
    Authorization:  token.value
  }
 })
          // .get(`analytic/printcanquestions/${cid}`)
          .then(async (res) => {
            
  let resdata = res.data.testResult
  let question = []
  await resdata.forEach(val => {
    //let ab = val.candidatename
     //val.candname= ab
     //console.log(val.candname)
     //candname.value = val.candname
     question.push(val.questionId)
     console.log(val.isCorrect)
     if(val.isCorrect == 1){
      val.icon = 'true'
      displayicon.value = val.icon
      
     } else if(val.isCorrect == 0) {
      
      val.icon = 'false'
      displayicon.value = val.icon
     } else {
        val.icon=''
     }
   });

   console.log(question)
  
    api .post(`api/question/get`,{ categoryId : categoryid})
    .then(async(res)=> {
    //console.log(res)
    let allquestion = res.data.categories
    //console.log(allquestion)
     var sepratequestion = []
    for(let i = 0; i < question.length; i++){
      //console.log(question[i],allquestion)
     let abcd =  allquestion.filter(obj => obj.id == question[i])
     //console.log(abcd[0].id)
       sepratequestion.push(abcd[0])
    }
//console.log(sepratequestion)

   await
    resdata.map(async(val) => {
    console.log(val,'dcdcdc',sepratequestion.length)
    for(let i = 0; i < sepratequestion.length; i++){
        //console.log(sepratequestion[i]['id'],'sdsdcdscd')
      if(sepratequestion[i]['id']== val.questionId){
       val.question = sepratequestion[i]['question'] 
      }
    }
     
   })
   rows.value = resdata
   })
 
   
  
    
    console.log(rows.value)
    //console.log(rows.value[0].candidatename)
   
   
          })
          
      
    })

  const display = () => {
//  console.log(getCurrentInstance().data.candidateId)
//     api
//           .post(`analytic/printcanquestions/${22}`)
//           .then(async (res) => {
            
//   let resdata = res.data.data

//     rows.value = resdata
    // resdata.forEach(element => {
    //   let abc = element.correct
    //   if(abc === 'correct') {
    //     element.result = 1
    //   }
    //   else {
    //     element
    //   }
    //   console.log(abc)
      
    // });
  // console.log(resdata)
  //         })

  }
  const columns = [
    {
      
      name: 'name',
      required: true,
      label: 'Questions',
      field : 'question',
      align: 'left',
      
      sortable: true,
      
    },
    // { name: 'options', align: 'left', label: 'options', field: 'options', sortable: true },
    // { name: 'answer', label: 'answer', field: 'answer',align: 'left', sortable: true },
    // { name: 'correct', label: 'Marks',align: 'left', field: 'correct', headerStyle:'width:100px' },
    // { name: 'icon', label: 'candidate answer',align: 'left', field: 'icon' },
    {
          name: "actions",
          label: "Answer",
          field: "actions", align: 'center',headerStyle:'width:100px'
        }
    
  ]
  
    return {
       selected: ref([]),
      columns,
      rows,
      display,
      candname,
      displayicon,
      token,
      store
     
      
    }
  },
  //  methods: {
  //   onRowClick (evt, row) {
  //     let windowFeatures = "left=200,top=200,width=920,height=520";
  //     let route = this.$router.resolve({ path: "/calc" });
  //     console.log(windowFeatures,'kkk')
  //     window.open(route.href, "mozillaWindow", windowFeatures);
  //     console.log('clicked on', row.candidate_id)
  //   }
  // }
}
</script>
