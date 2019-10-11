import React from 'react'
import { createSelectable } from '../src'
import Label from './Label'

const Album = ({
  selectableRef, selected, selecting, title, year,
}) => (
  <div
    ref={selectableRef}
    className={`
      ${(year === 10 || year === 27) && 'not-selectable'}
      item
      ${selecting && 'selecting'}
      ${selected && 'selected'}
    `}
  >
    <div className="tick">+</div>
    <h2>{title}</h2>
    <small>{year}</small>
    <Label selected={selected} selecting={selecting} />
  </div>
)

export default createSelectable(Album)
