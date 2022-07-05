import React from 'react'
import moment from 'moment'

export const Break = ({breakLength,
    decrementBreakLengthByOneMin,
    incrementBreakLengthByOneMin}) => {
    const breakLengthInMin = moment.duration(breakLength, 's').asMinutes();
  return (
   <div>
    <p id='break-label'>Break</p>
    <p id="break-length">{breakLengthInMin}</p>
    <button id="break-decrement" onClick={decrementBreakLengthByOneMin}>-</button>
    <button id="break-increment" onClick={incrementBreakLengthByOneMin}>+</button>
    </div>
  )
}

export default Break;