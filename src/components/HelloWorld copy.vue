<script>
import { ref } from 'vue'
export default {
  setup () {
    function hello () {
      return 'gdfgf'
    }
    const submitResult = ref([])
    return {
      shape: ref(''),
      shape1: ref(''),
      shape2: ref(''),
      shape3: ref(''),
      hello,
      ques: 'Question 1:   thghfghfd dgfgfgf gdfgdfgdfgf 456hgbhfgbgfb 65ythtghgf 56gbgfnb',
      ques2: 'Question 2:   yv fgyvbvsadfv uyegfdhvfdsa gtrgf',
      ques3: 'Question 3:   tyhgfhbft uuuuuu ffffff',
      ques4: 'Question 4:   rrrrrr fdfffff qqqqqqq',
      ans1: 'A : 34',
      ans2: 'B : 5',
      ans3: 'C : 67',
      ans4: 'D : 12',
      submitResult,
      slide: ref('style'),
        onSubmit (evt) {
        const formData = new FormData(evt.target)
        const data = []

        for (const [ name, value ] of formData.entries()) {
          data.push({
            name,
            value
          })
        }

        submitResult.value = data
      },
     myFunction() {
alert("radio selected");
}
    }
  }
}
</script>
<template>
<div class="q-pa-md">
<q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-color="primary"
      class="rounded-borders"
      height="660px"
    >
    <q-carousel-slide name="style" class="column no-wrap">

      <q-icon name="1" color="primary" size="56px" />
        <div class="q-mt-md text-center">
         <q-card class="" full width >
    <q-card-section>
      {{ ques }}
    </q-card-section>
    <q-separator inset/>
    <q-card-actions>
      <q-card-section flat>{{ans1}}</q-card-section>
    </q-card-actions>
    <q-separator inset/>
    <q-card-actions>
     <q-card-section flat>{{ans2}}</q-card-section>
    </q-card-actions>
    <q-separator inset/>
    <q-card-actions>
     <q-card-section>{{ans3}}</q-card-section>
    </q-card-actions>
    <q-separator inset/>
    <q-card-actions>
      <q-card-section>{{ans4}}</q-card-section>
    </q-card-actions>
    <q-form @submit="onSubmit" class="q-gutter-md" @onchange="myFunction()">
      <q-radio name="selected" v-model="shape" val="A" label="A" type="submit"/>
      <q-radio name="selected" v-model="shape" val="B" label="B" type="submit"/>
      <q-radio name="selected" v-model="shape" val="C" label="C" type="submit"/>
      <q-radio name="selected" v-model="shape" val="D" label="D" type="submit" />
    
      <div class="q-px-sm">
      Your selection is: <strong>{{ shape }}</strong>
    </div>
      <!-- <div>
        <q-btn label="Submit" type="submit" color="primary"/>
      </div> -->
    </q-form>
    <q-card v-if="submitResult.length > 0" flat bordered class="q-mt-md bg-grey-2">
     
      <q-card-section class="row q-gutter-sm items-center">
        <div
          v-for="(item, index) in submitResult"
          :key="index"
          class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
        >{{ item.name }} = {{ item.value }}</div>
      </q-card-section>
    </q-card>
  </q-card>
        </div>
    </q-carousel-slide>
    <q-carousel-slide name="style1" class="column no-wrap">
        <q-icon name="2" color="primary" size="56px" />
        <div class="q-mt-md text-center">
           <q-card class="" full width >
    <q-card-section>
      {{ ques2 }}
    </q-card-section>
    <q-separator inset/>
    <q-card-actions>
      <q-card-section flat>{{ans1}}</q-card-section>
    </q-card-actions>
    <q-separator inset/>
    <q-card-actions>
     <q-card-section flat>{{ans2}}</q-card-section>
    </q-card-actions>
    <q-separator inset/>
    <q-card-actions>
     <q-card-section>{{ans3}}</q-card-section>
    </q-card-actions>
    <q-separator inset/>
    <q-card-actions>
      <q-card-section>{{ans4}}</q-card-section>
    </q-card-actions>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-radio name="You selected" v-model="shape1" val="A" label="A" type="submit"/>
      <q-radio name="You selected" v-model="shape1" val="B" label="B" type="submit"/>
      <q-radio name="You selected" v-model="shape1" val="C" label="C" type="submit"/>
      <q-radio name="You selected" v-model="shape1" val="D" label="D" type="submit" />
      <div class="q-px-sm">
      Your selection is: <strong>{{ shape1 }}</strong>
    </div>
      <!-- <div>
        <q-btn label="Submit" type="submit" color="primary"/>
      </div> -->
    </q-form>
    <q-card v-if="submitResult.length > 0" flat bordered class="q-mt-md bg-grey-2">
      
      <q-card-section class="row q-gutter-sm items-center">
        <div
          v-for="(item, index) in submitResult"
          :key="index"
          class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
        >{{ item.name }} = {{ item.value }}</div>
      </q-card-section>
    </q-card>
  </q-card>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="style2" class="column no-wrap">
        <q-icon name="3" color="primary" size="56px" />
        <div class="q-mt-md text-center">
           <q-card class="" full width >
    <q-card-section>
      {{ ques3 }}
    </q-card-section>
    <q-separator inset/>
    <q-card-actions>
      <q-card-section flat>{{ans1}}</q-card-section>
    </q-card-actions>
    <q-separator inset/>
    <q-card-actions>
     <q-card-section flat>{{ans2}}</q-card-section>
    </q-card-actions>
    <q-separator inset/>
    <q-card-actions>
     <q-card-section>{{ans3}}</q-card-section>
    </q-card-actions>
    <q-separator inset/>
    <q-card-actions>
      <q-card-section>{{ans4}}</q-card-section>
    </q-card-actions>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-radio name="You selected" v-model="shape2" val="A" label="A" type="submit"/>
      <q-radio name="You selected" v-model="shape2" val="B" label="B" type="submit"/>
      <q-radio name="You selected" v-model="shape2" val="C" label="C" type="submit"/>
      <q-radio name="You selected" v-model="shape2" val="D" label="D" type="submit" />
      <div class="q-px-sm">
      Your selection is: <strong>{{ shape2 }}</strong>
    </div>
      <!-- <div>
        <q-btn label="Submit" type="submit" color="primary"/>
      </div> -->
    </q-form>
    <q-card v-if="submitResult.length > 0" flat bordered class="q-mt-md bg-grey-2">
      
      <q-card-section class="row q-gutter-sm items-center">
        <div
          v-for="(item, index) in submitResult"
          :key="index"
          class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
        >{{ item.name }} = {{ item.value }}</div>
      </q-card-section>
    </q-card>
  </q-card>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="style3" class="column no-wrap">
        <q-icon name="4" color="primary" size="56px" />
        <div class="q-mt-md text-center">
           <q-card class="" full width >
    <q-card-section>
      {{ ques4 }}
    </q-card-section>
    <q-separator inset/>
    <q-card-actions>
      <q-card-section flat>{{ans1}}</q-card-section>
    </q-card-actions>
    <q-separator inset/>
    <q-card-actions>
     <q-card-section flat>{{ans2}}</q-card-section>
    </q-card-actions>
    <q-separator inset/>
    <q-card-actions>
     <q-card-section>{{ans3}}</q-card-section>
    </q-card-actions>
    <q-separator inset/>
    <q-card-actions>
      <q-card-section>{{ans4}}</q-card-section>
    </q-card-actions>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-radio name="You selected" v-model="shape3" val="A" label="A" type="submit"/>
      <q-radio name="You selected" v-model="shape3" val="B" label="B" type="submit"/>
      <q-radio name="You selected" v-model="shape3" val="C" label="C" type="submit"/>
      <q-radio name="You selected" v-model="shape3" val="D" label="D" type="submit" />
      <div class="q-px-sm">
      Your selection is: <strong>{{ shape3 }}</strong>
    </div>
      <!-- <div>
        <q-btn label="Submit" type="submit" color="primary"/>
      </div> -->
    </q-form>
    <q-card v-if="submitResult.length > 0" flat bordered class="q-mt-md bg-grey-2">
     
      <q-card-section class="row q-gutter-sm items-center">
        <div
          v-for="(item, index) in submitResult"
          :key="index"
          class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
        >{{ item.name }} = {{ item.value }}</div>
      </q-card-section>
    </q-card>
  </q-card>
        </div>
      </q-carousel-slide>
 
    
</q-carousel>
<div class="row justify-center">
      <q-btn-toggle
        glossy
        v-model="slide"
        :options="[
          { label: 1, value: 'style' },
          { label: 2, value: 'style1' },
          { label: 3, value: 'style2' },
          { label: 4, value: 'style3' }
        ]"
      />
    </div>
</div>
</template>

<style lang="sass" scoped>
.my-card
  width: 500%
  height: 500%
  max-width: 550px
</style>