import React from 'react'
import styled from 'styled-components'
import { UseMQTT } from '../shared/mqtt.service'
import { Topic } from '../shared/mqtt.types'
import { Box } from 'grommet'

export interface MQTTImageProps {
  topic: Topic
}

const ImageContainer = styled.img`
  max-width: 100%;
  border-radius: 1em;
`

export const MQTTImage: React.FC<MQTTImageProps> = (props) => {
  const { topic } = props
  const { message } = UseMQTT(topic)

  return (
    <Box
      pad="xsmall"
      background="dark-2"
      alignContent="center"
      justify="center"
      round={true}
    >
      <ImageContainer src={message} />
    </Box>
  )
}
