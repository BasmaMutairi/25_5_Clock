import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import './App.scss';
import { Break } from './components/Break';
import { Session } from './components/Session';
import { TimeLeft } from './components/TimeLeft'

function App() {
  const audioElement = useRef(null);
  /*Timer*/
  const [currentSessionType, setCurrentSessionType] = useState('Session');
  const [intervalId, setIntervalId] = useState(null);
  /*Session*/
  const [sessionLength, setSessionLength] = useState(60 * 25)
  /*Break*/
  const [breakLength, setBreakLength] = useState(300)
  const [ timeLeft , setTimeLeft ] = useState(sessionLength);

      //change timeLeft whenever sessionLength changes
      useEffect (() => {
        setTimeLeft(sessionLength)
    }, [sessionLength])


  const isStarted = intervalId !== null;
  const handleStartStopClick = () => {
      if (isStarted){
      //if we start
      //need to stop timer
      //use clearInterval
      clearInterval(intervalId);
      setIntervalId(null);
      }else{
      //if we stop
      //decrement timeLeft by one ebery second(1000 ms)
      //use setInterval 
      const newIntervalId = setInterval(() => {
          setTimeLeft(prevTimeLeft => {
              const newTimeLeft = prevTimeLeft - 1;
              if (newTimeLeft >= 0){
                  return newTimeLeft
              }
              //time left less than zero
              audioElement.current.play();
               //if session:
               if (currentSessionType === 'Session'){
                  //switch to break and setTimeLeft to breakSessionLength
                  setCurrentSessionType('Break');
                  return breakLength;
               }

               //if break:
               if (currentSessionType === 'Break'){
               //switch to sesion and setTimeLeft to sessionLength
               setCurrentSessionType('Session');
               return sessionLength;
              }
              });
           }, 1000);
           setIntervalId(newIntervalId);
      }
  };


  const decrementBreakLengthByOneMin = () => {
      const newBreakLength = breakLength - 60;
      if (newBreakLength > 0 ){
        setBreakLength(newBreakLength)
      }
  };
  const incrementBreakLengthByOneMin = () => {
    const newBreakLength =breakLength + 60;
    if (newBreakLength <= 60 * 60){
      setBreakLength(breakLength);
    }
  };
  const decrementSessionLengthByOneMin = () => {
      const newSessionLength = sessionLength - 60;
      if (newSessionLength > 0 ){
        setSessionLength(newSessionLength)
      }
  };
  const incrementSessionLengthByOneMin = () => {
    const newSessionLength = sessionLength + 60;
    if (newSessionLength <= 60 * 60){
      setSessionLength(sessionLength);
    }
  };

  const handleResetButtonClick = () => {
    //reset audio
    audioElement.current.load();
    //clear the timeout interval
    clearInterval(intervalId);
    // set the interval null
    setIntervalId(null);
    //set sessiontype to session
    setCurrentSessionType('Session');
    //reset the session length to 25mins
    setSessionLength(60 * 25);
    //reset the break length to 5mins
    setBreakLength(60 * 5);
    //reset inital session length timer to 25mins 
    setTimeLeft(60 * 25);
  }
  return (
    <div className='App'>
      <Break 
      breakLength = {breakLength}
      decrementBreakLengthByOneMin = {decrementBreakLengthByOneMin}
      incrementBreakLengthByOneMin = {incrementBreakLengthByOneMin}
      />
      <TimeLeft 
      breakLength = {breakLength}
      timerLabel = {currentSessionType}
      handleStartStopClick = {handleStartStopClick}
      sessionLength ={sessionLength}
      startStopButtonLabel = {isStarted ? 'Stop' : 'Start'}
      timeLeft = {timeLeft}
      />
      <Session
      sessionLength ={sessionLength}
      decrementSessionLengthByOneMin = {decrementSessionLengthByOneMin}
      incrementSessionLengthByOneMin = {incrementSessionLengthByOneMin}
      />
      <button id='reset' onClick={handleResetButtonClick}>Reset</button>
    <audio id='beep' ref={audioElement}>
      <source src="/music/womp-womp-1.mp3" type='audio/mpeg'/>
    </audio>
    </div>
  );
}

export default App;
