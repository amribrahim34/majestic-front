import { City } from './City'
import { District } from './District'

export interface BostaState {
  cities: City[]
  districts: District[]
  loading: boolean
  shippingCost: number
  error: string | null
}

export interface ShipmentParams {
  cod: number
  dropOffCity: string
  pickupCity: string
  size: 'Normal' | 'Light Bulky' | 'Heavy Bulky'
  type: 'SEND' | 'CASH_COLLECTION' | 'CUSTOMER_RETURN_PICKUP' | 'EXCHANGE' | 'SIGN_AND_RETURN'
}

export interface BostaResponse<T> {
  success: boolean
  message: string
  data: T
}
