import { cleanup, render, screen } from '@testing-library/react'
import ContactTag from './ContactTag'
import userEvent from '@testing-library/user-event'

const mockFullContact: Contact = {
  id: '1',
  firstName: 'Robert',
  lastName: 'Robichet',
  email: 'robert.robichet@test.com',
}

const mockEmailContact: Contact = {
  email: 'test@test.com',
}

const mockOnRemove = jest.fn()

describe('ContactTag', () => {
  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('displays correctly for a full contact', () => {
    render(<ContactTag contact={mockFullContact} onRemove={mockOnRemove} />)

    expect(screen.getByText('R')).toBeInTheDocument()
    expect(screen.getByTestId('icon-avatar')).toBeInTheDocument()
    expect(screen.getByText('Robert Robichet')).toBeInTheDocument()
    expect(screen.getByAltText('Remove email')).toBeInTheDocument()

    expect(screen.queryByTestId('icon-envelope')).not.toBeInTheDocument()
    expect(screen.queryByText('robert.robichet@test.com')).not.toBeInTheDocument()
  })

  it('displays correctly for an email contact', () => {
    render(<ContactTag contact={mockEmailContact} onRemove={mockOnRemove} />)

    expect(screen.getByTestId('icon-envelope')).toBeInTheDocument()
    expect(screen.getByText('test@test.com')).toBeInTheDocument()
    expect(screen.getByAltText('Remove email')).toBeInTheDocument()

    expect(screen.queryByText('R')).not.toBeInTheDocument()
    expect(screen.queryByTestId('icon-avatar')).not.toBeInTheDocument()
  })

  it('calls the remove callback when remove icon is pressed', async () => {
    render(<ContactTag contact={mockFullContact} onRemove={mockOnRemove} />)

    await userEvent.click(screen.getByAltText('Remove email'))

    expect(mockOnRemove).toHaveBeenCalledWith('robert.robichet@test.com')
  })

  it('has a max-width of the desired value if passed in prop', async () => {
    render(<ContactTag contact={mockFullContact} onRemove={mockOnRemove} maxWidth={120} />)
    expect(screen.queryByTestId('contact-tag')).toHaveStyle('max-width: 120px')
  })
})
