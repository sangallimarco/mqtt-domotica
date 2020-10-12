import { Box, Text } from 'grommet'
import React from 'react'

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
      gap="small"
      round={true}
      margin="small"
    >
      <Box
        fill="horizontal"
        border={{ color: 'light-4', side: 'bottom' }}
        pad={{ bottom: 'small' }}
      >
        <Text color="dark-2" size="large">
          {title}
        </Text>
      </Box>
      {children}
    </Box>
  )
}
