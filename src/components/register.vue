<template>
  <div class="window-height row justify-center items-center bg-image">
        <q-card class="shadow-24" style="width:350px;height:450px;">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h6 text-white row justify-center">Registration</h4>
           
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl" @submit.prevent="submitForm">
              <q-input 
                       ref="name"
                       square 
                       clearable 
                       v-model="signup.name" 
                       type="name"
                       lazy-rules
                       
                       label="Name">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
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
                       ref="password"
                       square 
                      
                       v-model="signup.password"                                                        
                       
                       lazy-rules
                       
                       label="Password">
                
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
             
              <q-input  v-model="signup.company"  label="Company Name" square clearable />
            </q-form>
          </q-card-section>

          <q-card-actions class="sign">
            <q-btn  
                   size="md" 
                   color="primary"
                   @click="submitForm"
                   class="text-white"                         
                    label="Register" />
                    <q-btn class="bg-cyan-8 text-grey-1" label="login" to="/login"/>
          </q-card-actions>
          <q-card-section 
              
              class="text-center q-pa-sm">
            <p class="text-grey-6"></p>
          </q-card-section>
        </q-card>
      </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import { api } from '../boot/axios';
import { useRoute, useRouter } from 'vue-router'

export default ({
  setup () {
    const router = useRouter()
const signup = ref({
    name : '',
    email: '',
    password: '',
    company: '',
    repeatPassword : '',
  })
  const submitForm = () => {
   if (!signup.value.password || !signup.value.email || !signup.value.company || !signup.value.name || !signup.value.repeatPassword){
      $q.notify({
         type: 'negative',
          message: 'Fill Required Fields' }
      )
       
    }else if(signup.value.password !== signup.value.repeatPassword){
      
      $q.notify({
         type: 'negative',
          message: 'Password d' }
      )

    } else {
    //console.log(signup.value.username)

    console.log('REGISTER COMp')

          api
        .post(`user/register`,{name : signup.value.email, email: signup.value.email, password:signup.value.password , company :signup.value.company, usertype:'user'},
        ).then(async (res) => {
          
          
          console.log(res)
          router.push('/login')

        }).catch( (res) => {
          console.log(res)
          router.push('/register')
        })
    }
  }
  return {
     signup,
     submitForm
  }
  }
  
})

</script>
<style scoped>
.bg-image {
  position: relative;
    background-image: url(https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41561-021-00694-4/MediaObjects/41561_2021_694_Figa_HTML.png);
    background-repeat: no-repeat;
    background-size: cover;
  }
  .q-card__section--vert {
    padding: 3px;
}
.q-card {
  border-radius: 24px;
}
</style>