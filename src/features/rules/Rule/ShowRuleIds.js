import React from 'react'

export const ShowRuleIds = ({ ruleIds }) => {
  return (
    <ul>
      {
        ruleIds.map(id => <li>{id}</li>)
      }
    </ul>
  )
}