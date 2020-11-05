import { faLeaf } from '@fortawesome/free-solid-svg-icons'
import { Card } from '../components/card'
import React from 'react'
import { MQTTGauge } from '../components/gauge'
import { MQTTSwitch } from '../components/switch'
import { MaxEnergy, MaxPower, MaxTemp } from '../layout.conf'
import { Topic } from '@myhydroponics/core'

export const OutdoorCard = () => (
  <Card title="Outdoor Garden" icon={faLeaf}>
    <MQTTSwitch
      topic={Topic.OUTDOOR_PUMPS_SWITCH}
      feedBackTopic={Topic.OUTDOOR_PUMPS_STATUS}
      label="Switch"
      safe={true}
      shellyMode={true}
    />
    <MQTTGauge
      topic={Topic.OUTDOOR_POWER}
      symbol="W"
      label="Power"
      max={MaxPower}
    />
    <MQTTGauge
      topic={Topic.OUTDOOR_TEMP}
      symbol="C"
      label="Temp"
      max={MaxTemp}
    />
    <MQTTGauge
      topic={Topic.OUTDOOR_ENERGY}
      symbol="W/m"
      label="Energy"
      max={MaxEnergy}
    />
  </Card>
)
