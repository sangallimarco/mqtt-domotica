import React from "react"
import { UseMQTT } from "../shared/mqtt.service"
import { Topic } from "../shared/mqtt.types"
import { Image } from "grommet"

export interface MQTTImageProps {
  topic: Topic
}

export const MQTTImage: React.FC<MQTTImageProps> = (props) => {
  const { topic } = props
  const { message } = UseMQTT(topic)

  return (
      <Image fit="contain" src={message} />
  )
}
