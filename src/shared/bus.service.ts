import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import mqtt from 'mqtt';
import { Topic, SensorTopics, TopicMessage } from './bus.types';

export const MessageBusRead = new Subject<TopicMessage>();

export const mqttClient = mqtt.connect(
    'ws://192.168.0.31:9001',
    // {
    //     username: 'ral', 
    //     password: 'passwd'
    // }
);

mqttClient.on('connect', function () {
    mqttClient.subscribe('presence', function (err) {
        if (!err) {
            mqttClient.publish('presence', 'Hello mqtt')
        }
    })
    // subscribe to all topics
    mqttClient.subscribe(SensorTopics);
})

mqttClient.on('message', (topic: Topic, message: Buffer) => {
    // message is Buffer
    const payload = message.toString();
    MessageBusRead.next({topic, payload});
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
