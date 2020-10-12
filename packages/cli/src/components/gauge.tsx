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

export const MQTTGauge: React.FC<MQTTGaugeProps> = ({
  topic,
  symbol,
  label,
  max = 1,
  thickness = 'large',
}) => {
  const { message } = UseMQTT(topic)
  const sanitisedMessage = message.toString()
  const value = stringToNumber(sanitisedMessage)
  const formattedValue = numberToFixed(value)
  const color = getMeterColor(value, max)

  return (
    <Box align="start" direction="column" fill="horizontal" gap="xsmall">
      <Text size="medium">{label}</Text>
      <Stack anchor="left" fill="horizontal">
        <Meter
          type="bar"
          round={false}
          values={[
            {
              value,
              color,
            },
          ]}
          aria-label="meter"
          size="full"
          max={max}
          background="light-3"
          thickness={thickness}
        />
        <Box
          direction="row"
          align="center"
          pad={{ bottom: 'xsmall' }}
          margin="medium"
          gap="xsmall"
        >
          <Text size="medium" weight={600}>
            {formattedValue}
          </Text>
          <Text size="small"> {symbol}</Text>
        </Box>
      </Stack>
    </Box>
  )
}
