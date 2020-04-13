import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { filterByTopic } from "../ws/ws-service";
import { Topic } from "../ws/ws.types";
import { Meter, Stack, Box, Text } from "grommet";

export interface TempProps {
  topic: Topic;
}

export const TempComponent: React.FC<TempProps> = (props) => {
  const { topic } = props;
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    const sub = filterByTopic(topic).subscribe((message) => {
      console.log(message.payload);
      setTemp(Number(message.payload));
    });

    return () => {
      sub.unsubscribe();
    };
  }, [topic]);

  return (
    <Stack anchor="center">
      <Meter
        values={[
          {
            value: temp,
          }
        ]}
        aria-label="meter"
      />
      <Box direction="row" align="center" pad={{ bottom: "xsmall" }}>
        <Text size="xlarge" weight="bold">
          {temp}
        </Text>
        <Text size="small">C</Text>
      </Box>
    </Stack>
  );
};
