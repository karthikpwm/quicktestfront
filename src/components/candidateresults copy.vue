<template>
<div class="q-pa-sm row justify-center">
    <!-- <q-btn  @click="deletecan()" color="primary" label="delete"/> -->
  </div>
  <div class="q-pa-md">
  
    <q-table
      title="Candidate Results"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[15]"
      @row-click="onRowClick" 
    >
     <!-- <template v-slot:top>
          <q-btn dense color="secondary" label="Add Question" @click="show_dialog = !show_dialog" no-caps></q-btn><br/>
          <q-btn dense color="primary" label="Go To Questions" @click="reidrect()" no-caps></q-btn>
          
          </template> -->
    <template v-slot:body="props">
      
        <q-tr :props="props">
        
          <q-td key="name" :props="props">
            {{ props.row.name }}
           
          </q-td>
          <q-td key="action" :props="props" style="width:131px">
            <q-checkbox
            @update:model-value = "(val) => {chckbox(props.row.candidate_id, val)}"
        v-model="props.row.neww"
        color="green"
        label=""
        true-value="1"
        false-value="0"
      />
            </q-td>
          <q-td key="totalcorrect" :props="props">
            {{ props.row.totalcorrect }}
            
          </q-td>
          <q-td key="timetaken" :props="props">
            {{ props.row.timetaken }}
            
          </q-td>
          <q-td key="date" :props="props">
            {{ props.row.date }}
           
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
           
          </q-td>
          <q-td key="mobile" :props="props">
            {{ props.row.mobile }}
           
          </q-td>
          <q-td key="ctc" :props="props">
            {{ props.row.ctc }}
           
          </q-td>
          <q-td key="position" :props="props">
            {{ props.row.position }}
           
          </q-td>
          <q-td key="pincode" :props="props">
            {{ props.row.pincode }}
           
          </q-td>
          <q-td key="actions" :props="props" style="width:131px">
          <q-btn text-color="green" text="Print" icon="print"  @click="onRowClick(props.row)" flat round dense></q-btn>
              <q-btn text-color="red" icon="delete_forever"  @click="deleteItem(props.row)" flat round dense></q-btn>
            </q-td>
        </q-tr>
      </template>
      </q-table>
      
  </div>
  <div class="q-pa-sm q-gutter-md">
            <q-dialog v-model="promptdialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Password</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="password" autofocus @keyup.enter="promptdialog = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup @click="close()" />
          <q-btn flat label="Enter" v-close-popup  @click="deletecheck()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

          </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../store/user'
import { onMounted, ref } from '@vue/runtime-core';
import { api } from '../boot/axios';
import { useRouter } from 'vue-router'
import { stringify } from 'postcss';
export default {
  setup () {
    const $q = useQuasar()
    const store = useUserStore()
    const { token,admin} = storeToRefs( store )
    const router = useRouter()
    const rows = ref([])
    const password = ref()
    var checkpoint = ref(-1)
    var promptdialog = ref(false)
    
    var editedItem = ref([ {
        candidate_id: ''
      }])
    onMounted(() => {
      getMarks();
    })
    const getMarks = () => {
      $q.loading.show({
          message: 'Loading...pls wait..',
          boxClass: 'text-white',
          spinnerColor: 'white',
          spinnerSize: 60
        })
      //console.log(token)
api.get(`analytic/getmarks`,
          {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
}).then(async (res) => { 
  $q.loading.hide()       
  let resdata = res.data.data
  
  // resdata.forEach(element => {
  //   let pp = 1200
  //  let ab = pp - element.time
  //  const timeLeft = ab;
  //     const minutes = Math.floor(timeLeft / 60);
  //     let seconds = timeLeft % 60;

  //     if (seconds < 10) {
  //       seconds = `0${seconds}`;
  //     }

  //    let cd = `${minutes}:${seconds}`;
  //   console.log(cd)
  // });
  
  let qw = 0;
  resdata = resdata.map(function (val) {
      //console.log(val.timepassed)   
     const pp = 1200
     if(val.selection != 1){
        if(val.totalcorrect > 6)
     {
      val.neww = '1'
     } 
     else {
      val.neww = '0'
     }
     }
     else {
       val.neww = `${val.selection}`
     }
     
    //  if(val.time === 0)
    //  {
    //   val.time =1200
    //  }       
    //  else {
    // val.qw = pp - val.time
   if(val.timepassed != 0 && val.timepassed != null && val.timepassed != val.timelimit)
   {
const timeLeft = parseInt(val.timelimit) - parseInt(val.timepassed)
       const minutes = Math.floor(timeLeft / 60);
       let seconds = timeLeft % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
       
      val.timetaken = `${minutes}:${seconds}`;
   } 
   else if(val.timepassed == null || val.timepassed == 0) {
    val.timetaken = 'Invalid'
    
   }
   else {
    const timecheck = parseInt(val.timepassed)
    const minutes = Math.floor(timecheck / 60);
    let seconds = timecheck % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
     
      val.timetaken = `${minutes}:${seconds}`;
   }
    
         //console.log('sum',val.timetaken,resdata)
         var result = resdata.filter(obj=> obj.company_id == admin.value.company_id);
 //console.log(result);
        rows.value = result
        console.log(rows.value)
    //  }
         })
         //console.log(rows.value)
    //rows.value = resdata
}).catch( (res)=> {
$q.loading.hide()
})
}

   const deleteItem = (item) => {
    promptdialog.value = true
    checkpoint.value = rows.value.indexOf(item)
    //console.log(checkpoint.value)
  editedItem.value = Object.assign({}, item);
 // const index = data.indexOf(item);

}

const deletecheck = () => { 
api.put('user/checkpassword',{password : password.value},{headers: {
     Authorization: 'Bearer ' + token.value
   }
   }).then((res) => {
    console.log(res)
   const result = res.data.data
        if(checkpoint.value > -1)
        {
          confirm("Are you sure you want to delete this result?") &&
       api.delete(`analytic/deleteresults/${editedItem.value.candidate_id }`,
       {
   headers: {
     Authorization: 'Bearer ' + token.value
   }
 }).then((res) => {

 console.log(res)
 getMarks();
 setDefaultItem();
 })
 .catch((res) => {
           
             console.log(res)
            
           })
        } else {
          router.push('/editqstn')
        }

   }).catch(err => {
    console.log(err)
   alert('paswword did not match')} )


}
  const columns = [
    {
      name: 'name',
      required: true,
      label: 'Name of the candidate',
      field : 'name',
      align: 'left',
      style: 'width: 300px',
      sortable: true
    },
    {
          name: "action",
          label: "Selected",
          field: "action", align: 'center',headerStyle:'width:100px'
        },
    { name: 'totalcorrect', align: 'center', label: 'Marks', field: 'totalcorrect', sortable: true },
    { name: 'timetaken', label: 'Duration', field: 'timetaken',align: 'center', sortable: true },
    { name: 'date', label: 'Date', field: 'date',align: 'center', sortable: true },
    { name: 'email', label: 'Email',align: 'center', field: 'email' },
    { name: 'mobile', label: 'Mobile',align: 'center', field: 'mobile' },
    { name: 'ctc', label: 'Last Monthly Salary',align: 'center', field: 'ctc' },
    { name: 'position', label: 'Position',align: 'center', field: 'position' },
    { name: 'pincode', label: 'Pincode',align: 'center', field: 'pincode' },
    {
          name: "actions",
          label: "Actions",
          field: "actions", align: 'center',headerStyle:'width:100px'
        }
  ]

  const onRowClick = (item) => {
    //console.log(item)
    editedItem.value = Object.assign({}, item);
    let windowFeatures = "left=200,top=200,width=920,height=520";
      //let route = router.push('/printcanquestions/'+row.candidate_id,
      let route = router.resolve({ path: '/printcanquestions/'+editedItem.value.candidate_id,
       
  headers: {
    Authorization: 'Bearer ' + token.value
  }
})
      //console.log(windowFeatures,'kkk')
      window.open(route.href, "mozillaWindow", windowFeatures);

      //router.push('/printcanquestions/'+row.candidate_id,
//       {
//   headers: {
//     Authorization: 'Bearer ' + token.value
//   }
// })

  }
  const setDefaultItem = () => {
       
      checkpoint.value = -1
      password.value = null
     }
     const close = () => {
      checkpoint.value = -1
     }
  const reidrect= () => {
    //console.log(checkpoint.value)
     promptdialog.value = true
   }
   const chckbox = (item,val) => {
    console.log(val)
    // $q.loading.show({
    //       message: 'Loading...pls wait..',
    //       boxClass: 'text-white',
    //       spinnerColor: 'white',
    //       spinnerSize: 60
    //     })
    // api.put(`/user/selectupdate/${item}`
    // ).then(res => { 
    //   console.log(res)
    //   getMarks();
    //  $q.loading.hide()
    //  }
    // ).catch(res => {
    //   $q.loading.hide()
    //   console.log(res)
    //   })
    //console.log('hai',item)
   }
  
    return {
      columns,
      onRowClick,
      deleteItem,
      getMarks,
      deletecheck,
      reidrect,
      setDefaultItem,
      close,
      chckbox,
      checkpoint,
      password,
      promptdialog,
      rows,
      editedItem,
      customModel: ref('1'),
       deletecan() {
         //console.log('working')

         api
        .delete(`analytic/deletecan`, {
          headers: {
             Authorization: 'Bearer ' + token.value
          }
      }).then(res => { 
         router.push('/welcome')
      })
      
     }
    }
  },
   methods: {

}
}
</script>
