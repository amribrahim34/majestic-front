interface BaseFilter {
  title: string
  isOpen: boolean
  componentType: 'CheckboxFilter' | 'RangeFilter' | 'DateRangeFilter'
  selected: any
  key: string
}

export interface CheckboxFilterType extends BaseFilter {
  componentType: 'CheckboxFilter'
  options: { value: any; label: string }[]
}

export interface RangeFilterType extends BaseFilter {
  componentType: 'RangeFilter'
  min: number
  max: number
  options?: { value: any; label: string }[]
  selected: number[]
}

export interface DateRangeFilterType extends BaseFilter {
  componentType: 'DateRangeFilter'
  min: number
  max: number
  options?: { value: any; label: string }[]
  selected: number[]
}

export type Filter = CheckboxFilterType | RangeFilterType | DateRangeFilterType
