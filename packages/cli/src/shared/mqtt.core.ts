import mqtt from 'mqtt'
import { Observable, Subject } from 'rxjs'
import { filter } from 'rxjs/operators'
import { booleanToString } from './formatters'
import { getConfigOptions } from './mqtt.config'
import { SensorTopics, Topic, TopicMessage } from './mqtt.types'

export class MQTTCore {
  private mqttClient = mqtt.connect(
    process.env.REACT_APP_MQTT,
    getConfigOptions()
  )
  private messageBus = new Subject<TopicMessage>()

  constructor() {
    // Events
    this.mqttClient.on('connect', () => {
      // this.mqttClient.subscribe('presence', (err) => {
      //     if (!err) {
      //         this.mqttClient.publish('presence', 'Hello mqtt')
      //     }
      // })

      // subscribe to all topics
      this.mqttClient.subscribe(SensorTopics)
      this.messageBus.next({
        topic: Topic.CONNECTED,
        payload: booleanToString(true),
      })
    })

    this.mqttClient.on('message', (topic: Topic, message: Buffer) => {
      // message is Buffer
      const payload = message
      this.messageBus.next({ topic, payload })
    })

    this.mqttClient.on('disconnect', () => {
      this.handleError()
    })

    this.mqttClient.on('reconnect', () => {
      this.handleError()
    })

    this.mqttClient.on('error', () => {
      this.handleError()
    })
  }

  handleError(): void {
    this.messageBus.next({
      topic: Topic.CONNECTED,
      payload: booleanToString(false),
    })
  }

  // Helpers
  filterByTopic<T extends Topic>(topic: T): Observable<TopicMessage> {
    return this.messageBus.pipe(filter((message) => message.topic === topic))
  }

  sendMessage(message: TopicMessage): void {
    if (this.mqttClient.connected) {
      const { topic, payload } = message
      this.mqttClient.publish(topic, payload, { qos: 1 })
    } else {
      this.handleError()
    }
  }

  getMessageBus(): Subject<TopicMessage> {
    return this.messageBus
  }
}
