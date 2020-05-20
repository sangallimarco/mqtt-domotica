import React from 'react'
import { UseMQTT } from '../shared/mqtt.service'
import { Topic } from '../shared/mqtt.types'
import { Meter, Stack, Box, Text, MeterProps } from 'grommet'
import {
  stringToNumber,
  numberToFixed,
  getMeterColor,
} from '../shared/formatters'

export interface valueProps extends MeterProps {
  topic: Topic
  symbol: string
  label: string
}

export const MQTTGauge: React.FC<valueProps> = (props) => {
  const { topic, symbol, label, max = 1, thickness = 'large' } = props

  const { message } = UseMQTT(topic)
  const value = stringToNumber(message)
  const formattedValue = numberToFixed(value)
  const color = getMeterColor(value, max)

  return (
    <Box align="center" pad="small">
      <Stack anchor="center">
        <Meter
          type="circle"
          values={[
            {
              value,
              color,
            },
          ]}
          aria-label="meter"
          size="medium"
          max={max}
          thickness={thickness}
        />

        <Box direction="column" align="center">
          <Text size="large">{label} </Text>
          <Box
            direction="row"
            align="center"
            pad={{ bottom: 'xsmall' }}
            gap="xsmall"
          >
            <Text size="xlarge" weight="bold">
              {formattedValue}
            </Text>
            <Text size="medium"> {symbol}</Text>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}
