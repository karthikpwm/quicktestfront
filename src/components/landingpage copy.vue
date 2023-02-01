<template>
  <nav id="navbarExample" class="navbar navbar-expand-lg fixed-top navbar-light" aria-label="Main navigation">
   <div class="container">
        <a class="navbar-brand logo-text" href="#">quicktest</a> 
       <button class="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse" aria-label="Toggle navigation">
           <span class="navbar-toggler-icon"></span>
       </button>
       <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
           <ul class="navbar-nav ms-auto navbar-nav-scroll">
               <li class="nav-item">
                   <a class="nav-link active" aria-current="page" href="#header">Login</a>
               </li>
               <!-- <li class="nav-item">
                   <a class="nav-link" href="#services">Services</a>
               </li>
               <li class="nav-item">
                   <a class="nav-link" href="#details">Details</a>
               </li>
               <li class="nav-item">
                   <a class="nav-link" href="#features">Features</a>
               </li>
               <li class="nav-item dropdown">
                   <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">Drop</a>
                   <ul class="dropdown-menu" aria-labelledby="dropdown01">
                       <li><a class="dropdown-item" href="#">Article Details</a></li>
                       <li><div class="dropdown-divider"></div></li>
                       <li><a class="dropdown-item" href="#">Terms Conditions</a></li>
                       <li><div class="dropdown-divider"></div></li>
                       <li><a class="dropdown-item" href="#">Privacy Policy</a></li>
                   </ul>
               </li> -->
           </ul>
           <span class="nav-item">
               <a class="btn-solid-sm" href="#contact">Sign Up</a>
           </span>
       </div> 
   </div> 
 </nav>
 <header id="header" class="header">
   <div class="container">
     <div></div>
       <div class="row">
           <div class="col-lg-6 col-xl-6">
               <div class="text-container">
                   <h1 class="h3-large">Simplify your hiring process, avoid costly mis-hires</h1>
                   <p class="p-large">Quicktest minimises the burden or conducting interviews by allowing employers to generate and send tests to prospective candidates for screening and shortlisting</p>
                   <a class="btn-solid-lg" href="#services">Sign up</a>
               </div>
           </div> 
           <div class="col-lg-6">
              
            <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="black"
          indicator-color="green"
          align="justify"
          narrow-indicator
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab name="login" label="Login" />
          <q-tab name="register" label="Register" />
          
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <q-form
      
      class="q-gutter-md" @submit.prevent="submitForm"
    >
      <q-input
      
        
        v-model="login.username"
        label="Username"
      />

      <q-input
        v-model="login.password"
        label="Password"    
        type="password"
         debounce
      />

      <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

      <div>
        <q-btn class="bg-cyan-8 text-grey-1 full-width" label="Login" aria-label="bold" type="submit"  rounded/><br/><br/>
        <!-- <q-btn label="Reset" type="reset" flat class="q-ml-md text-grey-1 bg-cyan-8" rounded aria-label="bold" @click="Reset()"   /> -->
        <!-- <q-btn label="Register" @click="toggle" to="/register" color="primary" /> -->
      </div>
    </q-form>
          </q-tab-panel>

          <q-tab-panel name="register">
            <q-form class="q-px-sm q-pt-xl" @submit.prevent="submitForm">
              <q-input 
                       ref="email"
                       square 
                       clearable 
                       v-model="signup.email" 
                       type="email"
                       lazy-rules
                       
                       label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input  
                       ref="password"
                       square 
                      
                       v-model="signup.password"                                                        
                       
                       lazy-rules
                       
                       label="Password">
                
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
             
              <q-input  v-model="signup.company"  label="Company Name" square clearable />
            </q-form>
          </q-tab-panel>

        </q-tab-panels>
      </q-card>
            
          </div>
           <!-- <div class="col-lg-6 col-xl-7">
               <div class="image-container">
                   <img class="img-fluid" src="assets/images/header-image.png" alt="alternative" />
               </div> 
           </div>  -->
       </div> 
   </div> 
 </header> 
 <div id="details" class="basic-1">
   <div class="container">
       <div class="row">
           <div class="col-lg-6 col-xl-6">
               <div class="image-container">
                   <img class="img-fluid" src="assets/images/left.png" alt="alternative" />
               </div> 
           </div> 
           <div class="col-lg-6 col-xl-6">
             <div class="image-container">
                   <img class="img-fluid" src="assets/images/right.png" alt="alternative" />
               </div>
           </div> 
       </div>
   </div> 
 </div>
 <div id="features" class="cards-1 accordion-3">
     <div class="container">
         <div class="row">
           <div class="col-xl-12">
               <h2 class="h2-heading" style="padding-top: 20px;">We've got a pricing plan that's perfect for you!</h2>
               
           </div> 
       </div>
       <div class="row" style="padding-bottom:30px">
           <div class="col-lg-12">
               
             
               <div class="card" >
                 <img class="img-fluid" src="assets/images/starter.png" alt="alternative" />
               </div>
           
               <div class="card">
                 <img class="img-fluid" src="assets/images/corporate.png" alt="alternative" />
               </div>
             
               <div class="card">
                 <img class="img-fluid" src="assets/images/enterprise.png" alt="alternative" />
               </div>
               
           </div>
       </div>
 
     </div>
    
 </div>
 <div id="features" class="accordion-2">
   
 </div>
 <!-- <div id="services" class="cards-1 bg-gray">
   <div class="container">
       <div class="row">
           <div class="col-lg-12">
               <h2>Explore our services</h2>
           </div> 
       </div>
       <div class="row">
           <div class="col-lg-12">
               
             
               <div class="card">
                   <div class="card-icon">
                       <span class="fas fa-headphones-alt"></span>
                   </div>
                   <div class="card-body">
                       <h5 class="card-title">Analyse your product</h5>
                       <p>Et blandit nisl libero at arcu. Donec ac lectus sed tellus mollis viverra. Nullam pharetra ante at nunc elementum</p>
                       <a class="read-more no-line" href="#">Learn more <span class="fas fa-long-arrow-alt-right"></span></a>
                   </div>
               </div>
           
               <div class="card">
                   <div class="card-icon red">
                       <span class="far fa-clipboard"></span>
                   </div>
                   <div class="card-body">
                       <h5 class="card-title">Evaluate opportunities</h5>
                       <p>Vulputate nibh feugiat. Morbi pellent diam nec libero lacinia, sed ultrices velit scelerisque. Nunc placerat justo sem</p>
                       <a class="read-more no-line" href="#">Learn more <span class="fas fa-long-arrow-alt-right"></span></a>
                   </div>
               </div>
             
               <div class="card">
                   <div class="card-icon green">
                       <span class="far fa-comments"></span>
                   </div>
                   <div class="card-body">
                       <h5 class="card-title">Find the influencers</h5>
                       <p>Ety suscipit metus sollicitudin euqu isq imperdiet nibh nec magna tincidunt, nec pala vehicula neque sodales verum</p>
                       <a class="read-more no-line" href="#">Learn more <span class="fas fa-long-arrow-alt-right"></span></a>
                   </div>
               </div>
               
           </div>
       </div>
   </div>
 </div>  -->
 <!-- <div id="details" class="basic-1">
   <div class="container">
       <div class="row">
           <div class="col-lg-6 col-xl-7">
               <div class="image-container">
                   <img class="img-fluid" src="assets/images/details-1.png" alt="alternative" />
               </div> 
           </div> 
           <div class="col-lg-6 col-xl-5">
               <div class="text-container">
                   <div class="section-title">WHAT WE DO</div>
                   <h2>The right influencer can boost your conversion</h2>
                   <p>Etiam tempus condimentum congue. In sit amet nisi eget massa condimentum lobortis eget ac eros. In hac habitasse platea dictumst. Aenean molestie mauris eget sapien sagittis, a bibendum magna tincidunt</p>
                   <a class="btn-solid-reg" href="#contact">Get quote</a>
               </div> 
           </div> 
       </div>
   </div> 
 </div>
 <div class="basic-2">
   <div class="container">
       <div class="row">
           <div class="col-lg-6 col-xl-5">
               <div class="text-container">
                   <div class="section-title">ABOUT US</div>
                   <h2>We have ten years experience in marketing</h2>
                   <p>Etiam tempus condimentum congue. In sit amet nisi eget massa condimentum lobortis eget ac eros. In hac habitasse platea dictumst. Aenean molestie mauris eget sapien sagittis, a bibendum magna tincidunt</p>
                   <a class="btn-outline-reg" href="#">Details</a>
               </div> 
           </div> 
           <div class="col-lg-6 col-xl-7">
               <div class="image-container">
                   <img class="img-fluid" src="assets/images/details-2.png" alt="alternative" />
               </div> 
           </div> 
       </div>
   </div> 
 </div>  -->
 <!-- <div id="features" class="accordion-1">
   <div class="container">
       <div class="row">
           <div class="col-xl-12">
               <h2 class="h2-heading">Online service features</h2>
               <p class="p-heading">Suspendisse vitae enim arcu. Aliquam convallis risus a felis blandit, at mollis nisi bibendum. Aliquam nec purus at ex blandit posuere nec a odio. Proin lacinia dolor justo</p>
           </div> 
       </div>   
       <div class="row">
           <div class="col-xl-5">
               <div class="accordion" id="accordionExample">
                   
                  
                   <div class="accordion-item">
                       <div class="accordion-icon">
                           <span class="fas fa-tv"></span>
                       </div> 
                       <div class="accordion-header" id="headingOne">
                           <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                               Analyse the product and design plan
                           </button>
                       </div>
                       <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                           <div class="accordion-body">Mauris ornare libero et pharetra hendrerit. Cura elementum lectus quis tellus pretium, vitae lobortis dui sagittis aliquam et enim vel semon anticus</div>
                       </div>
                   </div>
                  
                  
                   <div class="accordion-item">
                       <div class="accordion-icon blue">
                           <span class="fas fa-microphone"></span>
                       </div> 
                       <div class="accordion-header" id="headingTwo">
                           <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                               Find the market opportunities
                           </button>
                       </div>
                       <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                           <div class="accordion-body">Mauris ornare libero et pharetra hendrerit. Cura elementum lectus quis tellus pretium, vitae lobortis dui sagittis aliquam et enim vel semon anticus</div>
                       </div>
                   </div>
                  
                  
                   <div class="accordion-item">
                       <div class="accordion-icon purple">
                           <span class="fas fa-video"></span>
                       </div> 
                       <div class="accordion-header" id="headingThree">
                           <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                               Prepare the product launch campaign
                           </button>
                       </div>
                       <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                           <div class="accordion-body">Mauris ornare libero et pharetra hendrerit. Cura elementum lectus quis tellus pretium, vitae lobortis dui sagittis aliquam et enim vel semon anticus</div>
                       </div>
                   </div>
                  
                   
                  
                   <div class="accordion-item">
                       <div class="accordion-icon orange">
                           <span class="fas fa-tools"></span>
                       </div> 
                       <div class="accordion-header" id="headingFour">
                           <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                               Evaluate the campaign and adjust
                           </button>
                       </div>
                       <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                           <div class="accordion-body">Mauris ornare libero et pharetra hendrerit. Cura elementum lectus quis tellus pretium, vitae lobortis dui sagittis aliquam et enim vel semon anticus</div>
                       </div>
                   </div>
                  
               </div> 
           </div> 
           <div class="col-xl-7">
               <div class="image-container">
                   <img class="img-fluid" src="assets/images/features-dashboard.png" alt="alternative"/>
               </div> 
           </div> 
       </div>
   </div> 
 </div>  -->
 <!-- <div class="cards-2 bg-gray">
   <div class="container">
       <div class="row">
           <div class="col-lg-12">
               <h2 class="h2-heading">Customer testimonials</h2>
           </div> 
       </div>
       <div class="row">
           <div class="col-lg-12">
               
               <div class="card">
                   <img class="quotes" src="assets/images/quotes.svg" alt="alternative" />
                   <div class="card-body">
                       <p class="testimonial-text">Suspendisse vitae enim arcu. Aliqu convallis risus a felis blandit, at mollis nisi bibendum aliquam noto ricos</p>
                       <div class="testimonial-author">Roe Smith</div>
                       <div class="occupation">General Manager, Presentop</div>
                   </div>
                   <div class="gradient-floor red-to-blue"></div>
               </div>
             
               
               <div class="card">
                   <img class="quotes" src="assets/images/quotes.svg" alt="alternative" />
                   <div class="card-body">
                       <p class="testimonial-text">Suspendisse vitae enim arcu. Aliqu convallis risus a felis blandit, at mollis nisi bibendum aliquam noto ricos</p>
                       <div class="testimonial-author">Sam Bloom</div>
                       <div class="occupation">General Manager, Presentop</div>
                   </div>
                   <div class="gradient-floor blue-to-purple"></div>
               </div>
             
               
               <div class="card">
                   <img class="quotes" src="assets/images/quotes.svg" alt="alternative" />
                   <div class="card-body">
                       <p class="testimonial-text">Suspendisse vitae enim arcu. Aliqu convallis risus a felis blandit, at mollis nisi bibendum aliquam noto ricos</p>
                       <div class="testimonial-author">Bill McKenzie</div>
                       <div class="occupation">General Manager, Presentop</div>
                   </div>
                   <div class="gradient-floor purple-to-green"></div>
               </div>
             
               
               
               <div class="card">
                   <img class="quotes" src="assets/images/quotes.svg" alt="alternative" />
                   <div class="card-body">
                       <p class="testimonial-text">Suspendisse vitae enim arcu. Aliqu convallis risus a felis blandit, at mollis nisi bibendum aliquam noto ricos</p>
                       <div class="testimonial-author">Vanya Dropper</div>
                       <div class="occupation">General Manager, Presentop</div>
                   </div>
                   <div class="gradient-floor red-to-blue"></div>
               </div>
             
               
               <div class="card">
                   <img class="quotes" src="assets/images/quotes.svg" alt="alternative" />
                   <div class="card-body">
                       <p class="testimonial-text">Suspendisse vitae enim arcu. Aliqu convallis risus a felis blandit, at mollis nisi bibendum aliquam noto ricos</p>
                       <div class="testimonial-author">Lefty Brown</div>
                       <div class="occupation">General Manager, Presentop</div>
                   </div>
                   <div class="gradient-floor blue-to-purple"></div>
               </div>
             
               
               <div class="card">
                   <img class="quotes" src="assets/images/quotes.svg" alt="alternative" />
                   <div class="card-body">
                       <p class="testimonial-text">Suspendisse vitae enim arcu. Aliqu convallis risus a felis blandit, at mollis nisi bibendum aliquam noto ricos</p>
                       <div class="testimonial-author">Susane Blake</div>
                       <div class="occupation">General Manager, Presentop</div>
                   </div>
                   <div class="gradient-floor purple-to-green"></div>
               </div>
             
           </div> 
       </div>
   </div> 
 </div>  -->
 <!-- <div class="slider-1">
   <div class="container">
       <div class="row">
           <div class="col-lg-12">
               <h4>Trusted by over <span class="blue">5000</span> customers worldwide</h4>
               <hr class="section-divider" />
            
               <div class="slider-container">
                   <div class="swiper-container image-slider">
                       <div class="swiper-wrapper">
                           <div class="swiper-slide">
                               <img class="img-fluid" src="assets/images/customer-logo-1.png" alt="alternative" />
                           </div>
                           <div class="swiper-slide">
                               <img class="img-fluid" src="assets/images/customer-logo-2.png" alt="alternative" />
                           </div>
                           <div class="swiper-slide">
                               <img class="img-fluid" src="assets/images/customer-logo-3.png" alt="alternative" />
                           </div>
                           <div class="swiper-slide">
                               <img class="img-fluid" src="assets/images/customer-logo-4.png" alt="alternative" />
                           </div>
                           <div class="swiper-slide">
                               <img class="img-fluid" src="assets/images/customer-logo-5.png" alt="alternative" />
                           </div>
                           <div class="swiper-slide">
                               <img class="img-fluid" src="assets/images/customer-logo-6.png" alt="alternative" />
                           </div>
                       </div>
                   </div> 
               </div> 
              
           </div> 
       </div>
   </div> 
 </div>  -->
 <!-- <div class="basic-3">
   <div class="container">
       <div class="row">
           <div class="col-lg-12">
               <div class="text-container">
                   <h2>Find the right influencer for your product</h2>
                   <p class="p-large">Eu convallis arcu ultrices in. Mauris ornare libero et pharetra hendrerit. Curabitur elementum lectus quis vioc tellus</p>
                   <a class="btn-solid-lg" href="#contact">Get free quote</a>
               </div> 
           </div> 
       </div>
   </div> 
 </div>  -->
 <!-- <div id="contact" class="form-1">
   <div class="container">
       <div class="row">
           <div class="col-lg-6">
               <div class="text-container">
                   <div class="section-title">GET QUOTE</div>
                   <h2>Submit the form for quote</h2>
                   <p>Aliquam et enim vel sem pulvinar suscipit sit amet quis lorem. Sed risus ipsum, egestas sed odio in, pulvinar euismod ipsum. Sed ut enim non nunc fermentum dictum et sit amet erat. Maecenas</p>
                   <ul class="list-unstyled li-space-lg">
                       <li class="d-flex">
                           <i class="fas fa-square"></i>
                           <div class="flex-grow-1">Vel maximus nunc aliquam ut. Donec semper, magna a pulvinar</div>
                       </li>
                       <li class="d-flex">
                           <i class="fas fa-square"></i>
                           <div class="flex-grow-1">Suscipit sit amet quis lorem. Sed risus ipsum, egestas mare</div>
                       </li>
                       <li class="d-flex">
                           <i class="fas fa-square"></i>
                           <div class="flex-grow-1">Sem pulvinar suscipit sit amet quis lorem. Sed risus</div>
                       </li>
                   </ul>
               </div> 
           </div> 
           <div class="col-lg-6">
              
               <form>
                   <div class="form-group">
                       <input type="text" class="form-control-input" placeholder="Name" required />
                   </div>
                   <div class="form-group">
                       <input type="email" class="form-control-input" placeholder="Email" required />
                   </div>
                   <div class="form-group">
                       <input type="text" class="form-control-input" placeholder="Industry" required />
                   </div>
                   <div class="form-group">
                       <input type="text" class="form-control-input" placeholder="Your product" required />
                   </div>
                   <div class="form-group">
                       <button type="submit" class="form-control-submit-button">Submit</button>
                   </div>
               </form>
             
           </div> 
       </div>
   </div> 
 </div> -->
 <!-- <div class="footer bg-gray">
   <img class="decoration-circles" src="assets/images/decoration-circles.png" alt="alternative" />
   <div class="container">
       <div class="row">
           <div class="col-lg-12">
               <h4>If you want to find out which are the right influencers for your product marketing campaigns then follow us</h4>
               <div class="social-container">
                   <span class="fa-stack">
                       <a href="#your-link">
                           <i class="fas fa-circle fa-stack-2x"></i>
                           <i class="fab fa-facebook-f fa-stack-1x"></i>
                       </a>
                   </span>
                   <span class="fa-stack">
                       <a href="#your-link">
                           <i class="fas fa-circle fa-stack-2x"></i>
                           <i class="fab fa-twitter fa-stack-1x"></i>
                       </a>
                   </span>
                   <span class="fa-stack">
                       <a href="#your-link">
                           <i class="fas fa-circle fa-stack-2x"></i>
                           <i class="fab fa-pinterest-p fa-stack-1x"></i>
                       </a>
                   </span>
                   <span class="fa-stack">
                       <a href="#your-link">
                           <i class="fas fa-circle fa-stack-2x"></i>
                           <i class="fab fa-instagram fa-stack-1x"></i>
                       </a>
                   </span>
                   <span class="fa-stack">
                       <a href="#your-link">
                           <i class="fas fa-circle fa-stack-2x"></i>
                           <i class="fab fa-youtube fa-stack-1x"></i>
                       </a>
                   </span>
               </div> 
           </div> 
       </div>
   </div> 
 </div>  -->
 <!-- <div class="copyright bg-gray">
   <div class="container">
       <div class="row">
           <div class="col-lg-6 col-md-12 col-sm-12">
               <ul class="list-unstyled li-space-lg p-small">
                   <li><a href="#">Article Details</a></li>
                   <li><a href="#">Terms & Conditions</a></li>
                   <li><a href="#">Privacy Policy</a></li>
               </ul>
           </div> 
           <div class="col-lg-3 col-md-12 col-sm-12">
               <p class="p-small statement">Copyright © <a href="#">Masuk Mia </a></p>
           </div> 
           <div class="col-lg-3 col-md-12 col-sm-12">
               <p class="p-small statement">Distributed by <a href="https://masukmia.com" target="_blank">Masuk Mia </a></p>
           </div> 
       </div> 
   </div> 
 </div> -->
 <button id="myBtn">
   <img src="assets/images/up-arrow.png" alt="alternative" />
 </button>
 </template>
 
 <script>
import { useQuasar } from 'quasar'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../store/user'
import { useCompanyStore } from '../store/company'
import { api } from '../boot/axios';
import { useRoute, useRouter } from 'vue-router'
import register from '../components/register.vue'
import welcome from '../components/welcome.vue'

export default {
  setup () {
    const $q = useQuasar()
        const store = useUserStore()
        const store2 = useCompanyStore()
    const {token, admin,loggedinname,company_id,user,remainingcredit,controllingbanner} = storeToRefs( store )
    const {company} = storeToRefs(store2)
  const router = useRouter()
  const login = ref({
    username: '',
    password: ''
  })
  const signup = ref({
      email: '',
    password: '',
    company: '',
  })
 
  const frontpage = ref(false)
 const Reset = () => {
  login.value.username = null,
  login.value.password = null,
   $q.notify({
         type: 'positive',
          message: 'Form Reset' }
      )
 }
  const submitForm =  () => {
     if (!login.value.username ||!login.value.password){
      $q.notify({
         type: 'negative',
          message: 'Username or Password is Incorrect' }
      )
       //console.log('error')
     } else {
         $q.loading.show({
          message: 'Logging In...',
          boxClass: 'text-white',
          spinnerColor: 'white',
          spinnerSize: 60
        })
        api
          .post(`user/login`, {email : login.value.username,password : login.value.password})
          .then(async (res) => {
             console.log(res.data.user)
             token.value = res.data.token
             company.value = res.data.companydetail
             admin.value = res.data.user
             loggedinname.value = res.data.user.name
             company_id.value = res.data.user.company_id
             remainingcredit.value = res.data.companydetail.credit
             controllingbanner.value = 1
             console.log()
             //console.log(loggedinname.value)
             //console.log(token.value,res.data.user,company_id.value,admin.value.usertype,res.data.companydetail)
             
          $q.loading.hide()
          if(admin.value.usertype === 'admin')
          {
            router.push('/signup')
          } else {
            router.push('/cresult');
          
          }
             
          })
          .catch((res) => {
             $q.loading.hide()

            //  alert("Email or Password did not match")
            $q.dialog({
        title: 'Alert',
        message: "Email or Password did not match"
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    
          // alert(res.response.data.message || 'server not found')
           
         
          
            //$q.loading.hide()
            //console.log(res)
            
          })
     }
   }
    return {
      tab: ref('login'),
      login,
  submitForm,
  Reset,
  // toggle,
  frontpage,
  remainingcredit,
  controllingbanner,
  signup,
     submitForm
    }

    
  }, 
  components: {
    register,
    welcome
  }
}
</script>
 
 <!-- <style>
 #app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
   margin-top: 60px;
 }
 </style> -->
 