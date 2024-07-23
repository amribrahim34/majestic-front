import { City } from './City'
import { District } from './District'

export interface BostaState {
  cities: City[]
  districts: District[]
  loading: boolean
  error: string | null
}
