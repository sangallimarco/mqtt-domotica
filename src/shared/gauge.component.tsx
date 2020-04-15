import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { filterByTopic } from "./bus.service";
import { Topic } from "./bus.types";
import { Meter, Stack, Box, Text } from "grommet";
import { stringToFixed } from "./formatters";

export interface valueProps {
  topic: Topic;
  symbol: string;
  label: string;
}

export const MQTTGauge: React.FC<valueProps> = (props) => {
  const { topic, symbol, label } = props;
  const [value, setValue] = useState(0);

  useEffect(() => {
    const sub = filterByTopic(topic).subscribe(({payload}) => {
      const newValue = stringToFixed(payload);
      setValue(newValue);
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
