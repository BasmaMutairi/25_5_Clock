import React from 'react'
import moment from 'moment'

export const Session = ({sessionLength,
    decrementSessionLengthByOneMin,
    incrementSessionLengthByOneMin}) => {
    const sessionLengthInMin = moment.duration(sessionLength, 's').asMinutes();
  return (
   <div>
    <p id="session-label">Session</p>
    <p id="session-length">{sessionLengthInMin}</p>
    <button id="session-decrement" onClick={decrementSessionLengthByOneMin}>-</button>
    <button id="session-increment" onClick={incrementSessionLengthByOneMin}>+</button>
    </div>
  )
}

export default Session;