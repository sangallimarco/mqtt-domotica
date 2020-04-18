import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import mqtt from 'mqtt';
import { Topic, SensorTopics, TopicMessage } from './bus.types';

export const MessageBusRead = new Subject<TopicMessage>();

export const mqttClient = mqtt.connect(
   process.env.REACT_APP_MQTT,
    // {
    //     username: 'ral', 
    //     password: 'passwd'
    // }
);

console.log(process.env.REACT_APP_MQTT);

mqttClient.on('connect', function () {
    mqttClient.subscribe('presence', function (err) {
        if (!err) {
            mqttClient.publish('presence', 'Hello mqtt')
        }
    })
    // subscribe to all topics
    mqttClient.subscribe(SensorTopics);
    MessageBusRead.next({topic: Topic.CONNECTED, payload: '1'});

    mqttClient.
})

mqttClient.on('message', (topic: Topic, message: Buffer) => {
    // message is Buffer
    const payload = message.toString();
    MessageBusRead.next({topic, payload});
    console.log(topic, payload);
});


mqttClient.on('disconnect', () => {
    MessageBusRead.next({topic: Topic.CONNECTED, payload: '0'});
});


// helpers
export function filterByTopic<T extends Topic>(topic: T): Observable<TopicMessage> {
    return MessageBusRead.pipe(
        filter((message) => message.topic === topic)
    );
}

export function sendMessage(message: TopicMessage): void {
    const {topic, payload} = message;
    mqttClient.publish(topic, payload);
}
