import { Form, FormField, TextInput, Box, Button } from 'grommet'
import React from 'react'
import { IClientOptions } from 'mqtt'
import { storeConfigOptions } from '../shared/mqtt.config'

export const ConfigForm: React.FC = () => {
  const [value, setValue] = React.useState<IClientOptions>({
    username: '',
    password: '',
  })

  const handleSubmit = () => {
    storeConfigOptions(value)
    window.location.reload()
  }

  const handleChange = (event: any) => {
    setValue({ ...value, ...event })
  }

  const { username, password } = value

  return (
    <Box justify="center" direction="row" pad="medium">
      <Box
        width="medium"
        gap="medium"
        background="light-1"
        round={true}
        pad="small"
      >
        <Form value={value} onChange={handleChange} onSubmit={handleSubmit}>
          <FormField name="username" label="User">
            <TextInput
              id="username"
              name="username"
              value={username}
              size="medium"
            />
          </FormField>
          <FormField name="password" label="Password">
            <TextInput
              id="password"
              name="password"
              type="password"
              value={password}
              size="medium"
            />
          </FormField>
          <Box direction="row" gap="medium" pad="small" justify="end">
            <Button type="submit" primary label="Submit" />
          </Box>
        </Form>
      </Box>
    </Box>
  )
}
