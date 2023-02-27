<template>

  <q-page><div style="background-color:white;">
    <!-- <q-fixed-position corner="top-right">
    <q-btn round color="primary" @click="alert" icon="alarm" />
  </q-fixed-position> -->
    <div class="row" style="font-size:19px;padding-left: 19px;padding-bottom: 5px;padding-top:10px">Create New Test</div>
   

  <div class="q-pa-sm">

      <q-tabs
        v-model="tab"
        align="justify-left"
        indicator-color="green"
        active-color="green"
        class="q-mb-sm"
        
      >
        <q-tab class="tabheadernew" name="mails" label="Overview" no-caps/>
        <!-- <q-tab class="tabheadernew" name="alarms" label="Add Questions" no-caps/> -->
        <q-tab class="tabheadernew" name="movies" label="Time and Grade" no-caps/>
        <q-tab class="tabheadernew" name="selected" label="Test Instructions" no-caps/>
        <!-- <q-tab class="tabheadernew" name="results" label="Results" no-caps/> -->
      </q-tabs> 
    
      <!-- <div class="align-right">Search</div> -->
    
      <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails" >
            <div class="text-h6">Test Description</div><br>
            <div class="row q-gutter-md" style="align-items:center" >
             <!-- <div >Question Type</div> 
             <div >
              <q-select
                      style="width: 200px"
                      outlined
                      v-model="defaultquestiontype"
                      dense
                      color="green"
                      :options="questiontype"
                      @update:model-value="swap()"
                      emit-value map-options
                      
                    />
             </div> -->
            </div> <br>
            <div>Test Title</div>
            <div class="q-gutter-y-md column" style="max-width: 530px">

              <q-input outlined v-model="categoryname" color="green" placeholder="Enter Test Title" dense />
            </div> <br>
            <div>Test Description</div>
            <div class="q-gutter-y-md column"  style="max-width: 530px">
              <q-input v-model="testdescription" outlined color="green"  />
            </div><br>
            <div>Job Title</div>
            <div class="q-gutter-y-md column"  style="max-width: 530px">
              <q-input v-model="jobtitle" outlined color="green"  />
            </div><br>
            <q-card-section style="max-width: 530px">
              <div class="button" style="padding-top:10px">
                <q-btn class="buttonfrnext" label="next" style="border-radius: 20px;background: #2F9B47;color: white" @click="next()"></q-btn>
    </div>
            </q-card-section>
            
            
          </q-tab-panel>

          <!-- <q-tab-panel name="alarms">
            <div class="row items-start">
              <div style="max-width: 450px">
                <q-card flat>
              <div class="text-h6" style="padding-top:5px">Aptitude</div><br>
              <q-card-section class="bg-grey text-black">
              
              <div class="text-subtitle2">Q1. dewdew fwwefefewewf ewfewfeff wefewfefef ewfewfeefe ?</div>
              
              </q-card-section>
    
            </q-card> <br>
            <q-card  flat>
             
              <q-card-section class="bg-grey text-black">
              
              <div class="text-subtitle2">Q1. dewdew fwwefefewewf ewfewfeff wefewfefef ewfewfeefe ?</div>
              
              </q-card-section>
    
            </q-card> <br>
            <q-card  flat>
            
              <q-card-section class="bg-grey text-black">
              
              <div class="text-subtitle2">Q1. dewdew fwwefefewewf ewfewfeff wefewfefef ewfewfeefe ?</div>
              
              </q-card-section>
    
            </q-card><br>
            <q-card  flat>
             
              <q-card-section class="bg-grey text-black">
              
              <div class="text-subtitle2">Q1. dewdew fwwefefewewf ewfewfeff wefewfefef ewfewfeefe ?</div>
              
              </q-card-section>
    
            </q-card>
              </div>
              <div>
                <q-card class="my-card" style="width:600px" flat>
              <div class="text-h6">Add Questions</div><br>
              <div class="q-pa-sm q-gutter-sm">
              <q-editor v-model="editor" min-height="5rem" />
              </div>
              <div style="padding-left:10px">Time Title</div>
            <div class="q-pa-md row q-gutter-sm">
            <q-select style="width: 200px" outlined v-model="model" dense :options="questiontype" emit-value map-options label="Outlined" />
            <q-select style="width: 200px" outlined v-model="model" dense  label="Outlined" />
            </div><br>
            <div>
              <q-option-group v-model="group" :options="options" >
                      <template v-slot:label="opt">
                        <div class="row items-center">
                          <span style="padding-bottom: 5px; width: 550px"
                            ><q-input outlined v-model="opt.label" dense
                          /></span>
                        </div>
                      </template>
                    </q-option-group> -->
              <!-- <q-option-group
      v-model="group"

    >
      <template v-slot:label="">
        <div class="row items-center">
          <span style="padding-bottom:5px;width:550px"><q-input outlined v-model="text" dense/></span>
          
        </div>
      </template>
    </q-option-group> -->
            <!-- </div>
            <br> <br>
    <div>
                <q-btn label="save" class="buttonadd" style="border-radius: 20px;background: #2F9B47;color: white" @click="next()"></q-btn>
                </div>
            </q-card>
                
              </div>
            
            
            </div>
            
          </q-tab-panel> -->

          <q-tab-panel name="movies">
            <q-card flat>
              <div class="text-h6">Time Settings</div>
              <!-- <div>Time Limit</div> -->
              <div>
                <div class="page-container window- row q-gutter-md">
                  <q-input
                    style="width: 200px"
                    outlined
                    label="Overall time"
                    dense
                    disable
                                      />
                  <q-input
                    style="width: 200px"
                    outlined
                    v-model="settime"
                    dense
                    color="green"
                    type="number"
                  />
                </div>
                <br />
                <q-separator />
                <q-card-section style="max-width: 530px; padding-left: 0px">
                  <div class="text-h6">Pass percentage settings</div>
                  <!-- <div class="row" style="max-width: 530px">
                    Set pass Percentage<span class="buttonfrnext"
                      ><q-toggle
                        size="40px"
                        val="50px"
                        
                        label="set pass percent"
                        color="green"
                    /></span>
                  </div> -->
                </q-card-section>

                <div class="q-gutter-md page-container window- row">
                  <q-input style="width: 200px" outlined label="set pass mark"  dense disable/>
                  <q-input
                    style="width: 200px"
                    outlined
                    v-model="setpassmark"
                    dense
                    color="green"
                    type="number"
                    
                  />
                </div>
              </div>

              <br />
              <q-separator />
              <q-card-section style="max-width: 530px; padding-left: 0px">
                <!-- <div class="row" style="max-width: 530px">
                  <q-icon name="shuffle" size="sm"></q-icon
                  ><span
                    ><p style="padding-left: 5px">Shuffle Questions For Each Candidate</p>
                    <q-toggle class="buttonfrshuffle" size="40px" val="50p"
                  /></span>
                </div> -->
                <div style="max-width: 530px">
                  <q-btn
                    class="buttonfrsave"
                    label="Next"
                    style="border-radius: 20px; background: #2f9b47; color: white"
                    @click="nexttwo()"
                  ></q-btn>
                </div>
              </q-card-section>

              <br />
            </q-card>
            <!-- <div class="text-h6">Time Settings</div>
            <div>Time Title</div>
            <div class="page-container window- row">
              <q-select style="width: 200px" outlined v-model="model" dense  label="Outlined" />
            <q-select style="width: 200px" outlined v-model="model" dense  label="Outlined" />
            </div><br>
            <q-separator/>
            <q-card-section style="max-width: 530px;padding-left: 0px">
              <div class="text-h6">Pass percentage settings</div>
            <div class="row" style="max-width: 530px">Set pass Percentage<span class="buttonfrnext"><q-toggle size="40px"  val="50px"/></span></div>

            </q-card-section>
            
            <div class="page-container window- row">
              <q-select style="width: 200px" outlined v-model="model" dense  label="Outlined" />
            <q-select style="width: 200px" outlined v-model="model" dense  label="Outlined" />
            </div> <br>
            <q-separator/>
            <q-card-section style="max-width: 530px;padding-left: 0px">
              <div class="text-h6">Pass percentage settings</div>
            <div class="row" style="max-width: 530px"><q-icon name="shuffle"></q-icon> pass Percentage<span class="buttonfrnext"><q-toggle size="40px"  val="50px"/></span></div>

            </q-card-section>
            
             <br> -->
          </q-tab-panel>
          <q-tab-panel name="selected">
            <q-card flat>
              <q-card-section style="max-width: 530px; padding-left: 0px">

                <div>Test Instruction</div>
            <div class="q-gutter-y-md column" style="max-width: 530px; max-height: 250px">
              <q-input
                v-model="testinstruction"
                outlined
                color="green"
                type="textarea"
                hint="This Instruction will be visible to candidate before starting test"
              /><div style="max-width: 530px">
                  <q-btn
                    :loading="loading"
                    class="buttonfrsave"
                    label="Save"
                    style="border-radius: 20px; background: #2f9b47; color: white"
                    @click="save()"
                  ></q-btn>
                </div>
            </div>
              </q-card-section>
              
            </q-card>
            
            
            <br />
            <!-- <div>Test Description</div>
            <div class="q-gutter-y-md column"  style="max-width: 530px">
              <q-input v-model="text" outlined color="green" />
            </div><br>
            <div>Candidate Form</div>
            <div class="q-pa-md row items-start q-gutter-md">
              
    <q-card class="my-card" flat>
      <q-card-section>
        <div class="page-container window- row">
          <q-input outlined v-model="text" dense="dense" />&nbsp;&nbsp;
          <q-input outlined v-model="text" dense="dense" />&nbsp;&nbsp;
            </div><br>
            <div class="page-container window- row">
              <q-input outlined v-model="text" dense="dense" />&nbsp;&nbsp;
              <q-input outlined v-model="text" dense="dense" />&nbsp;&nbsp;
            </div><br>
            <div class="page-container window- row">
              <q-input outlined v-model="text" dense="dense" />&nbsp;&nbsp;
              <q-input outlined v-model="text" dense="dense" />&nbsp;&nbsp;
            </div><br>
            <div class="page-container window- row">
              <q-input outlined v-model="text" dense="dense" />&nbsp;&nbsp;
              <q-input outlined v-model="text" dense="dense" />&nbsp;&nbsp;
            </div><br>
            <div class="page-container window- row">
              <q-input outlined v-model="text" dense="dense" />&nbsp;&nbsp;
              <q-input outlined v-model="text" dense="dense" />&nbsp;&nbsp;
            </div><br>
            <div class="button">
                <q-btn class="buttonfrsave" label="save" style="border-radius: 20px;background: #2F9B47;color: white" @click="next()"></q-btn>
    </div>
      </q-card-section>
    </q-card>

    <q-card
      class="my-card text-black"
      style="background: #F7F7F8;width:400px"
      
    >
      <q-card-section>
        <div class="row"><p>CV</p><span><p style="padding-left:80px">File upload settings</p></span></div>
        <q-separator/>
        <div class="row">Set pass Percentage<span class="toggle"><q-toggle size="40px"  val="50px"/></span></div>
        <br>
        <div>Accepted Formats</div>
        <div class="q-gutter-sm">
      <q-checkbox dense v-model="teal" label="pdf" color="black" /><span style="padding-left:200px"><q-checkbox dense v-model="orange" label="DOC" color="black" /></span>
      
    </div><br>
    <div class="q-gutter-sm">Max. File Size</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
       
      </q-card-section>
    </q-card> </div> -->
          </q-tab-panel>
          <!-- <q-tab-panel name="results">

          </q-tab-panel> -->
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

<script setup>
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../store/user'
import { onMounted, ref } from '@vue/runtime-core';
import { api } from '../boot/axios';
import { useRouter } from 'vue-router'
// import filedownload from 'js-file-download'
// import { stringify } from 'postcss';

    const $q = useQuasar()
    const store = useUserStore()
    const { token,admin,controlnewregister} = storeToRefs( store )
    const router = useRouter()
    const rows = ref([])
    const password = ref()
    var checkpoint = ref(-1)
    var promptdialog = ref(false)
    var tab = ref('mails')
    const questiontype = ref([{label : 'MCQ', value : '1'},
                            {label : 'Free Answer' , value: '2'}
                             ])
    const defaultquestiontype = ref('1')
    const settime = ref('1200')
    const setpassmark = ref('5')
    const testinstruction = ref('attend all the questions before time limit')
    const categoryname = ref()
    const testdescription = ref()
    const jobtitle = ref()
    const loading = ref(false)
    var editedItem = ref([ {
        candidate_id: ''
      }])
    onMounted(() => {
     // getMarks();
    })
    const next = () => {
     tab.value = 'movies'
    }
    const nexttwo = () => {
     tab.value = 'selected'
    }
    const save = () => {
      let allquestiontype
      console.log(defaultquestiontype.value,categoryname.value)

      if(categoryname.value === undefined || testinstruction.value === undefined || settime.value === undefined || setpassmark.value === undefined)
      {
        alert('Inputs can not be empty')
      } else {
        
        api .post(`api/category`,{ category : { companyId: JSON.stringify(admin.value.id),
      name: categoryname.value,
      instruction: testinstruction.value,
      questionType: 'MCQ',
      timeLimit : settime.value,
      passMark : setpassmark.value,}
    },
    {
  headers: {
    Authorization: token.value
  }
}
    ).then( (res) => {
      console.log(res)
      $q.notify({
          type: 'positive',
          message: 'Saved',
          position:'top-right',
          color: 'green'
        })
        controlnewregister.value = false
    }). catch((res) => {
      console.log(res)
     
    })
    loading.value = true

      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        loading.value = false
      }, 3000)
      }
      // if(defaultquestiontype.value == 1) {
      //   allquestiontype = 'MCQ'
        
      // } else {
      //   allquestiontype = 'FREE'
      // }
      //questionType: allquestiontype,
      
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
const swap = () => {
      console.log(defaultquestiontype.value)
    }
  const columns = [
    {
      name: 'name',
      required: true,
      label: 'Name',
      field : 'name',
      align: 'left',
      style: 'width: 200px;font-size: 14px;font-weight:500;font-style: normal',
      headerStyle:'color: #71747D',
      
      sortable: true
    },
    // {
    //       name: "action",
    //       label: "Selected",
    //       field: "action", align: 'center',headerStyle:'width:100px;color: #71747D'
    //     },
    { name: 'marks', align: 'center', label: 'Marks', field: 'marks', sortable: true,headerStyle:'width:100px;color: #71747D' },
    { name: 'timetaken', label: 'Duration', field: 'timetaken',align: 'center', sortable: true,headerStyle:'width:100px;color: #71747D' },
    { name: 'date', label: 'Date', field: 'date',align: 'center', sortable: true,headerStyle:'width:100px;color: #71747D' },
    // { name: 'email', label: 'Email',align: 'center', field: 'email' },
    { name: 'mobile', label: 'Mobile',align: 'center', field: 'mobile',headerStyle:'width:100px;color: #71747D' },
    { name: 'lastctc', label: 'Last Salary',align: 'center', field: 'lastctc',headerStyle:'width:100px;color: #71747D' },
    { name: 'position', label: 'Position',align: 'center', field: 'position',headerStyle:'width:100px;color: #71747D' },
    { name: 'pincode', label: 'Pincode',align: 'center', field: 'pincode',headerStyle:'width:100px;color: #71747D' },
    {
          name: "actions",
          label: "Actions",
          field: "actions", align: 'center',headerStyle:'width:100px;color: #71747D'
        }
  ]

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
  
    // return {
    //   next,
    //   columns,
    //   onRowClick,
    //   deleteItem,
    //   getMarks,
    //   deletecheck,
    //   reidrect,
    //   setDefaultItem,
    //   download,
    //   close,
    //   chckbox,
    //   checkpoint,
    //   password,
    //   promptdialog,
    //   rows,
    //   editedItem,
    //   tab,
    //   customModel: ref('1'),
    //   group: ref(['op1']),

    //   options: [
    //     {
    //       value: 'op1',
    //       label: 'Good food',
    //       icon: 'restaurant_menu',
    //       color: 'green'
    //     },
    //     {
    //       value: 'op2',
    //       label: 'Good service',
    //       icon: 'room_service',
    //       color: 'green'
    //     },
    //     {
    //       value: 'op3',
    //       label: 'Pleasant surroundings',
    //       icon: 'photo',
    //       color: 'green'
    //     }
    //   ],
    //    deletecan() {
    //      //console.log('working')

    //      api
    //     .delete(`analytic/deletecan`, {
    //       headers: {
    //          Authorization: 'Bearer ' + token.value
    //       }
    //   }).then(res => { 
    //      router.push('/welcome')
    //   })
      
    //  }
    // }

</script>
<style>
/* .normal {
  font-weight: 400;
  font-size: 14;
} */
.toggle,.buttonfrsave{
  position: absolute;
  right: 0px;
}
.margin{
  margin-left: 20px;
  margin-right: 20px
}
.buttonfrnext,.buttonadd {
  position: absolute;
  bottom: 5px;
  right: 0px;
}
.cardtitle,.tabheadernew,.email {
font-style: normal;
font-size: 14px;
font-weight: 500;
color: #71747D;
}
.header  {
font-style: normal;
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
<style scoped>
 .button {
  position: absolute;
  right: 0px;
  
  }
</style>
