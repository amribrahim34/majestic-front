export interface User {
  user_name: string
  email: string
  mobile: string
  password: string
  password_confirmation?: string
  termsAccepted?: boolean
  token?: string
  university?: string
  fieldOfStudy?: string
  dateOfBirth?: string
  address?: string
  city?: string
  state_province?: string
  country?: string
  gender?: string
  avatar?: string
  birthday?: string
}

export interface UserDetails {
  id?: string
  user_name?: string
  email?: string
  email_verified_at?: string
  address?: string
  city?: string
  state_province?: string
  country?: string
  mobile?: string
  gender?: string
  avatar?: string
  birthday?: string
  last_login?: string
  created_at?: string
  updated_at?: string
}

export type EditableField = 'user_name' | 'email' | 'mobile' | 'address' | 'birthday'
