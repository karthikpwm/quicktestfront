<template>
  <div id="visa">
    <!-- <h1></h1> -->
    <form>
      <!-- <label for="first name">First Name:</label>
      <input type="text" required>
      <br>
      <label for="last name">Last Name:</label>
      <input type="text" required>
      <br>
      <label for="country">Nationality:</label>
      <input type="text"  required>
      <br>
      <label for="passport number">Passport Number:</label>
      <input type="text"  required>

      <label for="duration">Duration of stay:</label>
      <input type="text"  required> -->
     <br><br>
      <button @click="addVisa">Add another Candidate Details</button>
      <br>
      <div class="name"
      v-for="(applicant, counter) in applicants"
      v-bind:key="counter">
        <span @click="deleteVisa(counter)">x</span>
        <label for="duration">{{counter+1}}. Name:</label>
        <input type="text" v-model="applicant.name" required>
        <label for="duration">Email Id:</label>
        <input type="text" v-model="applicant.email" required> 
      </div>
      <br/>
      <div> <button>Generate Email</button></div>
    </form>
</div>
</template>
<script>
export default {
  name: 'Test',
  props: {
    msg: String
  },
  data(){
    return {
       applicants:[
       {
      name: '',
      email:''
       }
     ]
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
  }
}
</script>

<style scoped>
#visa {
  margin: 10px auto;
  max-width: 500px;
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
  font-size: 15px;
 background: rgb(64, 179, 140);
  padding: 0.4rem 1.3rem;
  text-align: center;
  border: none;
  cursor: pointer;
  border-radius: 4px;
 margin: 10px;
}
span{
  width: 20px;
  float: right;
  cursor: pointer;
}
span:hover{
  color: brown;
}
.name{
  border: 1.5px solid;
  padding:5px;
  margin-bottom: 10px;
}
</style>