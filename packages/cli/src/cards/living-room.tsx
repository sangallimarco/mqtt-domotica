import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Card } from '../components/card'
import { MQTTGauge } from '../components/gauge'
import { MQTTSwitch } from '../components/switch'
import { MQTTimeSeries } from '../components/timeseries'
import { MaxPower, MaxTemp } from '../layout.conf'
import { Topic } from '@myhydroponics/core'

export const LivingRoomCard = () => (
  <Card title="Living room" icon={faLightbulb}>
    <MQTTSwitch
      topic={Topic.LIVINGROOM_SWITCH}
      feedBackTopic={Topic.LIVINGROOM_STATUS}
      label="Switch"
      safe={false}
    />
    <MQTTGauge topic={Topic.POWER} symbol="W" label="Power" max={MaxPower} />
    <MQTTGauge topic={Topic.TEMP2} symbol="C" label="Socket" max={MaxTemp} />
    <MQTTimeSeries label="Socket Temp Chart" topic={Topic.TEMP2_SERIES} />
  </Card>
)
