export interface User {
  user_name: string
  email: string
  mobile: string
  password: string
  password_confirmation?: string
  // userType: 'student' | 'teacher' | 'admin' // Assuming these are the possible user types
  termsAccepted?: boolean
  token?: string
  university?: string
  fieldOfStudy?: string
  dateOfBirth?: string
}
