import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import { api } from '../boot/axios';

// onMounted(() => {

//   getcompdetails();
//   console.log('fff')
// })

export const useCompanyStore = defineStore("company", () => {

  const company = ref({
    name: '',
    company_id: ''
  })
  // const getcompdetails = () => {
  //   api.get("user/getcompdetails")
  //     .then(res => {
  //       let companydetails = res.data
  //       console.log(companydetails)
  //     }).catch((res) => {
  //       console.log(res)
  //     })
  // }

  return {
    company
    //getcompdetails
  }
})