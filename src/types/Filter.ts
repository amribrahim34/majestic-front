// @/types/Filter.ts
export interface BaseFilter {
  title: string
  isOpen: boolean
  key: string
  selected: any
}

export interface CheckboxFilterType extends BaseFilter {
  componentType: 'CheckboxFilter'
  options: Array<{ value: string | number; label: string }>
  displayLimit: number
  totalOptions: number
}

export interface RangeFilterType extends BaseFilter {
  componentType: 'RangeFilter'
  min: number
  max: number
  selected: [number, number]
}

export interface DateRangeFilterType extends BaseFilter {
  componentType: 'DateRangeFilter'
  min: number
  max: number
  selected: [number, number]
}

export type Filter = CheckboxFilterType | RangeFilterType | DateRangeFilterType
