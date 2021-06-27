import React, { useEffect } from 'react'
import { acctFetch } from 'features/acct'
import { selectAcctItems } from 'features/selectors'

/* eslint-disable */
import { green, purple, red } from 'logger'
import { RenderCount } from 'components/RenderCount'
import { selectRequestStatus } from 'features/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { wdAcct } from 'appWords'
/* eslint-enable */

/*
    - get all the accounts
    - map accounts to dropzones
    - enjoy
*/
export const Upload = () => {
  const accounts = useSelector(selectAcctItems)

  // const _dispatch = useDispatch()
  // const _status = useSelector((state) =>
  //   selectRequestStatus([wdAcct], state)
  // )
  // console.log('accounts', accounts)
  return 'Upload Component'
}
