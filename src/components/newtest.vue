<template>

  <q-page><div style="background-color:white;">
    <!-- <q-fixed-position corner="top-right">
    <q-btn round color="primary" @click="alert" icon="alarm" />
  </q-fixed-position> -->
    <div class="row" style="font-size:19px;padding-left: 19px;padding-bottom: 10px;padding-top:10px">Tests<span class="button" style="padding-right:10px"><q-btn style="background: #16A34A; color: white" @click="newtest()" label="Create New Test" rounded /></span></div>
   

  <div class="q-pa-md">
    
   
      <q-tabs
        v-model="tab"
        align="justify-left"
        indicator-color="green"
        active-color="green"
        class="q-mb-sm"
        
      >
        <q-tab class="tabheadernew" name="mails" label="All" no-caps/>
        <q-tab class="tabheadernew" name="alarms" label="Active" no-caps/>
        <q-tab class="tabheadernew" name="movies" label="Inactive" no-caps/>
        <q-tab class="tabheadernew" name="selected" label="Draft" no-caps/>
        <!-- <span style="padding-left:500px">Search</span> -->
      </q-tabs> 
    
      <!-- <div class="align-right">Search</div> -->
    
      <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails">
            <div class="text-h6"></div>
            <div class="q-pa-md row items-start q-gutter-md">
  
      <q-card 
      v-for="(category,value) in categoryoptions" :key="value"  :name="value"
      class="new-card"
      flat
      bordered
    >
      <q-card-section>
        <div class="headerfrnewtest">{{ category.label }}<span class="button" style="padding-right:10px"><q-btn style="background: white; color: black" flat icon="more_horiz" >
          <q-menu transition-show="flip-right"
          transition-hide="flip-left">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="nextpage(category.value)">
              <q-item-section>Edit</q-item-section>
            </q-item>
            </q-list>
          </q-menu>
          </q-btn></span></div>
        <div class="cardtitle">1234</div>
      </q-card-section>
      <q-separator class="margin"/>
      
        <q-btn flat>Action 1</q-btn>
      
    </q-card>
    <!-- <q-card
      class="new-card"
      flat
      bordered
    >
      <q-card-section>
        <div class="header">Basic Math</div>
        <div class="cardtitle">13211</div>
      </q-card-section>

      <q-separator class="margin"/>
      
        <q-btn flat>Action 1</q-btn>
    </q-card> -->
    <!-- <q-card
      class="new-card"
      flat
      bordered
    >
      <q-card-section>
        <div class="header">Logical Reasoning</div>
        <div class="cardtitle">10 Questions</div>
      </q-card-section>

      <q-separator class="margin"/>
      
        <q-btn flat>Action 1</q-btn>
    </q-card> -->
    <!-- <q-card
      class="new-card"
      flat
      bordered
    >
      <q-card-section>
        <div class="header">VFX</div>
        <div class="cardtitle">All Questions related to VFX</div>
      </q-card-section>

      <q-separator class="margin"/>
      
        <q-btn flat>Action 1</q-btn>
    </q-card> -->
    <!-- <q-card
      class="new-card"
      flat
      bordered
    >
      <q-card-section>
        <div class="header">Logical Reasoning</div>
        <div class="cardtitle">10 Questions</div>
      </q-card-section>

      <q-separator class="margin"/>
      
        <q-btn flat>Action 1</q-btn>
    </q-card> -->
    <!-- <q-card
      class="new-card"
      flat
      bordered
    >
      <q-card-section>
        <div class="header">VFX</div>
        <div class="cardtitle">All Questions related to VFX</div>
      </q-card-section>

      <q-separator class="margin"/>
      
        <q-btn flat>Action 1</q-btn>
    </q-card> -->
  </div> 
          </q-tab-panel>

          <q-tab-panel name="alarms">
            
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Shortlisted</div>
            
          </q-tab-panel>
          <q-tab-panel name="selected">
            <div class="text-h6">selected</div>
           
          </q-tab-panel>
        </q-tab-panels>
     
    
      
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

          </div></div></q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../store/user'
import { onMounted, ref } from '@vue/runtime-core';
import { api } from '../boot/axios';
import { useRouter } from 'vue-router'
// import filedownload from 'js-file-download'
// import { stringify } from 'postcss';
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
    const categoryoptions = ref([])
    const categories = ref([])
    var editedItem = ref([ {
        candidate_id: ''
      }])
    onMounted(() => {
      //getMarks
     categories.value = getCategories()
     console.log(categoryoptions.value)
    })
    const nextpage = (value) => {
      router.push({ path: `/testing/${value}` })
    }
    const newtest = () => {
      router.push("/createnewtest")
    }
    const getCategories = () => {
      $q.loading.show({
          message: 'Loading...pls wait..',
          boxClass: 'text-white',
          spinnerColor: 'white',
          spinnerSize: 60
        })
      api.get("user/getcategory",
      {
        headers: {
          Authorization: 'Bearer' + token.value
        }
      }).then(async (response) => {
        let responsedata = response.data.data
        //rows1.value = responsedata
          var result=responsedata.filter(obj=> obj.company_id == admin.value.company_id);
 console.log(result);
 //let array = []
         categoryoptions.value = result.map((x) => { 
          //const category = x.category_id
        
      
      //array.push(category)
        return {'label' : x.category, 'value' : x.category_id }
      })
      console.log(categoryoptions.value)
      $q.loading.hide() 
       //visibleColumns.value = array[0]
         //console.log(categoryoptions.value)
      })
    }
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
  //console.log(resdata,admin.value[0].company_id)
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
        if(val.marks > 6)
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
        //console.log(rows.value)
    //  }
         })
         console.log(rows.value)
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
const download = (item)=> {
 console.log(item.candidate_id)
 let filename 
 api.put('user/getcv',{candidate_id : item.candidate_id}).then((res)=> {
  console.log(res.data.data)
  let response = res.data.data
  filename = response[0].cv
  console.log(response[0].cv)
  let url = `user/downloadfile/${filename}`
let label = filename
 const responsefile =  api.post(url).then((res) => {
  
   const linkSource = `data:application/pdf;base64,${res.data}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = filename;
      downloadLink.click();
//  const url = window.URL.createObjectURL(new Blob([res.data]));
//           const link = document.createElement('a');
//           link.href = url;
//           if (typeof window.navigator.msSaveBlob === 'function') {
//               window.navigator.msSaveBlob(
//                   res.data,
//                   filename
//               );
//           } else {
//               link.setAttribute('download', filename);
//               document.body.appendChild(link);
//               link.click();
//           }
 })
      
 })

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
 

  const onRowClick = (item) => {
    console.log(item.type)
    editedItem.value = Object.assign({}, item);
    let windowFeatures = "left=200,top=200,width=920,height=520";
      //let route = router.push('/printcanquestions/'+row.candidate_id,
      if(item.type == 1) {
      let route = router.resolve({ path: '/printcanquestionstwo/'+editedItem.value.candidate_id,
       
  headers: {
    Authorization: 'Bearer ' + token.value
  }
})
      //console.log(windowFeatures,'kkk')
      window.open(route.href, "mozillaWindow", windowFeatures);
      } else {
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
   const chckbox = (item) => {
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
      newtest,
      onRowClick,
      deleteItem,
      getMarks,
      deletecheck,
      reidrect,
      setDefaultItem,
      download,
      close,
      chckbox,
      checkpoint,
      password,
      promptdialog,
      rows,
      categoryoptions,
      categories,
      editedItem,
      tab : ref('mails'),
      customModel: ref('1'),
      getCategories,
      nextpage,
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
  components: {
    
    QBtn
  },
   methods: {

}
}
</script>
<style>
/* .normal {
  font-weight: 400;
  font-size: 14;
} */
.margin{
  margin-left: 20px;
  margin-right: 20px
}
.button {
  position: absolute;
  right: 0;
}
.cardtitle,.tabheadernew,.email {
font-style: normal;
font-size: 14px;
font-weight: 500;
color: #71747D;
}
.headerfrnewtest{
font-size: 22px;
font-weight: 500;
color: #161616;
}

.q-card__section--vert {
    padding: 19px
}
.q-card {
    border-radius: 6px
}
.align-right {
        text-align: right;
        border: 0;
      }
</style>
<style lang="sass" scoped>
.new-card
  width: 100% 
  max-width: 450px
 
</style>
