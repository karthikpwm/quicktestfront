<template>
    <nav
      id="navbarExample"
      class="navbar navbar-expand-lg fixed-top navbar-light"
      aria-label="Main navigation"
    >
      <div class="container">
        <a class="navbar-brand logo-text" href="#">quicktest</a>
        <button
          class="navbar-toggler p-0 border-0"
          type="button"
          id="navbarSideCollapse"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="navbar-collapse offcanvas-collapse"
          id="navbarsExampleDefault"
        >
          <ul class="navbar-nav ms-auto navbar-nav-scroll">
            <li class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                href="#login"
                @click="displaylogin()"
                >Login</a
              >
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
            <a class="btn-solid-sm" href="#" @click="displaysignup()">Sign Up</a>
          </span>
        </div>
      </div>
    </nav>
    <header id="header" class="header" style="background-color: white">
      <div class="container">
        <!-- <div> -->
  
        <div class="row">
          <div class="col-lg-6 col-xl-6">
            <!-- <div class="justify-center" style="padding-left:120px;padding-right:80px"> -->
            <div>
              <div class="text-container">
                <h1 class="h3-large">
                  Simplify your hiring process
                  <span style="color: black">Avoid Costly Mis-hires </span>
                </h1>
                <p class="p-large">
                  Quicktest minimises the burden or conducting interviews by
                  allowing employers to generate and send tests to prospective
                  candidates for screening and shortlisting
                </p>
                <!-- <a class="btn-solid-lg" href="#services">Sign up</a> -->
              </div>
            </div>
          </div>
          <!-- v-if="vanish == true" -->
          <div class="col-lg-6">
            <!-- <div class="justify-center" style="display:flex"> -->
            <div style="padding-left: 50px">
              <q-card style="width: 470px" flat>
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
                  hidden
                >
                  <q-tab name="login" label="Login" />
                  <q-tab name="register" label="Register" />
                </q-tabs>
  
                <!-- <q-separator /> -->
  
                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="login" class="tabpanel">
                    <q-form class="q-gutter-lg" @submit.prevent="submitForm">
                      <q-input
                        color="green"
                        outlined
                        v-model="login.username"
                        placeholder="Username"
                        dense
                      />
  
                      <q-input
                        outlined
                        color="green"
                        v-model="login.password"
                        placeholder="Password"
                        type="password"
                        debounce
                        dense
                      />
  
                      <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->
  
                      <div>
                        <q-btn
                          class="text-grey-1 full-width"
                          label="Login"
                          aria-label="bold"
                          type="submit"
                          style="background-color: #2f9b47; border-radius: 5px"
                          rounded
                        /><br /><br />
                        <!-- <q-btn label="Reset" type="reset" flat class="q-ml-md text-grey-1 bg-cyan-8" style="background-color:#28534E" rounded aria-label="bold" @click="Reset()"   /> -->
                        <!-- <q-btn label="Register" @click="toggle" to="/register" color="primary" /> -->
                      </div>
                    </q-form>
                  </q-tab-panel>
  
                  <q-tab-panel name="register" class="tabpanel">
                    <q-form
                      v-if="registertab == true"
                      class="q-gutter-md"
                      @submit.prevent="registerform"
                    >
                      <q-input
                        outlined
                        dense
                        ref="name"
                        placeholder=" Name"
                        color="green"
                        v-model="signup.name"
                      >
                      </q-input>
  
                      <q-input
                        outlined
                        dense
                        ref="company"
                        placeholder="Company Name"
                        color="green"
                        v-model="signup.company"
                      >
                      </q-input>
                      <q-input
                        ref="email"
                        dense
                        clearable
                        v-model="signup.email"
                        type="email"
                        outlined
                        color="green"
                        placeholder="Enter your official email"
                      >
                        <!-- <template v-slot:prepend>
                      <q-icon name="email" />
                    </template> -->
                      </q-input>
                      <q-input
                        ref="password"
                        dense
                        type = "password"
                        v-model="signup.password"
                        outlined
                        color="green"
                        placeholder="Password"
                      >
                        <!-- <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template> -->
                      </q-input>
  
                      <q-input
                        ref="repeatPassword"
                        dense
                        v-model="signup.repeatPassword"
                        type = "password"

                        outlined
                        color="green"
                        placeholder="Repeat Password"
                      >
                        <!-- <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template> -->
                      </q-input>
  
                      <!-- <q-input  v-model="signup.company"  label="Company Name" square clearable /> -->
  
                      <div style="padding-top: 20px">
                        <q-btn
                          class="text-grey-1 full-width"
                          label="Register"
                          aria-label="bold"
                          type="submit"
                          style="background-color: #2f9b47; border-radius: 5px"
                          rounded
                        /><br /><br />
                      </div>
                    </q-form>
  
                    <q-form
                      v-else
                      @submit.prevent="verifyotp"
                      class="q-gutter-md"
                    >
                      <p>Enter the OTP sent to your Registered Mail id</p>
                      <q-input
                        placeholder="OTP"
                        outlined
                        dense
                        v-model="otp"
                        color="green"
                        style="padding-bottom: 15px"
                      />
                      <q-btn
                        class="text-grey-1 full-width"
                        label="Verify"
                        aria-label="bold"
                        type="submit"
                        style="background-color: #2f9b47; border-radius: 5px"
                        rounded
                      /><br /><br />
                    </q-form>
                  </q-tab-panel>
                </q-tab-panels>
              </q-card>
            </div>
          </div>
          <!-- <div class="col-lg-6 col-xl-7">
                   <div class="image-container">
                       <img class="img-fluid" src="assets/images/header-image.png" alt="alternative" />
                   </div> 
               </div>  -->
        </div>
      </div>
    </header>
    <div id="marksheet" class="accordian-4"></div>
    <div id="details" class="basic-1" style="background: white">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-xl-6">
            <div class="image-container">
              <vue3-lottie
                :animationData="animation"
                :height="950"
                :width="700"
              />
            </div>
          </div>
          <div class="col-lg-6 col-xl-6">
            <div class="image-container">
              <vue3-lottie
                :animationData="afteranimation"
                :height="950"
                :width="700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div id="details" class="basic-1">
       <div class="container">
           <div class="row">
               <div class="col-lg-6 col-xl-6">
                   <div class="image-container">
                       <img class="img-fluid" src="../assets/images/left.png" alt="alternative" />
                   </div> 
               </div> 
               <div class="col-lg-6 col-xl-6">
                 <div class="image-container">
                       <img class="img-fluid" src="../assets/images/right.png" alt="alternative" />
                   </div>
               </div> 
           </div>
       </div> 
     </div> -->
    <div id="services" class=".accordian-5" style="background-color: white">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <h2 class="h2-heading" style="color: #141414">
              Why Choose Quicktest
            </h2>
            <p class="p-heading">
              Everything you need to build an effortless hiring process
            </p>
          </div>
        </div>
        <div class="image-container">
          <img
            class="img-fluid"
            src="../assets/images/card4.png"
            alt="alternative"
          />
        </div>
      </div>
    </div>
    <!-- <div id="services" style="background:white">
       <div class="container">
          <div class="row">
              <div class="col-xl-12"> 
                  <h2 class="h2-heading">Why Choose Quicktest</h2>
                   <p class="p-heading">Everything you need to build an effortless hiring process</p>
  
              </div>
  
          </div> <br>
          <div class="row quicktest q-pa-md" no-wrap>
              <div class="col-xl-5">
                  <div class="q-pa-md">
  
                      <q-card class="smallcard">
                      <img class="img-fluid" src="../assets/images/center11.png" alt="alternative" />
                  </q-card>
                  
                  </div>  
  
                  <div class="q-pa-md">
                      <q-card class="opencard" flat>
                          <div class="text-h6" style="color:#2F9B47;font-weight:600;font-style: normal;font-size: 24px;letter-spacing: 0.2em;" >EMPOWERING</div><br>
                          <div class="text-subtitle2" style="color:#141414;font-weight:545;font-style: normal;font-size: 26px;line-height: 142%;width:382px">Boosts your HR function by drastically minimising shortlisting time.</div>
                  </q-card>
                  </div>
                  <div class="q-pa-md">
                      <q-card class="smallcard">
                      <img class="img-fluid" src="../assets/images/center31.png" alt="alternative" />
                      </q-card>
                  </div>
                  <div class="q-pa-md">
                      <q-card class="opencard" flat>
                          <div class="text-h6" style="color:#2F9B47;font-weight:600;font-style: normal;font-size: 24px;letter-spacing: 0.2em;" >HIGH ROI</div><br>
                          <div class="text-subtitle2" style="color:#141414;font-weight:545;font-style: normal;font-size: 26px;line-height: 142%;width:382px">Avoid costly mishires with a simple test, save precious time, resource & head hunting fees.</div>
                  </q-card>
                  </div>
                  <div class="q-pa-md">
                      <q-card class="smallcard">
                      <img class="img-fluid" src="../assets/images/center51.png" alt="alternative" />
                      </q-card>
                  </div>
                  
                  
              
            </div>
  
            <q-separator vertical inset class="q-mx-lg" style="width:3px;height:auto;background:#2F9B47"/>
                  
             
              <div class="col-xl-5">
                  <div class="q-pa-md">
                      <q-card class="opencard" flat>
                          <div class="text-h6" style="color:#2F9B47;font-weight:600;font-style: normal;font-size: 24px;letter-spacing: 0.2em;" >SCALABLE</div><br>
                          <div class="text-subtitle2" style="color:#141414;font-weight:545;font-style: normal;font-size: 26px;line-height: 142%;width:382px">Quicktest handles volume as per the needs of the organisation.</div>
                  </q-card>
                  </div>
                  <div class="q-pa-md">
                     <q-card class="smallcard">
                      <img class="img-fluid" src="../assets/images/center22.png" alt="alternative" />
                  </q-card>
                  </div>
                  <div class="q-pa-md">
                      <q-card class="opencard" flat>
                          <div class="text-h6" style="color:#2F9B47;font-weight:600;font-style: normal;font-size: 24px;letter-spacing: 0.2em;" >CUSTOMISABLE</div><br>
                          <div class="text-subtitle2" style="color:#141414;font-weight:545;font-style: normal;font-size: 26px;line-height: 142%;width:382px">Create tests as per your own testing criteria, or choose from our wide range of tests.</div>
                  </q-card>
                  </div>
                  <div class="q-pa-md">
                     <q-card class="smallcard">
                      <img class="img-fluid" src="../assets/images/center42.png" alt="alternative" />
                  </q-card>
                  </div>
                  <div class="q-pa-md">
                      <q-card class="opencard" flat>
                          <div class="text-h6" style="color:#2F9B47;font-weight:600;font-style: normal;font-size: 24px;letter-spacing: 0.2em;" >DEPENDABLE</div><br>
                          <div class="text-subtitle2" style="color:#141414;font-weight:545;font-style: normal;font-size: 26px;line-height: 142%;width:382px">AI powered algorithm to dynamically change questions for each candidate to avoid </div>
                  </q-card>
                  </div>
              
                   
              </div>
          </div>
       </div>
      </div> -->
    <div id="features" class="cards-1 accordion-3">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <h2 class="h2-heading" style="padding-top: 20px; color: #141414">
              We've got a pricing plan that's perfect for you!
            </h2>
          </div>
        </div>
        <div class="row quicktest" style="padding-bottom: 30px">
          <div>
            <div class="card">
              <img
                class="img-fluid"
                src="../assets/images/starter.png"
                alt="alternative"
              />
            </div>
  
            <div class="card">
              <img
                class="img-fluid"
                src="../assets/images/corporate.png"
                alt="alternative"
              />
            </div>
  
            <div class="card">
              <img
                class="img-fluid"
                src="../assets/images/enterprise.png"
                alt="alternative"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="features" class="accordion-2"></div>
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
      <img src="../assets/images/up-arrow.png" alt="alternative" />
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
  import lottie from 'lottie-web'
  import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
  import { Vue3Lottie } from 'vue3-lottie'
  
  import animation from '../json/before.json'
  import afteranimation from '../json/after.json'
  
  
  export default {
    setup () {
  
      const $q = useQuasar()
          const store = useUserStore()
          const store2 = useCompanyStore()
      const {token, admin,loggedinname,company_id,user,remainingcredit,controllingbanner,controlnewregister} = storeToRefs( store )
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
      name : '',
      repeatPassword : '',
  
    })
    onMounted(()=> {
  
    })
    const otp = ref()
    const vanish = ref('false')
    var registertab = ref(true)
    const frontpage = ref(false)
    var tab = ref('login')
   const Reset = () => {
    login.value.username = null,
    login.value.password = null,
     $q.notify({
           type: 'positive',
            message: 'Form Reset' }
        )
   }
   const displaylogin = () => {
    vanish.value = true
    tab.value = 'login'
   }
   const displaysignup = () => {
    vanish.value = true
    tab.value = 'register'
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
            .post(`api/auth/login`, {email : login.value.username,password : login.value.password})
            .then(async (res) => {
               //console.log(res.data)
               token.value = res.data.token
               //company.value = res.data.companydetail
               admin.value = res.data.user
               //loggedinname.value = res.data.user.name
               company_id.value = res.data.user.id
               //remainingcredit.value = res.data.companydetail.credit
               controllingbanner.value = 1
               //console.log()
               //console.log(loggedinname.value)
               //console.log(token.value,res.data.user,company_id.value,admin.value.usertype,res.data.companydetail)
               //api .post(`api/getcategory`,{companyId : admin.value.id},
               api .post(`api/category/list`,{companyId : JSON.stringify(admin.value.id)},
        {
          headers: {
            Authorization:  token.value
          }
        }).then(async (response) => {
          $q.loading.hide()
          //console.log(response,admin.value.id)
          //let responsedata = response.data.data
          //let responsedata = response.data.categories
          //rows1.value = responsedata
          let combinedcategories = []
  
        response.data.categories.map((res) => {
          //console.log(res)
          combinedcategories.push(res)
        })
  
  
        response.data.commonCategory.map((res) => {
          //console.log(res)
          combinedcategories.push(res)
        })
           // var result=responsedata.filter(obj=> obj.companyId == admin.value.id);
           var result = combinedcategories
            //console.log(result);
           if(result.length != 0) {
              controlnewregister.value = false
              if(admin.value.role === 'admin')
            {
              router.push('/signup')
            } else {
              router.push('/cresult');
  
            }
           } else {
  
              controlnewregister.value = true
              //router.push('/cresult')
          router.push('/createnewtest')
           }
  
   })
  
  
  
  
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
     const registerform = () => {
    if (!signup.value.password || !signup.value.email){
        $q.notify({
           type: 'negative',
            message: 'Fill Required Fields' }
        )
  
    }else if(signup.value.password !== signup.value.repeatPassword){
        $q.notify({
           type: 'negative',
            message: 'Passwords doesn\'t match.' }
        )
    } else {
    //console.log(signup.value.username)
        api
        .post(`api/auth/register`,
            {
                email: signup.value.email, 
                password:signup.value.password,
                companyName : signup.value.company,
                name : signup.value.name      
        },
        ).then(async (res) => {
            let result = res.data.status
            if(result != "error"){
                registertab.value = false
                console.log(res)
                api .post(`api/auth/sendOtp`,{email :signup.value.email}).then(async (res) => {
                    console.log(res)
                }).catch( (res) => {
                    console.log(res)
                })
            // router.push('/login')
            } else {

                $q.notify({
                    type: 'negative',
                    message: res.data.message }
                )
            
            }
  
  
        }).catch( (res) => {
            console.log(res)
        })
    }
    }
    const verifyotp =() => {
      api .post(`api/auth/verifyOtp`, {email: signup.value.email, otp :otp.value}).then ( (res) => {
          console.log(res)
           let result = res.data.status
           if(result === "error"){
            alert('Incorrect OTP')
           }
             else {
  
            api
            .post(`api/auth/login`, {email : signup.value.email,password : signup.value.password}).then( (res) => {
              token.value = res.data.token
               //company.value = res.data.companydetail
               admin.value = res.data.user
               //loggedinname.value = res.data.user.name
               company_id.value = res.data.user.id
               //remainingcredit.value = res.data.companydetail.credit
               controllingbanner.value = 1
               controlnewregister.value = false
              router.push('/cresult')
          //router.push('/createnewtest')
            }).catch( (res) => {
              console.log(res)
            })
           }
  
  
  
  
      }).catch((res) => {
              console.log(res)
              alert('incorrect')
  
          })
    }
      return {
        tab,
        login,
    submitForm,
    Reset,
    // toggle,
    frontpage,
    remainingcredit,
    controllingbanner,
    signup,
    registerform,
    registertab,
    otp,
    verifyotp,
    controlnewregister,
    vanish,
    displaylogin,
    displaysignup,
    animation,
    afteranimation
      }
  
  
    },
    components: {
      register,
      welcome,
      LottieAnimation,
      Vue3Lottie,
    }
  }
  </script>
  //padding: 63px;
  <style>
  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    line-height: 3.25rem;
    letter-spacing: 0.4px;
  }
  h2 {
    font-size: 2rem;
    font-weight: 700;
  }
  
  .tabpanel {
    padding: 8px;
  }
  .q-card {
    border-radius: 1px;
  }
  </style>
  <style scoped>
  .smallcard {
    border-radius: 27px;
    width: 415px;
  }
  .quicktest {
    justify-content: center;
  }
  .opencard {
    border-radius: 27px;
    width: 450px;
    height: 251px;
  }
  </style>
  