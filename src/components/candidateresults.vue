<template>
  <q-page>
    <div style="background-color: white">
      
      <div
        class="row custom-font"
        style="font-size: 19px;padding-left: 19px;padding-bottom: 10px;padding-top: 10px;"
      >
        <!-- v-if="(visibleColumns[0].label != '')" -->
        <q-select
          v-model="visibleColumns"
          @update:model-value="getfiltereddetails()"
          outlined
          dense
          options-dense
          color="green"
          :options="categoryoptions"
          style="min-width: 150px"
        >
          <template v-slot:selected>
            {{ visibleColumns.label }}
          </template>
        </q-select>
        <!-- {{ backwards }} -->
        <span class="button" style="padding-right: 10px">
          <!-- <q-btn outline rounded color="green" label="Preview Questions" no-caps/> -->
          <!-- <q-btn
            style="background: #16a34a; color: white"
            label="Test Link redirect"
            rounded
            no-caps
            @click="testlink()"
        /> -->
          <q-btn
            style="background: #16a34a; color: white"
            label="Test Link"
            rounded
            no-caps />
          <q-menu max-width="350px" style="width: 400px; height: 390px">
            <div class="row no-wrap justify-center q-pa-md">
              <div class="row">
                <div class="text-h7 q-mb-md"><strong>Link Expire in 1 Hour</strong></div>
                <!-- <q-toggle v-model="mobileData" label="Restricted Access" /> -->
              </div>

              <!-- <q-separator inset class="q-mx-md" /> -->
            </div>
            <div class="q-pa-md">
              <q-input
                type="textarea"
                v-model="generatetoken"
                rows="10"
                cols="30"
                outlined
                clearable
              >
              </q-input>
            </div>
            <div class="row justify-center q-pa-md">
              <q-btn @click="tokengen" style="background: #16a34a; color: white"
                >Create Link</q-btn
              >
              <q-btn
                color="black"
                label="Copy Link"
                flat
                size="md"
                no-caps
                v-close-popup
                icon="link"
                @click="copy()"
              />
            </div> </q-menu
        ></span>
      </div>

      <!-- <div style="font-size:16px;padding-left: 19px">Candidate<span style="padding-left: 450px">Test</span></div> -->
      <div class="q-pa-sm">
        <q-tabs
          v-model="tab1"
          align="justify-left"
          indicator-color="green"
          active-color="green"
        >
          <!-- <q-tab class="tabheadernew" name="overview" label="Overview" no-caps />
          <q-tab class="tabheadernew" name="addquestions" label="Add Questions" no-caps /> -->
          <q-tab class="tabheadernew" name="results" label="Results" no-caps />
          <q-tab class="tabheadernew" name="timeandgrade" label="Time & Grade" no-caps />
          <q-tab
            class="tabheadernew"
            name="testinstruction"
            label="Test Instructions"
            no-caps
          />
        </q-tabs>
        <q-separator />
        <!-- <div class="align-right">Search</div> -->

        <q-tab-panels v-model="tab1" animated>
          <!-- Results -->

          <q-tab-panel name="results">
            <div class="row q-pa-sm row items-start q-gutter-md">
              <q-card class="my-card" flat bordered>
                <q-card-section>
                  <div class="cardtitle">Total Applicants</div>
                  <div class="text-h6">{{ totalcandidates }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none"><div style="height:14px">
                  <q-icon name="arrow_upward" color="green"></q-icon> this week
                </div>
                  
                </q-card-section>
              </q-card>
              <q-card class="my-card" flat bordered>
                <q-card-section>
                  <div class="cardtitle">Total Cleared</div>
                  <div class="text-h6">{{ overallselected }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div style="height:14px">
                    <q-icon name="arrow_upward" color="green"></q-icon> this week
                  </div>
                  
                </q-card-section>
              </q-card>
              <q-card class="my-card" flat bordered>
                <q-card-section>
                  <div class="cardtitle">Total Questions</div>
                  <div class="text-h6">{{ totalquestions }} Questions</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div style="height:14px">
                    from {{ visibleColumns.label }}
                  </div>
                  
                </q-card-section>
              </q-card>
              <q-card class="my-card" flat bordered>
                <q-card-section>
                  <div class="cardtitle">Time Limit</div>
                  <div class="text-h6">{{ timelimit }} Mnts</div>
                </q-card-section>

                <q-card-section class="q-pt-none"> 
                  <div style="height:14px">

</div> </q-card-section>
              </q-card>
            </div>
            <!-- class="q-pa-md" -->
            <div>
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
                <!-- <q-tab
                  class="tabheader"
                  name="mails"
                  label="Top Performers"
                  no-caps
                />&nbsp;&nbsp; -->
                <q-tab
                  class="tabheader"
                  name="alarms"
                  label="All Applicant"
                  no-caps
                />&nbsp;&nbsp;
                <!-- <q-tab
                  class="tabheader"
                  name="movies"
                  label="Shortlisted"
                  no-caps
                />&nbsp;&nbsp;-->
                <q-tab class="tabheader" name="selected" label="Selected" no-caps />
                <!-- <span style="padding-left:500px">Search</span> -->
              </q-tabs>

              <!-- <div class="align-right">Search</div> -->

              <q-tab-panels v-model="tab" animated>
                <!-- <q-tab-panel name="mails">
                  <div class="text-h6">Top Performers</div>
                </q-tab-panel> -->
                <!-- @click="rowClick(rows)" -->
                <q-tab-panel name="alarms">
                  <q-table
                    title=""
                    :rows="candidateresults"
                    :columns="columns"
                    row-key="name"
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
                          {{ props.row.name }}  <br />
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
                        <!-- <q-td key="marks" :props="props">
                          {{ props.row.marks }} <br />
                          <q-btn
                            color="green"
                            label="Marksheet"
                            @click="onRowClick(props.row)"
                            flat
                            dense
                            no-caps
                          ></q-btn>
                        </q-td> -->
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
                          {{ props.row.phone }}
                        </q-td>
                        <q-td key="lastctc" :props="props">
                          {{ props.row.ctc }}
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
                         <!-- {{ props.row.notes }} -->
                          <q-btn
                            text-color="green"
                            icon="portrait"
                            @click="viewdetails(props.row)"
                            flat
                            round
                            dense
                            ><q-badge
                              color="red"
                              rounded
                              floating
                              v-show="props.row.notes != null "
                          />
                          </q-btn>
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </q-tab-panel>

                <q-tab-panel name="movies">
                  <div class="text-h6">Shortlisted</div>
                </q-tab-panel>
                <q-tab-panel name="selected">
                  <div class="text-h6">selected</div>
                  <q-table
                    title=""
                    :rows="selectedcandidates"
                    :columns="columns"
                    row-key="name"
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
                          {{ props.row.name }}{{ props.row.name }} <br />
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
                        <!-- <q-td key="marks" :props="props">
                          {{ props.row.marks }} <br />
                          <q-btn
                            color="green"
                            label="Marksheet"
                            @click="onRowClick(props.row)"
                            flat
                            dense
                            no-caps
                          ></q-btn>
                        </q-td> -->
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
                          {{ props.row.phone }}
                        </q-td>
                        <q-td key="lastctc" :props="props">
                          {{ props.row.ctc }}
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
                            ><q-badge
                              color="red"
                              rounded
                              floating
                              v-if="props.row.notes != ''"
                          /></q-btn>
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </q-tab-panel>
          <!-- Overview -->

          <q-tab-panel name="overview">
            
          </q-tab-panel>

          <!-- Add Questions -->

          <q-tab-panel name="addquestions">
           
          </q-tab-panel>

          <!-- Time and Grade -->

          <q-tab-panel name="timeandgrade">
            <q-card flat>
              <div class="text-h6">Time Settings</div>
              <!-- <div>Time Limit</div> -->
              <div>
                <div class="q-gutter-md page-container window- row ">
                  <!-- <q-input
                    style="width: 200px"
                    outlined
                    label="Overall time"
                    dense
                    disable
                  /> -->
                 <text-h5 style="display:flex; align-items:center;width:200px">Overall Time</text-h5> 
                  <q-select
                    style="width: 200px"
                    v-model="settime"
                    :options="timelimitoptions"
                    emit-value
                    map-options
                    outlined
                    dense
                  />
                  <!-- <q-input
                    style="width: 200px"
                    outlined
                    v-model="settime"
                    dense
                    type="number"
                  /> -->
                </div>
                <br />
                <q-separator />
                <q-card-section style="max-width: 530px; padding-left: 0px">
                  <div class="text-h6">Pass percentage settings</div>
                  <!-- <div class="row" style="max-width: 530px">
                    Set pass Percentage<span class="buttonfrnext"
                      ><q-toggle
                        size="40px"
                        val="50px"
                        
                        label="set pass percent"
                        color="green"
                    /></span>
                  </div> -->
                </q-card-section>

                <div class="q-gutter-md page-container window- row">
                  <!-- <q-input
                    style="width: 200px"
                    outlined
                    label="set pass mark"
                    dense
                    disable
                  /> -->
                  <text-h5 style="display:flex; align-items:center;width:200px">Set Pass Mark</text-h5> 
                  <q-input
                    style="width: 200px"
                    outlined
                    v-model="setpassmark"
                    dense
                    type="number"
                  />
                </div>
              </div>

              <br />
              <q-separator />
              <q-card-section style="max-width: 530px; padding-left: 0px">
                <!-- <div class="row" style="max-width: 530px">
                  <q-icon name="shuffle" size="sm"></q-icon
                  ><span
                    ><p style="padding-left: 5px">Shuffle Questions For Each Candidate</p>
                    <q-toggle class="buttonfrshuffle" size="40px" val="50p"
                  /></span>
                </div> -->
                <div style="max-width: 530px">
                  <q-btn
                    class="buttonfrsave"
                    label="Next"
                    style="border-radius: 20px; background: #2f9b47; color: white"
                    @click="next()"
                  ></q-btn>
                </div>
              </q-card-section>

              <br />
            </q-card>
          </q-tab-panel>

          <!-- Test Instruction -->

          <q-tab-panel name="testinstruction">
            <q-card flat>
              <q-card-section style="max-width: 530px; padding-left: 0px">
                <div>Test Instruction</div>
                <div
                  class="q-gutter-y-md column"
                  style="max-width: 530px; max-height: 250px"
                >
                  <q-input
                    v-model="testinstruction"
                    outlined
                    color="green"
                    type="textarea"
                    hint="This Instruction will be visible to candidate before starting test"
                  />
                  <div style="max-width: 530px">
                    <q-btn
                      class="buttonfrsave"
                      label="Save"
                      style="border-radius: 20px; background: #2f9b47; color: white"
                      @click="save()"
                    ></q-btn>
                  </div>
                </div>
              </q-card-section>
            </q-card>

            <br />
            
          </q-tab-panel>
        </q-tab-panels>
      </div>
      <q-dialog v-model="dialog" position="right" full-height>
        <q-card style="width: 347px;" v-for="(value, index) in candidaterows" :key="index">
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
                <!-- :class="props.selected ? 'bg-grey-2' : ''" -->
                <q-card style="width: 346px; height: 200px" flat>
                  <q-list dense class="list">
                    <q-item
                      v-for="col in props.cols.filter((col) => col.name !== 'desc')"
                      :key="col.name"
                    >
                      <!--<q-item-section side>  -->
                      <q-item-section class="leftside">
                        <q-item-label>{{ col.label }}</q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <!-- style="align-items: flex-end" -->
                        <q-item-label>{{ col.value }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card>
              </div>
            </template>
          </q-table>

          <div class="row justify-center">
            <q-btn
              color="green"
              label="Marksheet"
              @click="onRowClick(value)"
              flat
              dense
              no-caps
            ></q-btn>
          </div>
          <q-separator /><br />
          <div class="test" style="padding-left: 10px">Test Performance</div>

          <div class="q-pa-sm">
            <div class="row">
              <p class="marks">Marks scored</p>
              <p class="button" style="padding-right: 5px">{{ value.marks }}/10</p>
            </div>

            <q-linear-progress
              size="5px"
              rounded
              :value="value.marks / 10"
              color="green"
            />
            <div class="row q-pt-md">
              <p class="marks">Total Time Taken</p>
              <p class="button" style="padding-right: 5px">{{ value.timetaken }} </p>
            </div>
          </div>
          <q-separator /><br />
          <div class="test" style="padding-left: 10px">Notes</div>
          <div class="q-pa-md">
            <q-input
              v-model="value.notes"
              type="textarea"
              color="green"
              placeholder="Add Notes for you and your team"
              outlined
            />
          </div>
          <!-- <q-separator /><br /> -->
          <div class="row justify-center">
            <q-btn label="Save note" color="green" @click="savenotes(value)"></q-btn>
          </div>
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
      </div>
      <q-dialog v-if="controllingbanner === 1" persistent v-model="banner">
        <q-card>
          <q-banner inline-actions rounded class="bg-primary text-white">
            You Have {{ remainingcredit }} Test Remaining

            <template v-slot:action>
              <q-btn flat label="OK" @click="closedialog()" v-close-popup></q-btn>
            </template>
          </q-banner>
        </q-card>
      </q-dialog>
      <q-dialog
      v-model="medium"
    >
      <q-card class="q-pa-md" style="width: 700px; max-width: 80vw;">
        <!-- <div>Candidate ID: {{}}&nbsp;&nbsp; candidate name : {{candname}}  </div> -->
    <div class="q-mt-md" >
      Candidate Name: {{ editedItem.name }}
    </div>
    
    <q-table
    
      :rows="marksheetrows"
      auto-width
      wrap-cells
      :columns="marksheetcolumns"
      row-key="name"
      :rows-per-page-options="[0]"
      @row-click="onRowClick" 
    
      >
      <template v-slot:body="props">
      <q-tr :props="props">
      <q-td key="name" :props="props">
            {{ props.row.question}}
            
          </q-td>
          <!-- <q-td key="correct" :props="props">
            {{ props.row.correct }}
           
          </q-td>
          <q-td key="icon" :props="props">
            {{ props.row.icon }}
           
          </q-td> -->
          
          <q-td key="actions" :props="props" style="width:131px" >
             <q-btn v-if="props.row.icon === 'true'" text-color="green" text="Print" icon="check"  flat round dense></q-btn>
             <q-btn v-else-if="props.row.icon === 'false'" text-color="red" icon="clear"  flat round dense></q-btn>
              <div v-else>{{ JSON.parse(props.row.answer) }}</div>
          </q-td> 
          
      </q-tr>
      </template>
    </q-table>
      </q-card>
    </q-dialog>
      <!-- </q-card-section>
  </transition>
<q-inner-loading
        :showing="visible"
        label=""
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />
    </q-card> -->
    </div>
  </q-page>
</template>

<script setup>
import { Dialog, useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/user";
import { useUploadStore} from "../store/uploadquestion"
import { onMounted, ref } from "@vue/runtime-core";
import { api } from "../boot/axios";
import { useRouter } from "vue-router";
// import { copyText } from 'vue3-clipboard'
import copies from "copy-to-clipboard";

// import filedownload from 'js-file-download'
// import { stringify } from 'postcss';
const container = ref(null);

const $q = useQuasar();
const store = useUserStore();
const uploadstore = useUploadStore()
const { token, admin, remainingcredit, controllingbanner } = storeToRefs(store);
const { updatequestionid,uploadstatus } = storeToRefs(uploadstore);
const router = useRouter();
const rows = ref([]);
const candidateresults = ref([]);
const password = ref();
var checkpoint = ref(-1);
var promptdialog = ref(false);
var setpasspercent = ref();
var tab1 = ref("results");
const testinstruction = ref();
const dialog = ref(false);
const gradeandtimedetails = ref();
const banner = ref(false);
//console.log(remainingcredit.value);
const categoryoptions = ref([]);
const overallselected = ref();
const selectedcandidates = ref();
const medium = ref(false)
const visibleColumns = ref([
  {
    label: "",
    value: "",
  },
]);
const timelimitoptions = ref([
  {
    label: "5 Minutes",
    value: "300",
  },
  {
    label: "10 Minutes",
    value: "600",
  },
  {
    label: "15 Minutes",
    value: "900",
  },
  {
    label: "20 Minutes",
    value: "1200",
  },
]);
const displayicon = ref()
const questiontype = ref();
const settime = ref();
const setpassmark = ref();
const generatetoken = ref();
var text = ref("");
var backwards = ref("");
var tab = ref("alarms");
const totalcandidates = ref();
const totalcleared = ref();
const totalquestions = ref();
const timelimit = ref();

//const updatequestionid = ref()
var editedItem = ref([
  {
    id: "",
    name : ""
  },
]);
var formdetailedit = ref([]);
const visible = ref(true);
const showSimulatedReturnData = ref(false);
const marksheetrows = ref()
onMounted(() => {
  //getMarks();
  //getformdetails();
  //getpasspercentage();
  getCategories();
  // gettestinstruction();
});


const tokengen = () => {
  $q.loading.show({
    message: "Loading...pls wait..",
    boxClass: "text-white",
    spinnerColor: "white",
    spinnerSize: 60,
  });
  // console.log(date,date1)
  // var abc = Date.parse(date.value)
  // var bcd = Date.parse(date1.value)

  api
    .post(`api/auth/generateLinkToken`, {
      userId: admin.value.id,
      categoryId: visibleColumns.value.value,
    })
    .then(async (res) => {
      //console.log(res);
      $q.loading.hide();
      generatetoken.value =
        "http://phpstack-905265-3225833.cloudwaysapps.com/token/test/" +
        res.data.accessToken;
      //generatetoken.value = "http://localhost:8000/token/test/" + res.data.accessToken;
      //getCategories();

      //  applicant.name.value = generatetoken

      //console.log('newtoken',generatetoken.value)
      //console.log(rows.value)
      let companyid;
     let result = rows.value.filter((obj) =>  obj.id == visibleColumns.value.value)
     //console.log(result)
       result.map((res) => {
       companyid = res.companyId
       // console.log(res)
       })
      
      //console.log(companyid)
       if(companyid === 'all'){
       // console.log('hai')
        api
          .post(`api/question/get`,{categoryId : visibleColumns.value.value},
          {
  headers: {
    Authorization:  token.value
  }
}).then(async(res) => {
  let questionid = []
  let resdata = res.data.categories
  resdata.map(val => {
    questionid.push(val.id) 
  })

  updatequestionid.value = questionid
   let upstat = await uploadstore.questionOne(visibleColumns.value.value,token.value);
  //console.log(upstat)

  if(upstat == true)
  $q.notify({
          type: 'positive',
          message: 'New questions updated on the deafault category'
        })
})

       

        }
    })
    .catch((res) => {
      $q.loading.hide();
      ////console.log(res)
      // alert(res.response.data.message)
    });

  // if(type.value == 1) {
  //  questionOne();
  // }
};

   

const copy = () => {
  backwards.value = doCopy(generatetoken.value);
  return backwards;
};
const doCopy = (txt) => {
 

  copies(txt);
  return txt;
 
};

const closedialog = () => {
  controllingbanner.value = 2;
};

/* save notes */
const savenotes = (x) => {
  const formData = new FormData()
  
 
    formData.append('companyId', admin.value.id)
    formData.append('categoryId',  x.categoryId)
    formData.append('email', x.email)
    formData.append('notes' , x.notes)
    formData.append('name', x.name)
    formData.append('position', x.position)
    formData.append('phone', x.phone)
    formData.append('pincode', x.pincode)
    formData.append('ctc', x.ctc)
  api
    .post("api/candidate",formData,
      {
        headers: {
          Authorization:  token.value,
          "Content-Type": "multipart/form-data"
        },
      }
    )
    .then((res) => {
      //console.log(res);
    });
};

const adddetail = () => {
  formdetailedit.value.push({
    list: "",
  });
};
const timeconversion = (time) => {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  //console.log(seconds);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  let convertedtime = `${minutes}:${seconds}`;
  //timelimit.value = convertedtime
  return convertedtime;
  //console.log(convertedtime);
};
// const rowClick = (evt, rows, index) => {
//   console.log("cccc", evt, rows, index);
// };
const next = () => {
  tab1.value = "testinstruction";
};

/* view candidate details in card */

const viewdetails = (item) => {
 // console.log(item);
  let result = candidateresults.value;
  //console.log(result)
  let outputdata = result.filter((obj) => obj.id === item.id);
 // console.log(outputdata);
  let marks = null;
  let time = null;
  api
    .post(
      `api/getTestResults`,
      { categoryId: item.categoryId, candidateId: item.id },
      {
        headers: {
          Authorization: token.value,
        },
      }
    )
    .then((res) => {
     // console.log(res.data.testData);
      marks = res.data.testData.marksScored;
      //time = parseInt(res.data.testData.timePassed);
      //console.log(timelimit.value,res.data.testData.timePassed)
      time = parseInt(res.data.testData.timeLimit) - parseInt(res.data.testData.timePassed);
      //console.log(marks, time);
      candidaterows.value = outputdata.map((val) => {
       // console.log(marks, time);
        val.marks = marks;

        val.timetaken = timeconversion(time);
        return val;
      });
    })
    .catch((res) => {
      console.log(res);
    });

  dialog.value = true;
};

/* intial function to load value */

const getCategories = () => {
  $q.loading.show({
    message: "Loading...pls wait..",
    boxClass: "text-white",
    spinnerColor: "white",
    spinnerSize: 60,
  });

  // api .post(`api/getcategory`,{companyId : admin.value.id},
  api
    .post(
      `api/category/list`,
      { companyId: JSON.stringify(admin.value.id) },
      {
        headers: {
          Authorization: token.value,
        },
      }
    )
    .then(async (response) => {
      //console.log(response, admin.value.id);
      //let responsedata = response.data.data
      let combinedcategories = [];
      // for(let i =0 ; i < response.data.categories.length ; i++){
      response.data.categories.map((res) => {
       // console.log(res);
        combinedcategories.push(res);
      });

      //}
      // for( let i = 0;i < response.data.commonCategory.length ; i++) {
      response.data.commonCategory.map((res) => {
        //console.log(res);
        combinedcategories.push(res);
      });

      //}
      //console.log(combinedcategories);
      //let responsedata = response.data.categories;
      //rows1.value = responsedata
      //var result = combinedcategories.filter((obj) => obj.companyId == admin.value.id || obj.companyId === 'all');
      var result = combinedcategories;
      //console.log(result);

      rows.value = result;
      let array = [];
      let two = [];
     // console.log(categoryoptions.value);
      categoryoptions.value = result.map((x) => {
        //const category = x.category_id
        const categoryid = x.id;
        const categoryname = x.name;
        array.push({ label: x.name, value: x.id });
        two.push(categoryname);
        //console.log(x.name, x.id);

        return { label: x.name, value: x.id };
      });
      $q.loading.hide();
      //console.log(array);
      //console.log(visibleColumns.value);
      if (visibleColumns.value[0].value === "") {
       // console.log("not ok");
        visibleColumns.value = array[0];
        //console.log(visibleColumns.value);
      } else {
        console.log("ok");
      }

      api
        .post(
          `api/getCandidate`,
          { categoryId: visibleColumns.value.value, companyId: admin.value.id },
          {
            headers: {
              Authorization: token.value,
            },
          }
        )
        .then((res) => {
          //console.log(res);
          candidateresults.value = res.data.candidates.filter((obj) => obj.isActive == 1 && obj.companyId == admin.value.id);
          //candidateresults.value = res.data.candidates;
          totalcandidates.value = candidateresults.value.length;
        });
      const resultnew = rows.value.filter((obj) => obj.id == visibleColumns.value.value);
      resultnew.map((res) => {
        setpassmark.value = res.passMark;
        settime.value = res.timeLimit;
        testinstruction.value = res.instruction;
        questiontype.value = res.questionType;
        const timecheck = parseInt(res.timeLimit);
        timelimit.value = timeconversion(timecheck);
        // const minutes = Math.floor(timecheck / 60);
        // let seconds = timecheck % 60;
        //  console.log(seconds)
        // if (seconds < 10) {
        //   seconds = `0${seconds}`;
        // }

        // let convertedtime = `${minutes}:${seconds}`;
        // timelimit.value = convertedtime
       // console.log(timelimit.value);
      });

      await api
        .post(
          `api/question/get`,
          { categoryId: visibleColumns.value.value },
          {
            headers: {
              Authorization: token.value,
            },
          }
        )
        .then((res) => {
         // console.log(res.data.categories);
          totalquestions.value = res.data.categories.length;
        })
        .catch((res) => {
          $q.loading.hide();
          console.log(res);
        });
      //console.log(categoryoptions.value)
      api
        .post(
          `api/category/result/`,
          { categoryId: visibleColumns.value.value },
          {
            headers: {
              Authorization: token.value,
            },
          }
        )
        .then((res) => {
          //console.log(res);
          //overallselected.value =  res.data.selectedCandidatesTestData.length
          //selectedcandidates.value = res.data.candidates
          let result = res.data.candidates;
          selectedcandidates.value = result.filter(
            (obj) => obj.categoryId == visibleColumns.value.value
          );
          overallselected.value = selectedcandidates.value.length;
        });
    })
    .catch((res) => {
      console.log(res);
    });

  visible.value = false;
  showSimulatedReturnData.value = true;
};

/*  filter the values based on dropdown  */

const getfiltereddetails = async () => {
 // console.log(visibleColumns.value, rows.value);
  api
    .post(
      `api/getCandidate`,
      { categoryId: visibleColumns.value.value, companyId: admin.value.id },
      {
        headers: {
          Authorization: token.value,
        },
      }
    )
    .then((res) => {
     // console.log(res);
      candidateresults.value = res.data.candidates.filter((obj) => obj.isActive == 1 && obj.companyId == admin.value.id);
      //candidateresults.value = res.data.candidates;
      totalcandidates.value = candidateresults.value.length;
    });
  const result = rows.value.filter((obj) => obj.id == visibleColumns.value.value);
  result.map((res) => {
   // console.log(res);
    setpassmark.value = res.passMark;
    settime.value = res.timeLimit;
    testinstruction.value = res.instruction;
    questiontype.value = res.questionType;
    const timecheck = parseInt(res.timeLimit);
    const minutes = Math.floor(timecheck / 60);
    let seconds = timecheck % 60;
    console.log(seconds);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    let convertedtime = `${minutes}:${seconds}`;
    timelimit.value = convertedtime;
    console.log(convertedtime);
  });
  await api
    .post(
      `api/question/get`,
      { categoryId: visibleColumns.value.value },
      {
        headers: {
          Authorization: token.value,
        },
      }
    )
    .then((res) => {
     // console.log(res.data.categories);
      totalquestions.value = res.data.categories.length;
    });

  api
    .post(
      `api/category/result/`,
      { categoryId: visibleColumns.value.value },
      {
        headers: {
          Authorization: token.value,
        },
      }
    )
    .then((res) => {
      //console.log(res);
      //overallselected.value =  res.data.selectedCandidatesTestData.length
      //selectedcandidates.value = res.data.candidates
      let result = res.data.candidates;
      selectedcandidates.value = result.filter(
        (obj) => obj.categoryId == visibleColumns.value.value
      );
      overallselected.value = selectedcandidates.value.length;
    });
};

const testlink = () => {
  router.push("/token");
};
const deleteItem = (item) => {
  //promptdialog.value = true;
 // console.log(item.id);
  //console.log(candidateresults.value.indexOf(item));
  //checkpoint.value = rows.value.indexOf(item.id);
  checkpoint.value = candidateresults.value.indexOf(item);
  //console.log(checkpoint.value);
  editedItem.value = Object.assign({}, item);
  deletecheck();
  // const index = data.indexOf(item);
};

const download = (item) => {
 // console.log(item.id,item.resume);
  var filename = item.name
  api .get(`api/download/resume/${item.id}`,{
    headers: {
          Authorization: token.value,
          
        },
        responseType: 'blob'
  }).then((res) => {
    //console.log(res)
    const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename+'.pdf');
  document.body.appendChild(link);
  link.click();


  }).catch((res) => {
    console.log(res)
  })
 
};

const deletecheck = () => {
 
 // console.log(editedItem.value.id);
  if (checkpoint.value > -1) {
    confirm("Are you sure you want to delete this result?") &&
      api
        .post(
          `api/candidate/delete`,
          { candidateId: editedItem.value.id },
          {
            headers: {
              Authorization: token.value,
            },
          }
        )
        .then((res) => {
          //console.log(res);
          // getMarks();
          getfiltereddetails();
          setDefaultItem();
        })
        .catch((res) => {
          console.log(res);
        });
  } else {
    //router.push("/editqstn");
  }
 
};
const marksheetcolumns = [
    {
      
      name: 'name',
      required: true,
      label: 'Questions',
      field : 'question',
      align: 'left',
      
      sortable: true,
      
    },
  
    {
          name: "actions",
          label: "Answer",
          field: "actions", align: 'center',headerStyle:'width:100px'
        }
    
  ]
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
  // {
  //   name: "age",
  //   align: "center",
  //   label: "Age",
  //   field: "age",
  //   sortable: true,
  // },
  { name: "email", label: "Email", field: "email", sortable: true },
  { name: "mobile", label: "Phone no", field: "phone" },
  { name: "pincode", label: "location", field: "pincode" },
  { name: "lastctc", label: "Last Salary", field: "ctc" },
  // {
  //   name: "cv",
  //   label: "Cv",
  //   field: "cv",
  //   sortable: true,
  //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  // },
];
const candidaterows = ref();


const onRowClick = (item) => {
 // console.log(item.id,item.categoryId);
  editedItem.value = Object.assign({}, item);
   medium.value = true
   api .post(`api/getTestResults`,{categoryId : item.categoryId, candidateId : item.id},
 {
  headers: {
    Authorization:  token.value
  }
 })
          // .get(`analytic/printcanquestions/${cid}`)
          .then(async (res) => {
           // console.log(res)
  let resdata = res.data.testResult
  let question = []
   resdata.forEach(val => {
    //let ab = val.candidatename
     //val.candname= ab
     //console.log(val.candname)
     //candname.value = val.candname
     question.push(val.questionId)
    // console.log(val.isCorrect)
     if(val.isCorrect == 1){
      val.icon = 'true'
      displayicon.value = val.icon
      
     } else if(val.isCorrect == 0) {
      
      val.icon = 'false'
      displayicon.value = val.icon
     } else {
        val.icon=''
     }
   });

 //  console.log(question)
  
    api .post(`api/question/get`,{ categoryId : item.categoryId},{
  headers: {
    Authorization:  token.value
  }
 })
    .then(async(res)=> {
    //console.log(res)
    let allquestion = res.data.categories
    //console.log(allquestion)
     var sepratequestion = []
    for(let i = 0; i < question.length; i++){
      //console.log(question[i],allquestion)
     let abcd =  allquestion.filter(obj => obj.id == question[i])
     //console.log(abcd[0].id)
       sepratequestion.push(abcd[0])
    }
//console.log(sepratequestion)

   await
    resdata.map(async(val) => {
    //console.log(val,'dcdcdc',sepratequestion.length)
    for(let i = 0; i < sepratequestion.length; i++){
        //console.log(sepratequestion[i]['id'],'sdsdcdscd')
      if(sepratequestion[i]['id']== val.questionId){
       val.question = sepratequestion[i]['question'] 
      }
    }
     
   })
   marksheetrows.value = resdata
   })
  
   // console.log(rows.value)
    //console.log(rows.value[0].candidatename)
   
   
          })
  
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

const save = () => {
 
  api
    .put(
      `api/category/`,
      {
        category: {
          id: visibleColumns.value.value,
          name: visibleColumns.value.label,
          questionType: questiontype.value,
          isActive: 1,
          instruction: testinstruction.value,
          timeLimit: settime.value,
        },
        // time: time,
        // passmark: passmark,
        // enable: enable,
      },
      {
        headers: {
          Authorization: token.value,
        },
      }
    )
    .then((res) => {
     // console.log(res);
      $q.notify({
        type: "positive",
        message: "Saved",
        position: "top-right",
        color: "green",
      });
      getCategories();
      // getfiltereddetails();
    })
    .catch((err) => {
      console.log(err);
    });
};


</script>
<style>
/* .normal {
  font-weight: 400;
  font-size: 14;
} */
.q-dialog__inner--minimized {
  padding: 0px;
}
.leftside {
  color: #757575;
  align-items: flex-start;
  padding-right: 5px;
  width: 50px;
  min-width: 0;
  max-width: 100%;
}
.marks {
  font-weight: 400;
  font-size: 14px;
  color: #7a7a7a;
  line-height: 100%;
  letter-spacing: -0.004em;
}
.test {
  font-weight: 500;
  font-size: 16px;
  color: #383838;
}
.list {
  padding: 12px 12px;
}
.toggle,
.buttonfrsave {
  position: absolute;
  right: 0px;
}
.buttonfrshuffle {
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
.button {
  position: absolute;
  right: 0;
}
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

.align-right {
  text-align: right;
  border: 0;
}
.box {
  height: 95px;
}
/* .custom-font {
   font-family: inter;
} */
</style>
<style scoped>
.new-card {
  width: 100%;
  max-width: 340px;
}

.q-card__section--vert {
  padding: 19px;
}
.q-card {
  border-radius: 6px;
}
</style>
<style lang="sass" scoped>
.card-example

  height: 588px
</style>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>
