<script setup>
import { Dialog, useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/user";
import { onMounted, ref } from "@vue/runtime-core";
import { api } from "../boot/axios";
import { useRoute,useRouter } from "vue-router";
import guest from './../components/guestUserDetails.vue'
import moment from 'moment'
// import filedownload from 'js-file-download'
// import { stringify } from 'postcss';


    const $q = useQuasar();
    const store = useUserStore();
    const { token, admin } = storeToRefs(store);
    const router = useRouter();
    const route = useRoute();
    const rows = ref([]);
    const password = ref();
    var checkpoint = ref(-1);
    var promptdialog = ref(false);
    var tab1 = ref("overview");
    const dialog = ref(false);
    const categoryid = ref()
    const categoryname = ref()
    const totalapplied = ref()
    const thisweek = ref()
    const categorywisequestions = ref()
    const editor = ref(null)
    const switchforedit = ref(true)
    const addnewcategory = ref()
    var show_dialog2 = ref(false)
    const categoryoptions = ref([])
    const selectcategory = ref()
    const question = ref('')
    const controlquestions = ref()
    const setcategoryactive = ref()
     const categoryinstruction= ref()
     
      const categoryquestiontype = ref()
       const categorytimelimit = ref()
    const questiontype = ref([{label : 'MCQ', value : '1'},
                            {label : 'Free' , value: '2'}
                             ])
    const defaultquestiontype = ref('1')
    var editedItem = ref([ {
        question: '',
        options: [],
        answer: '',
        answeralpha: '',
        companyId: '',
        companynew : '',
        categoryId: '',
        qid : ''
      }])
      var defaultediteditem = ref([{
        question : '',
        options : [],
        answer: '',
        answeralpha: '',
        companyId: '',
        companynew : '',
        categoryId: '',
        qid : ''
      }])
      var formdetailedit = ref([{
      }])
      const options = ref([
        {
          value: '0',
          label: '',     
        },
        {
          value: '1',
          label: '',  
        },
        {
          value: '2',
          label: '',
        },
        {
          value : '3',
          label: '',
        }
      ]);
      const defaultoptions = ref([
        {
          value: '0',
          label: '',     
        },
        {
          value: '1',
          label: '',  
        },
        {
          value: '2',
          label: '',
        },
        {
          value : '3',
          label: '',
        }
      ]);
      const defaultquestion = ref('')
      const defaultgroup = ref()
    var tab = ref("allapplicant")
    var customModel = ref("1")
    var group = ref()
    const date1 = moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss')
    const currentdate = moment().format('YYYY-MM-DD HH:mm:ss')
    // var editedItem = ref([
    //   {
    //     candidate_id: "",
    //   },
    // ])
    var editcategories = ref([ {
        category_id : '',
        category : ''
      }])
    onMounted(() => {
      //getMarks();
      
      console.log(route.params.id)
      categoryid.value = route.params.id
      getquestionscategorywise()
      getcategorydetails();
      //getCategories()
    })

    const deletequestion = (qid) => {
      console.log(qid)
      api .post(`api/question/delete`, { questionId : qid} , {
        
  headers: {
    Authorization:  token.value
  }

      }).then((res) => {
        console.log(res)
        //console.log(editedItem.value,defaultediteditem.value)
        editedItem.value =  JSON.parse(JSON.stringify(defaultediteditem.value[0]))
        //console.log(editedItem.value,defaultediteditem.value)
        
        $q.notify({
          type: 'negative',
          message: 'Deleted',
          position:'top-right',
          color: 'red'
        })
        getquestionscategorywise();
      }).catch((res) => {
        console.log(res)
      })
    }
    const getquestionscategorywise = () => {
      console.log(categoryid.value)
      api
          .post(`api/question/get`,{categoryId : categoryid.value},
          {
  headers: {
    Authorization:  token.value
  }
})  .then(async (res) => {
            //let catid = []
            console.log(res.data.categories,admin.value.id)
  let resdata = res.data.categories
  
  // resdata.map(function(val) {
    
    // var result=resdata.filter(obj=> obj.company_id == admin.value.company_id && obj.category_id == categoryid.value);
    //var result=resdata.filter(obj=> obj.companyId == admin.value.id);
    var result=resdata.filter(obj=> obj.categoryId == categoryid.value);
    console.log(result)
    categorywisequestions.value = result.map(x => {
       //return {'qid' : x.question_id, 'question' : x.question , 'options' : x.options , 'answer' : x.answer, 'category_id' : x.category_id ,'company_id' : x.company_id}
       return {'qid' : x.id, 'question' : x.question , 'options' : convertgrpoption(x.options,x.answer) , 'answer' : x.answer, 'categoryId' : x.categoryId ,'companyId' : x.companyId}
       // let obj = {}
      // obj[x.category] = {'qid' : x.question_id, 'question' : x.question , 'options' : convertgrpoption(x.options,x.answer) , 'answer' : x.answer, 'category_id' : x.category_id ,'company_id' : x.company_id}
      // return obj
      // let objectvalue = {'qid' : x.question_id, 'question' : x.question , 'options' : x.options , 'answer' : x.answer, 'category_id' : x.category_id ,'company_id' : x.company_id}
     })
     console.log(categorywisequestions.value)
  // }) 
  })
  
}
const convertgrpoption = (x,answer) => {
  console.log('cmng',x.length,x)
//console.log(answer)
// group.value = answer
 let y = JSON.parse(x)
 //console.log('cmng',y.length)
 let output = []
  for(let i=0; i < y.length; i++){
  
              
      output.push({'label' : y[i], 'value' : JSON.stringify(i)}) 
       
      }
 
 return output
}
    const getcategorydetails = () => {
      //.post(`api/getcategory`,{companyId : admin.value.id}, {
      api
      .post(`api/category/list`,{companyId : JSON.stringify(admin.value.id)}, {
          headers: {
            Authorization:  token.value,
          },
        })
        .then(async (res) => { console.log(res) 

          //let resdata = res.data.categories
          //console.log(resdata)
          let combinedcategories = []
      
      res.data.categories.map((res) => {
        console.log(res)
        combinedcategories.push(res)
      })
       
  
      res.data.commonCategory.map((res) => {
        console.log(res)
        combinedcategories.push(res)
      })
         // var result=responsedata.filter(obj=> obj.companyId == admin.value.id);
        
         let   result=combinedcategories.filter(obj=> obj.id == categoryid.value);
 console.log(result);
 result.map(val => {
          controlquestions.value = val.companyId
          console.log(controlquestions.value, 'dcwecew',val.isActive)
           categoryname.value = val.name
           categoryinstruction.value = val.instruction
           if(val.isActive == 1){
            setcategoryactive.value = true
           } else {
            setcategoryactive.value = false
           }
            
           categoryquestiontype.value = val.questionType
            categorytimelimit.value = val.timeLimit
           //testtitle.value= val.name
           if(val.questionType === 'MCQ'){
            defaultquestiontype.value = '1'
           } else {
            defaultquestiontype.value = '2'
           }
          }) 
        })
    }
    const cardtesting = (questionid) => {
      if(controlquestions.value != 'all'){
        console.log(questionid)
      group.value = questionid.answer
      console.log(group.value )
     switchforedit.value = false
     editedItem.value = Object.assign({}, questionid);
     console.log(editedItem.value)
    //  editor.value = question
      } else {
        alert("You don't have privilege to edit")
      }
      
    } 
    const swapeditquestion = () => {
      switchforedit.value = true
    }
    const swap = () => {
      console.log(defaultquestiontype.value)
    }
    const savequestions = () => {
      let alloptions = []
      let allanswer = null
      let questiontype = null
      if(defaultquestiontype.value == 1){
        questiontype = 'MCQ'
        options.value.map((val) => {
        console.log(val.label)
       //alloptions.push(JSON.stringify(val.label))
       alloptions.push(val.label)
       allanswer = group.value
      })
      } else {
        questiontype = 'FREE'
      }
      console.log(question.value,selectcategory.value,group.value,options.value, options.value.label,options.value.value,alloptions)

      api.post('api/question', {question :  { question : question.value,options:JSON.stringify(alloptions),companyId: admin.value.id,categoryId: categoryid.value,questionType : questiontype,answer :  allanswer} },
    {
  headers: {
    Authorization:  token.value
  }
})
.then((res) => {
  $q.notify({
          type: 'positive',
          message: 'Saved',
          position:'top-right',
          color: 'green'
        })
    console.log(res)
    question.value = defaultquestion.value
    console.log(defaultoptions.value,group.value,options.value)
    options.value = JSON.parse(JSON.stringify(defaultoptions.value))
    group.value = defaultgroup.value
    console.log(defaultoptions.value,group.value,options.value)
    getcategorydetails();
    getquestionscategorywise()
   

})
.catch((res) => {
            
            console.log(res)
            
          })
    }
    const saveedited = () => {
      let alloptions = []
      let allanswer = null
      let questiontype = null
      if(defaultquestiontype.value == 1){
        questiontype = 'MCQ'
        editedItem.value.options.map((val) => {
        console.log(val.label)
       //alloptions.push(JSON.stringify(val.label))
       alloptions.push(val.label)
       allanswer = group.value
      })
      } else {
        questiontype = 'FREE'
      }
      api .put(`api/question`, { question : {questionId :editedItem.value.qid, question : editedItem.value.question,options:JSON.stringify(alloptions),categoryId: categoryid.value,questionType : questiontype,answer :  allanswer,isActive : 1}},
      {
  headers: {
    Authorization:  token.value
  }
})
.then((res) => {
    console.log(res)
    $q.notify({
          type: 'positive',
          message: 'Saved',
          position:'top-right',
          color: 'green'
        })
})
.catch((res) => {
            
            console.log(res)
            
          })
    }
    const changecategorystatus = () => {
      setcategoryactive != setcategoryactive
   
     
    }
    // const getCategories = () => {
    //   $q.loading.show({
    //       message: 'Loading...pls wait..',
    //       boxClass: 'text-white',
    //       spinnerColor: 'white',
    //       spinnerSize: 60
    //     })
    //   api.get("user/getcategory",
    //   {
    //     headers: {
    //       Authorization: 'Bearer' + token.value
    //     }
    //   }).then(async (response) => {
    //     let responsedata = response.data.data
    //     //rows1.value = responsedata
    //       var result=responsedata.filter(obj=> obj.company_id == admin.value.company_id);
 
    //      categoryoptions.value = result.map((x) => { 
    //       //const category = x.category_id
        
      
    //   //array.push(category)
    //     return {'label' : x.category, 'value' : x.category_id }
    //   })
    //   $q.loading.hide() 
       
    //   })
    // }
//     const addCategory = () => {
  
 
//     api.post('user/addcategory',{category : addnewcategory.value, company_id : admin.value.company_id, questiontype : defaultquestiontype.value}
//   ).then(res => {
//     console.log(res)
//     getCategories();
//   }).catch(err => {
//     console.log(err)
//   })

  
// } 
    const rowClick = (evt, rows, index) => {
      console.log("cccc", evt, rows, index);
    };
    const next = () => {
      if(controlquestions.value != 'all')  {
console.log(setcategoryactive)
let active = null
if(setcategoryactive.value == true){
   active = 1
} else {
  active = 0
}
     api .put(`api/category`, { category : {
      id : categoryid.value,
      isActive : active,
      instruction : categoryinstruction.value,
      questionType : categoryquestiontype.value,
      timeLimit : categorytimelimit.value,
      name : categoryname.value
     }},
     {
  headers: {
    Authorization:  token.value
  }
}
     ).then((res) => {
      console.log(res)
      $q.notify({
          type: 'positive',
          message: 'Updated successfully',
          position:'top-right',
          color: 'green'
        })
     }).catch((res) => {
      console.log(res)
     })
    } else {
      setcategoryactive.value = true
      alert('you dont have privilege to modify this')
      console.log(setcategoryactive.value)
    }
      tab1.value = "addquestions";
    };
    const viewdetails = () => {
      dialog.value = true;
    };
    // const getMarks = () => {
    //   $q.loading.show({
    //     message: "Loading...pls wait..",
    //     boxClass: "text-white",
    //     spinnerColor: "white",
    //     spinnerSize: 60,
    //   });
    //   //console.log(token)
    //   api
    //     .get(`analytic/getmarks`, {
    //       headers: {
    //         Authorization: "Bearer " + token.value,
    //       },
    //     })
    //     .then(async (res) => {
    //       $q.loading.hide();
    //       let resdata = res.data.data;
    //       //console.log(resdata,admin.value[0].company_id)
    //       // resdata.forEach(element => {
    //       //   let pp = 1200
    //       //  let ab = pp - element.time
    //       //  const timeLeft = ab;
    //       //     const minutes = Math.floor(timeLeft / 60);
    //       //     let seconds = timeLeft % 60;

    //       //     if (seconds < 10) {
    //       //       seconds = `0${seconds}`;
    //       //     }

    //       //    let cd = `${minutes}:${seconds}`;
    //       //   console.log(cd)
    //       // });

    //       let qw = 0;
    //       resdata = resdata.map(function (val) {
    //         //console.log(val.timepassed)
    //         const pp = 1200;
    //         if (val.selection != 1) {
    //           if (val.marks > 6) {
    //             val.neww = "1";
    //           } else {
    //             val.neww = "0";
    //           }
    //         } else {
    //           val.neww = `${val.selection}`;
    //         }

    //         //  if(val.time === 0)
    //         //  {
    //         //   val.time =1200
    //         //  }
    //         //  else {
    //         // val.qw = pp - val.time
    //         if (
    //           val.timepassed != 0 &&
    //           val.timepassed != null &&
    //           val.timepassed != val.timelimit
    //         ) {
    //           const timeLeft = parseInt(val.timelimit) - parseInt(val.timepassed);
    //           const minutes = Math.floor(timeLeft / 60);
    //           let seconds = timeLeft % 60;

    //           if (seconds < 10) {
    //             seconds = `0${seconds}`;
    //           }

    //           val.timetaken = `${minutes}:${seconds}`;
    //         } else if (val.timepassed == null || val.timepassed == 0) {
    //           val.timetaken = "Invalid";
    //         } else {
    //           const timecheck = parseInt(val.timepassed);
    //           const minutes = Math.floor(timecheck / 60);
    //           let seconds = timecheck % 60;

    //           if (seconds < 10) {
    //             seconds = `0${seconds}`;
    //           }

    //           val.timetaken = `${minutes}:${seconds}`;
    //         }

    //         //console.log('sum',val.timetaken,resdata)
    //         var result = resdata.filter((obj) => obj.company_id == admin.value.company_id && obj.category_id == categoryid.value);
    //         //console.log(result);
    //         //console.log(result.length)
            
            
    //         totalapplied.value = result.length
    //         rows.value = result;

    //         var resultProductData = rows.value.filter(function (a) {
    //           var date = a.date
    //           //console.log(date,date1,currentdate)
    //          return (date >= date1 && date <= currentdate);
            
    //     });
    //     thisweek.value = resultProductData.length
    //     //console.log(resultProductData.length,'dscdsc');
    //         //console.log(rows.value)
    //         //  }
    //       });
        
    //       console.log(rows.value);
    //       //rows.value = resdata
    //     })
    //     .catch((res) => {
    //       $q.loading.hide();
    //     });
    // };
    

    const deleteItem = (item) => {
      promptdialog.value = true;
      checkpoint.value = rows.value.indexOf(item);
      //console.log(checkpoint.value)
      editedItem.value = Object.assign({}, item);
      // const index = data.indexOf(item);
    };
    // const download = (item) => {
    //   console.log(item.candidate_id);
    //   let filename;
    //   api.put("user/getcv", { candidate_id: item.candidate_id }).then((res) => {
    //     console.log(res.data.data);
    //     let response = res.data.data;
    //     filename = response[0].cv;
    //     console.log(response[0].cv);
    //     let url = `user/downloadfile/${filename}`;
    //     let label = filename;
    //     const responsefile = api.post(url).then((res) => {
    //       const linkSource = `data:application/pdf;base64,${res.data}`;
    //       const downloadLink = document.createElement("a");
    //       downloadLink.href = linkSource;
    //       downloadLink.download = filename;
    //       downloadLink.click();
    //       //  const url = window.URL.createObjectURL(new Blob([res.data]));
    //       //           const link = document.createElement('a');
    //       //           link.href = url;
    //       //           if (typeof window.navigator.msSaveBlob === 'function') {
    //       //               window.navigator.msSaveBlob(
    //       //                   res.data,
    //       //                   filename
    //       //               );
    //       //           } else {
    //       //               link.setAttribute('download', filename);
    //       //               document.body.appendChild(link);
    //       //               link.click();
    //       //           }
    //     });
    //   });
    // };

    // const deletecheck = () => {
    //   api
    //     .put(
    //       "user/checkpassword",
    //       { password: password.value },
    //       {
    //         headers: {
    //           Authorization: "Bearer " + token.value,
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       console.log(res);
    //       const result = res.data.data;
    //       if (checkpoint.value > -1) {
    //         confirm("Are you sure you want to delete this result?") &&
    //           api
    //             .delete(`analytic/deleteresults/${editedItem.value.candidate_id}`, {
    //               headers: {
    //                 Authorization: "Bearer " + token.value,
    //               },
    //             })
    //             .then((res) => {
    //               console.log(res);
    //               getMarks();
    //               setDefaultItem();
    //             })
    //             .catch((res) => {
    //               console.log(res);
    //             });
    //       } else {
    //         router.push("/editqstn");
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       alert("paswword did not match");
    //     });
    // };
    const columns = [
      {
        name: "name",
        required: true,
        label: "Name",
        field: "name",
        align: "left",
        style: "width: 200px;font-size: 14px;font-weight:500;font-style: normal",
        headerStyle: "color: #71747D",

        sortable: true,
      },
      // {
      //       name: "action",
      //       label: "Selected",
      //       field: "action", align: 'center',headerStyle:'width:100px;color: #71747D'
      //     },
      {
        name: "marks",
        align: "center",
        label: "Marks",
        field: "marks",
        sortable: true,
        headerStyle: "width:100px;color: #71747D",
      },
      {
        name: "timetaken",
        label: "Duration",
        field: "timetaken",
        align: "center",
        sortable: true,
        headerStyle: "width:100px;color: #71747D",
      },
      {
        name: "date",
        label: "Date & Time",
        field: "date",
        align: "center",
        sortable: true,
        headerStyle: "width:100px;color: #71747D",
      },
      // { name: 'email', label: 'Email',align: 'center', field: 'email' },
      {
        name: "mobile",
        label: "Mobile",
        align: "center",
        field: "mobile",
        headerStyle: "width:100px;color: #71747D",
      },
      {
        name: "lastctc",
        label: "Last Salary",
        align: "center",
        field: "lastctc",
        headerStyle: "width:100px;color: #71747D",
      },
      {
        name: "position",
        label: "Position",
        align: "center",
        field: "position",
        headerStyle: "width:100px;color: #71747D",
      },
      {
        name: "pincode",
        label: "Pincode",
        align: "center",
        field: "pincode",
        headerStyle: "width:100px;color: #71747D",
      },
      {
        name: "actions",
        label: "Actions",
        field: "actions",
        align: "center",
        headerStyle: "width:100px;color: #71747D",
      },
    ];
    const candidatecolumns = [
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,

        sortable: true,
      },
      {
        name: "calories",
        align: "center",
        label: "Age",
        field: "calories",
        sortable: true,
      },
      { name: "fat", label: "Email", field: "fat", sortable: true },
      { name: "carbs", label: "Phone no", field: "carbs" },
      { name: "protein", label: "location", field: "protein" },
      { name: "sodium", label: "Last Salary", field: "sodium" },
      {
        name: "calcium",
        label: "Cv",
        field: "calcium",
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
      },
    ];
    
    const candidaterows = [
      {
        name: "Suresh",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: "14%",
        iron: "1%",
      },
    ];

    const onRowClick = (item) => {
      console.log(item.type);
      editedItem.value = Object.assign({}, item);
      let windowFeatures = "left=200,top=200,width=920,height=520";
      //let route = router.push('/printcanquestions/'+row.candidate_id,
      if (item.type == 1) {
        let route = router.resolve({
          path: "/printcanquestionstwo/" + editedItem.value.candidate_id,

          headers: {
            Authorization: "Bearer " + token.value,
          },
        });
        //console.log(windowFeatures,'kkk')
        window.open(route.href, "mozillaWindow", windowFeatures);
      } else {
        let route = router.resolve({
          path: "/printcanquestions/" + editedItem.value.candidate_id,

          headers: {
            Authorization: "Bearer " + token.value,
          },
        });
        //console.log(windowFeatures,'kkk')
        window.open(route.href, "mozillaWindow", windowFeatures);

        //router.push('/printcanquestions/'+row.candidate_id,
        //       {
        //   headers: {
        //     Authorization: 'Bearer ' + token.value
        //   }
        // })
      }
    };
    const setDefaultItem = () => {
      checkpoint.value = -1;
      password.value = null;
    };
    const close = () => {
      checkpoint.value = -1;
    };
    const reidrect = () => {
      //console.log(checkpoint.value)
      promptdialog.value = true;
    };
    const chckbox = (item) => {
      // $q.loading.show({
      //       message: 'Loading...pls wait..',
      //       boxClass: 'text-white',
      //       spinnerColor: 'white',
      //       spinnerSize: 60
      //     })
      // api.put(`/user/selectupdate/${item}`
      // ).then(res => {
      //   console.log(res)
      //   getMarks();
      //  $q.loading.hide()
      //  }
      // ).catch(res => {
      //   $q.loading.hide()
      //   console.log(res)
      //   })
      //console.log('hai',item)
    }

    //  const deletecan =() => {
    //     //console.log('working')

    //     api
    //       .delete(`analytic/deletecan`, {
    //         headers: {
    //           Authorization: "Bearer " + token.value,
    //         },
    //       })
    //       .then((res) => {
    //         router.push("/welcome");
    //       });
    //   }

    const spacePressed = (e, node)=> {
if (e.target.selectionStart === node.name.length) {
node.name = node.name + ''
} else {
let firstPart = node.name.substring(0, e.target.selectionStart)
let selection = e.target.selectionStart
let secondPart = node.name.substring(
e.target.selectionStart,
node.name.length
)}
    }

   
</script>
<template>
  <q-page
    ><div style="background-color: white" class="test-edit-landing">
      
      <!-- <q-fixed-position corner="top-right">
    <q-btn round color="primary" @click="alert" icon="alarm" />
  </q-fixed-position> -->
      <div
        class="row"
        style="font-size: 19px;padding-left: 19px;padding-bottom: 10px;padding-top: 10px;"
      >
       
        <!-- <span class="button" style="padding-right: 10px">
          <q-btn outline rounded color="green" label="Preview Questions" no-caps/>
          <q-btn
            style="background: #16a34a; color: white"
            label="Test Link"
            rounded
            no-caps
        /> <q-menu>
        <div class="row no-wrap q-pa-md">
          
          <div class="row">
            <div class="text-h7 q-mb-md">Link Expiry</div>
            <q-toggle v-model="mobileData" label="Restricted Access" />
           
          </div>

          <q-separator inset class="q-mx-md" />

          <div class="row items-center">
            
           
            <q-btn
              color="black"
              label="Copy Link"
              flat
              size="md"
              no-caps
              v-close-popup
              icon="link"
            />
          </div>
        </div>
      </q-menu>
      </span> -->
      </div>
      <!-- <q-card class="my-card" flat>
          <q-card-actions align="right">
            <TeleportComp/>
      </q-card-actions> </q-card> -->

      <!-- <div style="font-size:16px;padding-left: 19px">Candidate<span style="padding-left: 450px">Test</span></div> -->
      <div class="q-pa-sm">
        
        <q-tabs
          v-model="tab1"
          align="justify-left"
          indicator-color="green"
          active-color="green"
          
          
        >
          <q-tab class="tabheadernew" name="overview" label="Overview" no-caps />
          <q-tab class="tabheadernew" name="addquestions" label="Add Questions" no-caps />
          <q-tab class="tabheadernew" name="testinstruction" label="Test Instructions" no-caps />
          <!-- <q-tab class="tabheadernew" name="timeandgrade" label="Time&Grade" no-caps />
          <q-tab class="tabheadernew" name="testinstruction" label="Test Instructions" no-caps />
          <q-tab class="tabheadernew" name="results" label="Results" no-caps /> -->
        </q-tabs>
        <q-separator />
        <!-- <div class="align-right">Search</div> -->

        <q-tab-panels v-model="tab1" animated>
          <!-- Overview -->

          <q-tab-panel name="overview">
            <div class="text-h6">Test Description</div>
            <br />
            <div>Test Title</div>
            <div class="q-gutter-y-md column" style="max-width: 530px">
              <q-input
                outlined
                v-model="categoryname"
                color="green"
                placeholder="Enter Test Title"
                dense
               
              />
            </div>
            <br />
            <q-card-section style="max-width: 530px; padding-left: 0px">
              <div>Active</div>
              <div class="row" style="max-width: 530px">
                <span class="buttonfrnext"
                  >
                  <q-toggle size="40px" val="50px" v-model="setcategoryactive"  @update:model-value="changecategorystatus()"
                />
                </span>
              </div>
            </q-card-section>
            <!-- <div>Test Description</div>
            <div class="q-gutter-y-md column" style="max-width: 530px">
              <q-input v-model="text" outlined color="black" />
            </div>
            <br />
            <div>Job Title</div>
            <div class="q-gutter-y-md column" style="max-width: 530px">
              <q-input v-model="text" outlined color="black" />
            </div> -->
            <br />
            <q-card-section  style="max-width: 530px">
             <div class="row">
<span class="buttonfrsave q-gutter-md" style="padding-top:10px"> 
                
                <q-btn
                  class=""
                  label="Save"
                  style="border-radius: 20px; background: #2f9b47; color: white"
                  @click="next()"
                  no-caps
                >
                
                </q-btn>
  
              </span> 
             </div>
              
          
              
            </q-card-section>
          </q-tab-panel>

          <!-- Add Questions -->

          <q-tab-panel name="addquestions">
            <div class="row items-start">
              <div class="q-px-md" style="max-width:420px">
              
                  <q-expansion-item
                  expand-separator
                  default-opened
                  style="width:450px;"
                  :label="categoryname"
                  class="text-h6"
                  
                 > <q-card  class="q-pa-sm q-gutter-sm " style="border-radius:10px" flat  v-for="(qid,question) in categorywisequestions" :key="question" :name="question" :disable ="controlquestions.value === 'all'">
                  <!-- <div class="text-h6" style="padding-top: 5px">Aptitude</div> -->
                  <span class="q-focus-helper"></span> 
                  <q-card-section class="text-black my-box cursor-pointer q-hoverable" style="background:#ECECEC;" @click="cardtesting(qid)" >
                    <div class="text-subtitle2">
                     Q{{ question + 1 }}. {{ qid.question}}
                    </div>
                  </q-card-section>
                </q-card>
               
                   
    </q-expansion-item>
                
                
              </div>
              <div style="padding-left:50px">
                
    <q-card v-if="switchforedit" class="my-card" style="width: 600px;padding-left:10px" flat>
                  <div class="text-h6">Add Questions 
                    <!-- <span class="button q-gutter-sm"><q-btn outline rounded color="green" label="Add new Category" @click="show_dialog2 = !show_dialog2" no-caps></q-btn></span> -->
                    </div>
                  
                  <div class="q-py-md">Question Type</div>
                  <div class="row q-gutter-sm">
                    <q-select
                      style="width: 200px"
                      outlined
                      v-model="defaultquestiontype"
                      dense
                      :options="questiontype"
                      @update:model-value="swap()"
                      emit-value map-options
                     
                    />
                    <!-- <q-select
                      style="width: 200px"
                      outlined
                      v-model="selectcategory"
                      dense
                      :options="categoryoptions"
                      emit-value map-options
                    /> -->
                  </div>
                  <br />
                  <div class=" q-gutter-sm">
                    <!-- <q-editor v-model="question" min-height="5rem"  /> -->
                    <q-input v-model="question" type="textarea" outlined color="green"></q-input>
                  </div> 
                  <!-- {{ group }} {{ options}} {{ options.value }} -->
                  <br />
                  <div v-if="defaultquestiontype == 1">
                    <q-option-group v-model="group" :options="options" >
                      <template v-slot:label="opt">
                        <div class="row items-center">
                          <span style="padding-bottom: 5px; width: 550px"
                            >
                            <q-input 
                            outlined 
                            v-model="opt.label" 
                            dense 
                            color="green"
                            autofocus
                             />
                             
                             </span>
                        </div>
                      </template>
                    </q-option-group>
                    <div>
                      The selected option is considered as correct answer*
                    </div>
                  </div>
                  <br />
                  <br />
                  <div>
                   
                    <q-btn
                      :disable="controlquestions === 'all'"
                      label="save"
                      class="buttonadd"
                      style="border-radius: 20px; background: #2f9b47; color: white"
                      @click="savequestions()"
                    ></q-btn>
                  </div>
                </q-card>
                 
                
                
                <q-card v-else class="my-card" style="width: 600px;padding-left:10px" flat >
                  <div class="text-h6 row">Edit Questions <span class="button q-gutter-sm"><q-btn outline rounded color="green" no-caps label="add new question" @click="swapeditquestion()"></q-btn><q-btn  outline rounded color="red" no-caps label="delete" @click="deletequestion(editedItem.qid)" ></q-btn></span></div>
                  <br />
                  <div class=" q-gutter-sm">
                    <q-editor v-model="editedItem.question" min-height="5rem" />
                  </div>
                  <!-- <div class="q-py-md">Time Title</div>
                  <div class="row q-gutter-sm">
                    <q-select
                      style="width: 200px"
                      outlined
                      v-model="model"
                      dense
                      label="Outlined"
                    />
                    <q-select
                      style="width: 200px"
                      outlined
                      v-model="model"
                      dense
                      label="Outlined"
                    />
                  </div> -->
                  <br />
                  <div> 
                    <!-- {{ group }} {{ editedItem.options }} -->
                    <!-- {{ editedItem.options }}{{ options }} -->
                    <q-option-group v-model="group" :options="editedItem.options" >
                      <template v-slot:label="opt">
                        <div class="row items-center">
                          <span style="padding-bottom: 5px; width: 550px"
                            ><q-input outlined v-model="opt.label" dense
                          /></span>
                        </div>
                      </template>
                    </q-option-group>
                  </div>
                  <br />
                  <br />
                  <div>
                    <q-btn
                      label="save"
                      class="buttonadd"
                      style="border-radius: 20px; background: #2f9b47; color: white"
                      @click="saveedited()"
                    ></q-btn>
                  </div>
                </q-card>
          
              </div>
              <div class="q-pa-md q-gutter-md">
                <q-dialog v-model="show_dialog2" @click="setDefaultcat()">
              <q-card>
                
             <q-card-section style="width: 523px">
             <div class="text-h6">Category</div>
             </q-card-section>
             <div class="row q-px-md q-gutter-sm">
              <q-input v-model="addnewcategory" autogrow placeholder="categoryname" style="width: 200px"></q-input>
                <span>
              <q-select
                      style="width: 200px"
                      outlined
                      v-model="defaultquestiontype"
                      dense
                      :options="questiontype"
                      
                      emit-value map-options
                      
                    />
              </span>  </div>
             
             <q-card-actions align="right">
             <q-btn flat label="SAVE" color="primary" v-close-popup @click="addCategory()" ></q-btn>
             </q-card-actions>
              </q-card>
             </q-dialog>
             </div>
            </div>
          </q-tab-panel>

          <!-- Time and Grade -->

          <q-tab-panel name="timeandgrade">
            <div class="text-h6">Time Settings</div>
            <div>Time Title</div>
            <div class="page-container window- row">
              <q-select
                style="width: 200px"
                outlined
                v-model="model"
                dense
                label="Outlined"
              />
              <q-select
                style="width: 200px"
                outlined
                v-model="model"
                dense
                label="Outlined"
              />
            </div>
            <br />
            <q-separator />
            <q-card-section style="max-width: 530px; padding-left: 0px">
              <div class="text-h6">Pass percentage settings</div>
              <div class="row" style="max-width: 530px">
                Set pass Percentage<span class="buttonfrnext"
                  ><q-toggle size="40px" val="50px"
                /></span>
              </div>
            </q-card-section>

            <div class="page-container window- row">
              <q-select
                style="width: 200px"
                outlined
                v-model="model"
                dense
                label="Outlined"
              />
              <q-select
                style="width: 200px"
                outlined
                v-model="model"
                dense
                label="Outlined" 
              />
            </div>
            <br />
            <q-separator />
            <q-card-section style="max-width: 530px; padding-left: 0px">
              
              <div class="row" style="max-width: 530px">
                <q-icon name="shuffle" size="sm"></q-icon><span><p style="padding-left:5px">Shuffle Questions For Each Candidate</p> <q-toggle class="buttonfrshuffle" size="40px" val="50p" /></span>
              </div>
            </q-card-section>

            <br />
          </q-tab-panel>

          <!-- Test Instruction -->

          <q-tab-panel name="testinstruction" class="test-info">
            <div class="title">Test Description</div>
            <div class="q-gutter-y-md column" style="max-width: 530px">
              <q-input v-model="text" outlined color="green" />
            </div>
            <br />
            <div class="title">Candidate Form</div>
            <div class="q-pa-md row items-start q-gutter-md">
              <q-card class="my-card" flat>
                <q-card-section>
                  <div class="page-container window- row q-gutter-lg">
                    <q-input
                      style="width: 340px; height: 40px"
                      outlined
                      v-model="text"
                      dense="dense"
                    />
                    <q-input
                      style="width: 194px; height: 40px"
                      outlined
                      v-model="text"
                      dense="dense"
                    />
                  </div>
                  <br />
                  <div class="page-container window- row q-gutter-lg">
                    <q-input
                      style="width: 340px; height: 40px"
                      outlined
                      v-model="text"
                      dense="dense"
                    />
                    <q-input
                      style="width: 194px; height: 40px"
                      outlined
                      v-model="text"
                      dense="dense"
                    />
                  </div>
                  <br />
                  <div class="page-container window- row q-gutter-lg">
                    <q-input
                      style="width: 340px; height: 40px"
                      outlined
                      v-model="text"
                      dense="dense"
                    />
                    <q-input
                      style="width: 194px; height: 40px"
                      outlined
                      v-model="text"
                      dense="dense"
                    />
                  </div>
                  <br />
                  <div class="page-container window- row q-gutter-lg">
                    <q-input
                      style="width: 340px; height: 40px"
                      outlined
                      v-model="text"
                      dense="dense"
                    />
                    <q-input
                      style="width: 194px; height: 40px"
                      outlined
                      v-model="text"
                      dense="dense"
                    />
                  </div>
                  <br />
                  <div class="page-container window- row q-gutter-lg">
                    <q-input
                      style="width: 340px; height: 40px"
                      outlined
                      v-model="text"
                      dense="dense"
                    />
                    <q-input
                      style="width: 194px; height: 40px"
                      outlined
                      v-model="text"
                      dense="dense"
                    />
                  </div>
                  <br />
                  <div class="button candidate-btn-save">
                    <q-btn
                      class="buttonfrsave"
                      label="save"
                      style="border-radius: 20px; background: #2f9b47; color: white"
                      @click="next()"
                    ></q-btn>
                  </div>
                </q-card-section>
              </q-card>

              <q-card
                class="my-card text-black"
                style="background: #f7f7f8; width: 400px"
              >
                <q-card-section>
                  <div class="row">
                    <p>CV</p>
                    <span><p style="padding-left: 80px">File upload settings</p></span>
                  </div>
                  <q-separator />
                  <div class="row">
                    Set pass Percentage<span class="toggle"
                      ><q-toggle size="40px" val="50px"
                    /></span>
                  </div>
                  <br />
                  <div>Accepted Formats</div>
                  <div class="q-gutter-sm">
                    <q-checkbox dense v-model="teal" label="pdf" color="black" /><span
                      style="padding-left: 200px"
                      ><q-checkbox dense v-model="orange" label="DOC" color="black"
                    /></span>
                  </div>
                  <br />
                  <div class="q-gutter-sm">Max. File Size</div>
                </q-card-section>

                <q-card-section class="q-pt-none"> </q-card-section>
              </q-card>
            </div>
          </q-tab-panel>

          <!-- Results -->

          <q-tab-panel name="results">
            <div class="q-pa-sm row items-start q-gutter-md">
              <q-card class="new-card" flat bordered>
                <q-card-section>
                  <div class="cardtitle">Total Applicants</div>
                  <div class="text-h6">{{totalapplied}}</div> <!-- total applied -->
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-icon name="arrow_upward" color="green"></q-icon> {{ thisweek }} this week
                </q-card-section>
              </q-card>
              <q-card class="new-card" flat bordered>
                <q-card-section>
                  <div class="cardtitle">Total Cleared</div>
                  <div class="text-h6">13211</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-icon name="arrow_upward" color="green"></q-icon> 10 this week
                </q-card-section>
              </q-card>
              <q-card class="new-card" flat bordered>
                <q-card-section>
                  <div class="cardtitle">Total Questions</div>
                  <div class="text-h6">10 Questions</div>
                </q-card-section>

                <q-card-section class="q-pt-none"> 3 sections </q-card-section>
              </q-card>
              <q-card class="new-card" flat bordered>
                <q-card-section>
                  <div class="cardtitle">Time Limit</div>
                  <div class="text-h6">20 Mnts</div>
                </q-card-section>

                <q-card-section class="q-pt-none"> 210 this week </q-card-section>
              </q-card>
            </div>
            <div class="q-pa-md">
              <div class="text-h6">Candidate Details</div>

              <q-tabs
                v-model="tab"
                align="justify-left"
                active-bg-color="black"
                rounded
                active-class="text-white bg-black"
                dense
                indicator-color="transparent"
                switch-indicator
              >
                <q-tab
                  class="tabheader"
                  name="topperformer"
                  label="Top Performers"
                  no-caps
                />&nbsp;&nbsp;
                <q-tab
                  class="tabheader"
                  name="allapplicant"
                  label="All Applicant"
                  no-caps
                />&nbsp;&nbsp;
                <q-tab
                  class="tabheader"
                  name="shortlisted"
                  label="Shortlisted"
                  no-caps
                />&nbsp;&nbsp;
                <q-tab class="tabheader" name="selected" label="Selected" no-caps />
                <!-- <span style="padding-left:500px">Search</span> -->
              </q-tabs>

              <!-- <div class="align-right">Search</div> -->

              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="topperformer">
                  <div class="text-h6">Top Performers</div>
                </q-tab-panel>

                <q-tab-panel name="allapplicant">
                  <q-table
                    title=""
                    :rows="rows"
                    :columns="columns"
                    row-key="name"
                    @click="rowClick(rows)"
                    :rows-per-page-options="[15]"
                    flat
                    table-header-style="background-color:#FCFCFC;"
                  > 
                    <!-- <template v-slot:top>
          <q-btn dense color="secondary" label="Add Question" @click="show_dialog = !show_dialog" no-caps></q-btn><br/>
          <q-btn dense color="primary" label="Go To Questions" @click="reidrect()" no-caps></q-btn>
          
          </template> -->
                    <template v-slot:body="props">
                      <q-tr :props="props">
                        
                        <q-td key="name" :props="props">
                          {{ props.row.name }} <br />
                          <div class="email">{{ props.row.email }}</div>
                        </q-td>
                        <!-- <q-td key="action" :props="props" style="width:131px">
          <q-btn v-if="props.row.neww === '1'" text-color="green" text="Print" icon="check"  flat round dense></q-btn>
          
            </q-td> -->
                        <!-- <q-btn v-else text-color="red" icon="clear"  flat round dense></q-btn> -->
                        <!-- <q-checkbox
            @update:model-value = "chckbox(props.row.candidate_id)"
        v-model="props.row.neww"
        color="green"
        label=""
        true-value="1"
        false-value="0"
      /> -->
                        <q-td key="marks" :props="props">
                          {{ props.row.marks }} <br />
                          <q-btn
                            color="green"
                            label="View marksheet"
                            @click="onRowClick(props.row)"
                            flat
                            dense
                            no-caps
                          ></q-btn>
                        </q-td>
                        <q-td key="timetaken" :props="props">
                          {{ props.row.timetaken }}
                        </q-td>
                        <q-td key="date" :props="props">
                          {{ props.row.date }}
                        </q-td>
                        <!-- <q-td key="email" :props="props">
            {{ props.row.email }}
           
          </q-td> -->
                        <q-td key="mobile" :props="props">
                          {{ props.row.mobile }}
                        </q-td>
                        <q-td key="lastctc" :props="props">
                          {{ props.row.lastctc }}
                        </q-td>
                        <q-td key="position" :props="props">
                          {{ props.row.position }}
                        </q-td>
                        <q-td key="pincode" :props="props">
                          {{ props.row.pincode }}
                        </q-td>
                        <q-td key="actions" :props="props" style="width: 131px">
                          <!-- <q-btn text-color="green" text="Print" icon="print"  @click="onRowClick(props.row)" flat round dense></q-btn> -->
                          <q-btn
                            text-color="red"
                            icon="delete_forever"
                            @click="deleteItem(props.row)"
                            flat
                            round
                            dense
                          ></q-btn>
                          <q-btn
                            type="a"
                            text-color="blue"
                            icon="file_download"
                            @click="download(props.row)"
                            flat
                            round
                            dense
                          ></q-btn>
                          <q-btn
                            text-color="green"
                            icon="portrait"
                            @click="viewdetails(props.row)"
                            flat
                            round
                            dense
                          ></q-btn>
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </q-tab-panel>

                <q-tab-panel name="shortlisted">
                  <div class="text-h6">Shortlisted</div>
                </q-tab-panel>
                <q-tab-panel name="selected">
                  <div class="text-h6">selected</div>
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
      <q-dialog v-model="dialog" position="right" full-height>
        <q-card style="width: 400px">
          <q-card-section class="row items-center no-wrap">
            <div>
              <div class="text-weight-bold">Candidate Details</div>
            </div>

            <q-space />
          </q-card-section>
          <q-separator />
          <div style="padding-left: 10px">Personal Details</div>

          <q-table
            class="my-sticky-column-table"
            :rows="candidaterows"
            :columns="candidatecolumns"
            row-key="name"
            hide-header
            hide-bottom
            separator="none"
            grid
            ><template v-slot:item="props">
              <div>
                <q-card
                  :class="props.selected ? 'bg-grey-2' : ''"
                  style="width: 377px; height: 260px"
                  flat
                >
                  <q-list dense class="list">
                    <q-item
                      v-for="col in props.cols.filter((col) => col.name !== 'desc')"
                      :key="col.name"
                    >
                      <q-item-section side>
                        <q-item-label>{{ col.label }}</q-item-label>
                      </q-item-section>
                      <q-item-section style="align-items: flex-end">
                        <q-item-label>{{ col.value }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card>
              </div>
            </template>
          </q-table>
          <q-separator /><br />
          <div class="test" style="padding-left: 10px">Test Performance</div>

          <div class="q-pa-sm">
            <div class="row">
              <p class="marks">Marks scored</p>
              <p class="button" style="padding-right: 5px">7/10</p>
            </div>

            <q-linear-progress size="5px" rounded :value="0.7" color="green" />
            <div class="row q-pt-md">
              <p class="marks">Total Time Taken</p>
              <p class="button" style="padding-right: 5px;">14:12 mnts</p>
            </div>
          </div>
          <q-separator /><br>
          <div class="test" style="padding-left: 10px">Notes</div>
          <div class="q-pa-md">
            <q-input
        v-model="textareaModel"
        
        type="textarea"
        color="green"
        placeholder="Add Notes for you and your team"
        outlined
      />
          </div>
          <q-separator /><br>
          <q-btn flat label="view test sheet" text-color="green"></q-btn>
        </q-card>
      </q-dialog>
      <div class="q-pa-sm q-gutter-md">
        <q-dialog v-model="promptdialog" persistent>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">Password</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input
                dense
                v-model="password"
                autofocus
                @keyup.enter="promptdialog = false"
              />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup @click="close()" />
              <q-btn flat label="Enter" v-close-popup @click="deletecheck()" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div></div
  ></q-page>
</template>


<style>
/* .normal {
  font-weight: 400;
  font-size: 14;
} */
/* .marks {
  font-weight: 400;
  font-size: 14px;
  color: #7a7a7a;
  line-height: 100%;
  letter-spacing: -0.004em;
} */
/* .test {
  font-weight: 500;
  font-size: 16px;
  color: #383838;
} */


.cardtitle {
  font-style: normal;
  font-size: 14px;
  font-weight: 500;
  color: #71747d;
}
.tabheader {
  font-style: normal;
  font-size: 14px;
  font-weight: 500;
  color: #383838;
  background-color: #f3f3f3;
  border-radius: 30px;
}
.email {
  font-style: normal;
  font-size: 14px;
  font-weight: 500;
  color: #71747d;
}
.header {
  font-style: normal;
  font-size: 14px;
  font-weight: 500;
  color: #71747d;
}
.q-card__section--vert {
  padding: 19px;
}
.q-card {
  border-radius: 6px;
}
.align-right {
  text-align: right;
  border: 0;
}
</style>
<style lang="sass" scoped>
.new-card
  width: 100%
  max-width: 250px
</style>
<style scoped>
.button {
  position: absolute;
  right: 0;
  
}
.q-textarea .q-field__control {
    min-height: 41px;
    height: auto;
}
.list {
  padding: 12px 12px;
}
.toggle,
.buttonfrsave {
  position: absolute;
  right: 0px;
  bottom: 20px;
}
.buttonfrshuffle{
  position: absolute;
  bottom: 20px;
  right: 0px;
}

.buttonfrnext,
.buttonadd {
  position: absolute;
  bottom: 5px;
  right: 0px;
}
</style>
