import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { filterByTopic } from "./bus.service";
import { Topic } from "./bus.types";
import { Meter, Stack, Box, Text, MeterProps } from "grommet";
import { stringToNumber, numberToFixed } from "./formatters";

export interface valueProps extends MeterProps {
  topic: Topic;
  symbol: string;
  label: string;
}

export const MQTTGauge: React.FC<valueProps> = (props) => {
  const { topic, symbol, label, max, thickness = 'large' } = props;
  const [value, setValue] = useState(0);

  useEffect(() => {
    const sub = filterByTopic(topic).subscribe(({ payload }) => {
      setValue(stringToNumber(payload));
    });

    return () => {
      sub.unsubscribe();
    };
  }, [topic]);

  return (
    <Box align="center" pad="small">
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
          max={max}
          thickness={thickness}
        />
        <Box
          direction="row"
          align="center"
          pad={{ bottom: "xsmall" }}
          gap="xsmall"
        >
          <Text size="medium">{label} </Text>
          <Text size="xxlarge" weight="bold">
            {numberToFixed(value)}
          </Text>
          <Text size="small"> {symbol}</Text>
        </Box>
      </Stack>
    </Box>
  );
};
