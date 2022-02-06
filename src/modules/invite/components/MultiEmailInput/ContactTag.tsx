import React from 'react'
import { Box, Text, Image, Flex, Avatar } from '@chakra-ui/react'

type Props = {
  contact: Contact
  onRemove: (email: string) => void
  maxWidth?: number
}

const ContactTag: React.FC<Props> = ({ contact, onRemove, maxWidth }) => (
  <Box
    display="inline-block"
    margin="0 4px 4px 0"
    maxWidth={(maxWidth) ? `${maxWidth}px` : '100%'}
    data-testid="contact-tag"
  >
    <Flex
      border="1px solid"
      borderColor="red.200"
      color="red.200"
      borderRadius="5px"
      padding="4px 10px"
      align="center"
      justifyContent="center"
    >
      {!contact.id && (
        <Image src={`${process.env.PUBLIC_URL}/images/envelope.svg`} alt="Envelope" data-testid="icon-envelope" />
      )}
      {contact.id && (
       <Avatar
         name={contact.firstName}
         size="xs"
         w="15px"
         h="15px"
         bg="red.200"
         color="white"
         data-testid="icon-avatar"
       />
      )}
      <Text
        fontSize="11px"
        margin="-1px 10px 0"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {(!contact.id) ? contact.email : `${contact.firstName} ${contact.lastName}`}
      </Text>
      <button onClick={() => onRemove(contact.email)}>
        <Box width="14px" height="14px" marginTop="1px">
          <img src={`${process.env.PUBLIC_URL}/images/cross.svg`} alt="Remove email" />
        </Box>
      </button>
    </Flex>
  </Box>
)

export default ContactTag
