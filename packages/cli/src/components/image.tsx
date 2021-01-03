import { Box, Text } from 'grommet'
import { isNil } from 'lodash'
import React, { MutableRefObject, useRef } from 'react'
import styled from 'styled-components'
import { UseMQTT } from '../shared/mqtt.service'
import { Topic } from '@myhydroponics/core'

export interface MQTTImageProps {
  topic: Topic
  label: string
}

const ImageContainer = styled.img`
  max-width: 100%;
  border-radius: 1em;
`

// TODO use Img object instead when image src changes
function getImage(message: Buffer | string, ref: MutableRefObject<null>): void {
  let src: string
  if (message instanceof Buffer) {
    src = `data:image/jpg;base64,${message.toString('base64')}`
  } else {
    src = message
  }
  const img = new Image()
  img.onload = () => {
    const elRef: HTMLImageElement | null | undefined = ref.current
      ? ref.current
      : null
    // assign new image to the component when it is loaded
    if (!isNil(elRef)) {
      ;(elRef as any).src = src
    }
  }
  img.src = src
}

export const MQTTImage: React.FC<MQTTImageProps> = ({ topic, label }) => {
  const { message = '' } = UseMQTT(topic)
  const imgRef = useRef(null)
  getImage(message, imgRef)

  return (
    <Box align="start" fill="horizontal" direction="column" gap="xsmall">
      <Text size="medium">{label}</Text>
      <Box
        background="light-1"
        alignContent="center"
        justify="center"
        round={true}
      >
        <ImageContainer ref={imgRef} src="./640x480.png" />
      </Box>
    </Box>
  )
}
