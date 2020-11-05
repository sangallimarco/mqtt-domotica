import { faNetworkWired, faPlug } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { stringToBoolean } from '@myhydroponics/core/src/formatters'
import { UseMQTT } from '../shared/mqtt.service'
import { Topic } from '../shared/mqtt.types'

export interface MQTTActivityProps {
  topic: Topic
}

export const MQTTActivity: React.FC<MQTTActivityProps> = ({ topic }) => {
  const { message } = UseMQTT(topic)
  const sanitisedMessage = message.toString()
  const connected = stringToBoolean(sanitisedMessage)
  const icon = !connected ? faPlug : faNetworkWired

  return <FontAwesomeIcon size="2x" icon={icon} />
}
