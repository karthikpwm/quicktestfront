<template>
  <div class="window-height row justify-center items-center">
    <q-card class="my-card" flat bordered>
      <!-- <welcome :name = "orderId"/> -->
     <div class="row justify-center" style="background-color:white; font-family:'Times New Roman', serif;">
  <h5>Check Out </h5>
</div>
      <q-card-actions class="row justify-center">
        No.of credits: &nbsp;&nbsp;&nbsp; <q-input style="width: 70px;" v-model.number="credit" @change="total" @focus="clear" type="number" label="credit" /> &nbsp; * 13 ₹<q-separator />
        
      </q-card-actions>
      
      <q-card-section class="row justify-center">
        
        <div class="text-h5 text-orange-9 q-mt-sm q-mb-xs">Total : {{credittotal }} ₹ </div>
        
      </q-card-section>

      <q-card-actions class="row justify-center">
        <q-btn label="buy" color="primary" @click="loadRazorPay()"/>
      </q-card-actions>

    </q-card>
  </div>
</template>

<script>
import { ref,onMounted } from 'vue'
import { api } from '../boot/axios';
import { storeToRefs } from 'pinia'
import { useUserStore } from '../store/user'
import { useRouter } from 'vue-router'
import welcome from '../components/welcome.vue'

const store = useUserStore()
const { token,admin,company_id} = storeToRefs( store )
const credit = ref()
const creditamount = ref()
const orderId = ref()
var credittotal = ref()
export default {
 components : {
   welcome
  },
  // async created(){
  //   console.log('first is coming')
  //   const result = await this.loadRazorPay()
  //   if(!result){
  //     alert('Failed to load razorpay script')
  //     return
  //   }
  //   const options = {
  //     key: "rzp_test_QaTqBDlFm9Jso6",
  //     amount: "50000",
  //     currency: "INR",
  //     name: "Acme Corp",
  //     description: `Test Transaction`,
  //     order_id: "order_JtaPZJERb2SyE7",
  //     image: `https://example.com/your_logo`,
  //     handler: function(){
  //        alert(response.razorpay_payment_id);
  //       alert(response.razorpay_order_id);
  //       alert(response.razorpay_signature)
  //     },
  //     prefill: {
  //       name: `Pwmchennai`,
  //       email: `karthik@pwm-india.com`,
  //       contact: `8870199101`
  //     }
  //   }; 
  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  // },
  setup () {
   const router = useRouter()
    onMounted( ()=> {
      console.log('hai')
          clear();
    })

  //   api.post("/payment/create",
  //  {
  // headers: {
  //   Authorization: 'Bearer ' + token.value
  // }
  //  }).then(response => {
  //     orderId=response;
  // console.log(orderId);
  //  })
    const total = () => {
    console.log(credit.value)
    credittotal.value = credit.value * (13)
    creditamount.value = credittotal.value * 100
    }
    const clear = () => {
      credittotal.value = ''
    }
   const loadRazorPay = () => {
     if(creditamount.value > 0)
     {
       console.log('pppp')
     
     console.log('buying points',creditamount.value)
        api.post("/payment/create",{amount : creditamount.value},
   {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
   }).then(response => {
     let orderId=response.data.orderId;
     let creditvalue = credit.value
  console.log(orderId);
   router.push({path :`/razorpay/${orderId}/${creditvalue}`})
   }).catch(err => {
      orderId.value = "123"
      console.log(orderId)
      router.push({ path: `/welcome/${1}` }
    )
          console.error(err);
         
        });
      
      // return new Promise(resolve=>{
      //   const script = document.createElement('script')
      //   script.src = script
      //   script.onload = () =>{
      //     resolve(true)
      //   }
      //   script.onerror = () =>{
      //     resolve(false)
      //   }        
      //   document.body.appendChild(script)
      // })  
     }
      else {
        alert('Credit is not valid')
      }   
    
   }
   const buy = () => {
//      let windowFeatures = "left=200,top=200,width=920,height=520";
//       //let route = router.push('/printcanquestions/'+row.candidate_id,
//       let route = router.resolve({ path: '/razorpay/',
//        headers: {
//     Authorization: 'Bearer ' + token.value
//   }
  
//   })
// window.open(route.href, "mozillaWindow", windowFeatures);
   }
  //  const created = () => {
  //    console.log('first is coming')
  //   const result =  loadRazorPay()
  //   if(!result){
  //     alert('Failed to load razorpay script')
  //     return
  //   }
  //   const options = {
  //     key: "rzp_test_QaTqBDlFm9Jso6",
  //     amount: "50000",
  //     currency: "INR",
  //     name: "Acme Corp",
  //     description: `Test Transaction`,
  //     order_id: "order_JtaPZJERb2SyE7",
  //     image: `https://example.com/your_logo`,
  //     handler: function(){
  //        alert(response.razorpay_payment_id);
  //       alert(response.razorpay_order_id);
  //       alert(response.razorpay_signature)
  //     },
  //     prefill: {
  //       name: `Pwmchennai`,
  //       email: `karthik@pwm-india.com`,
  //       contact: `8870199101`
  //     }
  //   }; 
  //   console.log(options, 'ooooo')
    
  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  //  }

    return {
      total,
      loadRazorPay,
      clear,
      buy,
      credit,
      orderId,
      credittotal,
      creditamount,
      expanded: ref(false),
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px

  
</style>
<style> 
/* .window-height {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    height: 90vh !important;
} */
</style>
