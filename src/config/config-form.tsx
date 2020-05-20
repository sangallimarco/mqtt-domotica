import { Form, FormField, TextInput, Box, Button } from "grommet"
import React from "react"
import { IClientOptions } from "mqtt"
import { storeConfigOptions } from "../shared/mqtt.config"

export const ConfigForm: React.FC = () => {
  const [value, setValue] = React.useState<IClientOptions>({})

  const handleSubmit = () => {
    storeConfigOptions(value)
    window.location.reload()
  }

  const handleChange = (event: any) => {
    setValue({ ...value, ...event })
  }

  return (
    <Box justify="center" direction="row" pad="medium">
      <Box width="medium">
        <Form value={value} onChange={handleChange} onSubmit={handleSubmit}>
          <FormField name="username" label="User">
            <TextInput id="username" name="username" />
          </FormField>
          <FormField name="password" label="Password">
            <TextInput id="password" name="password" type="password" />
          </FormField>
          <Box direction="row" gap="medium">
            <Button type="submit" primary label="Submit" />
          </Box>
        </Form>
      </Box>
    </Box>
  )
}
