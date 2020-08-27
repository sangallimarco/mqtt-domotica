import React from 'react'
import { UseMQTT } from '../shared/mqtt.service'
import { Topic } from '../shared/mqtt.types'
import { Meter, Stack, Box, Text, MeterProps } from 'grommet'
import {
  stringToNumber,
  numberToFixed,
  getMeterColor,
} from '../shared/formatters'

export interface MQTTGaugeProps extends MeterProps {
  topic: Topic
  symbol: string
  label: string
}

export const MQTTGauge: React.FC<MQTTGaugeProps> = ({ topic, symbol, label, max = 1, thickness = 'large' }) => {

  const { message } = UseMQTT(topic)
  const value = stringToNumber(message)
  const formattedValue = numberToFixed(value)
  const color = getMeterColor(value, max)

  return (
    <Box align="center" direction="column" gap="small" fill="horizontal">
      <Text size="large">{label} </Text>
      <Stack anchor="center">
        <Meter
          type="bar"
          round={true}
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
      </Stack>
    </Box>
  )
}
