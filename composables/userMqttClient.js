import { ref } from 'vue'
import mqtt from 'mqtt'

export function useMqttClient() {
const $router = useRouter()
  const {isConnected, client} = storeToRefs(useMqttStore())  
  const {setIsConnected, removeCredentials, setError, setCredentials, setClient} = useMqttStore()  
  const {isOn} = storeToRefs(useLedStore())
  const {setIsOn, toggle} = useLedStore()
  const {message} = storeToRefs(useLcdStore())
  const {setMessage, clearMessage} = useLcdStore()
  

const connect = ({ username, password, topic }) => {
  return new Promise((resolve, reject) => {
    const url = `wss://f81fe19a2a0d48b69330dd2213f50a60.s1.eu.hivemq.cloud:8884/mqtt`
    
    const mqttClient = mqtt.connect(url, {
      username,
      password
    })

    mqttClient.on('connect', () => {
      console.log('MQTT connected successfully.')
      setIsConnected(true)
      mqttClient.subscribe(topic + "/response")
      mqttClient.publish(topic + "/command", 'led')
      mqttClient.publish(topic + "/command", 'lcd')

      setCredentials(username, password, topic)
      setClient(mqttClient) // 🔥 This is the key line!
      resolve()
    })

    mqttClient.on('message', (topic, message) => {
      const msg = { topic, message: message.toString() }
      if (msg.message === "led/on") setIsOn(true)
      if (msg.message === "led/off") setIsOn(false)
      if (msg.message === "lcd/clear") clearMessage()
      if (msg.message.startsWith("lcd/")) {
    let lcdMessage = msg.message.substring(4); // Extract the message after "lcd/"
    setMessage(lcdMessage);  // Function to handle displaying the message
}

    })

    mqttClient.on('error', (err) => {
      removeCredentials()
      setError(err)
      $router.push('/')
      mqttClient.end()
      setTimeout(() => setError(null), 3000)
      reject(err)
    })

    mqttClient.on('close', () => {
       removeCredentials()
      console.log('MQTT connection closed.')
    })

    mqttClient.on('offline', () => {
       removeCredentials()
      console.log('MQTT client is offline.')
    })
  })
}

 const publish = (topic, message) => {
   console.log(client.value.connected)
  if (client.value && client.value.connected) {
    client.value.publish(topic + "/command", message)
    console.log(`Message "${message}" sent to topic "${topic}/command".`)
  } else {
    console.error('MQTT client is not connected. Message not sent.')
  }
}

 const disconnect = () => {
  return new Promise((resolve, reject) => {
    if (client.value && isConnected.value) {
      client.value.end(() => {
        removeCredentials()
        console.log('MQTT connection closed successfully.')
        resolve()
      })
    } else {
      console.log('No active MQTT connection to close.')
      resolve() // Still resolve if there's no active connection
    }
  })
}

  return {
    connect,
    publish,
    disconnect,
   
  }
}
