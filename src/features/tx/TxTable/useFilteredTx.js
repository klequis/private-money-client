import React from 'react'
import { useSelector } from 'react-redux'
import {
  selectFilteredTx
} from 'features/selectors'

// eslint-disable-next-line
import { blue, green, yellow, grpStart, grpEnd } from 'logger'


export const useFilteredTx = () => {

  const filteredTx = useSelector(selectFilteredTx)
  blue('filteredTx', filteredTx)
  return filteredTx
}