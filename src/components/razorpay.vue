
<script>
import { api } from '../boot/axios';
import { storeToRefs } from 'pinia'
import { ref,onMounted } from 'vue'
import { useUserStore } from '../store/user'
import { useRoute, useRouter } from 'vue-router'
import router from '../router/index.js'


export default {

  setup() {
   const route = useRoute()
   //const router = useRouter();
   const store = useUserStore()
   const {token,admin} = storeToRefs( store )
   const orderid = ref()
   const credit = ref()
   const companyid = ref()
   const newtoken = ref()
  orderid.value = route.params.id
  credit.value = route.params.credit
  companyid.value = admin.value.id
  newtoken.value = token.value
   console.log(admin.value.id,route.params.id,route.params.credit)
  
   
   return {
     orderid,
     credit,
     companyid,
     newtoken,
     route,
     router
     
     
   }
  },
  data(){
    return{
      script: `https://checkout.razorpay.com/v1/checkout.js`,
      neworderid: null
    }
  },
  methods :{ 
    async loadRazorPay(){
      return new Promise(resolve=>{
        
        const script = document.createElement('script')
        script.src = this.script
        this.neworderid = this.orderid
        console.log(this.orderid)
        
        script.onload = () =>{
          resolve(true)
        }
        script.onerror = () =>{
          resolve(false)
        }        
        document.body.appendChild(script)
      })      
    }
  },
  
     
  

  async created(){
    const result = await this.loadRazorPay()
    if(!result){
      alert('Failed to load razorpay script')
      return
    }
    const credit = {
     newcredit : this.credit,
     companyid : this.companyid,
     newtoken : this.newtoken
    }
    const options = {
      //rzp_test_QaTqBDlFm9Jso6
      key: "rzp_test_1dRrmXjLVXi6Ml",
      
      amount: "5000",
      currency: "INR",
      name: "PWM Pvt Ltd",
      description: `Description of the payment`,
      order_id: this.neworderid,
      image: `Your business logo`,
        prefill: {
        name: `Pwmchennai`,
        email: `karthik@pwm-india.com`,
        contact: `8870199101`
      },
      handler: function(response){
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)
        console.log(options.order_id) 
        api.post("api/payment/verifyOrder",{ orderData : {paymentId : response.razorpay_payment_id,
        orderId : options.order_id,
        signature : response.razorpay_signature}
      },
        {
          headers: {
            Authorization:  credit.newtoken
          }
        }
        ).then(response => {
          router.push({name: '/profile'},
          {
  headers: {
    Authorization:  credit.newtoken
  }
})
          console.log(response.data)  
          
//           if(response.data.signatureIsValid === 'true')
//           //let credit = this.credit
//           { api.post("user/creditupdate", {credit : credit.newcredit, company_id:credit.companyid}
//           ).then(
//             router.push({name: '/token'},
//             {
//   headers: {
//     Authorization: 'Bearer ' + credit.newtoken
//   }
// })
//           )}
          }).catch((res) => {
            console.log(res)
            router.push({name: '/profile'})
          })
       
      },
    }; 
    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response){
      console.log(response)
      router.push({path: `/profile`})
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
});
    paymentObject.open();
  }
}
</script>

<style>
</style>