import { Box, Header, Text } from 'grommet'
import React from 'react'
import { IGarden1Card } from './cards/igarden-1'
import { IGarden2Card } from './cards/igarden-2'
import { IndoorGardenCard } from './cards/indoor'
import { LivingRoomCard } from './cards/living-room'
import { OutdoorCard } from './cards/outdoor'
import { UvcCard } from './cards/uvc'
import { MQTTActivity } from './components/activity'
import { MQTTSpinner } from './components/spinner'
import { MQTTWeatherIcon } from './components/weather-icon'
import { LayoutGrid } from './layout.conf'
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
      <MQTTSpinner />

      <LayoutGrid>
        <LivingRoomCard />
        <IndoorGardenCard />
        <UvcCard />
        <OutdoorCard />
        <IGarden1Card />
        <IGarden2Card />
      </LayoutGrid>
    </Box>
  )
}
