import React from 'react'
import { Avatar, Box, Button, Circle, Flex, Image, Text } from '@chakra-ui/react'
import TooltipOverflow from '../TooltipOverflow'

type Props = {
  contact: Contact
  onClick: (contact: Contact) => void
  alreadyAdded: boolean
  focused?: boolean
}

const ContactSelector: React.FC<Props> = ({ contact, onClick, alreadyAdded, focused }) => {
  const onSelect = () => {
    if (!alreadyAdded) {
      onClick(contact)
    }
  }

  let backgroundColor = 'transparent'
  if (focused) {
    backgroundColor = 'blue.700'
  }

  return (
    <Button
      variant="transparent"
      width="100%"
      padding="8px 0"
      _hover={{ bg: 'blue.700' }}
      _focus={{ bg: 'blue.700' }}
      cursor={(alreadyAdded) ? 'default' : 'pointer'}
      bg={backgroundColor}
      onClick={onSelect}
      opacity={(alreadyAdded) ? 0.5 : 1}
    >
      <Flex
        height="36px"
        width="100%"
        align="center"
        padding="10px"
      >
        <Avatar
          name={contact.firstName}
          size="xs"
          w="26px"
          h="26px"
          bg="red.200"
          color="white"
          marginEnd="10px"
        />
        <Box overflow="hidden" flexGrow={1}>
          <TooltipOverflow
            label={
              <Box>
                <Text>{contact.firstName} {contact.lastName}</Text>
                <Text fontSize="12px">{contact.email}</Text>
              </Box>
            }
          >
            <Box>
              <Text
                fontSize="14px"
                marginBottom="2px"
                color="blue.100"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {contact.firstName} {contact.lastName}
              </Text>
              <Text fontSize="12px" color="blue.300" textOverflow="ellipsis" overflow="hidden">
                {contact.email}
              </Text>
            </Box>
          </TooltipOverflow>
        </Box>
        {alreadyAdded && (
          <Circle backgroundColor="blue.500" w="26px" h="26px">
            <Image src={`${process.env.PUBLIC_URL}/images/check.svg`} alt="Already added" w="18px" h="18px" />
          </Circle>
        )}
      </Flex>
    </Button>
  )
}

export default ContactSelector
