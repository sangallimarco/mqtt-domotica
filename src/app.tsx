import { Grommet, Main } from "grommet"
import React, { ReactNode } from "react"
import { ConfigForm } from "./config/config-form"
import { customTheme } from "./layout.conf"
import { getConfigOptions } from "./shared/mqtt.config"

interface ResponsiveGridProps {
  children: ReactNode[]
}

const App: React.FC = () => {
  const hasConfig = getConfigOptions()
  return (
    <Grommet full theme={customTheme} themeMode="dark">
      {hasConfig ? <Main /> : <ConfigForm />}
    </Grommet>
  )
}

export default App
