export interface City {
  _id: string
  name: string
  nameAr: string
  code: string
  alias: string
  hub?: {
    _id: string
    name: string
  }
  sector: number
  pickupAvailability: boolean
  dropOffAvailability: boolean
  showAsDropOff: boolean
  showAsPickup: boolean
}
