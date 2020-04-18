import React from "react";
import { Grommet, Grid, Box, grommet, Heading } from "grommet";
import { deepMerge } from "grommet/utils";
import { MQTTGauge } from "./shared/gauge.component";
import { Topic } from "./shared/bus.types";
import { MQTTButton } from "./shared/button.component";
import { MQTTSwitch } from "./shared/switch.component";

const customTheme = deepMerge(grommet, {
  global: {
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px",
    },
  },
});

const App: React.FC = () => {
  return (
    <Grommet full theme={customTheme} themeMode="dark">
      <Grid
        rows={['min-content', 'max-content', 'max-content']}
        columns={['1fr', '1fr', '1fr']}
        areas={[
          { name: 'HEADER', start: [0, 0], end: [3, 0] },

          { name: 'TEMP1', start: [0, 1], end: [1, 1] },
          { name: 'TEMP2', start: [1, 1], end: [2, 1] },
          { name: 'POWER', start: [2, 1], end: [3, 1] },

          { name: 'PUMPS_SWITCH', start: [0, 2], end: [1, 2] },
          { name: 'SPACER2', start: [1, 2], end: [2, 2] }, // there is no way leave gaps
          { name: 'PROCESS_SWITCH', start: [2, 2], end: [3, 2] },
        ]}
      >
         <Box gridArea="HEADER" align="center">
          <Heading size="medium">Dashboard</Heading>
        </Box>
        <Box gridArea="TEMP1">
          <MQTTGauge topic={Topic.TEMP1} symbol="C" label="Ambient"/>
        </Box>
        <Box gridArea="TEMP2">
          <MQTTGauge topic={Topic.TEMP2} symbol="C" label="Socket"/>
        </Box>
        <Box gridArea="POWER">
          <MQTTGauge topic={Topic.POWER} symbol="W" label="Socket"/>
        </Box>
        <Box gridArea="PUMPS_SWITCH">
          <MQTTButton topic={Topic.PUMPS_SWITCH} label="Pumps"/>
        </Box>

        <Box gridArea="PROCESS_SWITCH">
          <MQTTSwitch topic={Topic.PROCESS_SWITCH} feedBackTopic={Topic.PROCESS_STATUS} label="Process"/>
        </Box>
       
      </Grid>
    </Grommet>
  );
};

export default App;
