import { Box, Grid, Heading } from 'grommet'
import { Grow } from 'grommet-icons'
import React, { ReactNode } from 'react'
import { MQTTActivity } from './components/activity.component'
import { MQTTGauge } from './components/gauge.component'
import { MQTTImage } from './components/image.component'
import { MQTTSwitch } from './components/switch.component'
import {
  AreaName,
  getLayourConfig,
  MaxPower,
  MaxTemp,
  MaxEnergy,
} from './layout.conf'
import { Topic } from './shared/mqtt.types'
import { MQTTWeatherIcon } from './components/weather-icon-component'

interface ResponsiveGridProps {
  children: ReactNode[]
}

const ResponsiveGrid = (props: ResponsiveGridProps) => {
  // const size = React.useContext(ResponsiveContext)
  const gridProps = getLayourConfig(window.innerWidth)
  return <Grid {...gridProps}>{props.children}</Grid>
}

export const Dashboard: React.FC = () => {
  return (
    <ResponsiveGrid>
      <Box gridArea={AreaName.HEADER} align="center">
        <Box align="center" direction="row" pad="small">
          <Grow />
          <Heading size="xsmall">Indoor</Heading>
        </Box>
      </Box>

      <Box gridArea={AreaName.TEMP1}>
        <MQTTGauge
          topic={Topic.TEMP1}
          symbol="C"
          label="Ambient"
          max={MaxTemp}
        />
      </Box>

      <Box gridArea={AreaName.TEMP2}>
        <MQTTGauge
          topic={Topic.TEMP2}
          symbol="C"
          label="Socket"
          max={MaxTemp}
        />
      </Box>

      <Box gridArea={AreaName.POWER}>
        <MQTTGauge
          topic={Topic.POWER}
          symbol="W"
          label="Socket"
          max={MaxPower}
        />
      </Box>

      <Box gridArea={AreaName.PUMPS_SWITCH}>
        <MQTTSwitch
          topic={Topic.PUMPS_SWITCH}
          feedBackTopic={Topic.PUMPS_STATUS}
          label="Pumps"
          confirmLabel="Start"
          safe={true}
        />
      </Box>

      <Box
        gridArea={AreaName.NETWORK}
        align="center"
        direction="row"
        fill="horizontal"
        justify="around"
      >
        <MQTTActivity topic={Topic.CONNECTED} />
        <MQTTWeatherIcon topic={Topic.WEATHER} />
      </Box>

      <Box gridArea={AreaName.PROCESS_SWITCH}>
        <MQTTSwitch
          topic={Topic.PROCESS_SWITCH}
          feedBackTopic={Topic.PROCESS_STATUS}
          label="Process"
          confirmLabel="Start"
          safe={true}
        />
      </Box>

      <Box gridArea={AreaName.HEADER_OUTDOOR} align="center">
        <Box align="center" direction="row" pad="small">
          <Grow />
          <Heading size="xsmall">Outdoor</Heading>
        </Box>
      </Box>

      <Box gridArea={AreaName.OUTDOOR_PUMP_SWITCH}>
        <MQTTSwitch
          topic={Topic.OUTDOOR_PUMPS_SWITCH}
          feedBackTopic={Topic.OUTDOOR_PUMPS_STATUS}
          label="Pump"
          confirmLabel="Start"
          safe={true}
          shellyMode={true}
        />
      </Box>

      <Box gridArea={AreaName.OUTDOOR_PUMP_POWER}>
        <MQTTGauge
          topic={Topic.OUTDOOR_POWER}
          symbol="W"
          label="Power"
          max={MaxPower}
        />
      </Box>

      <Box gridArea={AreaName.OUTDOOR_PUMP_TEMP}>
        <MQTTGauge
          topic={Topic.OUTDOOR_TEMP}
          symbol="C"
          label="Temp"
          max={MaxTemp}
        />
      </Box>

      <Box gridArea={AreaName.OUTDOOR_PUMP_ENERGY}>
        <MQTTGauge
          topic={Topic.OUTDOOR_ENERGY}
          symbol="W/m"
          label="Energy"
          max={MaxEnergy}
        />
      </Box>

      <Box gridArea={AreaName.HEADER_CAM} align="center">
        <Box align="center" direction="row" pad="small">
          <Grow />
          <Heading size="xsmall">Camera</Heading>
        </Box>
      </Box>

      <Box gridArea={AreaName.CAM} alignContent="center">
        <MQTTImage topic={Topic.CAM} />
      </Box>
    </ResponsiveGrid>
  )
}
