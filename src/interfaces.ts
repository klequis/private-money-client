export interface ICriterion {
  _id: string,
  field: string,
  operation: string,
  value: string,
  active: boolean
}