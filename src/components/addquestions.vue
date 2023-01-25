<template>
<div class="page-container" style="padding-top: 20px; padding-bottom: 20px;">
  <div class="row justify-center" style=" background-color: white;">
  
    <div class="q-gutter-sm" style="width:250px;">
      <!-- <div class="row justify-center" style="background-color:white; font-family:'Times New Roman', serif;"> -->
  <h6>Add Questions</h6>
<!-- </div> -->
<q-form
      @submit="onSubmit" class="q-gutter-sm">
      <q-select filled v-model="company" :options="options" label="Company" />
      <q-input
        v-model="textareaModel"
        filled
        clearable
        type="textarea"
        color="red-12"
        label="Question"
        hint="Question"
        
      />
      <q-input
      v-model="text"
      filled
      type="textarea"
      label="Options"
    />
    <q-select filled v-model="answer" :options="answerOptions" label="answer" />
    <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        </div>
    </q-form>
    </div>
  </div>
  </div>
</template>

<script>
import { ref, computed  } from 'vue'

export default {
 
  setup () {
    
    const textareaModel = ref('')
    const textareaFillCancelled = ref(false)
    const textareaShadowText = computed(() => {
      if (textareaFillCancelled.value === true) {
        return ''
      }

      const
        t = 'This text\nwill be filled\non multiple lines\nwhen you press TAB',
        empty = typeof textareaModel.value !== 'string' || textareaModel.value.length === 0

      if (empty === true) {
        return t.split('\n')[ 0 ]
      }
      else if (t.indexOf(textareaModel.value) !== 0) {
        return ''
      }

      return t
        .split(textareaModel.value)
        .slice(1)
        .join(textareaModel.value)
        .split('\n')[ 0 ]
    })
    return {
      company : ref(null),
      answer : ref(null),
      options: [
        'Pwm', 'shakthi'
      ],
      answerOptions : ['1','2','3','4'],
       textareaModel,
      textareaFillCancelled,
      textareaShadowText,
       text: ref('')
    }
  }
}
</script>
