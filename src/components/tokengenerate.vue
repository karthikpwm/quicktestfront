<template>
  <!-- <div class="q-pa-sm" > -->
<div class="page-container">
<div class="q-pa-sm" style="background-color:white;">
  <div>Test Remaining:{{credit}} </div>
  
</div>
<!-- <div style="background-color:white"><q-btn color="primary" icon="shopping_cart" to="/checkout" label="Add credit" /> </div> -->
<div class="row justify-center" style="background-color:white;">
  <q-select style="width: 200px" v-model="type" :options="typeoptions" label="Type" emit-value map-options @update:model-value="getCategories()" />
  
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
    <q-input filled v-model="date" outlined hint="Link Valid from">
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
    <q-input filled v-model="date1" outlined hint="Link Valid End time">
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
    
    </div>
  </div>
  <div class="row justify-center" style="background-color:white;">
  <q-btn @click="tokengen" color="primary">Create Link</q-btn>
  
</div>
  </div>
  <!-- </div> -->
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
import { stringify } from 'postcss';
import router from '../router';
 
  
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
      const type = ref()
      const categoryoptions = ref([])
      const typeoptions = ref([])
      const store = useUserStore()
      const $q = useQuasar()
      const generatetoken = ref()
      const { token,admin,company_id} = storeToRefs( store )
      const date = ref(moment().format('YYYY-MM-DD HH:mm:ss.sssZ'))
      const date1 = ref(moment().add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss.sssZ'))
      const credit = ref()
      const mask="YYYY-MM-DD HH:mm"
      
    
      // date-fsn
      //console.log('compid',company_id.value)
      //console.log('orgnltoken',company_id)
      const setDefaultItem = () => {
        
      generatetoken.value = ''
      category.value= []
      timelimit.value = []
      
      
     }
      const getCategories = () => {
        setDefaultItem();
        $q.loading.show({
          message: 'Loading...pls wait..',
          boxClass: 'text-white',
          spinnerColor: 'white',
          spinnerSize: 60
        })
  
        console.log(type.value)
      //   if( type.value == undefined)
      // {
      //  type.value = '1'
      // }
      
      //console.log(type.value)
      api.get("user/getcategories",
      {
        headers: {
          Authorization: 'Bearer' + token.value
        }
      }).then(async (response) => {
        //console.log(response.data.data)
          var result=response.data.data.filter(obj=> obj.company_id == admin.value.company_id && obj.questiontype == type.value);
          console.log(result)
          // if(type.value == 1) {
          //   categoryoptions.value = [{ label: 'Auto Generated', value: 'NULL'}]
          // }
        //  else {
          categoryoptions.value = result.map((x) => { 
        
        return {'label' : x.category, 'value' : x.category_id }
      })
        //  }
      result.map((val) => {
        credit.value = val.credit
        
        //console.log(val.credit)
      })
      $q.loading.hide()
      })
    }
//     onBeforeMount(async () => {
//     getCategories();
// })
    onMounted(()=> {
          getCategories();
         
    })
    const questionOne = () => {
      let boatspeed = getaptitude(10,20);
      let streamspeed = getaptitude(1,10);
      let distance = getaptitude(50,100)
       //console.log("btspeed ="+boatspeed + " stream =" + streamspeed+" distance = "+distance)
       let time = distance / (boatspeed + streamspeed)
       
       let answrb = time + 1.10
       let answrc = time - .60
       let answrd = time + .30
       time = time.toFixed(2)
      answrb= answrb.toFixed(2)
      answrc = answrc.toFixed(2)
      answrd = answrd.toFixed(2)
       //console.log(answrb,answrc,answrd)
       let question = "A boat can travel with the speed of "+boatspeed +" km/hr in still water if the speed of stream is "+ streamspeed +"km/hr, find the time taken by the boat to go "+distance +" km downstream?"
       //console.log(time)
      //  question = JSON.stringify(question)
       let options = [answrb,answrc,time,answrd]
      
       options = shuffle(options)
        var answer = options.findIndex(function(find) {
       return find == time
       });
       //console.log(options)
       options = JSON.stringify(options)
      let newquestion1 = {question,options,answer}
      let newquestion2 = questionTwo();
      //console.log(newquestion2.options,newquestion2.question,newquestion2.answer)
      //newquestion2 = JSON.stringify(newquestion2)
      let newquestion3 = questionThree();
      //console.log(newquestion3)
      let newquestion4 = questionFour();
      //console.log(newquestion4)
      let newquestion5 = questionFive();
      //console.log(newquestion5)
      let newquestion6 = questionSix();
      //console.log(newquestion6)
      let newquestion7 = questionSeven();
      //console.log(newquestion7)
      let newquestion8 = questionEight();
      //console.log(newquestion8)
      let newquestion9 = questionNine();
      //console.log(newquestion9)
      let newquestion10 = questionTen();
      //console.log(newquestion10)
      let newquestion11 = questionEleven();
      //console.log(newquestion11)
      let newquestion12 = questionTwelve();
      //console.log(newquestion12)
      let newquestion13 = questionThirteen();
      //console.log(newquestion13)
      
      let questions = [newquestion1,newquestion2,newquestion3,newquestion4,newquestion5,newquestion6,newquestion7,newquestion8,newquestion9,newquestion10,newquestion11,newquestion12,newquestion13]
      //let arrayquestions = {}
      // let example = questions.map((x) => {
        
      //  })
       //console.log(questions)
      //  let currentdate = moment().format('YYYY-MM-DD HH:mm:ss')
      //  console.log(currentdate)
       var bcd = Date.parse(date1.value)
    api.put('user/questionupload', {data: questions,toDate : bcd}).then(err => {
      console.log(err)
    })
    }
    const questionTwo =()=> {
      let mangoes = getaptitude(100, 300);
      let cost = getaptitude(500, 4000);
      let dozens = getaptitude(5, 20);
      let total = (cost / mangoes) * (dozens) * 12
      total = total.toFixed(2)
      //console.log(total)
      let optinb = (total * 0.9).toFixed(2)
      let optinc = (total * 1.1).toFixed(2)
      //console.log("no.of mango " +mangoes,"cost "+cost,"dozen" +dozens,total.toFixed(2))
      let question = "The cost for "+mangoes +" mangoes is  "+ cost+",  what would be the approximate cost of "+dozens+" dozen of such mangoes?"
      //console.log(question2)
      let options = [total,optinb,optinc,"none of these"]
      
    //  question= JSON.stringify(question)
  options = shuffle(options)
  var answer = options.findIndex(function(find) {
  return find == total
}); 
//console.log(answer)
 options = JSON.stringify(options);

//console.log(JSON.stringify(options));
      
      return {question,options,answer}
    }
    const questionThree=()=> {
      let startingValue = getaptitude(10,70)
      let digit1 = startingValue + 2
      let digit2 = startingValue + 4
      let digit3 = startingValue + 2
      let digit4 = startingValue + 10
      let digit5 = startingValue + 2
      let digit6 = startingValue + 18
      //console.log(typeof(startingValue))
      let question =  +startingValue +", " + digit1+", "+digit2 +" , "+digit3 + " , "+digit4 +" ,"+digit5 +", x   -  What is the X value ?"
      let optinb = digit2
      let optinc = startingValue
      let optind = startingValue + 16
      let options = [digit6,optinb,optinc,optind]
      // question= JSON.stringify(question)
      options = options.map(String)
      options = shuffle(options)
      var answer = options.findIndex(function(find) {
      return find == digit6
      }); 
      //console.log(answer)
      options = JSON.stringify(options);
      //console.log(options)
      return {question,options,answer}
    }
    const questionFour = () => {
      let avgScore = getaptitude(30,50)
      let avgSix = getaptitude(10,30)
      let avgLast = ((avgScore * 10) - (avgSix * 6))/4
      //console.log("avg score:",avgScore,"avgsix ", avgSix, "avglast ", avgLast)
      let question = "The average score of v kohli in a series of 10 matches is "+avgScore +" runs, if the average off first 6 matches comes out to be "+ avgSix+" what is his average in the 4 matches?"
      let optionb = (avgLast * 1.1).toFixed(2)
      let optionc = (avgLast * 0.9).toFixed(2)
      let options = [avgLast,optionb,optionc,"None of these"]
      //console.log(avgLast)
      //question= JSON.stringify(question)
      options = options.map(String)
      options = shuffle(options)
      var answer = options.findIndex(function(find) {
      return find == avgLast
      }); 
      //console.log(answer)
      options = JSON.stringify(options);
      //console.log(options)
      return {question,options,answer}
    }
    const questionFive = ()=> {
      let r = generateRandom(1,2)
      let o = generateRandom(3,4)
      let s = generateRandom(5,6)
      let e = generateRandom(7,8)
      let c = generateRandom(9,10)
      let h = generateRandom(11,12)
      let a = generateRandom(13,14)
      let i = generateRandom(15,16)
      let p = generateRandom(17,18)
      // if(o === r){
      //    o = generateRandom(1,10)
        
      // }
      
      // else if(s === o || s === r){
      //    s = generateRandom(1,10)
        
      // }
      
      // else if(e === s || e === o || e === r){
      //    e = generateRandom(1,10)
        
      // }
      
      // else if(c === e || c === s || c === e || c === o || c === r){
      //    c = generateRandom(1,10)
        
      // }
      
      // else if(h === c || h === e || h === s || h === e || h === o || h === r){
      //    h = generateRandom(1,10)
       
      // }
      
      // else if(a === h || a === c || a === e || a === s || a === e || a === o || a === r){
      //    a = generateRandom(1,10)
        
      // }
      
      // else if(i === a || i === h || i === c || i === e || i === s || i === e || i === o || i === r){
      //    i = generateRandom(1,10)
       
      // }
      
      // else if(p === i || p === a || p === h || p === c || p === e || p === s || p === e || p === o && p === r){
      //    p = generateRandom(1,10)
        
      // }
      let rose = r.toString()+','+o.toString()+','+s.toString()+','+e.toString()
      let preach = p.toString()+','+r.toString()+','+e.toString()+','+a.toString()+','+c.toString()+','+h.toString()
      let chair = c.toString()+','+h.toString()+','+a.toString()+','+i.toString()+','+r.toString()
      let search = s.toString()+','+e.toString()+','+a.toString()+','+r.toString()+','+c.toString()+','+h.toString()
      //console.log(rose,preach,chair,search)
      let question = "If Rose is coded as  "+rose +", Chair is coded as " +chair +", Preach is coded as " +preach +", what will be the code for Search?"
      let options = [search,"7,16,5,8,18","17,5,4,5,6,12","3,5,14,6,15"]
      //console.log(search)
      // question= JSON.stringify(question)
      options = shuffle(options)
      var answer = options.findIndex(function(find) {
      return find == search
      }); 
      //console.log(answer)
      options = JSON.stringify(options);
       //console.log(options)
      return {question,options,answer}
    }
    const questionSix =()=> {
     let trainLength = getaptitude(100,200)
     let speed = getaptitude(100,150)
     let time = trainLength/ (speed * 1000 / 3600)
     time = time.toFixed(2)
     let question = "In how many seconds will a train "+trainLength +" mtrs long cross an electric pole if its speed is "+speed +" km/hr ?"
     let optionb = time * 1.1
     let optionc = time * 0.9
     optionb = optionb.toFixed(2)
     optionc = optionc.toFixed(2)
     console.log(time)
     let options = [time,optionb,optionc,"None of these"]
    //  question= JSON.stringify(question)
      options = shuffle(options)
      var answer = options.findIndex(function(find) {
      return find == time
      }); 
      //console.log(answer)
      options = JSON.stringify(options);
       console.log(options)
      return {question,options,answer}
    }
    const questionSeven = () => {
     const firstNumber = getaptitude(100000,999999)
     const secondNumber = getaptitude(100000,999999)
     const thirdNumber = getaptitude(100000,999999)
     const totalNumber = firstNumber + secondNumber + thirdNumber
     let question = "[?] - "+firstNumber +"- "+secondNumber +"= "+thirdNumber +" "
     let optionb = totalNumber + 10
     let optionc = totalNumber + 100
     let optiond = totalNumber + 100
     let options = [optionb,totalNumber,optionc,optiond]
     //console.log(totalNumber)
    //  question= JSON.stringify(question)
     options = options.map(String)
      options = shuffle(options)
      var answer = options.findIndex(function(find) {
      return find == totalNumber
      }); 
      //console.log(answer)
      options = JSON.stringify(options);
      //console.log(options)
      return {question,options,answer}
    }
    const questionEight = ()=> {
      let a = getaptitude(1,10)
      let b = getaptitude(1,10)
      let c = getaptitude(1,10)
      let newRatio = a * (1.15) * 10
      //console.log('avalue',a,newRatio)
     // newRatio = (newRatio).toFixed(2)
     let question = "The salaries A, B, C are in the ratio 2 : 3 : 5. If the increments of "+ a+"%, "+ b+"% and "+c +"% are allowed respectively in their salaries, then what will be A's Ratio of the new salary?"
     let optionb = Math.round((newRatio + 2)* 1e12) / 1e12
     let optionc = Math.round((newRatio + 3)* 1e12) / 1e12
     let optiond = Math.round((newRatio + 4)* 1e12) / 1e12
     let options = [optionb,optionc,newRatio,optiond]
     
     console.log(optionb,optionc,newRatio,optiond)
     //question= JSON.stringify(question)
     options = options.map(String)
      options = shuffle(options)
      var answer = options.findIndex(function(find) {
      return find == newRatio
      }); 
      //console.log(answer)
      options = JSON.stringify(options);
      // console.log(options)
      return {question,options,answer}
    }
    const questionNine = ()=> {
      let totalamt = getaptitude(1000,9999)
      let ram = (totalamt/13)*6
      ram = ram.toFixed(2)
      let question= "If Rs "+totalamt +" be divided among Ram and Shyam and Mohan in the ratio of 1/2 , 1/3, 1/4 then what would be Ram's share ?"
      let optionb = (totalamt/13)*2
      let optionc = (totalamt/13)*3
      let optiond = (totalamt/13)*4
      optionb = optionb.toFixed(2)
      optionc = optionc.toFixed(2)
      optiond = optiond.toFixed(2)
      let options = [optionb,ram,optionc,optiond]
      //console.log(ram)
      //question= JSON.stringify(question)
      options = shuffle(options)
      var answer = options.findIndex(function(find) {
      return find == ram
      }); 
      //console.log(answer)
      options = JSON.stringify(options);
       //console.log(options)
      return {question,options,answer}
    }
    const questionTen = () => {
      let marketprice = getaptitude(1000,9999)
      let discount1 =   getaptitude(10,20)
      let discount2 =   getaptitude(10,20)
      let currentprice = (marketprice * ((100 - discount1) * (100 - discount2))) / 10000
      currentprice = currentprice.toFixed(2)
      let question = "The marked price on an item was Rs "+marketprice +"/- but the shopkeeper offered a double discount of "+discount1 +" % and "+ discount2+"%. How much did he finally sell the item for?"
      let optionb = (currentprice * 1.1).toFixed(2)
      let optionc = (currentprice * 0.9).toFixed(2)
      let options = [currentprice,optionb,optionc,"None of these"]
      //console.log(currentprice)
      //question= JSON.stringify(question)
      options = shuffle(options)
      var answer = options.findIndex(function(find) {
      return find == currentprice
      }); 
      //console.log(answer)
      options = JSON.stringify(options);
       //console.log(options)
      return {question,options,answer}
    }
      const questionEleven = ()=> {
        let distance = getaptitude(100,400)
        let time = getaptitude(1,10)
        let speed = ((distance/time)/8) * 7
        speed = speed.toFixed(2)
        let question = "The ratio between the speed of two train is 7:8 if the second train  runs "+ distance+" km in "+ time+" hrs then the speed of the first train is?"
         let optionb = speed * 1.1
         let optionc = speed * 0.9
         optionb = optionb.toFixed(2)
         optionc = optionc.toFixed(2)
         let options = [speed,optionb,optionc,"None of these"]
         //console.log(speed)
      //question= JSON.stringify(question)
      options = shuffle(options)
      var answer = options.findIndex(function(find) {
      return find == speed
      }); 
      //console.log(answer)
      options = JSON.stringify(options);
       //console.log(options)
      return {question,options,answer}

      }
       const questionTwelve=()=> {
        let apple = getaptitude(10,40)
        let original = (420/(100 - apple)) * 100
        original = original.toFixed(2)
        let question = "A fruit seller had some apples. He sells "+apple +"% apples and still has 420 apples. Originally, he had?"
        let optionb = (original * 1.1).toFixed(2)
         let optionc = (original * 0.9).toFixed(2)
         let options = [optionc,optionb,original,"None of these"]
         //console.log(original)
      //question= JSON.stringify(question)
      options = shuffle(options)
      var answer = options.findIndex(function(find) {
      return find == original
      }); 
      //console.log(answer)
      options = JSON.stringify(options);
       //console.log(options)
      return {question,options,answer}
       }
       const questionThirteen = ()=> {
         let totalruns = getaptitude(90,200)
         let percent = 100 * ((totalruns - 60)/totalruns)
         percent = percent.toFixed(2)
         let question = "A batsman scored "+ totalruns+" runs which included 3 boundaries and 8 sixes. What percent of his total score did he make by running between the wickets?"
        let optionb = (percent * 1.1).toFixed(2)
         let optionc = (percent * 0.9).toFixed(2)
         let options = [percent,optionb,optionc,"None of these"]
         //console.log(percent)
      //question= JSON.stringify(question)
      options = shuffle(options)
      var answer = options.findIndex(function(find) {
      return find == percent
      }); 
      //console.log(answer)
      options = JSON.stringify(options);
       //console.log(options)
      return {question,options,answer}
       }
       function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
    const  generateRandom = (min, max)=> {
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor( rand * difference);

    // add with min value 
    rand = rand + min;
    //console.log('koi',rand)
    return rand
}
     const getaptitude =(min, max) => {
      
        // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor( rand * difference);

    // add with min value 
    rand = rand + min;
    //console.log('koi',rand)
    return rand
     }
      const tokengen = () => {

        if(category.value === '' || category.value === undefined || timelimit.value === '' || timelimit.value === undefined || (category.value).length == 0 || (timelimit.value).length == 0){
          console.log(category.value)
          alert('category or timelimit is empty')
        } else {
        $q.loading.show({
          message: 'Loading...pls wait..',
          boxClass: 'text-white',
          spinnerColor: 'white',
          spinnerSize: 60
        })
        console.log(date,date1)
       var abc = Date.parse(date.value)
       var bcd = Date.parse(date1.value)
         //console.log(abc)
      //var cde =  date.value
       //console.log('dddd',cde,date1.value)
      // return date
      //console.log((category.value).length)
      //console.log(timelimit.value)
        api .post(`token/jwt`,{fromDate : abc,toDate : bcd,company_id :company_id.value,category_id:category.value,timelimit: timelimit.value, type : type.value },
        {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
}) 
        .then(async (res) => {
          $q.loading.hide()
        generatetoken.value ="https://www.quicktest.app/token/test/" + res.data.token 
        //getCategories();
       
        //  applicant.name.value = generatetoken
         
         //console.log('newtoken',generatetoken.value)
        })
         .catch((res) => {
            $q.loading.hide()
            //console.log(res)
            alert(res.response.data.message)
          })
      }
      // if(type.value == 1) {
      //  questionOne();
      // }
      
      }
      return {
        generatetoken,
        tokengen,
        msg: '',
        text: ref(''),
        date1,
         date,
         categoryoptions,
        //  setDefaultItem,
         shuffle,
         getCategories,
         getaptitude,
         generateRandom,
         questionOne,
         questionTwo,
         questionThree,
         questionFour,
         questionFive,
         questionSix,
         questionSeven,
         questionEight,
         questionNine,
         questionTen,
         questionEleven,
         questionTwelve,
         questionThirteen,
         category,
         timelimit,
         type,
         credit,
        
         typeoptions: [
          {label : 'MCQ', value : '1'},
          {label : 'Free Answer' , value: '2'}
          ],
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
         ],
         
       
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
  padding-left: 60px;
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