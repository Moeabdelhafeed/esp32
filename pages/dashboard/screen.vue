<template>
  <div >
    <!-- Header Section -->
    <div class="container mx-auto p-4">
      <div class="flex">
        <NuxtLink :to="'/dashboard'">
          <h1 class="text-3xl font-bold mb-5 cursor-pointer">
            <i class="bi bi-arrow-left"></i>
          </h1>
        </NuxtLink>
        <h1 class="text-3xl font-bold ms-5">Screen</h1>
      </div>
      <hr>
      


   

    <form @submit.prevent="sendMessage" class="form-control  p-8 w-full max-w-sm 	 rounded-xl  mx-auto mt-10" >
        <h1 class="text-3xl font-bold mb-6"> Send Message</h1>
        <label class="label">
            <span class="label-text">The message</span>
        </label>
        <input  required v-model="lcdMessage"  type="text" placeholder="Type here your message" class="input input-bordered w-full max-w-xs" />
        
        <h1 class="text-center m-3 mb-0">Current message: {{ msg }}</h1>
     

        <button type="submit" :disabled="!lcdMessage"
        class="btn btn-primary mt-4 w-full">Send Message</button>

        <button @click="clearMessage" type="button"
        class="btn btn-primary mt-4 w-full">Clear Message</button>
        </form>

  </div>

      
    </div>

   

</template>

<script setup>



const {publish} = useMqttClient()
const {topic} = storeToRefs(useMqttStore())
const {message: msg} = storeToRefs(useLcdStore())

const lcdMessage = ref("")

const sendMessage = async () => {
    const message = "lcd/" + lcdMessage.value
    publish(topic.value , message)
}

const clearMessage = async () => {
    const message = 'lcd/clear'
 
    publish(topic.value , message)
}
</script>

<style scoped>


</style>