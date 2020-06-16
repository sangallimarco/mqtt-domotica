module.exports = {
  apps: [
    {
      name: 'worker',
      script: './worker.js',
      watch: true,
      env: {
        MQTT: 'mqtt://192.168.0.2',
        MQTT_USERNAME: '',
        MQTT_PASSWORD: '',
        MQTT_ID: 1
      },
    },
  ],
}
