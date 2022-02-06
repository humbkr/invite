export declare global {
  interface User {
    firstName: string
    lastName: string
    email: string
    id: string
  }

  // Contacts can just be an email.
  interface Contact extends User {
    firstName?: string
    lastName?: string
    email: string
    id?: string
  }
}
