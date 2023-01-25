<script>
import { Dialog, useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/user";
import { onMounted, ref } from "@vue/runtime-core";
import { api } from "../boot/axios";
import { useRouter } from 'vue-router'


export default {
setup() { 
  const router = useRouter()
  const store = useUserStore();
  const { token, admin } = storeToRefs(store);
  const activeplan = ref()
  const planname = ref()
  const show_dialog = ref(false)
  const newpassword = ref()
  const userid = ref()
onMounted(() => {
  getprofiledetails()
  getplandetails()
  geteditpassword()
})
const geteditpassword = () => {
  api .post(`analytic/geteditpassword`,{company_id: admin.value.company_id, usertype :admin.value.usertype}, {
            headers: {
              Authorization: "Bearer " + token.value,
            },
          }).then(async (res) => {
            console.log(res.data.data)
           let result = res.data.data
            result.map(val => {
              newpassword.value =  val.openpassword
              userid.value = val.user_id
            })
             
          })
}
var editedItem = ref([ {
        companyname: '',
        email: '',
        website: '',
        address: '',
        city: '',
        pincode : '',
     
      }])
      const openpassword = () => {

       
      show_dialog.value = true
   
}
const getprofiledetails =() => {
  api
        .post(
          `analytic/getprofiledetails`,
          { company_id: admin.value.company_id, usertype :admin.value.usertype },
          {
            headers: {
              Authorization: "Bearer " + token.value,
            },
          }
        )
        .then(async (res) => {
          let resdata = res.data.data;
          console.log(resdata);
           resdata.map((val) => {
            editedItem.value.companyname = val.name
            editedItem.value.email = val.email
            editedItem.value.website = val.website
            editedItem.value.address = val. address
            editedItem.value.city = val.city
            editedItem.value.pincode = val.pincode
            console.log(val);
            return val;
          });
        
        })
        .catch((res) => {
          console.log(res);
        });

}
const loadRazorPay = (amount,test) => {
    
       console.log('pppp',amount)
      let amountpayable = amount * 100
     //console.log('buying points',creditamount.value)
        api.post("/payment/create",{amount : amountpayable},
   {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
   }).then(response => {
     let orderId=response.data.orderId;
     let creditvalue = test
  console.log(orderId);
   router.push({path :`/razorpay/${orderId}/${creditvalue}`})
   }).catch(err => {
      // orderId.value = "123"
      // console.log(orderId)
      router.push({ path: `/welcome/${1}` }
    )
          console.error(err);
         
        });
      
        
    
   }
   const getplandetails = () => {
    api .post(
          `analytic/getplandetails`,
          { company_id: admin.value.company_id },
          {
            headers: {
              Authorization: "Bearer " + token.value,
            },
          }
        )
        .then(async (res) => { 
          let resdata = res.data.data;
          resdata.map(val => {
          activeplan.value =  val.activeplan
          planname.value = val.plans
          
          })
          console.log(resdata);
        })

   }
   const changepassword = () => {
    api.put(`user/changepassword/${userid.value}`,{password:newpassword.value },
      {
        headers: {
     Authorization: 'Bearer ' + token.value
   }
      }).then(res => {
       
        console.log(res)
      }) 

   }
  return  { 
  tab: ref("basicinfo"), 
  getprofiledetails,
  loadRazorPay,
  getplandetails,
  editedItem,
  activeplan,
  planname,
  show_dialog,
  changepassword,
  isPwd: ref(true),
  openpassword,
  newpassword,
  userid
}
},




}





</script>
<template>
  <q-page>
    <div style="background-color: white">
      <div
        class="row"
        style="font-size: 19px;padding-left: 19px;padding-bottom: 10px;padding-top: 10px;"
      >
        Profile
      </div>
      <q-tabs
          v-model="tab"
          align="justify-left"
          indicator-color="green"
          active-color="green"   
        >
          <q-tab  name="basicinfo" label="Basic Information" no-caps />
          <q-tab  name="users" label="Users" no-caps />
          <q-tab
           
            name="billing"
            label="Billing"
            no-caps
          />
        </q-tabs>
        <q-separator />

        <q-tab-panels v-model="tab" animated> 

          <q-tab-panel name="basicinfo">
            <div style="max-width:530px;">
              <div class="text-h6">About</div>
            <div style="padding-top:10px">Company Name</div>
            <div class="q-gutter-y-md column" style="max-width: 530px;padding-top:5px">
              <q-input
                outlined
                v-model="editedItem.companyname"
                color="black"
                placeholder=""
                dense
              />
            </div>
            <div style="padding-top:15px">Primary E-mail ID</div>
            <div style="max-width: 530px;padding-top:5px">
              <q-input
                outlined
                v-model="editedItem.email"
                color="black"
                placeholder="E-mail ID"
                dense
              />
            </div>
            <div style="padding-top:15px">Company Website</div>
            <div style="max-width:530px;max-height:250px">    
            <q-input  outlined v-model="editedItem.website" />
            </div>
           
            <div style="padding-top:15px">Company Address</div>
            <div  style="max-width:530px;max-height:250px">         
            <q-input v-model="editedItem.address" outlined  type="textarea" />
  
            </div>
            <div class="page-container window- row" style="max-width:530px;padding-top:15px"><span style="width:225px">City</span> <span>Pincode</span></div>
            <div class="page-container window- row q-gutter-lg">
              <q-input
                style="width: 200px"
                outlined
                v-model="editedItem.city"
                dense
                
              />
              <q-input
                style="width: 200px"
                outlined
                v-model="editedItem.pincode"
                dense
                
              />
            </div>
            <div class="q-pa-md">
                    <q-btn
                    
                      label="save"
                      style="border-radius: 20px; background: #2f9b47; color: white"
                      @click="next()"
                    ></q-btn>
                  </div>
            </div>
            
          </q-tab-panel>
          <q-tab-panel name="users">
            <div class="text-h6">Primary User</div>
            <div style="padding-top:10px">User ID</div>
            <div class="q-gutter-lg row" style="max-width: 530px;padding-top:5px">
              <q-input
              style="width:350px"
                outlined
                v-model="text"
                color="black"
                placeholder=""
                dense
              />
             <q-btn color="green" text-color="white" label="change password" @click="openpassword()" no-caps rounded/></div>
             <br>
             <!-- <q-separator></q-separator>
             <div class="text-h6">All User</div>
             <div class="page-container window- row q-gutter-lg">
                    <q-input
                      style="width: 170px; height: 40px"
                      outlined
                      v-model="text"
                      dense="dense"
                    />
                    <q-input
                      style="width: 170px; height: 40px"
                      outlined
                      v-model="text"
                      dense="dense"
                    />
                    <q-btn color="white" text-color="red" label="Delete user" rounded no-caps/>
                  </div> <br>
                  <div class="page-container window- row q-gutter-lg">
                    <q-input
                      style="width: 170px; height: 40px"
                      outlined
                      v-model="text"
                      dense="dense"
                    />
                    <q-input
                      style="width: 170px; height: 40px"
                      outlined
                      v-model="text"
                      dense="dense"
                    />
                    <q-btn color="white" text-color="red" label="Delete user" rounded no-caps />
                  </div>--> <br> 
                  <q-separator></q-separator> <br>
                  <div class="text-h6">Add New Member</div>
                  <div style="padding-top:10px">Send E-mail Invite</div>
            <div class="q-gutter-lg row" style="max-width: 530px;padding-top:5px">
              <q-input
              style="width:350px"
                outlined
                v-model="text"
                color="black"
                placeholder=""
                dense
              />
             <q-btn color="green" text-color="white" label="Invite" no-caps rounded/></div>
          </q-tab-panel>

          <!-- billing -->

          <q-tab-panel name="billing">
            <div style="padding-top:10px">Plan Details</div> <br>
            <q-card v-if="activeplan != 4" class="plan" style="background:#F3F7F2;" flat>
              <q-card-section>
        <div class="text-h7 row" style="align-items:center"> <strong>{{ planname }}</strong> &nbsp; is Active <span class="button" style="padding-right:5px"><q-btn style="background:#15803D" :disable="activeplan == 3" text-color="white" no-caps rounded>Upgrade</q-btn></span></div>
        
      </q-card-section>
            </q-card>
            <q-card v-else class="plan" style="background:#F3F7F2;" flat>
             
      <q-card-section>
        <div class="text-h7 row" style="align-items:center">Your free trial plan is going to expire soon, choose a plan to use your account .</div>
        
      </q-card-section>
            </q-card>

            <div style="padding-top:10px">Choose a plan</div>
            <div class="q-pa-md row items-start q-gutter-md">
             

             <q-card>
              
             </q-card>
              <q-card
      class="my-card text-white"
      style="background:#28534E;width:250px;height:300px"
    >
      <q-card-section>
        <div class="text-h6">Starter</div>
        <div class="text-h6"> ₹ 1500</div>
      </q-card-section>
      <div class="bottom " >
       <div class="row justify-center " >
<q-card-actions vertical class="power">
        <div class="text-h7" style="align-items:center">Max. tests: <span class="text-h6"> 100 tests</span></div> <br>
        <q-btn  rounded color="white" text-color="green" @click="loadRazorPay(1500,100)">Choose</q-btn>
      </q-card-actions>
       </div>
      </div>
       
      
    </q-card>
    <q-card
      class="my-card text-white"
      style="background:#28534E;width:250px;height:300px"
    >
      <q-card-section>
        <div class="text-h6">Corporate</div>
        <div class="text-h6">₹ 7300</div>
      </q-card-section>

      <div class="bottom " >
       <div class="row justify-center " >
<q-card-actions vertical class="power">
        <div class="text-h7" style="align-items:center">Max. tests: <span class="text-h6"> 500 tests</span> </div> <br>
        <q-btn color="white"  rounded text-color="green" @click="loadRazorPay(7300,500)">Choose</q-btn>
      </q-card-actions>
       </div>
      </div>
    </q-card>
    <q-card
      class="my-card text-white"
      style="background:#28534E;width:250px;height:300px"
    >
      <q-card-section>
        <div class="text-h6">Enterprise</div>
        <div class="text-h6">₹ 9700</div>
      </q-card-section>

      <div class="bottom " >
       <div class="row justify-center " >
<q-card-actions vertical class="power">
        <div class="text-h7" style="align-items:center">Max. tests: <span class="text-h6">2000 tests</span></div> <br>
        <q-btn color="white"  rounded text-color="green" @click="loadRazorPay(9700,2000)">Choose</q-btn>
      </q-card-actions>
       </div>
      </div>
    </q-card>

            </div>
          </q-tab-panel>
        </q-tab-panels>
    </div><q-dialog v-model="show_dialog">
        <q-card class="qcard">
          <q-card-section style="width: 623px">
            <div class="text-h6">Change Password</div>
          </q-card-section>

          <q-card-section style="width: 621px">
           
           <div class="row dialog"><q-input v-model="newpassword" :type="isPwd ? 'password' : 'text'"  style="width: 200px">
            <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
           </q-input></div>
           
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Save" color="primary" v-close-popup @click="changepassword()" ></q-btn>
          </q-card-actions>
          </q-card>
    </q-dialog>
  </q-page>
  </template>
<!-- <style>
  
.q-textarea .q-field__control {
    min-height: 105px;
    height: auto; }
</style> -->

<style>
.button {
  position: absolute;
  right: 0;
}

.power{
  padding: 8px 0
}
.bottom {
                position: absolute;
                bottom: 0px;
                left: 21%;
            }
            .plan {
               width: 100% ;
              max-width: 600px
            }
            
</style>
<style scoped>
.qcard {
  max-width:625px
}
.dialog{
  justify-content:center
}
</style>