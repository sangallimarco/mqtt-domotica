import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Chart, Stack, Text } from 'grommet'
import React from 'react'
import { stringToTimeSeries } from '@myhydroponics/core'
import { UseMQTT } from '../shared/mqtt.service'
import { Topic } from '@myhydroponics/core'

export interface MQTTimeSeriesProps {
  topic: Topic
  label: string
}

export const MQTTimeSeries: React.FC<MQTTimeSeriesProps> = ({
  topic,
  label,
}) => {
  const { message } = UseMQTT(topic)
  const sanitisedMessage = message.toString()

  const { xBounds, yBounds, values = [] } = stringToTimeSeries(sanitisedMessage)

  return (
    <Box
      align="start"
      direction="column"
      gap="small"
      fill="horizontal"
      height="small"
    >
      <Box direction="row" gap="small" align="baseline">
        <Text size="medium" weight="normal">
          {label}
        </Text>
        <Text size="xsmall">
          <FontAwesomeIcon size="1x" icon={faArrowDown} /> {yBounds[0]}{' '}
          <FontAwesomeIcon size="1x" icon={faArrowUp} /> {yBounds[1]}
        </Text>
      </Box>
      <Box align="center" fill background="light-3" round="small">
        <Stack fill>
          <Chart
            type="line"
            values={values}
            bounds={[xBounds, yBounds]}
            thickness="hair"
            size={{ width: 'full', height: 'full' }}
            color="brand"
          />
          <Box fill>
            <Box flex justify="between">
              <Box align="start">
                <Box
                  pad="xxsmall"
                  background={{ color: 'white', opacity: 'medium' }}
                >
                  <Text size="xsmall">{yBounds[1]}</Text>
                </Box>
              </Box>
              <Box align="start">
                <Box
                  pad="xxsmall"
                  background={{ color: 'white', opacity: 'medium' }}
                >
                  <Text size="xsmall">{yBounds[0]}</Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
