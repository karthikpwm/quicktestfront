<template>
  <q-page
    ><div style="background-color: white">
      <!-- <q-fixed-position corner="top-right">
    <q-btn round color="primary" @click="alert" icon="alarm" />
  </q-fixed-position> -->
      <div
        class="row custom-font"
        style="font-size: 19px;padding-left: 19px;padding-bottom: 10px;padding-top: 10px;"><q-select
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
        <span class="button" style="padding-right: 10px">
          <!-- <q-btn outline rounded color="green" label="Preview Questions" no-caps/> -->
          <q-btn
            style="background: #16a34a; color: white"
            label="Test Link"
            rounded
            no-caps
            @click="testlink()"
        /></span>
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
            <div class="q-pa-sm row items-start q-gutter-md">
              <q-card class="new-card" flat bordered>
                <q-card-section>
                  <div class="cardtitle">Total Applicants</div>
                  <div class="text-h6">1234</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-icon name="arrow_upward" color="green"></q-icon> 210 this week
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
                  name="mails"
                  label="Top Performers"
                  no-caps
                />&nbsp;&nbsp;
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
                />&nbsp;&nbsp;
                <q-tab class="tabheader" name="selected" label="Selected" no-caps /> -->
                <!-- <span style="padding-left:500px">Search</span> -->
              </q-tabs>

              <!-- <div class="align-right">Search</div> -->

              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="mails">
                  <div class="text-h6">Top Performers</div>
                </q-tab-panel>
                <!-- @click="rowClick(rows)" -->
                <q-tab-panel name="alarms">
                  <q-table
                    title=""
                    :rows="rows"
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
                            label="Marksheet"
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
                            ><q-badge color="red" rounded floating v-if="props.row.notes != ''"/></q-btn>
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
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </q-tab-panel>
          <!-- Overview -->

          <q-tab-panel name="overview">
            <div class="text-h6">Test Description</div>
            <br />
            <div>Test Title</div>
            <div class="q-gutter-y-md column" style="max-width: 530px">
              <q-input
                outlined
                v-model="text"
                color="black"
                placeholder="Enter Test Title"
                dense
              />
            </div>
            <br />
            <div>Test Description</div>
            <div class="q-gutter-y-md column" style="max-width: 530px">
              <q-input v-model="text" outlined color="black" />
            </div>
            <br />
            <div>Job Title</div>
            <div class="q-gutter-y-md column" style="max-width: 530px">
              <q-input v-model="text" outlined color="black" />
            </div>
            <br />
            <q-card-section style="max-width: 530px">
              <div class="button">
                <q-btn
                  class="buttonfrnext"
                  label="next"
                  style="border-radius: 20px; background: #2f9b47; color: white"
                  @click="next()"
                ></q-btn>
              </div>
            </q-card-section>
          </q-tab-panel>

          <!-- Add Questions -->

          <q-tab-panel name="addquestions">
            <div class="row items-start">
              <div style="max-width: 450px">
                <q-card flat>
                  <div class="text-h6" style="padding-top: 5px">Aptitude</div>
                  <br />
                  <q-card-section class="bg-grey text-black">
                    <div class="text-subtitle2">
                      Q1. dewdew fwwefefewewf ewfewfeff wefewfefef ewfewfeefe ?
                    </div>
                  </q-card-section>
                </q-card>
                <br />
                <q-card flat>
                  <q-card-section class="bg-grey text-black">
                    <div class="text-subtitle2">
                      Q1. dewdew fwwefefewewf ewfewfeff wefewfefef ewfewfeefe ?
                    </div>
                  </q-card-section>
                </q-card>
                <br />
                <q-card flat>
                  <q-card-section class="bg-grey text-black">
                    <div class="text-subtitle2">
                      Q1. dewdew fwwefefewewf ewfewfeff wefewfefef ewfewfeefe ?
                    </div>
                  </q-card-section> </q-card
                ><br />
                <q-card flat>
                  <q-card-section class="bg-grey text-black">
                    <div class="text-subtitle2">
                      Q1. dewdew fwwefefewewf ewfewfeff wefewfefef ewfewfeefe ?
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              <div>
                <q-card class="my-card" style="width: 600px" flat>
                  <div class="text-h6">Add Questions</div>
                  <br />
                  <div class="q-pa-sm q-gutter-sm">
                    <q-editor v-model="editor" min-height="5rem" />
                  </div>
                  <div style="padding-left: 10px">Time Title</div>
                  <div class="q-pa-md row q-gutter-sm">
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
                  <div>
                    <q-option-group v-model="group" :options="options">
                      <template v-slot:label="">
                        <div class="row items-center">
                          <span style="padding-bottom: 5px; width: 550px"
                            ><q-input outlined v-model="text" dense
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
                      @click="next()"
                    ></q-btn>
                  </div>
                </q-card>
              </div>
            </div>
          </q-tab-panel>

          <!-- Time and Grade -->

          <q-tab-panel name="timeandgrade">
            <q-card flat>
              <div class="text-h6">Time Settings</div>
              <div>Time Limit</div>
              <div v-for="(value, index) in gradeandtimedetails" :key="index">
                <div class="page-container window- row q-gutter-md">
                  <q-input
                    style="width: 200px"
                    outlined
                    v-model="value.timelimit"
                    dense
                  />
                  <q-input
                    style="width: 200px"
                    outlined
                    v-model="value.time"
                    dense
                    type="number"
                  />
                </div>
                <br />
                <q-separator />
                <q-card-section style="max-width: 530px; padding-left: 0px">
                  <div class="text-h6">Pass percentage settings</div>
                  <div class="row" style="max-width: 530px">
                    Set pass Percentage<span class="buttonfrnext"
                      ><q-toggle
                        size="40px"
                        val="50px"
                        v-model="setpasspercent"
                        color="green"
                    /></span>
                  </div>
                </q-card-section>

                <div class="q-gutter-md page-container window- row">
                  <q-input style="width: 200px" outlined v-model="value.type" dense />
                  <q-input
                    style="width: 200px"
                    outlined
                    v-model="value.passmark"
                    dense
                    type="number"
                  />
                </div>
              </div>

              <br />
              <q-separator />
              <q-card-section style="max-width: 530px; padding-left: 0px">
                <div class="row" style="max-width: 530px">
                  <q-icon name="shuffle" size="sm"></q-icon
                  ><span
                    ><p style="padding-left: 5px">Shuffle Questions For Each Candidate</p>
                    <q-toggle class="buttonfrshuffle" size="40px" val="50p"
                  /></span>
                </div>
                <div style="max-width: 530px">
                  <q-btn
                    class="buttonfrsave"
                    label="save"
                    style="border-radius: 20px; background: #2f9b47; color: white"
                    @click="savegrades()"
                  ></q-btn>
                </div>
              </q-card-section>

              <br />
            </q-card>
          </q-tab-panel>

          <!-- Test Instruction -->

          <q-tab-panel name="testinstruction">
            <div>Test Instruction</div>
            <div class="q-gutter-y-md column" style="max-width: 530px; max-height: 250px">
              <q-input
                v-model="testinstruction"
                outlined
                color="green"
                type="textarea"
                hint="This Instruction will be visible to candidate before starting test"
              />
            </div>
            <br />
            <q-separator></q-separator><br />
            <div>Candidate Form</div>
            <div class="q-pa-md row items-start q-gutter-md">
              <q-card class="my-card" flat>
                <q-card-section>
                  <!-- {{ formdetailedit[0] }}abcd {{ formdetailedit[0].name }} -->
                  <div
                    class="page-container window- row q-gutter-lg"
                    v-for="(value, index) in formdetailedit"
                    :key="index"
                    :val="value"
                    style="padding-bottom: 5px"
                  >
                    <q-input
                      style="width: 340px; height: 40px"
                      outlined
                      v-model="value.list"
                      dense="dense"
                    />
                    <!-- <q-input
                      style="width: 194px; height: 40px"
                      outlined
                      v-model="text"
                      dense="dense"
                    />  -->
                    <q-btn icon="delete" text-color="red-10" flat @click="deleteformlist(value)" rounded></q-btn>
                    <q-btn icon="playlist_add" text-color="green" flat rounded ></q-btn>
                  </div>
                  <br />
                  <q-btn label="+ Add Detail" flat @click="adddetail()" no-caps></q-btn>
                  <br />
                  <div class="button">
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
                    is this mandatory field ?<span class="toggle"
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
        </q-tab-panels>
      </div>
      <q-dialog v-model="dialog" position="right" full-height >
        <q-card style="width: 347px" v-for="(value,index) in candidaterows" :key="index">
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
                <q-card style="width: 346px; height: 300px" flat>
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
          <q-separator /><br />
          <div class="test" style="padding-left: 10px">Test Performance</div>

          <div class="q-pa-sm">
            <div class="row">
              <p class="marks">Marks scored</p>
              <p class="button" style="padding-right: 5px">{{value.marks}}/10</p>
            </div>

            <q-linear-progress size="5px" rounded :value="value.marks / 10" color="green" />
            <div class="row q-pt-md">
              <p class="marks">Total Time Taken</p>
              <p class="button" style="padding-right: 5px">{{ value.timetaken }} mnts</p>
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
<q-btn   label="Save note" color="green" @click="savenotes(value)"></q-btn>
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
        <q-banner inline-actions rounded class="bg-primary  text-white">
      You Have {{ remainingcredit }} Test Remaining 

      <template v-slot:action>
        <q-btn flat label="OK" @click="closedialog()" v-close-popup></q-btn>
        
      </template>
    </q-banner>

      </q-card>
    </q-dialog></div
  ></q-page>
</template>

<script>
import { Dialog, useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/user";
import { onMounted, ref } from "@vue/runtime-core";
import { api } from "../boot/axios";
import { useRouter } from "vue-router";
// import filedownload from 'js-file-download'
// import { stringify } from 'postcss';
export default {
  setup() {
    const $q = useQuasar();
    const store = useUserStore();
    const { token, admin,remainingcredit,controllingbanner } = storeToRefs(store);
    const router = useRouter();
    const rows = ref([]);
    const password = ref();
    var checkpoint = ref(-1);
    var promptdialog = ref(false);
    var setpasspercent = ref();
    var tab1 = ref("results");
    var testinstruction = ref()
    const dialog = ref(false);
    const gradeandtimedetails = ref();
    const banner = ref(false)
    console.log(remainingcredit.value)
    const categoryoptions = ref([])
    var editedItem = ref([
      {
        candidate_id: "",
      },
    ]);
    var formdetailedit = ref([]);
    onMounted(() => {
      getMarks();
      getformdetails();
      getpasspercentage();
      getCategories();
      // gettestinstruction();
    });
    const closedialog = () => {
      controllingbanner.value = 2

    }
    const savenotes = (x) => {
    api .put('analytic/savenotes',{notes : x.notes, candidate_id : x.candidate_id},{
            headers: {
              Authorization: "Bearer " + token.value,
            }},)
    .then(res => {
      console.log(res)
    })
    }
    const deleteformlist = (list) => {
     console.log(list)
     api .delete(`analytic/deleteformlist/${list.formdetails_id}`,{
            headers: {
              Authorization: "Bearer " + token.value,
            },
          }).then((res) => {
                  console.log(res);
                  getformdetails();
                 
                })
                .catch((res) => {
                  console.log(res);
                });
    }
    const getpasspercentage = () => {
      api
        .post(
          `analytic/getpasspercentage`,
          { company_id: admin.value.company_id },
          {
            headers: {
              Authorization: "Bearer " + token.value,
            },
          }
        )
        .then(async (res) => {
          let resdata = res.data.data;
          console.log(resdata);
          gradeandtimedetails.value = resdata.map((val) => {
            console.log(val.enable,val.testinstruction);
            testinstruction.value = val.testinstruction
            if (val.enable == 1) {
              setpasspercent.value = true;
            } else {
              setpasspercent.value = false;
            }
            console.log(setpasspercent.value);
            return val;
          });
        })
        .catch((res) => {
          console.log(res);
        });
    };
    const getformdetails = () => {
      api
        .post(
          `analytic/getformdetails`,
          { company_id: admin.value.company_id },
          {
            headers: {
              Authorization: "Bearer " + token.value,
            },
          }
        )
        .then(async (res) => {
          let resdata = res.data.data;
          console.log(resdata);
          formdetailedit.value = resdata.map((val) => {
            console.log(val);
            return val;
          });
          console.log(formdetailedit.value);
        })
        .catch((res) => {
          console.log(res);
        });
    };
    // const gettestinstruction = () => {
    //   api
    //     .post(
    //       `analytic/gettestinstruction`,
    //       { company_id: admin.value.company_id },
    //       {
    //         headers: {
    //           Authorization: "Bearer " + token.value,
    //         },
    //       }
    //     )
    //     .then(async (res) => {
    //       let resdata = res.data.data;
    //       console.log(resdata);
    //       testinstruction.value = resdata.map((val) => {
    //         console.log(val);
    //         return val;
    //       });
          
    //     })
    //     .catch((res) => {
    //       console.log(res);
    //     });
    // }
    const adddetail = () => {
      formdetailedit.value.push({
        list : ''
      });
    };
    // const rowClick = (evt, rows, index) => {
    //   console.log("cccc", evt, rows, index);
    // };
    const next = () => {
      tab1.value = "addquestions";
    };
    const viewdetails = (item) => {
      console.log(item.candidate_id);
      let result = rows.value
      let outputdata =  result.filter((obj) => obj.candidate_id == item.candidate_id)
      console.log(outputdata)
      candidaterows.value = outputdata.map(val => {
        return val
      })
      dialog.value = true;
    };
    const getCategories = () => {
      $q.loading.show({
          message: 'Loading...pls wait..',
          boxClass: 'text-white',
          spinnerColor: 'white',
          spinnerSize: 60
        })
       

      api .post(`api/getcategory`,{companyId : 1},
      {
        headers: {
          Authorization:  token.value
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
    const getMarks = () => {
      $q.loading.show({
        message: "Loading...pls wait..",
        boxClass: "text-white",
        spinnerColor: "white",
        spinnerSize: 60,
      });
      //console.log(token)
      api
        .get(`analytic/getmarks`, {
          headers: {
            Authorization: "Bearer " + token.value,
          },
        })
        .then(async (res) => {
          $q.loading.hide();
          banner.value = true
            //  setTimeout(() => {
            //   banner.value = false
            //   }, 1000)
          let resdata = res.data.data;
          //console.log(resdata,admin.value[0].company_id)
          // resdata.forEach(element => {
          //   let pp = 1200
          //  let ab = pp - element.time
          //  const timeLeft = ab;
          //     const minutes = Math.floor(timeLeft / 60);
          //     let seconds = timeLeft % 60;

          //     if (seconds < 10) {
          //       seconds = `0${seconds}`;
          //     }

          //    let cd = `${minutes}:${seconds}`;
          //   console.log(cd)
          // });

          let qw = 0;
          resdata = resdata.map(function (val) {
            //console.log(val.timepassed)
            const pp = 1200;
            if (val.selection != 1) {
              if (val.marks > 6) {
                val.neww = "1";
              } else {
                val.neww = "0";
              }
            } else {
              val.neww = `${val.selection}`;
            }

            //  if(val.time === 0)
            //  {
            //   val.time =1200
            //  }
            //  else {
            // val.qw = pp - val.time
            if (
              val.timepassed != 0 &&
              val.timepassed != null &&
              val.timepassed != val.timelimit
            ) {
              const timeLeft = parseInt(val.timelimit) - parseInt(val.timepassed);
              const minutes = Math.floor(timeLeft / 60);
              let seconds = timeLeft % 60;

              if (seconds < 10) {
                seconds = `0${seconds}`;
              }

              val.timetaken = `${minutes}:${seconds}`;
            } else if (val.timepassed == null || val.timepassed == 0) {
              val.timetaken = "Invalid";
            } else {
              const timecheck = parseInt(val.timepassed);
              const minutes = Math.floor(timecheck / 60);
              let seconds = timecheck % 60;

              if (seconds < 10) {
                seconds = `0${seconds}`;
              }

              val.timetaken = `${minutes}:${seconds}`;
            }

            //console.log('sum',val.timetaken,resdata)
            var result = resdata.filter(
              (obj) => obj.company_id == admin.value.company_id
            );
            console.log(result);
            rows.value = result;
            //console.log(rows.value)
            //  }
          });
          console.log(rows.value);
          //rows.value = resdata
        })
        .catch((res) => {
          $q.loading.hide();
        });
    };
    const testlink = () => {
      router.push("/token");
    };
    const deleteItem = (item) => {
      promptdialog.value = true;
      checkpoint.value = rows.value.indexOf(item);
      //console.log(checkpoint.value)
      editedItem.value = Object.assign({}, item);
      // const index = data.indexOf(item);
    };
    const download = (item) => {
      console.log(item.candidate_id);
      let filename;
      api.put("user/getcv", { candidate_id: item.candidate_id }).then((res) => {
        console.log(res.data.data);
        let response = res.data.data;
        filename = response[0].cv;
        console.log(response[0].cv);
        let url = `user/downloadfile/${filename}`;
        let label = filename;
        const responsefile = api.post(url).then((res) => {
          const linkSource = `data:application/pdf;base64,${res.data}`;
          const downloadLink = document.createElement("a");
          downloadLink.href = linkSource;
          downloadLink.download = filename;
          downloadLink.click();
          //  const url = window.URL.createObjectURL(new Blob([res.data]));
          //           const link = document.createElement('a');
          //           link.href = url;
          //           if (typeof window.navigator.msSaveBlob === 'function') {
          //               window.navigator.msSaveBlob(
          //                   res.data,
          //                   filename
          //               );
          //           } else {
          //               link.setAttribute('download', filename);
          //               document.body.appendChild(link);
          //               link.click();
          //           }
        });
      });
    };

    const deletecheck = () => {
      api
        .put(
          "user/checkpassword",
          { password: password.value },
          {
            headers: {
              Authorization: "Bearer " + token.value,
            },
          }
        )
        .then((res) => {
          console.log(res);
          const result = res.data.data;
          if (checkpoint.value > -1) {
            confirm("Are you sure you want to delete this result?") &&
              api
                .delete(`analytic/deleteresults/${editedItem.value.candidate_id}`, {
                  headers: {
                    Authorization: "Bearer " + token.value,
                  },
                })
                .then((res) => {
                  console.log(res);
                  getMarks();
                  setDefaultItem();
                })
                .catch((res) => {
                  console.log(res);
                });
          } else {
            router.push("/editqstn");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("paswword did not match");
        });
    };
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
      // {
      //   name: "age",
      //   align: "center",
      //   label: "Age",
      //   field: "age",
      //   sortable: true,
      // },
      { name: "email", label: "Email", field: "email", sortable: true },
      { name: "mobile", label: "Phone no", field: "mobile" },
      { name: "pincode", label: "location", field: "pincode" },
      { name: "lastctc", label: "Last Salary", field: "lastctc" },
      {
        name: "cv",
        label: "Cv",
        field: "cv",
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
      },
    ];
    const candidaterows = ref()
    // const candidaterows = [
    //   {
    //     name: "Suresh",
    //     age: 159,
    //     email: 6.0,
    //     phoneno: 24,
    //     location: 4.0,
    //     lastsalary: 87,
    //     cv: "14%",
    //   },
    // ];

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
    };
    const savegrades = () => {
      console.log(gradeandtimedetails.value, setpasspercent.value);
      let alldetail = gradeandtimedetails.value;
      let time = null;
      let passmark = null;
      let enable = null;
      if (setpasspercent.value == true) {
        enable = 1;
      } else {
        enable = 0;
      }
      alldetail.map((val) => {
        time = val.time;
        passmark = val.passmark;
      });
      api
        .put(`analytic/savegrades/${admin.value.company_id}`, {
          time: time,
          passmark: passmark,
          enable: enable,
        })
        .then((res) => {
          console.log(res);
          $q.notify({
          type: 'positive',
          message: 'Saved',
          position:'top-right',
          color: 'green'
        })
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      columns,
      onRowClick,
      deleteItem,
      getMarks,
      deletecheck,
      reidrect,
      setDefaultItem,
      download,
      close,
      chckbox,
      checkpoint,
      password,
      promptdialog,
      rows,
      editedItem,
      tab1,
      tab: ref("alarms"),
      customModel: ref("1"),
      group: ref(["op1"]),
      dialog,
      viewdetails,
      // rowClick,
      candidatecolumns,
      candidaterows,
      formdetailedit,
      adddetail,
      getpasspercentage,
      testlink,
      savegrades,
      deleteformlist,
      savenotes,
      // gettestinstruction,
      gradeandtimedetails,
      setpasspercent,
      testinstruction,
      banner,
      remainingcredit,
      controllingbanner,
      closedialog,
      categoryoptions,
      getCategories,
      options: [
        {
          value: "op1",
          label: "Good food",
          icon: "restaurant_menu",
          color: "green",
        },
        {
          value: "op2",
          label: "Good service",
          icon: "room_service",
          color: "green",
        },
        {
          value: "op3",
          label: "Pleasant surroundings",
          icon: "photo",
          color: "green",
        },
      ],
      deletecan() {
        //console.log('working')

        api
          .delete(`analytic/deletecan`, {
            headers: {
              Authorization: "Bearer " + token.value,
            },
          })
          .then((res) => {
            router.push("/welcome");
          });
      },
    };
  },
  components: {
    QBtn,
  },
  methods: {},
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
.box {
  height: 95px;
}
/* .custom-font {
   font-family: inter;
} */
</style>
<style lang="sass" scoped>

.new-card
  width: 100%
  max-width: 250px
</style>
