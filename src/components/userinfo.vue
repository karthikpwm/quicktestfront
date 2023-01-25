<script>
import { storeToRefs } from 'pinia'
import { useQuasar,QSpinnerFacebook } from 'quasar'
// import { ref } from 'vue'
import { useUserStore } from '../store/user'
import { useCandidateStore } from '../store/candidate'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../boot/axios';
import { onBeforeUnmount, onMounted } from 'vue'

export default {
  data() {
       
  },
  setup () {
    const $q = useQuasar()
    let timer
    // 2 min -> 1 min -> unmo b -> c -> c -> b mo -> ch
    const route = useRoute()
  const router = useRouter()
  // const form = ref(null);
    const store = useUserStore()
    const store_candiate = useCandidateStore()
    const {user, token, admin,loggedinname} = storeToRefs( store )
    const { candidate_id, company_id } = storeToRefs( store_candiate )
    //console.log("userinfopage",admin.value)
    store.setUserDefault()
    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer)
        $q.loading.hide()
      }
    })
    const onSubmit = () => {
         if (!user.value.name || !user.value.position || !user.value.email || !user.value.mobile || !user.value.ctc || !user.value.pincode) {
          //alert('Invalid')
           
           $q.notify({
          type: 'negative',
          message: 'Must Enter All Fields.'
        })
          // $q.notify({
          //   color: 'red-5',
          //   textColor: 'white',
          //   icon: 'warning',
          //   message: 'You need to accept the license and terms first'
          // })
       }
      else {
        $q.loading.show({
          message: 'pls wait ..',
          html: true
        })
        api.post(`analytic/insertcandidate`, {name : user.value.name,position : user.value.position,email : user.value.email,mobile : user.value.mobile,ctc : user.value.ctc,pincode : user.value.pincode, company_id : admin.value.company_id, timelimit:1200},
        {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
}).then(res => {
              candidate_id.value = res.data.insert_id
              company_id.value = admin.value.company_id
            $q.loading.hide()
         router.push('/info')  

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
<div class="page-container window-height row justify-center items-center bg-image" >
  <div id="blueDIV" class="q-pa-md row justify-center" style="background-color: white;max-width: 355px;max-height:455px; border-radius:25px" rounded>
  <div id="myDIV" class="col-12 text-center self-center" style="border-radius: 10px;">
    <h6 class="text-h6 text-uppercase q-my-none" style="color: black;">Enter Your Details</h6>
    
  </div>
    
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-xm"
    >
      <q-input
        
        v-model="user.name"
        label="Name "   
      />


<!-- {
  name : this.name,
  uemail : this.emlil
}

{...user} -->

      <q-input
        
        type= "text"
        v-model="user.position"
        label="Position"
       
        
      />

      <q-input
        
        type="text"
        v-model="user.email"
        label="Your Email "
        
        
      />

      <q-input
        
        type="text"
        v-model="user.mobile"
        label="Your Mobile No"
        
      />
       <q-input
        
        type="text"
        v-model="user.ctc"
        label="Your last CTC"
        lazy-rules
        
      />
      <q-input
        
        type="text"
        v-model="user.pincode"
        label="Residence pincode"
        lazy-rules
        
      />
      <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->
      <br/>
      <div>
        <q-btn  class="full-width bg-primary text-grey-1" label="Submit" @click="onSubmit()" rounded/>
        <!-- <q-btn label="Start test" @click="goToHome()" color="primary"/> -->
        <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
      </div>
    </q-form>

  </div>
</div>
</template>

<style scoped>
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