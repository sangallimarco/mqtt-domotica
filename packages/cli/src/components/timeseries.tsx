import { Box, Chart, Text, Stack } from 'grommet'
import React from 'react'
import { stringToTimeSeries } from '../shared/formatters'
import { UseMQTT } from '../shared/mqtt.service'
import { Topic } from '../shared/mqtt.types'

export interface TimeSeriesChartProps {
  topic: Topic
  label: string
}

export const MQTTimeSeries: React.FC<TimeSeriesChartProps> = ({
  topic,
  label,
}) => {
  const { message } = UseMQTT(topic)

  const { xBounds, yBounds, values } = stringToTimeSeries(message)

  return (
    <Box align="center" direction="column" gap="medium" fill="horizontal">
      <Text size="large">{label} </Text>
      <Stack fill>
        <Box align="center" fill>
          <Chart
            type="area"
            values={values}
            round
            bounds={[xBounds, yBounds]}
            thickness="xxsmall"
            size={{ width: 'full' }}
            color="dark-2"
          />
        </Box>
        <Box fill>
          <Box flex justify="between">
            <Box border="top" align="start">
              <Box
                pad="xsmall"
                background={{ color: 'white', opacity: 'medium' }}
              >
                <Text>{yBounds[1]}</Text>
              </Box>
            </Box>
            <Box border="bottom" align="start">
              <Box
                pad="xsmall"
                background={{ color: 'white', opacity: 'medium' }}
              >
                <Text>{yBounds[0]}</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}
