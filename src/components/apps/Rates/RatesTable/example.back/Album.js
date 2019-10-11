import React from 'react'
import { createSelectable } from '../src'

const Album = ({
  selectableRef, selected, selecting, date, highlighted, currentMonth,
}) => {
  const highlight = highlighted ? 'highlighted' : null;
  const notSelectable = currentMonth ? null : 'not-selectable';
  const nodrop = currentMonth ? null : 'nodrop';
  return (
    <div
      ref={selectableRef}
      className={`
      ${notSelectable}
      item
      ${selecting && 'selecting'}
      ${selected && 'selected'}
      Rtable-cell
      ${highlight}
      ${nodrop}
    `}
    >
      <div className="date">{date}</div>
      <div className="price">Rp900.000</div>
    </div>
)};

export default createSelectable(Album)
