export const ShowRuleIds = ({ ruleIds }) => {
  return (
    <ul>
      {ruleIds.map((id) => (
        <li>{id}</li>
      ))}
    </ul>
  )
}
