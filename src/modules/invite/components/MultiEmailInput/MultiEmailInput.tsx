import React, { ChangeEvent, RefObject, useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  Box,
  Text,
  Input,
  Flex,
  Wrap,
  useDimensions, useOutsideClick, Fade,
} from '@chakra-ui/react'
import { debounce } from 'lodash'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import { searchUser } from '../../services'
import { isEmail } from '../../utils/strings'
import ContactTag from './ContactTag'
import ContactSelector from './ContactSelector'
import EmailSelector from './EmailSelector'

type Props = {
  contacts: Contact[]
  setContacts: (emails: Contact[]) => void
  inputRef: RefObject<HTMLInputElement>
}

const MultiEmailInput: React.FC<Props> = ({ contacts, setContacts, inputRef }) => {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [matches, setMatches] = useState<User[]>([])
  const [inputWidth, setInputWidth] = useState(0)
  const [listIsVisible, setListIsVisible] = useState(false)
  const [currentHighlightedMatch, setCurrentHighlightedMatch] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const containerDimensions = useDimensions(containerRef)

  const inputSizerRef = useRef<HTMLDivElement>(null)

  const matchesListRef = useRef(null)

  useOutsideClick({
    ref: matchesListRef,
    handler: () => setListIsVisible(false),
  })

  useLayoutEffect(() => {
    setInputWidth(inputSizerRef.current?.clientWidth || 0)
  }, [value])


  const handleOnChange = async (value: string) => {
    try {
      const response = await searchUser(value)
      if (response && response.length > 0) {
        setMatches(response)
        setListIsVisible(true)
      } else if (isEmail(value)) {
        setListIsVisible(true)
      } else {
        setListIsVisible(false)
        setMatches([])
      }
    } catch (err) {
      // We do nothing user-wise here, as we can still add emails manually. It would not do much
      // to inform the user the API is KO except if this functionality is used regularly. In that
      // case we may want to display a message.

      // In a real project we would also log to a reporting tool like datadog.
    }
  }

  const debouncedSearch = useMemo(() => debounce(handleOnChange, 300), [])

  const prepareInput = () => {
    setValue('')
    setListIsVisible(false)
    inputRef.current?.focus()
    setCurrentHighlightedMatch(0)
  }

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value
    setValue(inputValue)
    setCurrentHighlightedMatch(0)
    debouncedSearch(inputValue)
  }

  React.useEffect(() => {
    return () => {
      // Cleanup if component is unmounted before the debounced callback has finished running.
      debouncedSearch.cancel()
    };
  }, [debouncedSearch])

  const onAddEmail = () => {
    const alreadyAdded = !!contacts.find((item) => item.email === value)
    if (!alreadyAdded) {
      setContacts([...contacts, {email: value}])
    }

    prepareInput()
  }

  const onAddContact = (contact: Contact) => {
    const alreadyAdded = !!contacts.find((item) => item.email === contact.email)
    if (!alreadyAdded) {
      setContacts([...contacts, contact])
    }

    prepareInput()
  }

  const onRemoveContact = (email: string) => {
    setContacts(contacts.filter((contact) => contact.email !== email))
    prepareInput()
  }

  const onContainerClick = () => inputRef.current?.focus()

  const onKeyEvent = (key: string) => {
    if (listIsVisible && matches.length > 0) {
      // User is selecting a contact.
      if (key === 'down') {
        setCurrentHighlightedMatch((currentHighlightedMatch + 1 === matches.length) ? 0 : currentHighlightedMatch + 1)
      } else if (key === 'up') {
        setCurrentHighlightedMatch((currentHighlightedMatch === 0) ? matches.length - 1 : currentHighlightedMatch - 1)
      } else if (key === 'enter') {
        onAddContact(matches[currentHighlightedMatch])
      }
    } else if (listIsVisible) {
      // User has entered a valid email.
      if (key === 'enter' || key === 'space') {
        onAddEmail()
      }
    }
  }

  return (
    <Flex
      ref={containerRef}
      border="1px solid"
      borderColor={(focused) ? 'blue.450' : 'blue.600'}
      bg="blue.900"
      borderRadius="10px"
      flexGrow={1}
      position="relative"
      padding="4px"
      onClick={onContainerClick}
    >
      <KeyboardEventHandler
        handleKeys={['up', 'down', 'enter', 'space']}
        onKeyEvent={onKeyEvent}
      >
        <Wrap spacing="4px">
          {contacts.map((contact) => (
            <ContactTag
              key={contact.email}
              contact={contact}
              onRemove={onRemoveContact}
              maxWidth={containerDimensions?.contentBox.width}
            />
          ))}
          <Box
            ref={inputSizerRef}
            position="absolute"
            top="-30"
            fontSize="13px"
            visibility="hidden"
          >
            {value}
          </Box>
          <Input
            ref={inputRef}
            type="text"
            color="gray.400"
            backgroundColor="transparent"
            display="inline-block"
            fontSize="12px"
            h="25px"
            minW={(value || contacts.length > 0) ? '30px' : containerDimensions?.contentBox.width}
            maxW={containerDimensions?.contentBox.width}
            w={`${inputWidth + 13}px`}
            padding="0 5px"
            border={0}
            _placeholder={{ color: 'gray.700', fontSize: '13px' }}
            _focus={{ border: 0 }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={onChange}
            value={value}
            placeholder={(contacts.length === 0) ? 'Search names or emails...' : ''}
            onKeyDown={(e) => {
              // Don't mess with the input caret when navigating the matches list.
              if (e.key === 'ArrowUp') {
                e.preventDefault()
              }
            }}
          />
        </Wrap>
        <Fade in={listIsVisible} unmountOnExit>
          <Box
            ref={matchesListRef}
            position="absolute"
            top="100%"
            left="0"
            backgroundColor="blue.1000"
            width="100%"
            borderRadius="10px"
            border="1px solid"
            borderColor="blue.700"
            marginTop="5px"
            padding="6px 0"
            shadow="0px 2px 6px 1px rgba(0,0,0,0.31)"
          >
            {matches.map((contact, index) => (
              <ContactSelector
                key={contact.email}
                contact={contact}
                onClick={onAddContact}
                focused={index === currentHighlightedMatch}
                alreadyAdded={!!contacts.find((item) => contact.email === item.email)}
              />
            ))}
            {matches.length === 0 && (
              <EmailSelector email={value} onClick={onAddEmail} focused />
            )}
          </Box>
        </Fade>
      </KeyboardEventHandler>
    </Flex>
  )
}

export default MultiEmailInput
