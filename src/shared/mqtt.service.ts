import { useState } from 'react';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import mqtt from 'mqtt';
import { Topic, SensorTopics, TopicMessage } from './mqtt.types';
import { useEffect } from 'react';
import { booleanToString } from './formatters';

export const MessageBusRead = new Subject<TopicMessage>();

export const mqttClient = mqtt.connect(
   process.env.REACT_APP_MQTT,
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
    MessageBusRead.next({topic: Topic.CONNECTED, payload: booleanToString(true)});
})

mqttClient.on('message', (topic: Topic, message: Buffer) => {
    // message is Buffer
    const payload = message.toString(); // TODO can be parsed as JSON if required
    //
    MessageBusRead.next({topic, payload});
    console.log(topic, payload);
});


mqttClient.on('disconnect', () => {
    MessageBusRead.next({topic: Topic.CONNECTED, payload: booleanToString(false)});
});


// Helpers
export function filterByTopic<T extends Topic>(topic: T): Observable<TopicMessage> {
    return MessageBusRead.pipe(
        filter((message) => message.topic === topic)
    );
}

export function sendMessage(message: TopicMessage): void {
    const {topic, payload} = message;
    mqttClient.publish(topic, payload);
}

// Custom Hook
export interface UseMQTTReturnType {
    message: string;
    sendMessage: (message: TopicMessage) => void;
}

export function UseMQTT(topic: Topic): UseMQTTReturnType {

    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const sub = filterByTopic(topic).subscribe(({ payload }) => {
            setMessage(payload);
        });
    
        return () => {
          sub.unsubscribe();
        };
      }, [topic]);

    return {message, sendMessage};
}