import React from 'react'
import { UseMQTT } from '../shared/mqtt.service'
import { Topic } from '../shared/mqtt.types'
import { Box, Text } from 'grommet'

export interface MQTTLabelProps {
  topic: Topic
}

export const MQTTLabel: React.FC<MQTTLabelProps> = ({ topic }) => {
    const { message } = UseMQTT(topic)
  
    return (
      <Box align="center" direction="column" gap="small" fill="horizontal">
        <Text size="large">{message} </Text>
      </Box>
    )
  }
  