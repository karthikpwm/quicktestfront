<template>
  <div class="q-pa-md">
    <div style="max-width: auto">
      <q-tabs
        v-model="tab"
        align="justify"
        narrow-indicator
        class="q-mb-lg"
      >
      <q-tab class="text-orange" name="alarms" label="Accounts Info" />
      <!-- <q-tab v-if="arights" class="text-red" name="comp" label="New Company" /> -->
        <!-- <q-tab v-if="arights" class="text-purple" name="mails" label="Sign Up" /> -->
      </q-tabs>

      <div class="q-gutter-y-sm" >
        <q-tab-panels
          v-model="tab"
          v-if="arights"
         
          transition-prev="scale"
          transition-next="scale"
          class="bg-white text-white text-center"
        >
          <q-tab-panel name="comp">
            <div class="row">
              <q-card square class="shadow-24" style="width:320px;height:350px;">
          <q-card-section class="bg-red-4" style="height;:85px">
            <h4 class="text-h5 text-white q-my-md">Registration</h4>
          
          </q-card-section>
          <q-card-section>
          <!-- <q-fab
          color="primary" @click="switchTypeForm"
          icon="add"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);"
        >
          <q-tooltip>
          
        </q-tooltip>
        </q-fab> -->
            <q-form class="q-px-sm q-pt-xl" @submit.prevent="submitnewcomp">
             <q-input 
                       ref="company"
                       square 
                       clearable 
                       v-model="createcompany" 
                       
                       lazy-rules
                       
                       label="Company Name">
                
              </q-input>
            <q-card-actions class="sign1">
            <q-btn  
                   size="md" 
                   color="primary"
                   @click="submitnewcomp"
                   class="text-white"                         
                    label="Register" />
          </q-card-actions>
            </q-form>
            </q-card-section>
            </q-card>
            </div>
            </q-tab-panel>
            </q-tab-panels>
        <q-tab-panels
          v-model="tab"
          v-if="arights"
          
          transition-prev="scale"
          transition-next="scale"
          class="bg-white text-white text-center"
        >
          <q-tab-panel name="mails">
            <!-- <div class="text-h6">Create New User</div> -->
            <div class="row ">
        <q-card square class="shadow-24" style="width:350px;height:450px;">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">New User</h4>
           
          </q-card-section>
          <q-card-section>
          <!-- <q-fab
          color="primary" @click="switchTypeForm"
          icon="add"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);"
        >
          <q-tooltip>
          
        </q-tooltip>
        </q-fab> -->
            <q-form class="q-px-sm q-pt-xl" @submit.prevent="submitForm">
              <q-input 
                       ref="email"
                       square 
                       clearable 
                       v-model="signup.email" 
                       type="email"
                       lazy-rules
                       
                       label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input 
                        ref="username"
                      
                        square 
                        clearable 
                        v-model="signup.username"
                        lazy-rules
                        
                       type="username"                                                            
                       label="username">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input  
                       ref="password"
                       square 
                      
                       v-model="signup.password"                                                        
                       
                       lazy-rules
                       
                       label="password">
                
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                 
                <!-- <template v-slot:append>
              <q-icon
                                       
                   class="cursor-pointer" />
                </template> -->
              </q-input>
              <!-- <q-input 
                  ref="company"
                  
                  square 
                  clearable 
                  v-model="signup.company"                                                      
                  
                  lazy-rules
                  
                  label="Company">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
           <template v-slot:append>
          <q-icon 
                                             
                  class="cursor-pointer" />
          </template>
              </q-input> -->
              <q-select  v-model="signup.company" :options="allcompdet" label="Company" emit-value map-options/>
            </q-form>
          </q-card-section>

          <q-card-actions class="sign">
            <q-btn  
                   size="md" 
                   color="primary"
                   @click="submitForm"
                   class="text-white"                         
                    label="Sign Up" />
          </q-card-actions>
          <q-card-section 
              
              class="text-center q-pa-sm">
            <p class="text-grey-6"></p>
          </q-card-section>
        </q-card>
      </div>
          </q-tab-panel>
        </q-tab-panels>

        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="fade"
          transition-next="fade"
          class="bg-white text-white text-center"
        >
        

          <q-tab-panel name="alarms">
            <!-- <div class="text-h6">Alarms</div> -->
            <div class="q-pa-sm">
              <div class="q-pa-md q-gutter-md">
        <q-dialog v-model="show_dialog">
        <q-card class="qcard">
          <q-card-section style="width: 623px">
            <div class="text-h6">Edit Details</div>
          </q-card-section>

          <q-card-section style="width: 621px">
            <div class="row">
              <q-input v-model="editedItem.email" autogrow label="Email" style="width: 200px"></q-input>
              </div>
            <div class="row">
            <q-input v-model="editedItem.name" autogrow label="Username" style="width: 200px"></q-input> 
            </div>
           <div class="row"><q-input v-model="editedItem.newpassword" :type="isPwd ? 'password' : 'text'" label="Password" style="width: 200px">
            <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
           </q-input></div>
           <div class="row">
            <q-input v-if="editedItem.usertype === 'admin'" v-model="editedItem.apassword" autogrow label="Access Password" style="width: 200px"></q-input> 
            </div>
            <div class="row"><q-input v-model="editedItem.credit" style="width: 200px" label="Credit"></q-input></div>
           <!-- <div class="row"  ><q-select style="width: 400px" v-model="editedItem.answeralpha" :options="answeroptions" label="Answer" emit-value map-options/></div> -->
           <!-- <div class="row"><q-input v-model="editedItem.company_id" label="company"></q-input></div> -->
           <!-- <div class="row"><q-input disable style="width: 200px" v-model="editedItem.company_id"  label="Company" /></div> -->
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Save" color="primary" v-close-popup @click="addRow()" ></q-btn>
          </q-card-actions>
          </q-card>
    </q-dialog>
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
    <q-table
      class="my-sticky-header-column-table"
      title="User Details"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      :filter-method="myfilterMethod()"
    >
    <template v-slot:top>
          <!-- <q-btn dense color="secondary" label="Add Question" @click="show_dialog = !show_dialog" no-caps></q-btn><br/> -->
          <q-btn dense color="primary" label="Go To Questions" @click="reidrect()" no-caps></q-btn>
          
          </template>
    <template v-slot:body="props">
        <q-tr :props="props">
         <q-td key="name" :props="props">
            {{ props.row.name }}
            <!-- <q-popup-edit v-model="props.row.name" v-slot="scope">
              <q-input type="textarea" v-model="scope.value" dense autofocus  />
            </q-popup-edit> -->
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
            
          </q-td>
          <q-td key="password" :props="props">
            {{ props.row.password }}
            
          </q-td>
          <q-td key="credit" :props="props">
            {{ props.row.credit }}
            
          </q-td>
          <q-td key="actions" :props="props" style="width:131px">
              <q-btn text-color="blue"  icon="edit"  @click="editItem(props.row)" flat round dense></q-btn>
              <q-btn v-if="deltrights" text-color="red" icon="delete_forever" :disable="!deltrights || props.row.usertype === 'admin'"  @click="deleteItem(props.row)" flat round dense></q-btn>
            </q-td>
          <!-- <q-td key="protein" :props="props">{{ props.row.protein }}</q-td>
          <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>
          <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>
          <q-td key="iron" :props="props">{{ props.row.iron }}</q-td> -->
        </q-tr>
      </template>
      </q-table>
  </div>
          </q-tab-panel>

        </q-tab-panels>
      </div>
    </div>
  </div>
</template>
<style scoped>
.qcard {
  max-width:625px
}
.rowd{
  justify-content:center
}
.row{
  justify-content:center
}
.q-pt-xl {
    padding-top: 20px;
}

.q-px-sm {
  width: 335px;
    padding-left: 33px;
    padding-right: 74px;
}
.sign{
    padding-left: 55px;
    padding-right: 68px;
}
.sign1{
   padding-top: 30px;
    padding-left: 55px;
    padding-right: 68px;
}

</style>
<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */
  // height: 310px

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  // max-width: 600px

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #c1f4cd !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style>
<script>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../store/user'
import { useCompanyStore } from '../store/company'
import { useRouter } from 'vue-router'
import { onMounted,ref,computed } from 'vue'
import { useQuasar } from 'quasar'
import { api } from '../boot/axios';

export default {
  setup () {
    const router = useRouter()
    const password = ref()
     const arights = computed(() => {
      
      if(admin.value.usertype === 'admin')
      {
        return true
      } else {
        return false
      }
    })
    const deltrights = computed( () => {
      if(admin.value.usertype === 'user')
      {
        return false
      }
      else {
        return true
      }
    })
    const store = useUserStore()
    const store2 = useCompanyStore()
    const { token,admin} = storeToRefs( store )
    const {company} = storeToRefs(store2)
    const $q = useQuasar()
    const rows = ref([])
    const allcompdet = ref([])
    const show_dialog = ref(false)
    const createcompany = ref()
    var promptdialog = ref(false)
    const signup = ref({
      email: '',
    username: '',
    password: '',
    company: '',
    usertype: ''
  })
  const defaultValue = ref( {
    email : null,
    username : '',
    password: null,
    company: '',
    usertype: '',
    newpassword: ''
  })
  // const compdefault = ref (
  //   createcompany = null
  // )
  var editedItem = ref([ {
        email: '',
        name: '',
        password: '',
        company_id: '',
        newpassword:'',
        apassword: '',
        usertype: '',
        credit: ''
      }])
  const setDefaultValue = () => {
      signup.value = ref(Object.assign({}, defaultValue)) 
      //console.log(signup.value)

     }
     const setcompdefault = () => {
       createcompany.value = ''
     }
     const addRow = () => {
      if(editedItem.value.newpassword != '' && editedItem.value.newpassword != undefined)
      {
      //console.log(editedItem.value.newpassword)
      api.put(`user/editpassword/${editedItem.value.user_id}`,{name :editedItem.value.name ,password:editedItem.value.newpassword ,email :editedItem.value.email ,company_id:editedItem.value.company_id,apassword: editedItem.value.apassword},
      {
        headers: {
     Authorization: 'Bearer ' + token.value
   }
      }).then(res => {
        getUserDetails();
        console.log(res)
      }) 
      } else {
        alert('Password Can not be Empty')
      }
     }
     const editItem = (item) => {
//console.log('haa',item)

      //editedIndex.value = rows.value.indexOf(item)
       //console.log(editedIndex)
       editedItem.value = Object.assign({}, item);
       
      show_dialog.value = true
      //console.log(editedItem )
}
const deleteItem = (item) => {
  editedItem.value = Object.assign({}, item);
 // const index = data.indexOf(item);
      confirm("Are you sure you want to delete this user?") &&
       api.delete(`user/deleteuser/${editedItem.value.user_id }`,
       {
   headers: {
     Authorization: 'Bearer ' + token.value
   }
 }).then((res) => {
getUserDetails();
 console.log(res)
 })
 .catch((res) => {
           
            // console.log(res)
            
           })

}
  //console.log(admin)
  const submitForm =  () => { 
    
   if (!signup.value.username ||!signup.value.password || !signup.value.email || !signup.value.company){
      $q.notify({
         type: 'negative',
          message: 'Fill Required Fields' }
      )
       
     } else {
      //console.log(signup.value.username)
           api
          .post(`user/register`,{name : signup.value.username, email: signup.value.email, password:signup.value.password , company_id :signup.value.company, usertype:'user'},
          {
             headers: {
     Authorization: 'Bearer ' + token.value
   }
          }).then(async (res) => {
            getUserDetails();
           setDefaultValue();
           
            console.log(res)

          }).catch( (res) => {
            console.log(res)
          })
     }
  }
  const submitnewcomp = () => {
    if(createcompany.value != '' && createcompany.value != undefined)
    {
      api.post('user/createcompany',{name : createcompany.value },
      {
             headers: {
     Authorization: 'Bearer ' + token.value
   }
          }
      ).then((res)=> {
        getcompdetails();
        console.log(res)
        setcompdefault();
      }).catch((res) => {
        console.log(res)
      })
    }
    else {
      alert('Empty Field')
    }
    // console.log(createcompany.value)
  }
  const getUserDetails = () => {
        //console.log(token)
        $q.loading.show({
          message: 'Loading...pls wait..',
          boxClass: 'text-white',
          spinnerColor: 'white',
          spinnerSize: 60
        })
api
          .get(`user/getuserdetails`,
          {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
})
          .then(async (res) => {
            $q.loading.hide()
 let resdata = res.data.data
           //console.log(admin) 
           if(admin.value.usertype == 'admin')
           {
             rows.value = resdata
           }
 else {
 var result=resdata.filter(obj=> obj.user_id == admin.value.user_id);
   //console.log(result);

  rows.value = result
 }
          }).catch( res => {
            $q.loading.hide()
            console.log(res)
          })
  }
  const getcompdetails = () => {
    api.get("user/getcompdetails",
    {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
})
      .then(res => {
        allcompdet.value = res.data.data.map((x) => { 
        
        return {'label' : x.name, 'value' : x.company_id }
      })
        //allcompdet.value = res.data.data
       //company.value = allcompdet.value
//         var inner = res.data.data.map(function(e) {
//   return e;
// });

//     //console.log(inner);
//     company.value = inner
//         console.log(company.value)
      }).catch((res) => {
        //console.log(res)
      })
  }
  onMounted(() => {
      getUserDetails();
      getcompdetails();
  
  })
  const myfilterMethod = () => {
    //console.log(rows.value)

  }
  const deletecheck = () => { 
api.put('user/checkpassword',{password : password.value},
{headers: {
     Authorization: 'Bearer ' + token.value
   }
   }).then((res) => {
        console.log(res)
          router.push('/editqstn')

   }).catch(err => {
    console.log(err)
   alert('paswword did not match')} )


}
  const reidrect= () => {
    //console.log(checkpoint.value)
     promptdialog.value = true
   }
  const columns = [
  {
    name: 'name',
    required: true,
    label: 'Username',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'email', align: 'center', label: 'E-Mail', field: 'email', sortable: true },
  // { name: 'password', label: 'PASSWORD', field: 'password', sortable: true },
  { name: 'credit', label: 'Credits', field: 'credit' },
 {
          name: "actions",
          label: "Actions",
          field: "actions", align: 'center',headerStyle:'width:100px'
        }
]

    return {
      signup,
      submitForm,
      submitnewcomp,
      createcompany,
      isPwd: ref(true),
      tab: ref('alarms'),
      columns,
      rows,
      arights,
      deltrights,
      defaultValue,
      setDefaultValue,
      password,
      // compdefault,
      setcompdefault,
      getUserDetails,
      reidrect,
      show_dialog,
      promptdialog,
      editItem,
      addRow,
      editedItem,
      myfilterMethod,
      deleteItem,
      getcompdetails,
      deletecheck,
      allcompdet,
      companyoptions: [
        {
          label: 'PWM',
          value: '1'
        },
        {
          label: 'SHAKTHI',
          value: '2'
        }
      ]
    }
  }
}
</script>
