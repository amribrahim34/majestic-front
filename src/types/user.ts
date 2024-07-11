export interface User {
  user_name: string
  email: string
  mobileNumber: string
  password: string
  userType: 'student' | 'teacher' | 'admin' // Assuming these are the possible user types
  termsAccepted: boolean
  token?: string
}
