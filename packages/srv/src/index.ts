import { mqttClient, addToMQTT } from "./services/mqtt";
import { SensorTopics, Topic } from "./services/mqtt.types";
import { addToRedis } from './services/redis';

mqttClient.on('connect', function () {
    mqttClient.subscribe('presence', function (err) {
        if (!err) {
            mqttClient.publish('presence', 'Hello mqtt')
        }
    })
    // subscribe to all topics
    mqttClient.subscribe(SensorTopics)

    mqttClient.on('message', async (topic: Topic, message: Buffer) => {
        const payload = message.toString()
        const result = await addToRedis(topic, payload);
        addToMQTT(topic, result);
    })

    mqttClient.on('disconnect', () => {
        // handle it here
    })
})