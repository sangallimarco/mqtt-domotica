import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import mqtt from 'mqtt';
import { Topic } from './ws.types';
import {isNil} from 'lodash';

export type TopicMap = Map<Topic, string>;
export const WsBus = new Subject<TopicMap>();

export const topicMap: TopicMap = new Map();

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
    mqttClient.subscribe([Topic.TEMP1, Topic.POWER, Topic.TEMP2]);
})

mqttClient.on('message', (topic: Topic, message: Buffer) => {
    // message is Buffer
    const payload = message.toString();
    topicMap.set(topic, payload);
    // mqttClient.end()
    WsBus.next(topicMap);
});


export function filterByTopic<T extends Topic>(topic: T): Observable<string | undefined> {
    return WsBus.pipe(
        map((dataMap) => dataMap.get(topic)),
        filter(value => !isNil(value))
    );
}
