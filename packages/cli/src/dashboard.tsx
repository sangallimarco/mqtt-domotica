import { Box, Header, Text } from 'grommet'
import React from 'react'
import { MQTTActivity } from './components/activity'
import { Card } from './components/card'
import { MQTTGauge } from './components/gauge'
import { MQTTImage } from './components/image'
import { MQTTSwitch } from './components/switch'
import { MQTTimeSeries } from './components/timeseries'
import { MQTTWeatherIcon } from './components/weather-icon'
import {
  FloodDrainOnStatuses,
  LayoutGrid,
  MaxADC,
  MaxEnergy,
  MaxPercentage,
  MaxPower,
  MaxQuality,
  MaxTemp,
} from './layout.conf'
import { Topic } from './shared/mqtt.types'

export const Dashboard: React.FC = () => {
  return (
    <Box round="full" direction="column" gap="small">
      <Header background="dark-3" pad="small" gap="small">
        <Box round="full">
          <Text size="large">Dashboard</Text>
        </Box>
        <Box direction="row" gap="medium">
          <MQTTActivity topic={Topic.CONNECTED} />
          <MQTTWeatherIcon topic={Topic.WEATHER} />
        </Box>
      </Header>

      <LayoutGrid>
        <Card title="Living room">
          <MQTTSwitch
            topic={Topic.LIVINGROOM_SWITCH}
            feedBackTopic={Topic.LIVINGROOM_STATUS}
            label="Switch"
            safe={false}
          />
          <MQTTGauge
            topic={Topic.POWER}
            symbol="W"
            label="Power"
            max={MaxPower}
          />
          <MQTTGauge
            topic={Topic.TEMP2}
            symbol="C"
            label="Socket"
            max={MaxTemp}
          />
          <MQTTimeSeries label="Socket Temp Chart" topic={Topic.TEMP2_SERIES} />
        </Card>

        <Card title="Indoor Garden">
          <MQTTSwitch
            topic={Topic.PUMPS_SWITCH}
            feedBackTopic={Topic.PUMPS_STATUS}
            label="Switch"
            safe={true}
          />
          <MQTTImage topic={Topic.CAM} label="Cam" />
          <MQTTGauge
            topic={Topic.TEMP1}
            symbol="C"
            label="Temp"
            max={MaxTemp}
          />
          <MQTTimeSeries label="Temp Chart" topic={Topic.TEMP1_SERIES} />
        </Card>

        <Card title="UVC Room">
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

        <Card title="Outdoor Garden">
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

        <Card title="IGarden 1">
          <MQTTSwitch
            topic={Topic.SEEED_LAMP_SWITCH}
            feedBackTopic={Topic.SEEED_LAMP_STATUS}
            label="Lamp"
            safe={true}
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
          <MQTTimeSeries
            label="Temp Chart"
            topic={Topic.SEEED_TEMP_TIMESERIES}
          />
          <MQTTimeSeries
            label="Humidity Chart"
            topic={Topic.SEEED_HUM_TIMESERIES}
          />
        </Card>

        <Card title="IGarden 2">
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
            onStatuses={FloodDrainOnStatuses}
          />

          <MQTTGauge
            topic={Topic.ZERO2_AIR_STATUS}
            symbol=""
            label="Air Quality"
            max={MaxQuality}
          />
          <MQTTGauge
            topic={Topic.ZERO2_UV_STATUS}
            symbol=""
            label="UV Index"
            max={MaxQuality}
          />

          <MQTTimeSeries
            label="Air Quality Chart"
            topic={Topic.ZERO2_AIR_TIMESERIES}
          />
        </Card>
      </LayoutGrid>
    </Box>
  )
}
