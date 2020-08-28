import { Box } from 'grommet'
import { Header } from 'grommet/components/Header'
import React, { ReactNode } from 'react'
import { MQTTActivity } from './components/activity'
import { Card } from './components/card'
import { MQTTGauge } from './components/gauge'
import { MQTTImage } from './components/image'
import { MQTTSwitch } from './components/switch'
import { MQTTimeSeries } from './components/timeseries'
import { MQTTWeatherIcon } from './components/weather-icon'
import {
  DesktopGrid,
  FloodDrainOnStatuses,
  MaxADC,
  MaxEnergy,
  MaxPercentage,
  MaxPower,
  MaxQuality,
  MaxTemp,
  MobileGrid,
  TabletGrid,
  BigScreenGrid,
} from './layout.conf'
import { Topic } from './shared/mqtt.types'

interface ResponsiveGridProps {
  children: ReactNode[]
}

const ResponsiveGrid = (props: ResponsiveGridProps) => {
  const { innerWidth } = window

  if (innerWidth > 3000) {
    return <BigScreenGrid>{props.children}</BigScreenGrid>
  } else if (innerWidth > 1440) {
    return <DesktopGrid>{props.children}</DesktopGrid>
  } else if (innerWidth > 750) {
    return <TabletGrid>{props.children}</TabletGrid>
  } else {
    return <MobileGrid>{props.children}</MobileGrid>
  }
}

export const Dashboard: React.FC = () => {
  return (
    <Box round="full" direction="column" gap="medium">
      <Header background="dark-3" pad="small" gap="small">
        <Box round="full">
          <h1>Dashboard</h1>
        </Box>
        <Box direction="row" gap="medium">
          <MQTTActivity topic={Topic.CONNECTED} />
          <MQTTWeatherIcon topic={Topic.WEATHER} />
        </Box>
      </Header>

      <ResponsiveGrid>
        <Card title="Living room">
          <MQTTSwitch
            topic={Topic.LIVINGROOM_SWITCH}
            feedBackTopic={Topic.LIVINGROOM_STATUS}
            label="Switch"
            confirmLabel="On"
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

        <Card title="Indoor Pumps">
          <MQTTSwitch
            topic={Topic.PUMPS_SWITCH}
            feedBackTopic={Topic.PUMPS_STATUS}
            label="Switch"
            confirmLabel="On"
            safe={true}
          />
          <MQTTGauge
            topic={Topic.TEMP1}
            symbol="C"
            label="Temp"
            max={MaxTemp}
          />
          <MQTTimeSeries label="Temp Chart" topic={Topic.TEMP1_SERIES} />
          <MQTTImage topic={Topic.CAM} />
        </Card>

        <Card title="Sterilisation">
          <MQTTSwitch
            topic={Topic.PROCESS_SWITCH}
            feedBackTopic={Topic.PROCESS_STATUS}
            label="Switch"
            confirmLabel="On"
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

        <Card title="Outdoor">
          <MQTTSwitch
            topic={Topic.OUTDOOR_PUMPS_SWITCH}
            feedBackTopic={Topic.OUTDOOR_PUMPS_STATUS}
            label="Switch"
            confirmLabel="On"
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

        <Card title="RPI Seeed">
          <MQTTSwitch
            topic={Topic.SEEED_LAMP_SWITCH}
            feedBackTopic={Topic.SEEED_LAMP_STATUS}
            label="Lamp"
            confirmLabel="On"
            safe={true}
            shellyMode={true}
          />
          <MQTTSwitch
            topic={Topic.SEEED_PUMP_SWITCH}
            feedBackTopic={Topic.SEEED_PUMP_STATUS}
            label="Pump"
            confirmLabel="On"
            safe={true}
            shellyMode={true}
            showStatus={true}
            onStatuses={FloodDrainOnStatuses}
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
          <MQTTGauge
            topic={Topic.SEEED_LIGHT_STATUS}
            symbol=""
            label="Light"
            max={MaxADC}
          />
          <MQTTGauge
            topic={Topic.SEEED_UV_STATUS}
            symbol=""
            label="UV"
            max={MaxPercentage}
          />
          <MQTTGauge
            topic={Topic.SEEED_AIR_STATUS}
            symbol=""
            label="Air Quality"
            max={MaxQuality}
          />
          <MQTTImage topic={Topic.SEEED_CAM} />
        </Card>

        <Card title="Test">
          <MQTTImage topic={Topic.SPY_CAM} />
        </Card>
      </ResponsiveGrid>
    </Box>
  )
}
