export type TourType = "all" | "single" | "multi" | "expensive" | "un-costly"

export interface ITourFilter {
  type: TourType,
  date?: Date
}

export interface TourFilter extends ITourFilter{
  label: string
}
