import React from 'react'
import TextEdit from 'components/TextEdit'

const Categorize = ({ category1 = '', category2 = ''}) => {
  // const { category1, category2 } = action

  const handleChange = () => {
    // TODO: tmp function
  }

  return (
    <>
      <TextEdit
        id={`category1`}
        name="category1"
        label="category1"
        value={category1}
        onChange={handleChange}
        placeholder='category1'
      />
      <TextEdit
        id={`category2`}
        name="category2"
        label="category2"
        value={category2}
        placeholder='category2'
        onChange={handleChange}
      />
    </>
  )
}

export default Categorize
