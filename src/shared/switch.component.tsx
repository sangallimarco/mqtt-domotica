import React, { useState, useEffect, useRef } from "react";
import { sendMessage, filterByTopic } from "./bus.service";
import { Topic } from "./bus.types";
import { Box, Button, ButtonProps, Drop } from "grommet";
import { stringToBoolean, booleanToString } from "./formatters";
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
  const [on, setOn] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);

  useEffect(() => {
    const sub = filterByTopic(feedBackTopic).subscribe(({ payload }) => {
      setOn(stringToBoolean(payload));
    });

    return () => {
      sub.unsubscribe();
    };
  }, [feedBackTopic]);

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
    setOn(true);
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
