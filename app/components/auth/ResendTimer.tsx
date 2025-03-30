import React from 'react'
import Countdown from 'react-countdown'

type PropsTypes = {
  setIsClickResend: (param: boolean) => void
  countdownReclickResend: number
}

const ResendTimer = ({ setIsClickResend, countdownReclickResend }: PropsTypes) => {
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (!completed) {
      return <span>{hours}:{minutes}:{seconds}</span>
    }
  }
  const handleComplete = () => {
    setIsClickResend(false)
    localStorage.setItem("isClickResend", JSON.stringify(false))
  }
  return <Countdown date={countdownReclickResend} renderer={renderer} onComplete={handleComplete} />
}

export default ResendTimer