import { Box, Button, ButtonProps, Drop } from 'grommet'
import React, { useRef, useState } from 'react'
import { booleanToString, stringToBoolean } from '../shared/formatters'
import { UseMQTT } from '../shared/mqtt.service'
import { Topic } from '../shared/mqtt.types'

export interface MQTTButtonProps extends ButtonProps {
  topic: Topic
  feedBackTopic: Topic
  confirmLabel: string
  safe: boolean
  shellyMode?: boolean
}

export const MQTTSwitch: React.FC<MQTTButtonProps> = ({ topic, label, feedBackTopic, confirmLabel, safe, shellyMode }) => {

  const boxRef = useRef()
  const [openDrop, setOpenDrop] = useState(false)
  const { message, sendMessage } = UseMQTT(feedBackTopic)

  const on = stringToBoolean(message)

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
    <Box align="center" fill="horizontal">
      <Button
        ref={boxRef as any}
        size="large"
        primary={on}
        label={label}
        onClick={handleToggle}
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
