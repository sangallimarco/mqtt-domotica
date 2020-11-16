import {
  MqttState,
  SensorTopics,
  Topic,
  TopicMessage,
  TopicPayload,
} from '@myhydroponics/core'
import mqtt from 'mqtt'
import { Observable, ReplaySubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { getConfigOptions } from './mqtt.config'

export class MQTTCore {
  private mqttClient = mqtt.connect(
    process.env.REACT_APP_MQTT,
    getConfigOptions()
  )
  private contextBus = new ReplaySubject<Map<Topic, TopicPayload>>(1) // use last stored for cold subscribers
  private messageBus = new ReplaySubject<MqttState>(1)
  private context = new Map<Topic, TopicPayload>()

  constructor() {
    // Events
    this.mqttClient.on('connect', () => {
      // subscribe to all topics
      this.mqttClient.subscribe(SensorTopics)
      this.messageBus.next(MqttState.CONNECT)
    })

    this.mqttClient.on('message', (topic: Topic, payload: Buffer) => {
      // message is Buffer
      this.context.set(topic, payload)
      this.contextBus.next(this.context)
    })

    this.mqttClient.on('disconnect', () => {
      this.messageBus.next(MqttState.DISCONNECT)
    })

    this.mqttClient.on('reconnect', () => {
      this.messageBus.next(MqttState.RECONNECT)
    })

    this.mqttClient.on('error', () => {
      this.messageBus.next(MqttState.ERROR)
    })
  }

  // Helpers
  filterByTopic<T extends Topic>(
    topic: T
  ): Observable<TopicPayload | undefined> {
    return this.contextBus.pipe(map((message) => message.get(topic)))
  }

  sendMessage(message: TopicMessage): void {
    if (this.mqttClient.connected) {
      const { topic, payload } = message
      this.mqttClient.publish(topic, payload, { qos: 1 })
    } else {
      this.messageBus.next(MqttState.ERROR)
    }
  }

  getMessageBus(): ReplaySubject<MqttState> {
    return this.messageBus
  }
}
