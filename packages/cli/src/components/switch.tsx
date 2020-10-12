import { Box, Button, ButtonProps, Drop, Text } from 'grommet'
import { startCase } from 'lodash'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { themeColors } from '../layout.conf'
import { booleanToString } from '../shared/formatters'
import { UseMQTT } from '../shared/mqtt.service'
import { Topic } from '../shared/mqtt.types'

const BaseButton = styled.div<{ active: boolean }>`
  border-radius: 1em 0 0 1em;
  background-color: ${({ active }) => (active ? '#eee' : '#fff')};
  flex: 1;
  font-size: 1.5em;
  padding: 0.5em;
  justify-content: center;
  display: flex;
  cursor: pointer;
`
/* tslint:disable */
const ButtonLeft = styled(BaseButton)`
  border-radius: 1em 0 0 1em;
  background-color: ${({ active }) =>
    !active ? themeColors['light-4'] : themeColors['dark-3']};
  color: ${({ active }) =>
    active ? themeColors['light-1'] : themeColors['dark-2']};
  font-weight: ${({ active }) => (active ? '700' : 'normal')};
`

const ButtonRight = styled(BaseButton)`
  border-radius: 0 1em 1em 0;
  background-color: ${({ active }) =>
    active ? themeColors['neutral-3'] : themeColors['light-4']};
  color: ${({ active }) =>
    active ? themeColors['light-1'] : themeColors['dark-2']};
  font-weight: ${({ active }) => (active ? '700' : 'normal')};
`
/* tslint:enable */

export interface MQTTSwitchProps extends ButtonProps {
  topic: Topic
  feedBackTopic: Topic
  confirmLabel: string
  safe: boolean
  shellyMode?: boolean
  showStatus?: boolean
  onStatuses?: string[]
  onLabel?: string
  offLabel?: string
}

export const MQTTSwitch: React.FC<MQTTSwitchProps> = ({
  topic,
  label,
  feedBackTopic,
  confirmLabel,
  safe,
  shellyMode,
  showStatus,
  onStatuses = ['on', '1'],
  onLabel = 'On',
  offLabel = 'Off',
}) => {
  const boxRef = useRef()
  const [openDrop, setOpenDrop] = useState(false)
  const { message, sendMessage } = UseMQTT(feedBackTopic)
  const sanitisedMessage = message.toString()

  const on = onStatuses.includes(sanitisedMessage)
  const formattedLabel = showStatus
    ? `${label}: ${startCase(sanitisedMessage)}`
    : label

  const handleOn = () => {
    if (safe) {
      setOpenDrop(true)
    } else {
      setOpenDrop(false)
      sendMessage({ topic, payload: booleanToString(true, shellyMode) })
    }
  }

  const handleOff = () => {
    setOpenDrop(false)
    sendMessage({ topic, payload: booleanToString(false, shellyMode) })
  }

  const handleConfirm = () => {
    setOpenDrop(false)
    sendMessage({ topic, payload: booleanToString(true, shellyMode) })
  }

  const handleCloseDrop = () => {
    setOpenDrop(false)
  }

  return (
    <Box
      align="start"
      fill="horizontal"
      ref={boxRef as any}
      direction="column"
      gap="xsmall"
    >
      <Text size="medium">{formattedLabel}</Text>
      <Box align="start" fill="horizontal" direction="row">
        <ButtonLeft active={!on} onClick={handleOff}>
          {offLabel}
        </ButtonLeft>
        <ButtonRight active={on} onClick={handleOn}>
          {onLabel}
        </ButtonRight>
      </Box>
      {safe && openDrop && (
        <Drop
          align={{ top: 'bottom', left: 'left' }}
          target={boxRef.current}
          onClickOutside={handleCloseDrop}
        >
          <Box pad="medium">
            <Button
              size="medium"
              primary
              label={confirmLabel}
              onClick={handleConfirm}
            />
          </Box>
        </Drop>
      )}
    </Box>
  )
}
