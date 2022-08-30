import classes from './Bounce.module.scss'
import React, { useRef, useState } from 'react'

interface BallPosition {
  x: number
  y: number
}
interface Velocity {
  x: number
  y: number
}

function Bounce(props: {
  ballSize: number
  gravity: number
  bounceForce: number
  velocity: Velocity
  ballPosition: BallPosition
}) {
  const BOUNCE_CONTAINER = useRef<HTMLDivElement>(null)
  const BOUNCE_BALL = useRef<HTMLDivElement>(null)

  const [intervalID, setIntervalID] = useState(0)
  const [savedParams, setSavedParams] = useState({
    ballPosition: structuredClone(props.ballPosition),
    velocity: structuredClone(props.velocity),
  })

  let ballPosition = savedParams.ballPosition
  let velocity = savedParams.velocity

  const resetParams = () => {
    ballPosition = structuredClone(props.ballPosition)
    velocity = structuredClone(props.velocity)
    setSavedParams((prevValue) => ({ ...prevValue, ballPosition, velocity }))
  }
  const saveParams = () => {
    setSavedParams((prevValue) => ({ ...prevValue, ballPosition, velocity }))
  }

  const changeBallPosition = (newBallPosition: BallPosition) => {
    if (BOUNCE_BALL.current) {
      BOUNCE_BALL.current.style.top = newBallPosition.y + 'px'
      BOUNCE_BALL.current.style.left = newBallPosition.x + 'px'
    }
  }

  const simulation = (interval: number) => {
    const bounceContainer = {
      element: BOUNCE_CONTAINER.current,
      width: BOUNCE_CONTAINER.current?.offsetWidth || 0,
      height: BOUNCE_CONTAINER.current?.offsetHeight || 0,
    }

    // Y movement
    const changeDirectionY = () => {
      velocity.y = -velocity.y * props.bounceForce
      if (velocity.y > 0.2 || velocity.y < -0.2) {
        BOUNCE_BALL.current?.classList.add(classes.ballSqueezeY)
        setTimeout(() => {
          BOUNCE_BALL.current?.classList.remove(classes.ballSqueezeY)
        }, 500)
      }
    }
    if (
      ballPosition.y <= bounceContainer.height - props.ballSize &&
      ballPosition.y >= 0
    ) {
      const newBallPosition = ballPosition.y + props.gravity * velocity.y
      if (newBallPosition >= bounceContainer.height - props.ballSize) {
        ballPosition.y = bounceContainer.height - props.ballSize
        changeDirectionY()
      } else if (newBallPosition <= 0) {
        ballPosition.y = 0
        changeDirectionY()
      } else {
        ballPosition.y = newBallPosition
      }
      velocity.y < 1 ? (velocity.y += 0.02) : (velocity.y -= 0.02)
      changeBallPosition(ballPosition)
    } else {
      velocity.y = -velocity.y * props.bounceForce
      ballPosition.y = ballPosition.y + props.gravity * velocity.y
      changeBallPosition(ballPosition)
    }

    // X Movement
    const changeDirectionX = () => {
      velocity.x = -velocity.x * props.bounceForce
      if (velocity.x > 0.2 || velocity.x < -0.2) {
        BOUNCE_BALL.current?.classList.add(classes.ballSqueezeX)
        setTimeout(() => {
          BOUNCE_BALL.current?.classList.remove(classes.ballSqueezeX)
        }, 500)
      }
    }
    if (
      ballPosition.x <= bounceContainer.width - props.ballSize &&
      ballPosition.x >= 0
    ) {
      const newBallPosition = ballPosition.x + velocity.x
      if (newBallPosition >= bounceContainer.width - props.ballSize) {
        ballPosition.x = bounceContainer.width - props.ballSize
        changeDirectionX()
      } else if (newBallPosition <= 0) {
        ballPosition.x = 0
        changeDirectionX()
      } else {
        ballPosition.x = newBallPosition
      }
      velocity.x >= 0 ? (velocity.x -= 0.02) : (velocity.x += 0.02)
      changeBallPosition(ballPosition)
    } else {
      velocity.x = -velocity.x * props.bounceForce
      ballPosition.x = ballPosition.x + velocity.x
      changeBallPosition(ballPosition)
    }
    // Stop if velocity too slow
    if (
      velocity.x < 0.2 &&
      velocity.x > -0.2 &&
      velocity.y < 0.2 &&
      velocity.y > -0.2
    ) {
      clearInterval(interval)
    }
  }

  const startSimulation = () => {
    saveParams()
    clearInterval(intervalID)
    const interval = window.setInterval(() => simulation(interval), 1000 / 60)
    setIntervalID(interval)
  }
  const pauseSimulation = () => {
    saveParams()
    clearInterval(intervalID)
  }
  const resetSimulation = () => {
    changeBallPosition(props.ballPosition)
    resetParams()
    ballPosition = structuredClone(props.ballPosition)
    clearInterval(intervalID)
  }

  return (
    <>
      <div className={classes.controls}>
        <button className={classes.button} onClick={startSimulation}>
          Start
        </button>
        <button className={classes.button} onClick={pauseSimulation}>
          Pause
        </button>
        <button className={classes.button} onClick={resetSimulation}>
          Reset
        </button>
      </div>
      <div className={classes.bounce} ref={BOUNCE_CONTAINER}>
        <div
          className={classes.ball}
          style={{
            width: props.ballSize,
            height: props.ballSize,
            left: ballPosition.x,
            top: ballPosition.y,
          }}
          ref={BOUNCE_BALL}
        >
          {}
        </div>
      </div>
    </>
  )
}
export default Bounce
