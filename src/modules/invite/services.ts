/*
 * Mocked service layer
 */

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const ErrorRegex = /error/gi

const Users = [
  {
    firstName: 'Dave',
    lastName: 'Mustaine',
    id: (Math.random() * 1000).toString(),
    email: 'dave.mustaine@megadeth.com'
  },
  {
    firstName: 'Jerry',
    lastName: 'Cantrell',
    id: (Math.random() * 1000).toString(),
    email: 'jcantrell@aliceinchains.com'
  },
  {
    firstName: 'Layne',
    lastName: 'Staley',
    id: (Math.random() * 1000).toString(),
    email: 'lstaley@aliceinchains.com'
  },
  {
    firstName: 'Mike',
    lastName: 'Inez',
    id: (Math.random() * 1000).toString(),
    email: 'minez@aliceinchains.com'
  },
  {
    firstName: 'Mike',
    lastName: 'Starr',
    id: (Math.random() * 1000).toString(),
    email: 'mstarr@aliceinchains.com'
  },
  {
    firstName: 'Julien',
    lastName: 'Galletta',
    id: (Math.random() * 1000).toString(),
    email: 'julien@superkluster.com'
  },
  {
    firstName: 'Super long contact name to test text overflow on components',
    lastName: 'Test',
    id: (Math.random() * 1000).toString(),
    email: 'superlongcontactnametotesttextoverflowoncomponents@test.com'
  }
]

const normalize = (input: string): string => {
  return input.trim().toLowerCase()
}

export const searchUser = async (input: string): Promise<User[]> => {
  const normalized = normalize(input)

  await delay(200 + Math.random() * 200)

  if (normalized.match(ErrorRegex)) {
    throw new Error('Backend failed for some reasons.')
  }

  if (!normalized) {
    return []
  }

  // TODO: replace startsWith with includes and hightlight matching substrings in results.
  return Users.filter(({ firstName, lastName, email }) => {
    if (normalize(email).startsWith(normalized)) {
      return true
    }

    if (normalize(firstName).startsWith(normalized)) {
      return true
    }

    return normalize(lastName).startsWith(normalized)
  })
}
