import { Box } from 'grommet'
import React from 'react'
import styled from 'styled-components'
import { UseMQTT } from '../shared/mqtt.service'
import { Topic } from '../shared/mqtt.types'

export interface MQTTImageProps {
  topic: Topic
}

const ImageContainer = styled.img`
  max-width: 100%;
  border-radius: 1em;
`
function getImage(message: Buffer | string): string {
  if (message instanceof Buffer) {
    return `data:image/jpg;base64,${message.toString('base64')}`
  }
  return message
}

export const MQTTImage: React.FC<MQTTImageProps> = ({ topic }) => {
  const { message } = UseMQTT(topic)
  const img = getImage(message)

  return (
    <Box
      pad="xsmall"
      background="dark-2"
      alignContent="center"
      justify="center"
      round={true}
    >
      <ImageContainer src={img} />
    </Box>
  )
}
