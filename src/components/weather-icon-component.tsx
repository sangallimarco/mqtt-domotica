import {
  faBolt,
  faCloud,
  faCloudRain,
  faExclamation,
  faSnowflake,
  faSun,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { UseMQTT } from '../shared/mqtt.service'
import { Topic } from '../shared/mqtt.types'

export interface MQTTWeatherIconProps {
  topic: Topic
}

// https://openweathermap.org/weather-conditions
export const iconConfig: Record<string, IconDefinition> = {
  Clear: faSun,
  Clouds: faCloud,
  Rain: faCloudRain,
  Snow: faSnowflake,
  Thunderstorm: faBolt,
  Drizzle: faCloudRain,
}

export const MQTTWeatherIcon: React.FC<MQTTWeatherIconProps> = (props) => {
  const { topic } = props
  const { message } = UseMQTT(topic)

  const icon = iconConfig[message] || faExclamation

  return <FontAwesomeIcon size="3x" icon={icon} />
}
