import { Box } from 'grommet/components/Box'
import React from 'react'

export interface CardProps {
  title: string
}

export const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <Box
      direction="column"
      justify="start"
      align="center"
      pad="medium"
      background="dark-1"
      gap="medium"
      round={true}
    >
      <h1>{title}</h1>
      {children}
    </Box>
  )
}
