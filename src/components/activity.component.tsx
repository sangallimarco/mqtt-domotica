import React from "react"
import { UseMQTT } from "../shared/mqtt.service"
import { Topic } from "../shared/mqtt.types"
import { Box } from "grommet"
import { stringToBoolean } from "../shared/formatters"
import { Inherit, Connect } from "grommet-icons"

export interface MQTTButtonProps {
  topic: Topic
}

export const MQTTActivity: React.FC<MQTTButtonProps> = (props) => {
  const { topic } = props
  const {message} = UseMQTT(topic)

  const connected = stringToBoolean(message)
  const icon = !connected ? <Connect color="status-error" size="large"/> : <Inherit color="status-ok" size="large"/>

  return (
    <Box align="center" pad="small">
      {icon}
    </Box>
  )
}
