<template>
  <div class="window-height row justify-center items-center">
    <q-card class="my-card" flat bordered>
     <div class="row justify-center" style="background-color:white; font-family:'Times New Roman', serif;">
  <h5>Check Out</h5>
</div>
      <q-card-actions class="row justify-center">
        No.of credits: &nbsp;&nbsp;&nbsp; <q-input style="width: 70px;" v-model.number="credit" @change="total" @focus="clear" type="number" label="credit" /> &nbsp; * 13 ₹<q-separator />
        
      </q-card-actions>
      
      <q-card-section class="row justify-center">
        
        <div class="text-h5 text-orange-9 q-mt-sm q-mb-xs">Total : {{credittotal }} ₹</div>
        
      </q-card-section>

      <q-card-actions class="row justify-center">
        <q-btn   color="primary" @click="buy"> BUY</q-btn>
        
      </q-card-actions>

    </q-card>
  </div>
</template>

<script>
import { ref,onMounted } from 'vue'
import { api } from '../boot/axios';
import { storeToRefs } from 'pinia'
import { useUserStore } from '../store/user'

const store = useUserStore()
const { token,admin,company_id} = storeToRefs( store )
const credit = ref()
const orderId = ref()
const creditamount = ref()
var credittotal = ref()
export default {
  props: ['order_details', 'customer_details'],
  data(){
    return{
      script: `https://checkout.razorpay.com/v1/checkout.js`
    }
    },
    
  
  setup () {
    onMounted( ()=> {
      console.log('hai')
          clear();
    })

    const buy =() => {
      console.log('buying points',creditamount.value)
        api.post("/payment/create",{amount : creditamount.value},
   {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
   }).then(response => {
     let orderId=response.data.orderId;
  console.log(orderId);
    loadRazorPay();
   }).catch(err => {
          console.error(err);
        });

    }
    // const loadRazorPay = () => {
    //   console.log('inside the payment')
           
    
    //   const options = {
    //   key: "rzp_test_QaTqBDlFm9Jso6",
    //   amount: creditamount.value,
    //   currency: "INR",
    //   name: "PWM Pvt Ltd",
    //   description: `Test Transaction`,
    //   order_id: orderId,
    //   image: `https://example.com/your_logo`,
    //   handler: function(){
    //      alert(response.razorpay_payment_id);
    //     alert(response.razorpay_order_id);
    //     alert(response.razorpay_signature)
    //   },
    //   prefill: {
    //     name: `Pwmchennai`,
    //     email: `karthik@pwm-india.com`,
    //     contact: `8870199101`
    //   }
    // };
    
    // }
      //  return new Promise(resolve=>{
      //   const script = document.createElement('script')
      //   script.src = script
      //   script.onload = () =>{
      //     resolve(true)
      //   }
      //   script.onerror = () =>{
      //     resolve(false)
      //   }       
      //   console.log(script) 
      //   document.body.appendChild(script)
      // })
    
    //   const result = loadRazorPay()
    // if(!result){
    //   alert('Failed to load razorpay script')
    //   return
    // }
     
    //const paymentObject =  Razorpay(options);
   // paymentObject.open();
  //   api.post("/payment/create",
  //  {
  // headers: {
  //   Authorization: 'Bearer ' + token.value
  // }
  //  }).then(response => {
  //    let orderId=response;
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
   

    return {
      total,
      // loadRazorPay,
      buy,
      clear,
      credit,
      orderId,
      creditamount,
      credittotal,
      expanded: ref(false),
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  methods :{ 
     loadRazorPay(){
      return new Promise(resolve=>{
        const script = document.createElement('script')
        script.src = this.script
        script.onload = () =>{
          resolve(true)
        }
        script.onerror = () =>{
          resolve(false)
        }   
        console.log(script)     
        document.body.appendChild(script)
      })      
    }
  },
   created(){
    console.log('first is coming')
    const result =  this.loadRazorPay()
    if(!result){
      alert('Failed to load razorpay script')
      return
    }
    const options = {
      key: "rzp_test_QaTqBDlFm9Jso6",
      amount: "50000",
      currency: "INR",
      name: "PWM Pvt Ltd",
      description: `Test Transaction`,
      order_id: "order_JtXgQi1rE24eiO",
      image: `https://example.com/your_logo`,
      handler: function(){
         alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
      },
      prefill: {
        name: `Pwmchennai`,
        email: `karthik@pwm-india.com`,
        contact: `8870199101`
      }
    }; 
    const paymentObject = new Razorpay(options);
    paymentObject.open();
  },
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px

  
</style>
<style> 
.window-height {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    height: 90vh !important;
}
</style>
