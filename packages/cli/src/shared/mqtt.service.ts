import { useEffect, useState } from 'react'
import { MQTTCore } from './mqtt.core'
import { Topic, TopicMessage } from './mqtt.types'

export const mqttCore = new MQTTCore()

// Custom Hook
export interface UseMQTTReturnType {
  message: Buffer | string
  sendMessage: (message: TopicMessage) => void
}

export function UseMQTT(topic: Topic): UseMQTTReturnType {
  const [message, setMessage] = useState<Buffer | string>('')
  const sendMessage = (message: TopicMessage) => mqttCore.sendMessage(message)

  useEffect(() => {
    const sub = mqttCore.filterByTopic(topic).subscribe(({ payload }) => {
      setMessage(payload)
    })

    return () => {
      sub.unsubscribe()
    }
  }, [topic])

  return { message, sendMessage }
}
