import React from "react";
import { Grommet, Grid, Box, Heading } from "grommet";
import { MQTTGauge } from "./components/gauge.component";
import { Topic } from "./shared/mqtt.types";
import { MQTTSwitch } from "./components/switch.component";
import { Grow } from "grommet-icons";
import { MQTTActivity } from "./components/activity.component";
import { customTheme, DesktopGrid, AreaName, MaxTemp, MaxPower } from "./layout.conf";

const App: React.FC = () => {
  return (
    <Grommet full theme={customTheme} themeMode="dark">
      <Grid
        rows={DesktopGrid.rows}
        columns={DesktopGrid.columns}
        areas={DesktopGrid.areas}
      >
        <Box gridArea={AreaName.HEADER} align="center">
          <Box gridArea={AreaName.HEADER} align="center" direction="row" pad="small">
            <Grow />
            <Heading size="small">Home Dashboard</Heading>
          </Box>
        </Box>

        <Box gridArea={AreaName.TEMP1}>
          <MQTTGauge topic={Topic.TEMP1} symbol="C" label="Ambient" max={MaxTemp} />
        </Box>

        <Box gridArea={AreaName.TEMP2}>
          <MQTTGauge topic={Topic.TEMP2} symbol="C" label="Socket" max={MaxTemp} />
        </Box>

        <Box gridArea={AreaName.POWER}>
          <MQTTGauge topic={Topic.POWER} symbol="W" label="Socket" max={MaxPower} />
        </Box>

        <Box gridArea={AreaName.PUMPS_SWITCH}>
          <MQTTSwitch
            topic={Topic.PUMPS_SWITCH}
            feedBackTopic={Topic.PUMPS_STATUS}
            label="Pumps"
            confirmLabel="Start"
            safe={true}
          />
        </Box>

        <Box gridArea={AreaName.NETWORK}>
          <MQTTActivity topic={Topic.CONNECTED} />
        </Box>

        <Box gridArea={AreaName.PROCESS_SWITCH}>
          <MQTTSwitch
            topic={Topic.PROCESS_SWITCH}
            feedBackTopic={Topic.PROCESS_STATUS}
            label="Process"
            confirmLabel="Start"
            safe={true}
          />
        </Box>

        <Box gridArea={AreaName.HEADER_OUTDOOR} align="center">
            <Grow />
            <Heading size="small">Outdoor</Heading>
        </Box>

        <Box gridArea={AreaName.OUTDOOR_PUMP_SWITCH}>
          <MQTTSwitch
            topic={Topic.OUTDOOR_PUMPS_SWITCH}
            feedBackTopic={Topic.OUTDOOR_PUMPS_STATUS}
            label="Pump"
            confirmLabel="Start"
            safe={true}
            shellyMode={true}
          />
        </Box>

        <Box gridArea={AreaName.OUTDOOR_PUMP_POWER}>
          <MQTTGauge topic={Topic.OUTDOOR_POWER} symbol="W" label="Power" max={MaxPower} />
        </Box>

        <Box gridArea={AreaName.OUTDOOR_PUMP_TEMP}>
          <MQTTGauge topic={Topic.OUTDOOR_TEMP} symbol="C" label="Temp" max={MaxTemp} />
        </Box>

        <Box gridArea={AreaName.OUTDOOR_PUMP_ENERGY}>
          <MQTTGauge topic={Topic.OUTDOOR_ENERGY} symbol="W/m" label="Energy" max={MaxPower} />
        </Box>

      </Grid>
    </Grommet>
  );
};

export default App;
