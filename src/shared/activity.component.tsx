import React, { useState, useEffect } from "react";
import { filterByTopic } from "./bus.service";
import { Topic } from "./bus.types";
import { Box } from "grommet";
import { stringToBoolean } from "./formatters";
import { Inherit, Connect } from "grommet-icons";

export interface MQTTButtonProps {
  topic: Topic;
}

export const MQTTActivity: React.FC<MQTTButtonProps> = (props) => {
  const { topic } = props;

  const [on, setOn] = useState(false);

  useEffect(() => {
    const sub = filterByTopic(topic).subscribe(({payload}) => {
      setOn(stringToBoolean(payload));
    });

    return () => {
      sub.unsubscribe();
    };
  }, [topic]);

  const icon = !on ? <Connect size="large"/> : <Inherit size="large"/>;

  return (
    <Box align="center" pad="small">
      {icon}
    </Box>
  );
};
