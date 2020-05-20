import { Form, FormField, TextInput, Box, Button } from "grommet";
import React from "react";
import { IClientOptions } from "mqtt";
import { storeConfigOptions } from "../shared/mqtt.config";

export const ConfigForm: React.FC = () => {

  const [value, setValue] = React.useState<IClientOptions>({});

  const handleSubmit = () => {
    storeConfigOptions(value);
    window.location.reload();
  }

  const handleChange = (event:any) => {
    console.log(event)
    setValue({...value, ...event})
  }

  return (
    <Form
      value={value}
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <FormField name="user" label="User">
        <TextInput id="user" name="user" />
      </FormField>
      <FormField name="password" label="Password">
        <TextInput id="password" name="password" type="password" />
      </FormField>
      <Box direction="row" gap="medium">
        <Button type="submit" primary label="Submit" />
        <Button type="reset" label="Reset" />
      </Box>
    </Form>
  );
};
