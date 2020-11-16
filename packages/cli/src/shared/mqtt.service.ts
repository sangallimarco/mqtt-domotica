import { useEffect, useState } from 'react'
import { MQTTCore } from './mqtt.core'
import {
  MqttState,
  Topic,
  TopicMessage,
  TopicPayload,
} from '@myhydroponics/core'

export const mqttCore = new MQTTCore()

export interface UseMQTTReturnType {
  message: TopicPayload | undefined
  status: MqttState
  sendMessage: (message: TopicMessage) => void
}

export function UseMQTT(topic: Topic): UseMQTTReturnType {
  const [message, setMessage] = useState<TopicPayload | undefined>('')
  const [status, setStatus] = useState<MqttState>(MqttState.DISCONNECT)
  const sendMessage = (message: TopicMessage) => mqttCore.sendMessage(message)

  useEffect(() => {
    const contextSub = mqttCore.filterByTopic(topic).subscribe((payload) => {
      setMessage(payload)
    })

    const statusSub = mqttCore.getMessageBus().subscribe((payload) => {
      setStatus(payload)
    })

    return () => {
      contextSub.unsubscribe()
      statusSub.unsubscribe()
    }
  }, [topic])

  return { message, status, sendMessage }
}
