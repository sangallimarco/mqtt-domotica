import React from "react";
import { sendMessage } from "./bus.service";
import { Topic } from "./bus.types";
import { Box, Button, ButtonProps } from "grommet";

export interface MQTTButtonProps extends ButtonProps {
  topic: Topic;
}

export const MQTTPushButton: React.FC<MQTTButtonProps> = (props) => {
  const { topic, label } = props

  const handleDown = () => {
    sendMessage({ topic, payload: "1" });
  };

  const handleUp = () => {
    sendMessage({ topic, payload: "0" });
  };

  return (
    <Box align="center" pad="small">
      <Button
        size="large"
        label={label}
        onMouseDown={handleDown}
        onMouseUp={handleUp}
      />
    </Box>
  );
};
