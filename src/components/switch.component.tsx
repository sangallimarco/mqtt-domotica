import React, { useState, useRef } from "react";
import { UseMQTT } from "../shared/mqtt.service";
import { Topic } from "../shared/mqtt.types";
import { Box, Button, ButtonProps, Drop } from "grommet";
import { stringToBoolean, booleanToString } from "../shared/formatters";
import { CirclePlay, PauseFill } from "grommet-icons";

export interface MQTTButtonProps extends ButtonProps {
  topic: Topic;
  feedBackTopic: Topic;
  confirmLabel: string;
  safe: boolean;
}

export const MQTTSwitch: React.FC<MQTTButtonProps> = (props) => {
  const { topic, label, feedBackTopic, confirmLabel, safe } = props;
  
  const boxRef = useRef();
  const [openDrop, setOpenDrop] = useState(false);
  const {message, sendMessage} = UseMQTT(feedBackTopic);

  const on = stringToBoolean(message);

  const handleToggle = () => {
    const toggleStatus = !on;
    if (!toggleStatus) {
      setOpenDrop(false);
      sendMessage({ topic, payload: booleanToString(false) });
    } else {
      setOpenDrop(true);
      if (!safe) {
        sendMessage({ topic, payload: booleanToString(true) });
      }
    }
  };

  const handleConfirm = () => {
    setOpenDrop(false);
    sendMessage({ topic, payload: booleanToString(true) });
  };

  const handleCloseDrop = () => {
    setOpenDrop(false);
  };

  const icon = !on ? <CirclePlay /> : <PauseFill />;

  return (
    <Box align="center" pad="small">
      <Button
        icon={icon}
        ref={boxRef as any}
        size="large"
        primary={on}
        label={label}
        onClick={handleToggle}
      />
      {safe && openDrop && (
        <Drop
          align={{ top: "bottom", left: "left" }}
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
  );
};
