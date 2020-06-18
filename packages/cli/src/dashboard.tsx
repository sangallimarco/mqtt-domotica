import { Box } from 'grommet'
import { Header } from 'grommet/components/Header'
import React, { ReactNode } from 'react'
import { MQTTActivity } from './components/activity'
import { Card } from './components/card'
import { MQTTGauge } from './components/gauge'
import { MQTTImage } from './components/image'
import { MQTTSwitch } from './components/switch'
import { MQTTWeatherIcon } from './components/weather-icon'
import {
  DesktopGrid,
  MaxEnergy,
  MaxPower,
  MaxTemp,
  MobileGrid,
  TabletGrid,
} from './layout.conf'
import { Topic } from './shared/mqtt.types'
import { MQTTimeSeries } from './components/timeseries'

interface ResponsiveGridProps {
  children: ReactNode[]
}

const ResponsiveGrid = (props: ResponsiveGridProps) => {
  if (window.innerWidth > 1440) {
    return <DesktopGrid>{props.children}</DesktopGrid>
  } else if (window.innerWidth > 750) {
    return <TabletGrid>{props.children}</TabletGrid>
  } else {
    return <MobileGrid>{props.children}</MobileGrid>
  }
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
            topic={Topic.OUTDOOR_RPI_SWITCH}
            feedBackTopic={Topic.OUTDOOR_RPI_STATUS}
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
