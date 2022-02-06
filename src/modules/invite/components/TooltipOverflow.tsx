import React from 'react'
import { Tooltip, TooltipProps } from '@chakra-ui/react'

const TooltipOverflow: React.FC<TooltipProps> = (props) => (
  <Tooltip
    placement="bottom-start"
    openDelay={1000}
    {...props}
  >
    {props.children}
  </Tooltip>
)

export default TooltipOverflow
