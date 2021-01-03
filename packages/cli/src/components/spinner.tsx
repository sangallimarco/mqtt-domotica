import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from 'grommet'
import React from 'react'
import styled from 'styled-components'
import { themeColors } from '../layout.conf'
import { UseMQTT } from '../shared/mqtt.service'
import { MqttState, Topic } from '@myhydroponics/core'

export const Overlay = styled.div`
  position: fixed;
  padding: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${themeColors['light-4']};
  opacity: 0.6;
  pointer-events: all;
  z-index: 10;
`

export interface MQTTSpinnerProps {}

export const MQTTSpinner: React.FC<MQTTSpinnerProps> = () => {
  const { status } = UseMQTT(Topic.CONNECTED)
  const active = status === MqttState.CONNECT

  return !active ? (
    <Overlay>
      <Box
        align="center"
        direction="column"
        gap="small"
        fill="horizontal"
        pad="large"
      >
        <FontAwesomeIcon spin={true} size="3x" icon={faSpinner} />
      </Box>
    </Overlay>
  ) : null
}
