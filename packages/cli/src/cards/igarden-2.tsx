import { faLeaf } from '@fortawesome/free-solid-svg-icons'
import { Card } from '../components/card'
import React from 'react'
import { MQTTGauge } from '../components/gauge'
import { MQTTSwitch } from '../components/switch'
import { MQTTimeSeries } from '../components/timeseries'
import { MaxADC, MaxQuality, MotorControllerStatuses } from '../layout.conf'
import { Topic } from '../shared/mqtt.types'

export const IGarden2Card = () => (
  <Card title="IGarden 2" icon={faLeaf}>
    <MQTTSwitch
      topic={Topic.ZERO2_LAMP_SWITCH}
      feedBackTopic={Topic.ZERO2_LAMP_STATUS}
      label="Lamp"
      safe={false}
      shellyMode={true}
    />
    <MQTTSwitch
      topic={Topic.ZERO2_PUMP_SWITCH}
      feedBackTopic={Topic.ZERO2_PUMP_STATUS}
      label="Pump"
      safe={true}
      shellyMode={true}
      showStatus={true}
      onStatuses={MotorControllerStatuses}
    />

    <MQTTGauge
      topic={Topic.ZERO2_AIR_STATUS}
      symbol=""
      label="Air Quality"
      max={MaxQuality}
    />
    <MQTTGauge
      topic={Topic.ZERO2_CONDUCTIVITY_STATUS}
      symbol=""
      label="Conductivity"
      max={MaxADC}
    />
    <MQTTGauge
      topic={Topic.ZERO2_UV_STATUS}
      symbol=""
      label="UV Index"
      max={11}
    />

    <MQTTimeSeries
      label="Air Quality Chart"
      topic={Topic.ZERO2_AIR_TIMESERIES}
    />
  </Card>
)
