import React, { useState } from 'react'
import {
  Button,
  Flex,
  useDisclosure,
} from '@chakra-ui/react'
import InviteModal from './InviteModal'
import ContactDebug from '../components/ContactsDebug'

const Invite: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [displayInvitedContact, setDisplayInvitedContact] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const onInviteContacts = () => {
    onClose()
    setDisplayInvitedContact(true)
  }

  const onOpenModal = () => {
    setContacts([])
    setDisplayInvitedContact(false)
    onOpen()
  }

  const onCloseModal = () => {
    setContacts([])
    onClose()
  }

  return (
    <>
      <Flex align="center" justify="center" h="100vh">
        <Button onClick={onOpenModal}>Invite teammates</Button>
      </Flex>
      <InviteModal
        contacts={contacts}
        setContacts={setContacts}
        isOpen={isOpen}
        onClose={onCloseModal}
        onValidate={onInviteContacts}
      />
      {displayInvitedContact && <ContactDebug contacts={contacts} />}
    </>
  )
}

export default Invite
