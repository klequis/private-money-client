import { current } from '@reduxjs/toolkit'
import { blue } from 'logger'

export const logFetchResults = (groupName, state, action) => {
    console.group(groupName)
    blue('state', current(state))
    blue('action', action)
    console.groupEnd()
}