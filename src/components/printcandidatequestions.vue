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
            {{ props.row.question }}
            
          </q-td>
          <!-- <q-td key="correct" :props="props">
            {{ props.row.correct }}
           
          </q-td>
          <q-td key="icon" :props="props">
            {{ props.row.icon }}
           
          </q-td> -->
          <q-td key="actions" :props="props" style="width:131px">
          <q-btn v-if="props.row.icon === 'true'" text-color="green" text="Print" icon="check"  flat round dense></q-btn>
          <q-btn v-else text-color="red" icon="clear"  flat round dense></q-btn>
              
            </q-td>
      </q-tr>
      </template>
    </q-table>
      
  </div>

</template>
<script>
import { computed, onMounted, ref,getCurrentInstance } from '@vue/runtime-core';
import { api } from '../boot/axios';
import { useRouter } from 'vue-router'


export default {
  name : 'cresult',
  
  data(){
    return {
      candidateId:this.$route.params.id,
      
      }

  },
  setup () {
    const router = useRouter()
    const rows = ref([])
    const candname = ref()
    const displayicon = ref()
    onMounted(() => {
      let cid = getCurrentInstance().data.candidateId
      //console.log(cid)
 api
          .get(`analytic/printcanquestions/${cid}`)
          .then(async (res) => {
            
  let resdata = res.data.data
resdata.forEach(val => {
    let ab = val.candidatename
     val.candname= ab
     //console.log(val.candname)
     candname.value = val.candname
     console.log(val.correct)
     if(val.correct == 1){
      val.icon = 'true'
      displayicon.value = val.icon
      
     } else {
      
      val.icon = 'false'
      displayicon.value = val.icon
     }
   });
    rows.value = resdata
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
      displayicon
     
      
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
