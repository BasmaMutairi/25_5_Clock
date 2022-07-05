import React from 'react'
import moment from 'moment';
import momentDurationFormat from 'moment-duration-format'

momentDurationFormat(moment)

export const TimeLeft = ({
  timerLabel,
  startStopButtonLabel, 
  handleStartStopClick, 
  timeLeft}) => {
    //MM:SS
    //25:00
    const formatedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', {trim: false} )
  return (
    <div>
        <p id='timer-label'>{timerLabel}</p>
        <p id="time-left">{formatedTimeLeft}</p>
        
        <button id="start_stop" onClick={handleStartStopClick}>{startStopButtonLabel}</button>

        </div>

  )
}
