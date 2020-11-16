import { blue } from 'logger'

export class ApiError extends Error {
  constructor({status: statusNumber, statusText, resUrl='', errors=[]}, ...params) {
    super(...params)

    console.group('ApiError')
    blue('statusNumber', statusNumber)
    blue('statusText', statusText)
    blue('url', resUrl)
    blue('errors', errors)
    console.groupEnd()

    this.message = `${statusNumber} - ${statusText}`
    this.name = 'ApiError'
    // 
    this.statusNumber = statusNumber
    this.statusText = statusText
    this.url = resUrl
    this.validationErrors = errors
    // this.date = new Date()
  }
}