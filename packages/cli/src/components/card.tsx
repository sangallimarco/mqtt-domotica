import { Box, Text } from 'grommet'
import React from 'react'
import styled from 'styled-components'

export interface CardProps {
  title: string
}

export const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <Box
      direction="column"
      justify="start"
      align="start"
      pad="medium"
      background="light-2"
      gap="medium"
      round={true}
      margin="small"
    >
      <Text color="dark-3" size="large">
        {title}
      </Text>
      {children}
    </Box>
  )
}
