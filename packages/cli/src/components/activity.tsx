import { faNetworkWired, faPlug } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { stringToBoolean } from '../shared/formatters'
import { UseMQTT } from '../shared/mqtt.service'
import { Topic } from '../shared/mqtt.types'

export interface MQTTButtonProps {
  topic: Topic
}

export const MQTTActivity: React.FC<MQTTButtonProps> = ({ topic }) => {
  const { message } = UseMQTT(topic)

  const connected = stringToBoolean(message)
  const icon = !connected ? faPlug : faNetworkWired

  return <FontAwesomeIcon size="2x" icon={icon} />
}
