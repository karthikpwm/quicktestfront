<template>
  <div class="q-pa-md">
    <div style="max-width: auto">
      <q-tabs
        v-model="tab"
        align="justify"
        narrow-indicator
        class="q-mb-lg"
      >
      <q-tab class="text-orange" name="questions" label="questions" />
      <q-tab class="text-teal" name="category" label="New Category" />
      <!-- <q-tab class="text-blue" name="testing" label="Testing" /> -->
        
      </q-tabs>
      <div class="q-gutter-y-sm" >
        <q-tab-panels
          v-model="tab"
          transition-prev="scale"
          transition-next="scale"
          class="bg-white text-white text-center"
        >
      
      <q-tab-panel name="questions">
          
      <q-table
      title="List Of Questions"
      :data="resdata"
      :rows="rows"
      auto-width
      wrap-cells
      :columns="columns"
      row-key="question"
      binary-state-sort
      :rows-per-page-options="[10]"
      :visible-columns="visiblecolumns"
    >
     <template v-slot:top>
          <!-- <q-btn dense color="secondary" label="Add Question" @click="show_dialog = !show_dialog" no-caps></q-btn><br/> -->
          <q-btn dense color="primary" label="Add new Question" @click="show_dialog1 = !show_dialog1" no-caps></q-btn>
          <q-space />
          <q-select
          v-model="visibleColumns"
          @update:model-value="getQuestion()"
          outlined
          dense
          options-dense
          
          emit-value
          map-options
          :options="categoryoptions"
          style="min-width: 150px"
        />
        <div class="q-pa-md q-gutter-md">
        <q-dialog v-model="show_dialog">
        <q-card class="qcard row justify-center">
          <q-card-section style="width: 623px">
            <div class="text-h6">Edit question</div>
          </q-card-section>

          <q-card-section style="width: 621px">
            <div class="row justify-center" style="width: 600px">
              <q-input v-model="editedItem.question" autogrow label="Question" style="width: 400px"></q-input>
              </div>
            <div class="row justify-center">
            <q-input v-for="(value,index) in editedItem.options" :key="index" :val="value" v-model="editedItem.options[index]" autogrow :label="'option ' + numberToChar(index)" style="width: 400px"></q-input> 
            </div>
           <!-- <div class="row"><q-input v-model="editedItem.answeralpha" label="answer"></q-input></div> -->
           <div class="row justify-center"  ><q-select style="width: 400px" v-model="editedItem.answeralpha" :options="answeroptions" label="Answer" emit-value map-options/></div>
           <!-- <div class="row"><q-select disable style="width: 400px" v-model="editedItem.category" :options="categoryoptions" label="category" emit-value map-options/></div> -->
           <!-- <div class="row"><q-input v-model="editedItem.company_id" label="company"></q-input></div> -->
           <!-- <div class="row"><q-select style="width: 400px" v-model="editedItem.companynew" :options="companyoptions" label="Company" emit-value map-options/></div> -->
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="SAVE" color="primary" v-close-popup @click="addRow()" ></q-btn>
          </q-card-actions>
          </q-card>
    </q-dialog>
          </div>  <br/>
            
        <div class="q-pa-sm q-gutter-md">
        <q-dialog v-model="show_dialog1" @before-show="setDefaultFind()" >
        <q-card class="qcard row justify-center">
          <q-card-section style="width: 623px">
            <div class="text-h6">Add New Question</div>
          </q-card-section>

          <q-card-section style="width: 621px">
            <div class="row justify-center" style="width: 600px">
              <q-input v-model="additem.question" autogrow label="Question" style="width: 360px"></q-input>
              </div>
              <!-- {{finds}} --><br/>
            <div class="row justify-center" v-for="(_,index) in finds.options" :key="index">
            <!-- {{finds[index]}} -->
            <q-input v-model="finds.options[index]" autogrow label="Options" style="width: 350px" > </q-input>
            <q-btn class="gt-xs" size="12px" flat dense icon="clear" @click="deleteVisa(index)" />
            </div>
            <div class="row justify-center" style="padding-top:3px">
            <q-btn color="primary" @click="addnewitem()" >
            Add Option
            </q-btn></div>
           <!-- <div class="row"><q-input v-model="editedItem.answeralpha" label="answer"></q-input></div> -->
           <div class="row justify-center"  ><q-select style="width: 250px" v-model="additem.answeralpha" :options="answeroptions" label="Answer" emit-value map-options/></div>
           <div class="row justify-center"  ><q-select style="width: 250px" v-model="additem.category" :options="categoryoptions" label="Category" emit-value map-options/></div>
           <!-- <div class="row"><q-input v-model="editedItem.company_id" label="company"></q-input></div> -->
           <!-- <div class="row justify-center"><q-select style="width: 250px" disable v-model="additem.companynew" :options="companyoptions" label="Company" emit-value map-options/></div> -->
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="SAVE" color="primary" v-close-popup @click="addRow()" ></q-btn>
          </q-card-actions>
          </q-card>
    </q-dialog>
          </div>
          <div class="q-pa-sm q-gutter-md">
            <q-dialog v-model="promptdialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Password</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="password" autofocus @keyup.enter="promptdialog = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Enter" v-close-popup  @click="deletecheck()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

          </div>
         
      </template>
      <!-- <template v-slot:top-right>
       <q-btn dense color="secondary" label="Add new Question" @click="show_dialog1 = !show_dialog1" no-caps></q-btn>
        
      </template> -->
      <template v-slot:body="props">
      
        <q-tr :props="props">
        
          <q-td key="question" :props="props">
            {{ props.row.question }}
            <!-- <q-popup-edit v-model="props.row.question" v-slot="scope">
              <q-input type="textarea" v-model="scope.value" dense autofocus  />
            </q-popup-edit> -->
          </q-td>
          <q-td key="modifyoptions" :props="props">
            {{ props.row.modifyoptions }}
            <!-- <q-popup-edit v-model="props.row.options" title="Update Options" buttons v-slot="scope">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit> -->
          </q-td>
          <q-td key="answer" :props="props">
            {{ props.row.answeralpha }}
            <!-- <q-popup-edit v-model="props.row.answeralpha" v-slot="scope">
              <q-input type="textarea" v-model="scope.value" dense autofocus />
            </q-popup-edit> -->
          </q-td>
          <q-td key="category" :props="props">
            {{ props.row.category }}
            <!-- <q-popup-edit v-model="props.row.companynew" title="Update Company" buttons persistent v-slot="scope">
              <q-input type="number" v-model="scope.value" dense autofocus hint="Use buttons to close" />
            </q-popup-edit> -->
          </q-td>
          <q-td key="actions" :props="props" style="width:131px">
              <q-btn text-color="blue"  icon="edit"  @click="editItem(props.row)" flat round dense></q-btn>
              <q-btn text-color="red" icon="delete_forever"  @click="deleteItem(props.row)" flat round dense></q-btn>
            </q-td>
          <!-- <q-td key="protein" :props="props">{{ props.row.protein }}</q-td>
          <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>
          <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>
          <q-td key="iron" :props="props">{{ props.row.iron }}</q-td> -->
        </q-tr>
      </template>
      <template>
        
      </template>
    </q-table>
    
          </q-tab-panel>

          </q-tab-panels>
          <q-tab-panels
          v-model="tab"
          animated
          transition-prev="fade"
          transition-next="fade"
          class="bg-white text-black text-center"
        >
        <q-tab-panel name="category">
          <q-table
       title="categories"
      :data="responsedata"
      :rows="rows1"
      auto-width
      wrap-cells
      :columns="columns1"
      row-key="category"
      binary-state-sort
      :rows-per-page-options="[10]"
    >
            <template v-slot:top>
              
             <q-btn dense color="primary" label="Add new Category" @click="show_dialog2 = !show_dialog2" no-caps></q-btn>
             
             <div class="q-pa-md q-gutter-md">
                <q-dialog v-model="show_dialog2" @click="setDefaultcat()">
              <q-card>
             <q-card-section style="width: 523px">
             <div class="text-h6">Category</div>
             </q-card-section>

             <q-card-section style="width: 421px">
             <div class="row" style="width: 400px">
              <q-input v-model="editcategories.category" autogrow label="Category Name" style="width: 200px"></q-input>
              </div>
              </q-card-section>
             <q-card-actions align="right">
             <q-btn flat label="SAVE" color="primary" v-close-popup @click="addCategory()" ></q-btn>
             </q-card-actions>
              </q-card>
             </q-dialog>
             </div>
            </template>
           <template v-slot:body="props">
            <q-tr :props="props">
            <q-td key="category" :props="props">
            {{ props.row.category }}
           
             </q-td>
             <!-- <q-td key="company" :props="props">
            {{ props.row.company_id }}
            
              </q-td> -->
              <q-td key="actions" :props="props" style="width:131px">
              <q-btn text-color="blue"  icon="edit"  @click="editcategory(props.row)" flat round dense></q-btn>
              <q-btn text-color="red" icon="delete_forever"  @click="deletecategory(props.row)" flat round dense></q-btn>
            </q-td>
              </q-tr>
              </template>
          </q-table>

          </q-tab-panel>
          </q-tab-panels>
          <!-- <q-tab-panels
          v-model="tab"
          animated
          transition-prev="fade"
          transition-next="fade"
          class="bg-white text-black text-center"
        >
        <q-tab-panel name="testing">

            
  <div class="q-pa-md" style="max-width: auto">
    <q-list bordered class="rounded-borders">
      

      <q-separator />

      

      <q-expansion-item v-for="product in products" :key='product.id'>
        <template v-slot:header>
          <q-item-section avatar>
            
          </q-item-section>

          <q-item-section style="text:bold">
           {{product[0].category}}
          </q-item-section>
        </template>

        <q-card  >
          <q-card-section  v-for="(question,index) in product" :key="index"> 
           Question : {{ question.question}}, <br>
           Options : {{ question.options}}, <br>
           Answer  :  {{ question.answeralpha}}
            
          </q-card-section>
        </q-card>
        <q-separator />
       
  <div class="q-pa-md">
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </div>

      </q-expansion-item>
    </q-list>
  </div>
          </q-tab-panel>
          </q-tab-panels> -->
          </div>
    </div>
    
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../store/user'
import { useCompanyStore } from '../store/company'
import {onMounted, ref } from 'vue'
import { api } from '../boot/axios';
import { useRouter } from 'vue-router'
import { AddressbarColor,useQuasar } from 'quasar';


export default {
  data()
{
  
  return {
  
  
  }
},
  setup () {
    const $q = useQuasar()
    const store = useUserStore()
    const store2 = useCompanyStore()
    const { token,admin} = storeToRefs( store )
    const {company} = storeToRefs(store2)
    const router = useRouter()
    var show_dialog = ref(false)
    var show_dialog1 = ref(false)
    var show_dialog2 = ref(false)
    var promptdialog = ref(false)
    var editedIndex = ref(-1)
    var categoryname = ref()
    var editcategoryid = ref()
    const categoryoptions = ref([])
    const finds = ref({})
    const products = ref([])
    const visibleColumns = ref()
    const password = ref()
    const numberToChar = (number) => {
      if(number === null) {
        return null
      }
      return String.fromCharCode(number+65)
    }
    const isNumber = (char) => {
  return /^\d$/.test(char);
}
    var editedItem = ref([ {
        question: '',
        options: [],
        answer: '',
        answeralpha: '',
        company_id: '',
        companynew : '',
        category: ''
      }])
    var additem = ref([ {
        question: '',
        options: '',
        answer: '',
        answeralpha: '',
        company_id: '',
        companynew : '',
        category: '',
        category_id: ''
      }])
      var editcategories = ref([ {
        category_id : '',
        category : ''
      }]) 
      const defaultItem = ref({
        question: '',
        options: [''],
        answeralpha: '',
        companynew: null,
        
      })
      const defaultcat = ref({
        category_id : '',
        category : ''
      })
      const addnewitem = () => {
        if(finds.value.options.length < 4)
        {
          //console.log("looooo")
        //console.log(additem)
        finds.value.options.push('')
        //console.log(finds.value.options.length)
        }
        
      }
     const setDefaultItem = () => {
      editedItem.value = ref(Object.assign({}, defaultItem)) 
      editedIndex.value = -1

     }
     const setDefaultcat = () => {
      //console.log('aa')
       editcategories.value = ref(Object.assign({}, defaultcat))
       
     }
    const rows = ref([])
    const rows1 = ref([])
    const setDefaultFind = () => {
       additem.value = Object.assign({}, defaultItem.value)
      //console.log('working', defaultItem.value)
      finds.value = Object.assign({}, defaultItem.value)
      //console.log(finds.value)
      finds.value.options = ['']
      //console.log(finds.value.options)
    }
    const clearinputvalue = () => {
       additem.value = Object.assign({}, defaultItem.value)
      //  finds.value.options.splice(0, options.length)
      //console.log(finds.value)
      finds.value.options = ['']
      //console.log(finds.value.options)
    }
    const sample = () => {
//console.log(visibleColumns.value)
    }
   function deleteVisa(index){
      finds.value.options.splice(index,1);
}
    const getQuestion = () => {
      //console.log(visibleColumns.value)
      api
          .get(`analytic/getallqstns`,
          {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
})
          .then(async (res) => {
            //let catid = []
  let resdata = res.data.data
  
  resdata.map(function(val) {
    val.answeralpha = numberToChar(val.answer)
     //console.log(JSON.parse(val.options))
     const options = JSON.parse(val.options) 
    
     val.modifyoptions = options.toString();
      //console.log(val.modifyoptions)
      //val.companynew = company.value.name
    // if(val.category_id) {
    //       let ab =  val.category_id
    //       catid.push(ab)
          
          // var ns = ['.NS,']
        
        //let joSymbol = symbol.join(ns)
        
        //console.log('joooo',joSymbol)
          // }
          
      //console.log(catid)
    // api.get
  })
//  let uniqueChars = [...new Set(catid)];
           //console.log(resdata)
           //console.log(admin.value.company_id)
//           api.get(`user/getcategory/${uniqueChars}`).then(res => { console.log(res)})
    
//&& obj.category_id == undefined || obj.category_id === visibleColumns.value
    var result=resdata.filter(obj=> obj.company_id == admin.value.company_id);
 //console.log(result);
 //console.log(company.value.name)
  //rows.value = resdata
  let array = []
  result.map((x) => { 
          const category = x.category_id
      array.push(category)
      })
      if( visibleColumns.value == undefined)
      {
       visibleColumns.value = array[0]
      }
      
      //console.log(visibleColumns.value)
      var result100 = result.filter(obj => obj.category_id == visibleColumns.value)
  rows.value = result100
  
  getCategories();
  // const categories = {};
  
  //  result.map(x => {
  //     const category = x.category
     
  //     if(categories[category] === undefined)
  //     categories[category] = []
      
  //     categories[category].push(x)
      
  //   })
    // console.log(categories)
    // products.value = categories
//  var data = result.filter((obj, pos, arr) => {
//             return arr.map(mapObj =>
//                   mapObj.category).indexOf(obj.category) == pos;
//             });
//             console.log(data);
            
//             var filtercategory = data.map((x) => { 
            

//         return  x.category 
//       })
    //   console.log(filtercategory)
    //   for (let i = 0; i < filtercategory.length; i++) {
    //     var newfilter  = result.filter(obj => obj.category == filtercategory[i])

    //  console.log(newfilter)
    //   }
     
    //     var i = 0
    //  products.value = data.map((x) => {
    //     i++;
    //    return {'id' : i, 'name': x.category}
    //  })
     
          })

    }
    const getCategories = () => {
      $q.loading.show({
          message: 'Loading...pls wait..',
          boxClass: 'text-white',
          spinnerColor: 'white',
          spinnerSize: 60
        })
      api.get("user/getcategory",
      {
        headers: {
          Authorization: 'Bearer' + token.value
        }
      }).then(async (response) => {
        let responsedata = response.data.data
        //rows1.value = responsedata
          var result=responsedata.filter(obj=> obj.company_id == admin.value.company_id);
 //console.log(result);
 rows1.value  = result
 //let array = []
         categoryoptions.value = result.map((x) => { 
          //const category = x.category_id
        
      
      //array.push(category)
        return {'label' : x.category, 'value' : x.category_id }
      })
      $q.loading.hide() 
       //visibleColumns.value = array[0]
         //console.log(categoryoptions.value)
      })
    }
     onMounted(() => {
      
      getQuestion(); 
      //getCategories();     
      //console.log(token)
  })
 
const addRow = () => {
    //console.log(editedItem.value)
    //console.log(editedIndex.value)
    //console.log(editedItem.value.answeralpha)
    //console.log(editedItem.value.companynew)
   
    // let alphaanswer = editedItem.value.answeralpha
    // alphaanswer = numberToChar(alphaanswer)
    // console.log(alphaanswer)
    if(editedIndex.value > -1)
    {
       let changecompany = isNumber(editedItem.value.companynew)
    let newcompany = ref()
    let newanswer = ref()
    //console.log('haaai',changecompany)
    if(changecompany == false)
    {
      // newcompany.value = numberToChar(editedItem.value.companynew)
      if(editedItem.value.companynew === 'PWM')
      {
        newcompany.value = 1
       // console.log('pwm coming', newcompany.value)
      }
      else if (editedItem.value.companynew === 'SHAKTHI'){
         newcompany.value = 2
         //console.log('shakthi coming', newcompany.value)
      }
    }
    else {
     newcompany.value = editedItem.value.companynew
     //console.log('original coming', newcompany.value)
    }
    let changeanswer = isNumber(editedItem.value.answeralpha)
    if(changeanswer == false){
        // newanswer.value = numberToChar(editedItem.value.answeralpha)
        if(editedItem.value.answeralpha === 'A')
        {
          newanswer.value = 0
        }
        else if(editedItem.value.answeralpha === 'B')
        {
          newanswer.value = 1
        }
        else if(editedItem.value.answeralpha === 'C')
        {
          newanswer.value = 2
        }
        else if(editedItem.value.answeralpha === 'D')
        {
           newanswer.value = 3
        }
    }
    else 
    {
      newanswer.value = editedItem.value.answeralpha
    }
    //category_id:editedItem.value.category
    //console.log(editedItem.value.options)
    let editoptions = JSON.stringify(editedItem.value.options)
      api.put(`analytic/editqstn/${editedItem.value.question_id }`, {question : editedItem.value.question,options: editoptions, answer: newanswer.value,company_id:admin.value.company_id},
      {
   headers: {
     Authorization: 'Bearer ' + token.value
   }
 }).then(() => {
  setDefaultItem();
  getQuestion();
 }).catch((res) => {
           
            // console.log(res)
            
           })
    }
    else{
     let ab = finds.value.options
     let up =  ab.lastIndexOf("")
     //console.log(ab)
      if( additem.value.question != '' && up == -1 && ab.length !== 0 && additem.value.answeralpha != '' && additem.value.answeralpha != undefined && additem.value.category !=''&& additem.value.category != undefined )
      {
   
   
   
    // const split_string = ab.split(" ");
    //  console.log(split_string)
     let adc = JSON.stringify(ab)
    // let newanswer = numberToChar(editedItem.value.answeralpha)
    //console.log(additem.value)
    api.post('analytic/insertqstn', {question :additem.value.question ,options:adc,answer : additem.value.answeralpha,company_id: admin.value.company_id,category_id: additem.value.category},
    {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
})
.then(() => {
  clearinputvalue();
  getQuestion();
})
.catch((res) => {
            
            console.log(res)
            
          })
    }
    else {
      alert('Empty Fields are not allowed')
    }
    }
    
//       if (editedIndex > -1) {
//         Object.assign(this.data[editedIndex], editedItem);
//       } else {
//         console.log(editedItem);
//       }
//       this.close()
    
}
const deletecategory = (item) => {
  //console.log('hi',item)
  let catid = Object.assign({}, item);
  confirm("Are you sure you want to delete this Category?") && api.delete(`analytic/deletecategory/${catid.category_id}`,{
   headers: {
     Authorization: 'Bearer ' + token.value
   }
 }).then(() => {
  getCategories();
  getQuestion();
 }).catch((res) => {
            
             console.log(res)
            
           })
  //console.log(catid.category_id)
}
const editcategory = (item) => {
  editedIndex.value = rows1.value.indexOf(item)
  editcategories.value = Object.assign({}, item);
  //console.log(editcategories.value.category_id)
  show_dialog2.value = true
}
const deletecheck = () => {
  console.log(password.value)
  api.put('user/checkpassword',{password : password.value},{headers: {
     Authorization: 'Bearer ' + token.value
   }
   }).then((res) => {
    console.log(res)
   const result = res.data.data
   //console.log(result)
         confirm("Are you sure you want to delete this question?") &&
       api.delete(`analytic/deleteqstn/${editedItem.value.question_id }`,
       {
   headers: {
     Authorization: 'Bearer ' + token.value
   }
 }).then((res) => {
  getQuestion();
 })
 .catch((res) => {
            
             console.log(res)
            
           })
   }).catch(err => {
    console.log(err)
   alert('paswword did not match')} )
}
const deleteItem = (item) => {

  promptdialog.value = true
   editedItem.value = Object.assign({}, item);
   
//  // const index = data.indexOf(item);
//       confirm("Are you sure you want to delete this question?") &&
//        api.delete(`analytic/deleteqstn/${editedItem.value.question_id }`,
//        {
//    headers: {
//      Authorization: 'Bearer ' + token.value
//    }
//  }).then((res) => {
//   getQuestion();
//  })
//  .catch((res) => {
            
//              console.log(res)
            
//            })
       
}
const editItem = (item) => {
//console.log(item)
      editedIndex.value = rows.value.indexOf(item)
       //console.log(editedIndex)
       editedItem.value = Object.assign({}, item);
       
      show_dialog.value = true
     // console.log(editedItem.value.options)
      var role = editedItem.value.options
      var res = JSON.parse(role)
    // var aarray = res.split(",")
     editedItem.value.options = res
      //console.log(res[0])

}
const close = () => {
   //this.show_dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
}
const addCategory = () => {
  if(editedIndex.value > -1) {
    api.put(`analytic/editcategory/${editcategories.value.category_id}`,{category : editcategories.value.category}, {
       headers: {
     Authorization: 'Bearer ' + token.value
   }
    }).then( res => {
      getCategories();
      console.log(res)
    })
  }
  else {
    api.post('user/addcategory',{category : editcategories.value.category, company_id : admin.value.company_id,}
  ).then(res => {
    console.log(res)
    getCategories();
  }).catch(err => {
    console.log(err)
  })
 // console.log(categoryname.value)
  }
} 
const columns = [
  {
    name: 'question',
    required: true,
    label: 'Questions',
    align: 'left',
    field: 'question',
    // field: row => row.name,
    // format: val => `${val}`,
    sortable: true
  },
  { name: 'modifyoptions', align: 'center', label: 'Options', field: 'modifyoptions', sortable: true },
  { name: 'answer', label: 'Answer', field: 'answeralpha',align:'center' },
  { name: 'category', label: 'category', field: 'category_id' },
   {
          name: "actions",
          label: "Actions",
          field: "actions", align: 'center',headerStyle:'width:100px'
        }
]
const columns1 = [
  {
    name: 'category',
    required: true,
    label: 'Category Name',
    align: 'center',
    field: 'category',
  },
  // { name: 'company', align: 'center', label: 'Company', field: 'company_id', sortable: true },
  {
          name: "actions",
          label: "Actions",
          field: "actions", align: 'center',headerStyle:'width:100px'
        }
  

]
return {
  tab: ref('questions'),
  show_dialog,
  show_dialog1,
  promptdialog,
  show_dialog2,
  categoryname,
  columns,
  columns1,
  rows,
  addRow,
  deleteItem,
  setDefaultFind,
  editItem,
  close,
  numberToChar,
  editedItem ,
  additem,
  editedIndex,
  defaultItem,
  setDefaultItem,
  isNumber,
  finds,
  addnewitem,
  clearinputvalue,
  addCategory,
  getCategories,
  deletecategory,
  editcategory,
  sample,
  getQuestion,
  setDefaultcat,
  deletecheck,
  deleteVisa,
  rows1,
  visibleColumns,
  products,
  categoryoptions,
  editcategoryid,
  editcategories,
  password,
  answeroptions: [
        {
          label: 'A',
          value: '0',         
        },
        {
          label: 'B',
          value: '1', 
        },
        {
          label: 'C',
          value: '2',
        },
        {
          label: 'D',
          value: '3',
        },
      ],
      companyoptions: [
        {
          label: 'PWM',
          value: '1'
        },
        {
          label: 'SHAKTHI',
          value: '2'
        }
      ]
}

},

}
</script>
<style scoped>
.qcard {
  max-width:625px
}
</style>