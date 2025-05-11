<template>
    <div>
        <div class="container mx-auto p-4 relative">
        <div class="flex">
         <h1 class="text-3xl font-bold mb-5"> Dashboard</h1>
         <button @click="logout" class="btn btn-soft btn-error absolute end-0 me-4">
            log out
            </button>
            </div>
            
         <hr>
         <div class="grid grid-cols-2 gap-4 mt-5">

                <NuxtLink :to="'/dashboard/led'">

                <div class=" transition duration-300 transform bg-indigo-500  text-base text-white p-4 rounded-xl hover:bg-indigo-600 trans "  >
                    Led
                </div>
                </NuxtLink>
                <NuxtLink :to="'/dashboard/screen'">
                <div  class=" transition duration-300 transform bg-indigo-500  text-base text-white p-4 rounded-xl hover:bg-indigo-600 trans "  >
                    Screen
                </div>

                </NuxtLink>
                
                
         </div>
        </div>
    </div>
</template>

<script setup>

const {disconnect} = useMqttClient()

const $router = useRouter()

const logout = () => {
    disconnect().then(() => $router.push('/')  )
    
}

</script>

<style scoped>

</style>