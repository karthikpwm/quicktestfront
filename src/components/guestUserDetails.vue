<template>
  <div style="background-color: white">
    <div><br>
      <p class="text-h6 row justify-center">Quick Test</p>
    </div><q-separator/> <br>
<div class=" row justify-center" >
  <!-- <div id="blueDIV" class="q-pa-md row justify-center" style="background-color: white;max-width: 355px;max-height:465px; border-radius:25px;" rounded> -->
  <!-- <div id="myDIV" class="col-12 text-center self-center" style="border-radius: 10px;">
    <h5 class="text-h6 q-my-none" style="color: black;">Basic Information</h5>
    
  </div> -->
  <q-card class="my-card" flat>
    <q-card-section> 
        <div class="general">Basic Information</div>
        
      </q-card-section><q-separator/> <br>
      <div class="row justify-center">
        <q-card class="form" flat>
       <q-form
      @submit="onSubmit"
      @reset="onReset"
      
    >  <p class="name">Name <span style="color:red;">*</span></p>
      <q-input
        outlined
        v-model="user.name"
        
        placeholder="Your name"
      />
<!-- {
  name : this.name,
  uemail : this.emlil
}

{...user} -->
<p>Position <span style="color:red;">*</span></p>
      <q-input
        
        type= "text"
        v-model="user.position"
        
        placeholder="Position"
        outlined
      />
      <p>E-mail <span style="color:red;">*</span></p>
      <q-input
      outlined
        type="text"
        v-model="user.email"
        
        placeholder="Your email id"
        
      />
       <p>Mobile No <span style="color:red;">*</span></p>
      <q-input
      outlined
        type="text"
        v-model="user.mobile"
        
        placeholder="Your mobile no"
        mask="##########"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Invalid',
          val => val.length >= 10 && val.length <= 10 || 'Enter Only 10 digits'
        ]"
      />
       <p>Last Monthly Salary <span style="color:red;">*</span></p>
      <q-input
      outlined
        type="text"
        v-model="user.ctc"
        
        placeholder="Enter last Monthly Salary in Rupees"
        lazy-rules
        mask="########"
        
        :rules="[
          val => val !== null && val !== '' || 'Invalid',
          val => val.length >= 1 && val.length <= 8 || 'Enter Valid Salary'
        ]"
      />
       <p>Pincode <span style="color:red;">*</span></p>
      <q-input
      outlined
        type="text"
        v-model="user.pincode"
        mask="######"
        
        placeholder="Residence pincode"
        lazy-rules
        
      />  <p>CV <span style="color:red;">*</span></p>
        <q-file  v-model="model" label="CV Pdf format" accept=".pdf" max-file-size="2120000" use-chips>
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
         </q-file>
       <!-- <input type="file" ref="file"  @change="onFileChange($event)" > -->
       <!-- <q-btn label="upload" size="xs" color="primary" @click="onUploadFile()"></q-btn> -->
      <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->
      <br/>
      <div>
        <q-btn  class="button" style="border-radius: 20px; background: #2f9b47; color: white" label="Submit" @click="onSubmit()" rounded/>
        <!-- <q-btn label="Confirm" color="primary" @click="check()" /> -->
        <!-- <q-btn label="Start test" @click="goToHome()" color="primary"/> -->
        <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
      </div>
    </q-form>
      </q-card>
      </div>
      
      
  </q-card>
    

  <!-- </div> -->
</div>
  </div>

</template>

<script>
import { storeToRefs } from 'pinia'
import { useQuasar,QSpinnerFacebook } from 'quasar'
 import { ref } from 'vue'
import { useUserStore } from '../store/user'
import { useCandidateStore } from '../store/candidate'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../boot/axios';
import { onBeforeUnmount } from 'vue'
import { functions, isNull } from 'lodash'

export default {
  data() {
    return {
      selectedFile: "",
    };
  },
  methods: {
    onFileChange(e) {
      const selectedFile = e.target.files ? e.target.files[0] : null // accessing file
      this.selectedFile = selectedFile;
      const reader = new FileReader();
      //console.log('ssss',this.selectedFile)
    },
    
  },
  setup () {
    const $q = useQuasar()
    let timer
    // 2 min -> 1 min -> unmo b -> c -> c -> b mo -> ch
    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer)
        $q.loading.hide()
      }
      
    })
    const route = useRoute()
  const router = useRouter()
  // const form = ref(null);
  const model = ref(null)
    const store = useUserStore()
    const store_candiate = useCandidateStore()
    const {user, token, admin,loggedinname,company_id,category_id,type} = storeToRefs( store )
    const { candidate_id,company1_id,category1_id,timelimit,candidatemail } = storeToRefs( store_candiate )
    //console.log("userinfopage",loggedinname.value)
    const onSubmit = () => {
         if (!user.value.name || !user.value.position || !user.value.email || !user.value.mobile || !user.value.ctc || !user.value.pincode || !model.value) {
          //alert('Invalid')
           //console.log('nooo')
           if(!user.value.name)
           {
            alert('Enter your name')
           }
           else if(!user.value.position)
           {
            alert('Enter your Position')
           }
           else if(!user.value.email)
           {
            alert('Enter your email')
           }
           else if(!user.value.mobile)
           {
            alert('Enter your mobile No')
           }
           else if(!user.value.ctc)
           {
            alert('Enter your ctc')
           }
          else if(!user.value.pincode)
           {
            alert('Enter your pincode')
           }
           else if(!model.value)
           {
            alert('CV must be leeser than 2MB')

           }
          
           //alert( || !user.value.position || !user.value.email || !user.value.mobile || !user.value.ctc || !user.value.pincode)
        //    $q.notify({
        //   type: 'negative',
        //   message: 'Must Enter All Fields.'
        // })
          // $q.notify({
          //   color: 'red-5',
          //   textColor: 'white',
          //   icon: 'warning',
          //   message: 'You need to accept the license and terms first'
          // })
       }
      else {
         //check()
         onUploadFile()
        // console.log(model.value.size)
        $q.loading.show({
          message: 'Loading...pls wait..',
          boxClass: 'text-white',
          spinnerColor: 'white',
          spinnerSize: 60
        })
        let cv = user.value.name+''+user.value.mobile+'.pdf'
        api.post(`guest/newregister`, {name : user.value.name,position : user.value.position,email : user.value.email,mobile : user.value.mobile,ctc : user.value.ctc,pincode : user.value.pincode, company_id : company_id.value,category_id: category_id.value, timelimit:timelimit.value, cv: cv},
        {
  // headers: {
  //   Authorization: 'Bearer ' + token.value
  // }
}).then(res => {
              candidate_id.value = res.data.insert_id
              company1_id.value = company_id.value
              category1_id.value = category_id.value
             token.value = res.data.token

             //console.log(candidate_id.value)
            $q.loading.hide()
         router.push('/guestinfo') })
        
      }
    }
   function onUploadFile () {
      console.log(model.value)
       const formData = new FormData()
       console.log(user.value.name+''+user.value.mobile+'.pdf')
       var candname = user.value.name+''+user.value.mobile+'.pdf'
       formData.append('files', model.value,candname)
       
        api
        .post("/upload", formData)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
//    function onUploadFile() {
//       console.log(model.value)
//       const formData = new FormData();
//       formData.append('file', model.value);  // appending file
// console.log(formData)
     // sending file to the backend
      // api
      //   .post("/upload", formData )
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    //}
    function onChange(event)  {
      model.value = event.target.files ? event.target.files[0] : null
    }
    const check = () => {
      $q.dialog({
        title: 'Confirm',
        message: 'An OTP will be sent to your email,Are you confirm ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        onUploadFile()
        // console.log(model.value.size)
        $q.loading.show({
          message: 'Loading...pls wait..',
          boxClass: 'text-white',
          spinnerColor: 'white',
          spinnerSize: 60
        })
        let cv = user.value.name+''+user.value.mobile+'.pdf'
        let otp = Math.floor((Math.random() * 10000) )
        api.post(`guest/checkusermail`,{email : user.value.email}).then(res => {
          console.log(res.data.data)
          let existmail = res.data.data
          if(!existmail){
            api.post(`guest/newregister`, {name : user.value.name,position : user.value.position,email : user.value.email,mobile : user.value.mobile,ctc : user.value.ctc,pincode : user.value.pincode, company_id : company_id.value,category_id: category_id.value, timelimit:timelimit.value, cv: cv,otp : otp},
        {
  // headers: {
  //   Authorization: 'Bearer ' + token.value
  // }
}).then(res => {
              candidate_id.value = res.data.insert_id
              company1_id.value = company_id.value
              category1_id.value = category_id.value
             token.value = res.data.token
             candidatemail.value = user.value.email
            //  api.post(`analytic/mail`,{otp : otp,email : user.value.email}).catch(res => {
            //   console.log(res)
            //  })
             //console.log(candidate_id.value)
            $q.loading.hide()
         router.push('/otpverify')  

})
.catch(res => {
  
  //alert(res.response.data.message || 'server not found')
   $q.notify({
          type: 'negative',
          message: 'server not found' || res.response.data.message
        })
        timer = setTimeout(() => {
          $q.loading.hide()
          timer = void 0
        }, 2000)
       // $q.loading.hide()
})

          } else {
            $q.loading.hide()
            alert('E-mail already registered')
          }
        })
         console.log('>>>> OK')
      }).onCancel(() => {
         console.log('>>>> Cancel')
      }).onDismiss(() => {
         //console.log('I am triggered on both OK and Cancel')
      })
    }
    // const onChange = (event) => {
    //  this.file = event.target.files ? event.target.files[0] : null
    //  //console.log(this.file )
    // }
    // const onUploadFile = () => {
    //   console.log('aa')
    //    const formData = new formData();
    //    formData.append('file', this.file)

    //    api.post('guest/uploadcv', formData).then(res => {
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
    return {
      user,
      model,
      onSubmit,
      onUploadFile,
      onChange,
      check,
      onReset () {
        // form reset
        
        
      }
    }
  },
}
</script>



<style>
.button {
  position: absolute;
  right: 0;
}
p{
  margin: 10px 0 0;
}
.general{
font-weight: 500;
font-size: 18px;
line-height: 100%;
letter-spacing: -0.005em;
color: #161616
}
/* .q-field
    .q-field__control, .q-field__marginal {
      font-size: 14px !important;
      height: 37px !important
} */
.bg-image {
  position: relative;
    background-image: url();
    background-repeat: no-repeat;
    background-size: cover;
  }

  #blueDIV {
  margin:auto;
  
  background-color:lightblue;
  box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
}
#myDIV {

  background-color:#FFFFFF;
  /* text-shadow: 1px 0px 30px black; */
}
</style>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 700px


.form 
  width: 100%
  max-width: 350px
  height: 600px
</style>