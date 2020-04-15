import React, { useState, useEffect } from "react";
import { sendMessage, filterByTopic } from "./bus.service";
import { Topic } from "./bus.types";
import { Box, Button } from "grommet";
import { stringToBoolean, booleanToString } from "./formatters";
import { CirclePlay, PauseFill } from "grommet-icons";

export interface MQTTButtonProps {
  topic: Topic;
  label: string;
}

export const MQTTSwitch: React.FC<MQTTButtonProps> = (props) => {
  const { topic, label } = props;

  const [on, setOn] = useState(false);

  useEffect(() => {
    const sub = filterByTopic(topic).subscribe(({payload}) => {
      setOn(stringToBoolean(payload));
    });

    return () => {
      sub.unsubscribe();
    };
  }, [topic]);

  const handleToggle = () => {
    const toggleStatus = !on;
    sendMessage({ topic, payload: booleanToString(toggleStatus) });
    setOn(toggleStatus);
  };

  const icon = !on ? <CirclePlay/> : <PauseFill/>;

  return (
    <Box align="center" pad="large">
      <Button
        icon={icon}
        size="large"
        primary={on}
        label={label}
        onClick={handleToggle}
      />
    </Box>
  );
};
