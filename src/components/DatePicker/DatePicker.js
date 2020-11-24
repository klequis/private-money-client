// TODO: DatePicker hide show logic

import React, { useState } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { DateUtils } from 'react-day-picker'
import './style.css'
import dateFnsFormat from 'date-fns/format'
import dateFnsParse from 'date-fns/parse'
import styled from 'styled-components'
import classNames from 'classnames'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'

const parseDate = (str, format, locale) => {
  const parsed = dateFnsParse(str, format, new Date(), { locale })
  if (DateUtils.isDate(parsed)) {
    return parsed
  }
  return undefined
}

const formatDate = (date, format, locale) => {
  return dateFnsFormat(date, format, { locale })
}

const DatePickerDiv = styled.div``

export const DatePicker = React.memo(({ disabled, maxWidth, name, value }) => {
  // TODO: TMP
  // eslint-disable-next-line
  const [_selectedDay, _setSelectedDay] = useState(undefined)

  const FORMAT = 'MM/dd/yyyy'

  const _dayChange = (day) => {
    _setSelectedDay(day)
  }

  const _dayPickerHide = () => {
    // TODO:
  }
  const _dayPickerShow = () => {
    // TODO:
  }

  return (
    <DatePickerDiv>
      <DayPickerInput
        // disabled={disabled} TODO: not working
        inputProps={{
          readOnly: true,
          disabled: disabled,
          className: classNames('form-control', 'form-control-sm')
        }}
        hideOnDayClick={false}
        placeholder="mm/dd/yyyy"
        formatDate={formatDate}
        format={FORMAT}
        // maxWidth={maxWidth} TODO: will not work
        name={name}
        // on TODO: how & when to update caller ??
        parseDate={parseDate}
        value={value}
        //
        onDayChange={_dayChange}
        onDayPickerHide={_dayPickerHide}
        onDayPickerShow={_dayPickerShow}
      />
    </DatePickerDiv>
  )
})
