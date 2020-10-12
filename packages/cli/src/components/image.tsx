import { Box, Text } from 'grommet'
import React from 'react'
import styled from 'styled-components'
import { UseMQTT } from '../shared/mqtt.service'
import { Topic } from '../shared/mqtt.types'

export interface MQTTImageProps {
  topic: Topic
  label: string
}

const ImageContainer = styled.img`
  max-width: 100%;
  border-radius: 1em;
`

// TODO use Img object instead when image src changes
function getImage(message: Buffer | string): string {
  if (message instanceof Buffer) {
    return `data:image/jpg;base64,${message.toString('base64')}`
  }
  return message
}

export const MQTTImage: React.FC<MQTTImageProps> = ({ topic, label }) => {
  const { message } = UseMQTT(topic)
  const img = getImage(message)

  return (
    <Box align="start" fill="horizontal" direction="column" gap="xsmall">
      <Text size="medium">{label}</Text>
      <Box
        background="light-1"
        alignContent="center"
        justify="center"
        round={true}
      >
        <ImageContainer src={img} />
      </Box>
    </Box>
  )
}
