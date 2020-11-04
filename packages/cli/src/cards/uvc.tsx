import { faRadiation } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Card } from '../components/card'
import { MQTTGauge } from '../components/gauge'
import { MQTTSwitch } from '../components/switch'
import { MaxEnergy, MaxPower, MaxTemp } from '../layout.conf'
import { Topic } from '../shared/mqtt.types'

export const UvcCard = () => (
  <Card title="UVC Room" icon={faRadiation}>
    <MQTTSwitch
      topic={Topic.PROCESS_SWITCH}
      feedBackTopic={Topic.PROCESS_STATUS}
      label="Switch"
      safe={true}
    />
    <MQTTGauge
      topic={Topic.INDOOR_POWER}
      symbol="W"
      label="Process"
      max={MaxPower}
    />
    <MQTTGauge
      topic={Topic.INDOOR_TEMP}
      symbol="C"
      label="Temp"
      max={MaxTemp}
    />
    <MQTTGauge
      topic={Topic.INDOOR_ENERGY}
      symbol="W/m"
      label="Energy"
      max={MaxEnergy}
    />
  </Card>
)
