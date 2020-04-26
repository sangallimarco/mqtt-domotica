import { IClientOptions } from "mqtt";

export const MQTTConfigOptions: IClientOptions = {
        username: process.env.REACT_APP_MQTT_USER, 
        password: process.env.REACT_APP_MQTT_PASSWD
};