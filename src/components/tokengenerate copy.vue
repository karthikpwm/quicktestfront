<template>
  <div class="q-pa-lg" >
<div class="page-container" style="padding-top: 39px">
<div style="background-color:white;">
  <div>Credit Remaining:{{credit}} </div>
  
</div>
<div style="background-color:white"><q-btn color="primary" icon="shopping_cart" to="/checkout" label="Add credit" /> </div>
<div class="row justify-center" style="background-color:white; font-family:'Times New Roman', serif;">
  <h5>Link Generation</h5>
</div>
<div class="page-container window- row justify-center flex items-center" style="background-color:white;">
  <q-select style="width: 200px; text-align:left" v-model="category" :options="categoryoptions" label="Category" emit-value map-options/>&nbsp;&nbsp;&nbsp;&nbsp; 
 <q-select style="width: 200px" v-model="timelimit" :options="timelimitoptions" label="Time Limit" emit-value map-options/>
</div>

  <div class="page-container window- row justify-center flex items-center" style="background-color:white;">
    <div class="row justify center" style="max-width: 570px">
    
      <!-- <div class="name" 
      v-for="(applicant, counter) in applicants"
      v-bind:key="counter">
      <span @click="deleteVisa(counter)">x</span> -->
      <!-- <label for="duration">{{counter+1}}. Name:</label> -->
      <!-- <q-input filled v-model="applicant.name" label="Name" /> -->
      <!-- <label for="duration">Email Id:</label> -->
      <!-- <q-input filled v-model="applicant.email" label="Email" />
      </div>

<q-btn @click="addVisa" color="primary"> Add another Details</q-btn>
      
    </div>
    <div> -->
      
    <!-- <div class="q-pb-sm">
      <q-badge color="teal">
        Model: {{ date }}
      </q-badge>
    </div> -->
      <span1>
    <q-input filled v-model="date" outlined hint="From date">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary"/>
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="date" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input filled v-model="date1" outlined hint="To date">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date1" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="date1" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>  </span1><br/>
    <q-input type="textarea" v-model="generatetoken" rows="10" cols="30" outlined clearable >
    
    </q-input>
    <q-btn @click="tokengen" color="primary">Create Link</q-btn>
    </div>
  </div>
  <div class="page-container window- row justify-center flex items-center" style="background-color:white;">
  
  </div>
  </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { parse } from '@babel/parser';
import { now } from 'lodash';
import { storeToRefs } from 'pinia'
import { onMounted, ref,onBeforeMount } from 'vue'
import { api } from '../boot/axios';
import { useUserStore } from '../store/user'
import moment from 'moment'
 
  
  export default {
     data(){
    return {
       applicants:[
       {
      name: '',
      email:''
       },
     ],
     
    }
  },
  methods : {
    addVisa(){
      this.applicants.push({
        name:'',
        email: ''
      })
    },
    
    deleteVisa(counter){
      this.applicants.splice(counter,1);
}
  },
    setup () {
      const category = ref()
      const timelimit = ref()
      const categoryoptions = ref([])
      const store = useUserStore()
      const $q = useQuasar()
      const generatetoken = ref()
      const { token,admin,company_id} = storeToRefs( store )
      const date = ref(moment().format('YYYY-MM-DD HH:mm '))
      const date1 = ref(moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm '))
      const credit = ref()
      const mask="YYYY-MM-DD HH:mm"
      // date-fsn
      //console.log('compid',company_id.value)
      //console.log('orgnltoken',company_id)
      const getCategories = () => {
        $q.loading.show({
          message: 'Loading...pls wait..',
          boxClass: 'text-white',
          spinnerColor: 'white',
          spinnerSize: 60
        })
      api.get("user/getcategories",
      {
        headers: {
          Authorization: 'Bearer' + token.value
        }
      }).then(async (response) => {
        //console.log(response.data.data)
          var result=response.data.data.filter(obj=> obj.company_id == admin.value.company_id);
          //console.log(result)
         categoryoptions.value = result.map((x) => { 
        
        return {'label' : x.category, 'value' : x.category_id }
      })
      result.map((val) => {
        credit.value = val.credit
        console.log(val.credit)
      })
      $q.loading.hide()
      })
    }
    onBeforeMount(async () => {
    getCategories();
})
    onMounted(()=> {
          getCategories();
    })
     
      const tokengen = () => {
        if(category.value === '' || category.value === undefined || timelimit.value === '' || timelimit.value === undefined){
          console.log(category.value)
          alert('category or timelimit is empty')
        } else {
        $q.loading.show({
          message: 'Loading...pls wait..',
          boxClass: 'text-white',
          spinnerColor: 'white',
          spinnerSize: 60
        })
       var abc = Date.parse(date.value)
       var bcd = Date.parse(date1.value)
         //console.log(abc)
      //var cde =  date.value
       //console.log('dddd',cde,date1.value)
      // return date
      console.log(category)
        api .post(`token/jwt`,{fromDate : abc,toDate : bcd,company_id :company_id.value,category_id:category.value,timelimit: timelimit.value },
        {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
}) 
        .then(async (res) => {
          $q.loading.hide()
        generatetoken.value ="https://aptitudetestv2.herokuapp.com/token/test/" + res.data.token 
        getCategories();
        //  applicant.name.value = generatetoken
         
         //console.log('newtoken',generatetoken.value)
        })
         .catch((res) => {
            $q.loading.hide()
            //console.log(res)
            alert(res.response.data.message)
          })
      }
      }
      return {
        generatetoken,
        tokengen,
        msg: '',
        text: ref(''),
        date1,
         date,
         categoryoptions,
         getCategories,
         category,
         timelimit,
         credit,
         timelimitoptions: [
           {
             label: '5 Minutes',
             value: '300',
           },
           {
             label: '10 Minutes',
             value: '600',
           },
           {
             label: '15 Minutes',
             value: '900',
           },
           {
             label: '20 Minutes',
             value: '1200',
           }
         ]
       
      }
    }
  }
  </script>

  <style scoped>
#visa {
  margin: 10px auto;
  max-width: 500px;
  max-height: fit-content;
}
label{
  display: block;
  margin: 20px 0 10px;
}
input {
  font-size: 15px;
  border: 1px double rgb(102, 97, 96) ;
  border-radius: 4px;
}
button {
  font-size: 12px;
 background: rgb(64, 179, 140);
  padding: 0.4rem 1.3rem;
  text-align: center;
  border: none;
  cursor: pointer;
  border-radius: 4px;
 margin: 10px;
}
span{
  width: 10px;
  float: right;
  cursor: pointer;
}
span1{
  width: 230px;
  float: right;
  cursor: pointer;
  padding-right: 10px;
}
span:hover{
  color: brown;
}
.name{
  border: 1.5px solid;
  padding:7px;
  margin-bottom: 10px;
}
</style>