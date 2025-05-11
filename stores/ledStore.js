export const useLedStore = defineStore('led', {
    state: () => ({ 
       isOn: false,
    }),
    actions: {
        setIsOn(value) {
            this.isOn = value
        },
        toggle() {
            this.isOn = !this.isOn
        },
       
    },
  })