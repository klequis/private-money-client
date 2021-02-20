import * as R from 'ramda'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'

/* eslint-disable */
import { green } from 'logger'
/* eslint-enable */

const DescriptionTD = styled.td`
  border: 1px solid white;
  color: ${(props) => props.color};
`

const CategoryTD = styled.td`
  border: 1px solid white;
  color: ${(props) => props.color};
`

const RuleIdsDiv = styled.div`
  display: flex;
  align-items: center;
`

const WarnIconDiv = styled.div`
  margin-right: 0.25rem;
`

/*
    - isOriginalData: boolean 
      - true: the unmodified data
      - false: the data that can be modified by changes in actions
*/

export const TableRow = ({ data, isOriginalData, diffs }) => {
  const {
    date,
    description,
    amount,
    category1,
    category2,
    ruleIds,
    origDescription,
    type
  } = data

  const _changeColor = isOriginalData ? '#e74c3c' : '#00bc8c'

  return (
    <tr>
      <td>{date}</td>
      <DescriptionTD color={diffs.description ? _changeColor : 'inherit'}>
        {description}
      </DescriptionTD>
      <td>{amount}</td>
      <CategoryTD color={diffs.category1 ? _changeColor : 'inherit'}>
        {diffs.category1 ? (R.isEmpty(category1) ? '(blank)' : category1) : ''}
      </CategoryTD>
      <CategoryTD color={diffs.category2 ? _changeColor : 'inherit'}>
        {diffs.category2 ? (R.isEmpty(category2) ? '(blank)' : category2) : ''}
      </CategoryTD>
      <td>{origDescription}</td>
      <td>{type}</td>
      <td>
        {isNilOrEmpty(ruleIds)
          ? null
          : ruleIds.map((id) => (
              <RuleIdsDiv key={id}>
                <WarnIconDiv>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="red"
                    class="bi bi-exclamation-triangle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"></path>
                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"></path>
                  </svg>
                </WarnIconDiv>
                {id}
              </RuleIdsDiv>
            ))}
      </td>
    </tr>
  )
}

TableRow.propTypes = {
  data: PropTypes.object.isRequired,
  isOriginalData: PropTypes.bool.isRequired,
  diffs: PropTypes.object.isRequired
}
