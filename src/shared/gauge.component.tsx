import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { filterByTopic } from "../ws/ws-service";
import { Topic } from "../ws/ws.types";
import { Meter, Stack, Box, Text } from "grommet";

export interface valueProps {
  topic: Topic;
  symbol: string;
  label: string;
}

export const GaugeComponent: React.FC<valueProps> = (props) => {
  const { topic, symbol, label } = props;
  const [value, setValue] = useState(0);

  useEffect(() => {
    const sub = filterByTopic(topic).subscribe((message) => {
      console.log(message);
      setValue(Number(message));
    });

    return () => {
      sub.unsubscribe();
    };
  }, [topic]);

  return (
    <Box align="center" pad="large">
      <Stack anchor="center">
        <Meter
          type="circle"
          values={[
            {
              value,
            },
          ]}
          aria-label="meter"
          size="medium"
        />
        <Box
          direction="row"
          align="center"
          pad={{ bottom: "xsmall" }}
          gap="xsmall"
        >
          <Text size="small">{label} </Text>
          <Text size="xlarge" weight="bold">
            {value}
          </Text>
          <Text size="small"> {symbol}</Text>
        </Box>
      </Stack>
    </Box>
  );
};
