import dotenv from 'dotenv';
import { MqttClient } from 'mqtt';
import { BinaryValue } from 'onoff';
import { convertInput, convertOutput } from './converters';
import { writePin } from './gpio';
import { Direction, GPIO_PIN, OUTPUT_PINS } from './types';

export const DEVICE_FAMILY = 'rpis'

dotenv.config()

export function getMQTTOptions() {
  return process.env.MQTT_USERNAME && process.env.MQTT_PASSWORD
    ? {
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
    }
    : {}
}

export function getMQTTPath(pin: GPIO_PIN, direction: Direction) {
  return `${DEVICE_FAMILY}/${process.env.MQTT_ID}/${pin}/${direction}`
}

export function parseMQTTCommand(topic: string, value: string): [number, BinaryValue] {
  const parts = topic.split('/')
  if (parts.length === 4) {
    const direction = parts[3]
    if (direction === Direction.COMMAND) {
      return [parseInt(parts[2], 10), convertInput(value)]
    }
  }
  return [-1, 0]
}

export function addMQTTMessage(
  pin: GPIO_PIN,
  value: BinaryValue,
  cli: MqttClient
): void {
  const path = getMQTTPath(pin, Direction.STATUS)
  const covertedValue = convertOutput(value)
  cli.publish(path, covertedValue, { qos: 0, retain: true })
}

export function processMQTTMessage(topic: string, value: string, cli: MqttClient): void {
  const [targetPin, convertedValue] = parseMQTTCommand(topic, value)
  console.log(targetPin, convertedValue)
  if (targetPin > 1) {
    writePin(targetPin, convertedValue)
    addMQTTMessage(targetPin, convertedValue, cli)
  }
}

export function getCommandTopics(): string[] {
  return OUTPUT_PINS.map((pin) => getMQTTPath(pin, Direction.COMMAND))
}

