import { ActionEdit } from './ActionEdit'
import { RenameDescription } from './RenameDescription'
import { Categorize } from './Categorize'
import { actionTypes } from 'features/rules'
import { txFields } from 'features/tx'

export const ActionComponent = ({ action }) => {
  if (action.field === txFields.description.name) {
    return (
      <RenameDescription
        key={action._id}
        actionId={action._id}
        minChars={3}
        maxWidth={10}
      />
    )
  } else if (action.actionType === actionTypes.categorize.name) {
    return <Categorize key={action._id} action={action} minChars={3} />
  } else {
    return <ActionEdit key={action._id} action={action} />
  }
}
