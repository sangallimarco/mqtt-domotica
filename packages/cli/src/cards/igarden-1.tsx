import { faLeaf } from '@fortawesome/free-solid-svg-icons'
import { Card } from '../components/card'
import React from 'react'
import { MQTTGauge } from '../components/gauge'
import { MQTTImage } from '../components/image'
import { MQTTSwitch } from '../components/switch'
import { MQTTimeSeries } from '../components/timeseries'
import {
  FloodDrainOnStatuses,
  MaxADC,
  MaxPercentage,
  MaxQuality,
  MaxTemp,
} from '../layout.conf'
import { Topic } from '../shared/mqtt.types'

export const IGarden1Card = () => (
  <Card title="IGarden 1" icon={faLeaf}>
    <MQTTSwitch
      topic={Topic.SEEED_LAMP_SWITCH}
      feedBackTopic={Topic.SEEED_LAMP_STATUS}
      label="Lamp"
      safe={false}
      shellyMode={true}
    />
    <MQTTSwitch
      topic={Topic.SEEED_PUMP_SWITCH}
      feedBackTopic={Topic.SEEED_PUMP_STATUS}
      label="Pump"
      safe={true}
      shellyMode={true}
      showStatus={true}
      onStatuses={FloodDrainOnStatuses}
    />

    <MQTTImage topic={Topic.SEEED_CAM} label="Cam" />

    <MQTTGauge
      topic={Topic.SEEED_LIGHT_STATUS}
      symbol=""
      label="Light"
      max={MaxADC}
    />
    {/* <MQTTGauge
            topic={Topic.SEEED_UV_STATUS}
            symbol=""
            label="UV"
            max={MaxPercentage}
          /> */}
    <MQTTGauge
      topic={Topic.SEEED_AIR_STATUS}
      symbol=""
      label="Air Quality"
      max={MaxQuality}
    />
    <MQTTGauge
      topic={Topic.SEEED_TEMP_STATUS}
      symbol="C"
      label="Temp"
      max={MaxTemp}
    />
    <MQTTGauge
      topic={Topic.SEEED_HUM_STATUS}
      symbol="%"
      label="Humidity"
      max={MaxPercentage}
    />

    <MQTTimeSeries
      label="Air Quality Chart"
      topic={Topic.SEEED_AIR_TIMESERIES}
    />
    <MQTTimeSeries label="Temp Chart" topic={Topic.SEEED_TEMP_TIMESERIES} />
    <MQTTimeSeries label="Humidity Chart" topic={Topic.SEEED_HUM_TIMESERIES} />
  </Card>
)
