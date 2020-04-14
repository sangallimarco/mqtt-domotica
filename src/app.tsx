import React from "react";
import { FsmContainerComponent } from "./fms/fsm-container.component";
import { Grommet, Grid, Box, grommet } from "grommet";
import { deepMerge } from "grommet/utils";
import { TempComponent } from "./temp/temp.component";
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
        rows={["xxsmall", "flex"]}
        columns={["xsmall", "flex"]}
        gap="small"
        areas={[
          { name: "header", start: [0, 0], end: [1, 0] },
          { name: "nav", start: [0, 1], end: [0, 1] },
          { name: "main", start: [1, 1], end: [1, 1] },
        ]}
      >
        <Box gridArea="header">
          <TempComponent topic={Topic.TEMP} />
        </Box>
        <Box gridArea="nav">Nav</Box>
        <FsmContainerComponent label={"Container Label"} />
      </Grid>
    </Grommet>
  );
};

export default App;
