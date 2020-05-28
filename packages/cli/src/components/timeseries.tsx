import { Box, Chart, Text, Stack } from 'grommet'
import React from 'react'
import { stringToTimeSeries } from '../shared/formatters'
import { UseMQTT } from '../shared/mqtt.service'
import { Topic } from '../shared/mqtt.types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

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
    <Box
      align="center"
      direction="column"
      gap="medium"
      fill="horizontal"
      height="medium"
      pad="medium"
    >
      <Box direction="row" gap="small">
        <Text size="large" weight="normal">
          {label}
        </Text>
        <Text size="small">
          <FontAwesomeIcon size="1x" icon={faArrowDown} /> {yBounds[0]}{' '}
          <FontAwesomeIcon size="1x" icon={faArrowUp} /> {yBounds[1]}
        </Text>
      </Box>
      <Stack fill>
        <Box align="center" fill>
          <Chart
            type="area"
            values={values}
            bounds={[xBounds, yBounds]}
            thickness="xxsmall"
            size={{ width: 'full', height: 'full' }}
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
