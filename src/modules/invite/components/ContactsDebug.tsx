import React from 'react'
import { Box, Text } from '@chakra-ui/react'

type Props = {
  contacts: Contact[]
}

const ContactDebug: React.FC<Props> = ({ contacts }) => (
  <Box
    position="absolute"
    bottom={0}
    width="100%"
    bg="blue.300"
    padding="20px"
  >
    {contacts.map((contact, index) => (
      <Text key={contact.email} display="inline" color="white">
        {contact.id && `${contact.firstName} ${contact.lastName} (${contact.email})`}
        {!contact.id && contact.email}
        {index !== contacts.length - 1 && ', '}
      </Text>
    ))}
  </Box>
)

export default ContactDebug
