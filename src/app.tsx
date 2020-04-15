import React from "react";
import { Grommet, Grid, Box, grommet, Heading } from "grommet";
import { deepMerge } from "grommet/utils";
import { GaugeComponent } from "./shared/gauge.component";
import { Topic } from "./ws/ws.types";

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
    <Grommet full theme={customTheme}>
      <Grid
        rows={['min-content', 'max-content']}
        columns={['1fr', '1fr', '1fr']}
        areas={[
          { name: 'HEADER', start: [0, 0], end: [3, 0] },
          { name: 'TEMP1', start: [0, 1], end: [1, 1] },
          { name: 'TEMP2', start: [1, 1], end: [2, 1] },
          { name: 'POWER', start: [2, 1], end: [3, 1] },
        ]}
      >
        <Box gridArea="TEMP1">
          <GaugeComponent topic={Topic.TEMP1} symbol="C" label="Ambient"/>
        </Box>
        <Box gridArea="TEMP2">
          <GaugeComponent topic={Topic.TEMP2} symbol="C" label="Socket"/>
        </Box>
        <Box gridArea="POWER">
          <GaugeComponent topic={Topic.POWER} symbol="W" label="Socket"/>
        </Box>
        <Box gridArea="HEADER" align="center">
          <Heading size="large">Dashboard</Heading>
        </Box>
      </Grid>
    </Grommet>
  );
};

export default App;
