import { faLeaf } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Card } from '../components/card'
import { MQTTGauge } from '../components/gauge'
import { MQTTImage } from '../components/image'
import { MQTTSwitch } from '../components/switch'
import { MQTTimeSeries } from '../components/timeseries'
import { MaxTemp } from '../layout.conf'
import { Topic } from '../shared/mqtt.types'

export const IndoorGardenCard = () => (
  <Card title="Indoor Garden" icon={faLeaf}>
    <MQTTSwitch
      topic={Topic.PUMPS_SWITCH}
      feedBackTopic={Topic.PUMPS_STATUS}
      label="Switch"
      safe={true}
    />
    <MQTTImage topic={Topic.CAM} label="Cam" />
    <MQTTGauge topic={Topic.TEMP1} symbol="C" label="Temp" max={MaxTemp} />
    <MQTTimeSeries label="Temp Chart" topic={Topic.TEMP1_SERIES} />
  </Card>
)
