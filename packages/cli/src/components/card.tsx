import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Text } from 'grommet'
import React from 'react'
import styled from 'styled-components'
import { themeColors } from '../layout.conf'

const CardHeader = styled.div`
  display: grid;
  grid-template-columns: 3em auto;
  align-items: center;
  color: ${themeColors['dark-3']};
  font-weight: 500;
`

export interface CardIcon {
  title: string
  icon: IconProp
}

export interface CardProps {
  title: string
  icon: IconProp
}

export const Card: React.FC<CardProps> = ({ title, children, icon }) => {
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
        <CardHeader>
          <FontAwesomeIcon icon={icon} size="2x" />
          <Text size="xlarge">{title}</Text>
        </CardHeader>
      </Box>
      {children}
    </Box>
  )
}
