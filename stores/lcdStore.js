export const useLcdStore = defineStore('lcd', {
    state: () => ({ 
       message: "",
    }),
    actions: {
       setMessage(value) {
            this.message = value
        },
        clearMessage() {
            this.message = ""
        },
       
    },
  })