import React, { useRef } from 'react'
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Modal, ModalCloseButton, ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import MultiEmailInput from '../components/MultiEmailInput/MultiEmailInput'

type Props = {
  contacts: Contact[]
  setContacts: (emails: Contact[]) => void
  isOpen: boolean
  onClose: () => void
  onValidate: () => void
}

const InviteModal: React.FC<Props> = ({ contacts, setContacts, isOpen, onClose, onValidate }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      initialFocusRef={inputRef}
      closeOnOverlayClick={false}
    >
      <ModalOverlay backgroundColor="rgba(0,0,0,.1)" />
      <ModalContent maxW="528px" bg="transparent" shadow="none">
        <Box
          maxW="528px"
          bg="blue.800"
          color="white"
          rounded="10px"
          padding={['24px', '64px']}
        >
          <ModalCloseButton marginEnd="-5px" _hover={{ bg: 'blue.600' }}/>
          <Center mb="32px">
            <Heading as="h1" color="blue.100" fontSize="24px" fontWeight="400">
              Invite members
            </Heading>
          </Center>
          <Text fontSize="15px" color="blue.100" mb="10px" fontWeight="400">
            Email invite
          </Text>
          <Text fontSize="15px" color="blue.300" fontWeight="400">
            Send members an email invitation to join this workspace
          </Text>
          <Flex marginTop="24px" direction={['column', 'row']} align="flex-start">
            <MultiEmailInput contacts={contacts} setContacts={setContacts} inputRef={inputRef} />
            <Flex marginStart={[0, '16px']} marginTop={['16px', 0]} justifyContent="center">
              <Button
                disabled={contacts.length === 0}
                onClick={onValidate}
                w={['100px', 'auto']}
              >
                Invite
              </Button>
            </Flex>
          </Flex>
        </Box>
      </ModalContent>
    </Modal>
  )
}

export default InviteModal
