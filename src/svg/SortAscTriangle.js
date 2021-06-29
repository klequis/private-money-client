import React from 'react'

const data = 'm 1024,832 q 0,-26 -19,-45 -19,-19 -45,-19 H 64 q -26,0 -45,19 -19,19 -19,45 0,26 19,45 l 448,448 q 19,19 45,19 26,0 45,-19 l 448,-448 q 19,-19 19,-45 z'
const id='d47864d5'

export const SortAscTriangle = ({
  width,
  fillColor='black'
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -256 1024 576"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      externalResourcesRequired="http://purl.org/dc/dcmitype/StillImage"
      style={{ width: width }}
    >
    <g
      transform="matrix(1,0,0,-1,0,1088)"
      id={id}>
      <path
        d={data}
        id="path3017"
        style={{ fill: fillColor }}
      />
    </g>
  </svg>
  )
}

