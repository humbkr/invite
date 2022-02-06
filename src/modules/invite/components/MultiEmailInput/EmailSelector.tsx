import React from 'react'
import { Button, Flex, Image, Text } from '@chakra-ui/react'
import TooltipOverflow from '../TooltipOverflow'

type Props = {
  email: string
  onClick: () => void
  focused?: boolean
}

const EmailSelector: React.FC<Props> = ({ email, onClick, focused }) => (
  <Button
    variant="transparent"
    onClick={onClick}
    width="100%"
    padding="8px 0"
    _hover={{ bg: 'blue.700' }}
    _focus={{ bg: 'blue.700' }}
    backgroundColor={(focused) ? 'blue.700' : 'transparent'}
  >
    <Flex
      width="100%"
      height="36px"
      align="center"
      padding="10px"
    >
      <Image src={`${process.env.PUBLIC_URL}/images/envelope.svg`} alt="Envelope" marginEnd="10px" />
      <TooltipOverflow label={email}>
        <Text fontSize="13px" textOverflow="ellipsis" overflow="hidden">{email}</Text>
      </TooltipOverflow>
    </Flex>
  </Button>
)

export default EmailSelector
