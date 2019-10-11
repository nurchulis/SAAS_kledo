import React from 'react'

const Label = ({ selecting, selected }) => {
  
  return (
    <div>
            Selecting:
            {' '}
            <span>{`${selecting}`}</span>
            <br />
            Selected:
            {' '}
            <span>{`${selected}`}</span>
          </div>
        )
  };

export default Label
