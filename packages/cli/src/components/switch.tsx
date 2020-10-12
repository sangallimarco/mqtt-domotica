import { Box, Button, ButtonProps, Drop } from 'grommet'
import React, { useRef, useState } from 'react'
import { booleanToString } from '../shared/formatters'
import { UseMQTT } from '../shared/mqtt.service'
import { Topic } from '../shared/mqtt.types'

export interface MQTTSwitchProps extends ButtonProps {
  topic: Topic
  feedBackTopic: Topic
  confirmLabel: string
  safe: boolean
  shellyMode?: boolean
  showStatus?: boolean
  onStatuses?: string[]
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
}) => {
  const boxRef = useRef()
  const [openDrop, setOpenDrop] = useState(false)
  const { message, sendMessage } = UseMQTT(feedBackTopic)
  const sanitisedMessage = message.toString()

  const on = onStatuses.includes(sanitisedMessage)
  const formattedLabel = showStatus ? `${label}: ${sanitisedMessage}` : label

  const handleToggle = () => {
    const toggleStatus = !on
    if (!toggleStatus) {
      setOpenDrop(false)
      sendMessage({ topic, payload: booleanToString(false, shellyMode) })
    } else {
      setOpenDrop(true)
      if (!safe) {
        sendMessage({ topic, payload: booleanToString(true, shellyMode) })
      }
    }
  }

  const handleConfirm = () => {
    setOpenDrop(false)
    sendMessage({ topic, payload: booleanToString(true, shellyMode) })
  }

  const handleCloseDrop = () => {
    setOpenDrop(false)
  }

  return (
    <Box align="start" fill="horizontal">
      <Button
        size="large"
        ref={boxRef as any}
        primary={on}
        label={formattedLabel}
        onClick={handleToggle}
        fill="horizontal"
        gap="medium"
      />
      {safe && openDrop && (
        <Drop
          align={{ top: 'bottom', left: 'left' }}
          target={boxRef.current}
          onClickOutside={handleCloseDrop}
        >
          <Box pad="medium">
            <Button
              size="large"
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
