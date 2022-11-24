<template>
  <div>
    <input @enter="getPrompts" class="border-black border-2" v-model="queryValue" type="text" >
    <input class="border-black border-2" v-model="minLength" type="number">
    <div>
      <button @click="getPrompts">click</button>
    </div>
    <div v-for="result in results" :key="result.id">
      <div v-if="longEnough(result.prompt)" class="flex flex-row">
        <img class="w-48 h-48" :src="result.src" />
        <div>
           <div>
            {{ result.prompt }}
          </div>
          <div>
            {{ splitPrompt(result.prompt) }}
          </div>
        </div>
      </div>
    </div>
    <pre>
      
      {{results}}
    </pre>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

interface Data {
  queryValue: string
  results: any[]
  minLength: number
}

interface Methods {
  
}

interface Components {
  
}

interface Props {

}

export default Vue.extend<Data, Methods, Components, Props>({
  data () {
    return {
      results: [],
      queryValue: '',
      minLength: 20
    }
  },
  computed: {
    queryLength () {
      return this.queryValue.length > 0
    }
  },
  methods: {
    getPrompts() {
      axios.get(`https://lexica.art/api/v1/search?q=${this.queryValue}`).then((response: any) => {
        console.log({response})
        this.results = response.data.images
      })
    },
    longEnough(prompt: string) {
      return prompt.split(' ').length >= this.minLength
    },
    splitPrompt(prompt: string) {
      return prompt.split(',')
    }
  }
})
</script>