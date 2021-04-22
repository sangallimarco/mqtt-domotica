import { faLeaf } from '@fortawesome/free-solid-svg-icons'
import { Topic } from '@myhydroponics/core'
import React from 'react'
import { Card } from '../components/card'
import { MQTTGauge } from '../components/gauge'
import { MQTTImage } from '../components/image'
import { MQTTSwitch } from '../components/switch'
import { MQTTimeSeries } from '../components/timeseries'
import { MaxADC, MaxQuality } from '../layout.conf'

export const IGarden3Card = () => (
  <Card title="IGarden 3" icon={faLeaf}>
    <MQTTSwitch
      topic={Topic.ZERO3_PUMP_SWITCH}
      feedBackTopic={Topic.ZERO3_PUMP_STATUS}
      label="Pump"
      safe={true}
      shellyMode={true}
      showStatus={true}
    />

    {/* <MQTTImage topic={Topic.ZERO3_CAM} label="Cam" /> */}

    <MQTTGauge
      topic={Topic.ZERO3_HUM_STATUS}
      symbol=""
      label="Humidity"
      max={MaxQuality}
    />
    <MQTTGauge
      topic={Topic.ZERO3_TEMP_STATUS}
      symbol=""
      label="Temperature"
      max={MaxADC}
    />
    {/* <MQTTGauge
      topic={Topic.ZERO3_UV_STATUS}
      symbol=""
      label="UV Index"
      max={11}
    /> */}

    <MQTTimeSeries
      label="Hum Chart"
      topic={Topic.ZERO3_HUM_TIMESERIES}
    />
    <MQTTimeSeries
      label="Temp Chart"
      topic={Topic.ZERO3_TEMP_TIMESERIES}
    />
  </Card>
)
