import { cleanup } from '@testing-library/react'
import { isEmail } from './strings'

describe('invite utils - email', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe('isValidEmail', () => {
    it('validate emails correctly', () => {
      expect(isEmail('test@test.com')).toBeTruthy()
      expect(isEmail('test+variant@test.com')).toBeTruthy()

      expect(isEmail('test@')).toBeFalsy()
      expect(isEmail('test@test')).toBeFalsy()
      expect(isEmail('test@.com')).toBeFalsy()
    })
  })
})
