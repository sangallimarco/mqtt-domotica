import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import mqtt from 'mqtt';
import { TopicMessage, Topic } from './ws.types';

export const WsBus = new Subject<TopicMessage>();

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
    mqttClient.subscribe([Topic.TEMP, Topic.POWER]);
})

mqttClient.on('message', (topic: Topic, message: Buffer) => {
    // message is Buffer
    const payload = message.toString();
    console.log(topic, message.toString());
    // mqttClient.end()
    WsBus.next({ topic, payload });
});


export function filterByTopic(topic: Topic): Observable<TopicMessage> {
    return WsBus.pipe(
        filter((message)=> message.topic === topic)
    );
}