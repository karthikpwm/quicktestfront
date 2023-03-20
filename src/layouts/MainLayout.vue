<template>
  <q-layout view="hHh Lpr lff" style="background-color:#f2f2f2" class="shadow-2 rounded-borders">
     

     <!-- <q-header v-if="a" elevated class="primary">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu"  /> -->
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar> -->

          <!-- <q-toolbar-title></q-toolbar-title> -->
          <!-- <div class="q-mr-sm"> 
            Logged In As: {{ adminname}} -->
            <!-- {{formatedCountdown}}  -->
          <!-- </div> -->
          <!-- <q-btn  v-if="a" flat dense icon="logout" @click="logout()" label="logout" class="text-white 10" aria-label="bold" />
        </q-toolbar> -->

        <!-- <q-tabs v-model="tab"> -->
          <!-- <q-tab name="images" label="Images" />
          <q-tab name="videos" label="Videos" />
          <q-tab name="articles" label="Articles" /> -->
        <!-- </q-tabs> -->
      <!-- </q-header> -->

       <q-drawer v-if="a"
       show-if-above
        class="bg-grey-1"
        :width="230"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 100px); margin-top: 5px; border-right: 1px solid #ddd">
          <q-list padding class="sidebar">
            <q-item-label class="head"><q-icon name="check_circle" style="color:#04CB7A"  size="sm"></q-icon> quicktest</q-item-label>
            <q-item clickable v-if="!arights" v-ripple to="/cresult" :disable="controlnewregister == true">
              <q-item-section avatar>
                <q-icon name="grid_view" />
              </q-item-section>

              <q-item-section>
                Home
              </q-item-section>
            </q-item>

            <!-- <q-item active clickable v-ripple to="/cresult">
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section>
                Result
              </q-item-section>
            </q-item> -->
            <!-- <q-item clickable v-if="!arights" v-ripple to="/token">
              <q-item-section avatar>
                <q-icon name="description" />
              </q-item-section>

              <q-item-section>
                Tests
              </q-item-section>
            </q-item> -->
            <q-item clickable v-if="!arights" v-ripple to="/newtest">
              <q-item-section avatar>
                <q-icon name="description" />
              </q-item-section>

              <q-item-section>
                Tests
              </q-item-section>
            </q-item>
            <!-- <q-item clickable v-if="!arights" v-ripple to="/editqstn" @click="protectPassword(evt)" >
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section >
               Edit Questions
              </q-item-section>
            </q-item> -->
            <!-- <q-item clickable v-if="!arights" v-ripple to="/user">
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
               Start Test
              </q-item-section>
            </q-item> -->
            <!-- <q-item clickable v-ripple to="/signup">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>

              <q-item-section>
               Profile old
              </q-item-section>
            </q-item> -->
            <q-item clickable v-ripple to="/profile" v-if="!arights" :disable="controlnewregister == true">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>

              <q-item-section>
               Profile
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/signup" v-if="arights" :disable="controlnewregister == true">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>

              <q-item-section>
               Admin
              </q-item-section>
            </q-item>
            <!-- <q-item clickable v-ripple to="/register">
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
               register
              </q-item-section>
            </q-item> -->
          </q-list>
          <q-separator></q-separator>
          <!-- <q-list padding>
            <q-item-label header>Active Tests</q-item-label>
            <q-item clickable v-if="!arights" v-ripple to="/token">
              

              <q-item-section>
                General Aptitude
              </q-item-section>
            </q-item>
            <q-item clickable v-if="!arights" v-ripple to="/token">
              

              <q-item-section>
                Basic Math
              </q-item-section>
            </q-item>
            <q-item clickable v-if="!arights" v-ripple to="/token">
             

              <q-item-section>
                Logical Reasoning
              </q-item-section>
            </q-item>
          </q-list> -->
          
        </q-scroll-area>
       
        
          <!-- <div class="absolute-bottom bg-transparent">
            <q-avatar size="16px" class="q-mb-sm">
              
            </q-avatar>
            <div class="text-weight-bold">PWM</div>
            <div></div>
          </div> --><div class="row justify-center logout-btn">
            <q-btn flat dense icon="power_settings_new" text-color="red"  @click="logout()" label="logout" class="power text-black text-bold"  />
          </div>
          
      </q-drawer>

      <q-page-container class="content-display">
        <router-view></router-view>
      </q-page-container>
    </q-layout>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../store/user'
// import { ref } from 'vue'
// import { api } from './boot/axios' 
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'

export default ({
  data() {
    return {
      
      countdown: 300, // 5min
    };
  },
  
  setup() {
    const drawer = ref(true)
    const store = useUserStore()
    const {token,user,loggedinname,admin,controlnewregister} = storeToRefs( store )
    const router = useRouter()
    const adminname =  loggedinname.value
    //console.log(admin.value,admin.value[0])
    const a = computed(() => {
      // funcntion only vaiable --> calculation 
      if(!admin.value.id){
        return false
      } else {
        return true
      }
    })
    const arights = computed(() => {
      
      if(admin.value.role === 'admin')
      {
        return true
      } else {
        return false
      }
    })
      console.log(arights)
      const logout = () => {
        token.value = '',
        user.value = '',
        admin.value = '',
       
        //window.location.reload()
        //store.$reset()
        // router.push('/login');
        router.push('/');
      }
      const protectPassword = (evt) => {
        to="/editqstn"
        alert('hi')
      }
    return {
      countDown : 30,
      timer:null,
      logout,
      adminname,
      drawer,
      a,
      arights,
      protectPassword,
      controlnewregister
     
      
    }
   
  },

  
  
})
</script>
<style scoped>
.power{
  padding: 8px 0
}
.head{
  color: #03444E;
    padding: 16px;
    font-size: 17px;
    font-weight: bold;
    line-height: 1.25rem;
    letter-spacing: 0.01786em;
}
.q-list--padding {
    padding: 8px  13px;
}
</style>
<style lang="sass" scoped>
.mini-slot
  transition: background-color .28s
  &:hover
    background-color: rgba(0, 0, 0, .04)

.mini-icon
  font-size: 1.718em

  & + &
    margin-top: 18px
</style>