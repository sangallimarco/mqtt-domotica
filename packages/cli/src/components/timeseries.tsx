import { Box, Chart, Text } from 'grommet'
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

  const values = stringToTimeSeries(message)

  return (
    <Box align="center" fill="horizontal" pad="large">
      <Box align="center" direction="column" gap="small" fill="horizontal">
        <Text size="large">{label} </Text>
        <Chart
          type="bar"
          values={values}
          round
          thickness="hair"
          size={{ width: 'full' }}
          color="dark-2"
        />
      </Box>
    </Box>
  )
}
