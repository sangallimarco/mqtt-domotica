import React, { ReactNode } from 'react'
import { Card } from './components/card'
import { MQTTGauge } from './components/gauge'
import { MQTTSwitch } from './components/switch'
import {
  DesktopGrid,
  MaxPower,
  MobileGrid,
  MaxTemp,
  MaxEnergy,
} from './layout.conf'
import { Topic } from './shared/mqtt.types'
import { MQTTImage } from './components/image'
import { Header } from 'grommet/components/Header'
import { MQTTActivity } from './components/activity'
import { MQTTWeatherIcon } from './components/weather-icon'
import { Box } from 'grommet'

interface ResponsiveGridProps {
  children: ReactNode[]
}

const ResponsiveGrid = (props: ResponsiveGridProps) => {
  return window.innerWidth < 750 ? (
    <MobileGrid>{props.children}</MobileGrid>
  ) : (
    <DesktopGrid>{props.children}</DesktopGrid>
  )
}

export const Dashboard: React.FC = () => {
  return (
    <Box round="full" direction="column" gap="medium">
      <Header background="dark-3" pad="small">
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
      </ResponsiveGrid>
    </Box>
  )
}
