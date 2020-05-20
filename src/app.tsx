import { Grommet } from "grommet"
import React from "react"
import { ConfigForm } from "./config/config-form"
import { Dashboard } from "./dashboard"
import { customTheme } from "./layout.conf"
import { hasValidConfig } from "./shared/mqtt.config"


const App: React.FC = () => {
  const hasConfig = hasValidConfig()
  return (
    <Grommet full theme={customTheme} themeMode="dark">
      {hasConfig ? <Dashboard /> : <ConfigForm />}
    </Grommet>
  )
}

export default App
