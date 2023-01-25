<script>
import { useQuasar } from 'quasar'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../store/user'
import { useCompanyStore } from '../store/company'
import { api } from '../boot/axios';
import { useRoute, useRouter } from 'vue-router'
import register from '../components/register.vue'
import welcome from '../components/welcome.vue'


export default {
  
  setup () { 
    const $q = useQuasar()
        const store = useUserStore()
        const store2 = useCompanyStore()
    const {token, admin,loggedinname,company_id,user,remainingcredit,controllingbanner} = storeToRefs( store )
    const {company} = storeToRefs(store2)
  const router = useRouter()
  const login = ref({
    username: '',
    password: ''
  })
  // onMounted(async () => {
  //   user.value = null
  //  })
  const frontpage = ref(false)
 const Reset = () => {
  login.value.username = null,
  login.value.password = null,
   $q.notify({
         type: 'positive',
          message: 'Form Reset' }
      )
 }
  const submitForm =  () => {
     if (!login.value.username ||!login.value.password){
      $q.notify({
         type: 'negative',
          message: 'Username or Password is Incorrect' }
      )
       //console.log('error')
     } else {
         $q.loading.show({
          message: 'Logging In...',
          boxClass: 'text-white',
          spinnerColor: 'white',
          spinnerSize: 60
        })
        api
          .post(`user/login`, {email : login.value.username,password : login.value.password})
          .then(async (res) => {
            
             token.value = res.data.token
             company.value = res.data.companydetail
             admin.value = res.data.user
             loggedinname.value = res.data.user.name
             company_id.value = res.data.user.company_id
             remainingcredit.value = res.data.companydetail.credit
             controllingbanner.value = 1
             //console.log(loggedinname.value)
             console.log(token.value,res.data.user,company_id.value,admin.value.usertype,res.data.companydetail)
             
          $q.loading.hide()
          if(admin.value.usertype === 'admin')
          {
            router.push('/signup')
          } else {
            router.push('/cresult');
          
          }
             
          })
          .catch((res) => {
             $q.loading.hide()

            //  alert("Email or Password did not match")
            $q.dialog({
        title: 'Alert',
        message: "Email or Password did not match"
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    
          // alert(res.response.data.message || 'server not found')
           
         
          
            //$q.loading.hide()
            //console.log(res)
            
          })
     }
   }
  //  const toggle = ()=> {
  //    frontpage.value = !frontpage.value
  //  }

return {
  login,
  submitForm,
  Reset,
  // toggle,
  frontpage,
  remainingcredit,
  controllingbanner
}
  },
   components: {
    register,
    welcome
  },
  // setup () {
  //   const $q = useQuasar()

  //   const username = ref(null)
  //   const password = ref(null)
  //   const accept = ref(false)

  //   return {
      
  //     username,
  //     password,
  //     accept,

  //     onSubmit () {
  //       if (accept.value !== true) {
  //         $q.notify({
  //           color: 'red-5',
  //           textColor: 'white',
  //           icon: 'warning',
  //           message: 'You need to accept the license and terms first'
  //         })
  //       }
  //       else {
  //         $q.notify({
  //           color: 'green-4',
  //           textColor: 'white',
  //           icon: 'cloud_done',
  //           message: 'Submitted'
  //         })
  //       }
  //     },

  //     onReset () {
  //       username.value = null
  //       password.value = null
  //       accept.value = false
  //     }
  //   }
  // }
  
}
</script>

<template>
<div>
    <div  class="page-container window-height row justify-center flex items-center bg-image">
  <div class="img row justify-center" style="background-color: white;max-width: 278px;max-height: 372px; border-radius:25px;"  rounded>
<div class="col-12 text-center self-center"> <h6 class="text-h6 text-uppercase q-my-none">LOGIN </h6> </div>
    <q-form
      
      class="q-gutter-md" @submit.prevent="submitForm"
    >
      <q-input
      
        
        v-model="login.username"
        label="Username"
      />

      <q-input
        v-model="login.password"
        label="Password"    
        type="password"
         debounce
      />

      <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

      <div>
        <q-btn class="bg-cyan-8 text-grey-1 full-width" label="Login" aria-label="bold" type="submit"  rounded/><br/><br/>
        <q-btn label="Reset" type="reset" flat class="q-ml-md text-grey-1 bg-cyan-8" rounded aria-label="bold" @click="Reset()"   />
        <!-- <q-btn label="Register" @click="toggle" to="/register" color="primary" /> -->
      </div>
    </q-form>
  </div>
</div>
    
  </div>
  <!-- <div>
    <router-link to="/login">
  <h5 class="signin" id="login" @click="isLogin = true">Login</h5>
</router-link>

<router-link to="/register">
  <h5 class="signup" id="signup" :class="{ active: !isLogin }" @click="isLogin = false">signup</h5>
</router-link>
<q-btn label="signup" @click="toggle" color="primary" />
</div> -->

</template>
<style>
.img {
  height: 380px;
   width: 80%;
/* background-image: url("./img/login1.jpg"); */
background-size: contain;
 background-repeat: no-repeat
 
}
.q-field--filled .q-field__control {
    padding: 0 12px;
    background: #99aab8;
    border-radius: 4px 4px 0 0;
}

.window-height {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    height: 100vh !important;
}
.bg-image {
  position: relative;
    background-image: url(https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41561-021-00694-4/MediaObjects/41561_2021_694_Figa_HTML.png);
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>

