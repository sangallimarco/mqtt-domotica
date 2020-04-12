import { WsTemp } from './ws-service';
import { GenericMessage } from "./bus";
import { Subject } from 'rxjs';
import mqtt from 'mqtt';

export enum WsType {
    TEMP = 'TEMP',
    POWER = 'POWER'
}

// define domain type
type WsGeneric<P> = GenericMessage<WsType, P>;

export type WsTemp = WsGeneric<string>; // type factory!!!
export type WsPayload = WsTemp;

export const WsBus = new Subject<WsPayload>();

export const mqttClient = mqtt.connect(
    'ws://192.168.0.31:9001', 
    // {
    //     username: 'ral', 
    //     password: 'passwd'
    // }
    );

// function subscriber(type: payload: )

mqttClient.on('connect', function () {
    mqttClient.subscribe('presence', function (err) {
        if (!err) {
            mqttClient.publish('presence', 'Hello mqtt')
        }
    })
    mqttClient.subscribe(WsType.TEMP);
})

mqttClient.on('message', (topic: WsType, message: any) => { // fix any here
    // message is Buffer
    const payload =  message.toString();
    console.log(topic, message.toString());
    // mqttClient.end()

    WsBus.next({type: topic, payload});
});
