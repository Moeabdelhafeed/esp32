<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header Section -->
    <div class="container mx-auto p-4">
      <div class="flex">
        <NuxtLink :to="'/dashboard'">
          <h1 class="text-3xl font-bold mb-5 cursor-pointer">
            <i class="bi bi-arrow-left"></i>
          </h1>
        </NuxtLink>
        <h1 class="text-3xl font-bold ms-5">LED</h1>
      </div>
      <hr>
    </div>

    <!-- Button Section (Grows) -->
    <div class="flex-1 flex-col  flex items-center justify-center">
      <button
        @click="toggleLed"
        :class="[
          'relative btn border-0 bg-transparent flex items-center justify-center transition duration-300 w-50 h-50 transform font-bold text-2xl text-white p-4 rounded-full',
          isOn ? 'before:bg-green-400' : 'before:bg-red-400'
        ]"
      >
        <i class="bi bi-power text-6xl font-bold"></i>
      </button>
    </div>
  </div>
</template>

<script setup>

const {isOn} = storeToRefs(useLedStore())

const {publish} = useMqttClient()
const {topic} = storeToRefs(useMqttStore())

const toggleLed = async () => {
    const message = isOn.value ? 'led/off' : 'led/on'
 
    publish(topic.value , message)
}
</script>

<style scoped>
button::before {
  content: '';
  position: absolute;
  width: 120%;
  height: 120%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 9999px; /* full */
  filter: blur(30px);
  z-index: -1;
  transition: background-color 0.3s ease;
}


</style>