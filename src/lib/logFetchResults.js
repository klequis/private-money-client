import { current } from '@reduxjs/toolkit'
import { blue } from 'logger'

/**
 * 
 * @param {string} groupName the name of the console group
 * @param {state} state the current state
 * @param {action} action  the current action
 */
export const logFetchResults = (groupName, state, action) => {
    console.group(groupName)
    blue('typeof state', typeof state)
    blue('state', current(state))
    blue('action', action)
    console.groupEnd()
}