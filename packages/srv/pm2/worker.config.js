module.exports = {
  apps: [
    {
      name: 'worker',
      script: './worker.js',
      watch: true,
      env: {
        MQTT: 'mqtt://127.0.0.1',
        MQTT_USERNAME: 'xxx',
        MQTT_PASSWORD: 'xxx',
      },
    },
  ],
}
