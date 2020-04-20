import React from "react";
import { Grommet, Grid, Box, grommet, Heading } from "grommet";
import { deepMerge } from "grommet/utils";
import { MQTTGauge } from "./components/gauge.component";
import { Topic } from "./shared/mqtt.types";
import { MQTTSwitch } from "./components/switch.component";
import { Grow } from "grommet-icons";
import { MQTTActivity } from "./components/activity.component";

const customTheme = deepMerge(grommet, {
  global: {
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px",
    },
    drop: {
      background: { dark: "dark-2", light: "neutral-2" },
      border: { radius: "2em" },
      zIndex: "13",
      shadowSize: "0",
    },
  },
});

const App: React.FC = () => {
  return (
    <Grommet full theme={customTheme} themeMode="dark">
      <Grid
        rows={["min-content", "min-content", "min-content", "min-content", "min-content", "min-content"]}
        columns={["1fr", "1fr", "1fr"]}
        areas={[
          { name: "HEADER", start: [0, 0], end: [3, 0] },

          { name: "PUMPS_SWITCH", start: [0, 1], end: [1, 1] },
          { name: "NETWORK", start: [1, 1], end: [2, 1] },
          { name: "PROCESS_SWITCH", start: [2, 1], end: [3, 1] },

          { name: "TEMP1", start: [0, 2], end: [1, 2] },
          { name: "TEMP2", start: [1, 2], end: [2, 2] },
          { name: "POWER", start: [2, 2], end: [3, 2] },

          { name: "HEADER_OUTDOOR", start: [0, 3], end: [3, 3] },

          { name: "OUTDOOR_PUMP_SWITCH", start: [0, 4], end: [1, 4] },
          { name: "OUTDOOR_FUTURE1", start: [1, 4], end: [2, 4] },
          { name: "OUTDOOR_FUTURE2", start: [2, 4], end: [3, 4] },

          { name: "OUTDOOR_PUMP_POWER", start: [0, 5], end: [1, 5] },
          { name: "OUTDOOR_PUMP_TEMP", start: [1, 5], end: [2, 5] },
          { name: "OUTDOOR_PUMP_ENERGY", start: [2, 5], end: [3, 5] }
        ]}
      >
        <Box gridArea="HEADER" align="center">
          <Box gridArea="HEADER" align="center" direction="row" pad="small">
            <Grow />
            <Heading size="small">Home Dashboard</Heading>
          </Box>
        </Box>

        <Box gridArea="TEMP1">
          <MQTTGauge topic={Topic.TEMP1} symbol="C" label="Ambient" max={35} />
        </Box>

        <Box gridArea="TEMP2">
          <MQTTGauge topic={Topic.TEMP2} symbol="C" label="Socket" max={35} />
        </Box>

        <Box gridArea="POWER">
          <MQTTGauge topic={Topic.POWER} symbol="W" label="Socket" max={100} />
        </Box>

        <Box gridArea="PUMPS_SWITCH">
          <MQTTSwitch
            topic={Topic.PUMPS_SWITCH}
            feedBackTopic={Topic.PUMPS_STATUS}
            label="Pumps"
            confirmLabel="Start"
            safe={true}
          />
        </Box>

        <Box gridArea="NETWORK">
          <MQTTActivity topic={Topic.CONNECTED} />
        </Box>

        <Box gridArea="PROCESS_SWITCH">
          <MQTTSwitch
            topic={Topic.PROCESS_SWITCH}
            feedBackTopic={Topic.PROCESS_STATUS}
            label="Process"
            confirmLabel="Start"
            safe={true}
          />
        </Box>

        <Box gridArea="HEADER_OUTDOOR" align="center">
          <Box gridArea="HEADER" align="center" direction="row" pad="small">
            <Grow />
            <Heading size="small">Outdoor</Heading>
          </Box>
        </Box>

        <Box gridArea="OUTDOOR_PUMP_SWITCH">
          <MQTTSwitch
            topic={Topic.OUTDOOR_PUMPS_SWITCH}
            feedBackTopic={Topic.OUTDOOR_PUMPS_STATUS}
            label="Pump"
            confirmLabel="Start"
            safe={true}
            shellyMode={true}
          />
        </Box>

        <Box gridArea="OUTDOOR_PUMP_POWER">
          <MQTTGauge topic={Topic.OUTDOOR_POWER} symbol="W" label="Power" max={50} />
        </Box>

        <Box gridArea="OUTDOOR_PUMP_TEMP">
          <MQTTGauge topic={Topic.OUTDOOR_TEMP} symbol="C" label="Temp" max={100} />
        </Box>

        <Box gridArea="OUTDOOR_PUMP_ENERGY">
          <MQTTGauge topic={Topic.OUTDOOR_ENERGY} symbol="W/m" label="Energy" max={100} />
        </Box>

      </Grid>
    </Grommet>
  );
};

export default App;
