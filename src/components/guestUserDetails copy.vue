<script>
import { storeToRefs } from 'pinia'
import { useQuasar,QSpinnerFacebook } from 'quasar'
// import { ref } from 'vue'
import { useUserStore } from '../store/user'
import { useCandidateStore } from '../store/candidate'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../boot/axios';
import { onBeforeUnmount } from 'vue'

export default {
  data() {
       
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
    const store = useUserStore()
    const store_candiate = useCandidateStore()
    const {user, token, admin,loggedinname,company_id,category_id} = storeToRefs( store )
    const { candidate_id,company1_id,category1_id,timelimit } = storeToRefs( store_candiate )
    //console.log("userinfopage",loggedinname.value)
    const onSubmit = () => {
         if (!user.value.name || !user.value.position || !user.value.email || !user.value.mobile || !user.value.ctc || !user.value.pincode) {
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
        $q.loading.show({
          message: 'Loading...pls wait..',
          boxClass: 'text-white',
          spinnerColor: 'white',
          spinnerSize: 60
        })
        api.post(`guest/newregister`, {name : user.value.name,position : user.value.position,email : user.value.email,mobile : user.value.mobile,ctc : user.value.ctc,pincode : user.value.pincode, company_id : company_id.value,category_id: category_id.value, timelimit:timelimit.value},
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
         router.push('/guestinfo')  

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
      }
    }
    return {
      user,
      onSubmit,
      onReset () {
        // form reset
        
        
      }
    }
  },
}
</script>

<template>
<div class="page-container window-height row justify-center items-center" >
  <div id="blueDIV" class="q-pa-md row justify-center" style="background-color: white;max-width: 355px;max-height:465px; border-radius:25px;" rounded>
  <div id="myDIV" class="col-12 text-center self-center" style="border-radius: 10px;">
    <h5 class="text-h6 text-uppercase q-my-none" style="color: black;">Enter Your Details</h5>
    
  </div>
    
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      
    >
      <q-input
        
        v-model="user.name"
        
        placeholder="Your name"
      />
<!-- {
  name : this.name,
  uemail : this.emlil
}

{...user} -->

      <q-input
        
        type= "text"
        v-model="user.position"
        
        placeholder="Position"
        
      />

      <q-input
        
        type="text"
        v-model="user.email"
        
        placeholder="Your email id"
        
      />

      <q-input
        
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
      <q-input
        
        type="text"
        v-model="user.ctc"
        
        placeholder="Your last Monthly Salary"
        lazy-rules
        mask="########"
        hint="In Rupees "
        :rules="[
          val => val !== null && val !== '' || 'Invalid',
          val => val.length >= 1 && val.length <= 8 || 'Enter Valid Salary'
        ]"
      />
      <q-input
        
        type="text"
        v-model="user.pincode"
        mask="######"
        
        placeholder="Residence pincode"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Invalid',
          val => val.length >= 1 && val.length <= 6 || 'Enter Valid Pincode'
        ]"
      />

      <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->
      <br/>
      <div>
        <q-btn  class="full-width bg-cyan-8 text-grey-1" label="Submit" @click="onSubmit()" rounded/>
        <!-- <q-btn label="Start test" @click="goToHome()" color="primary"/> -->
        <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
      </div>
    </q-form>

  </div>
</div>
</template>

<style>
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