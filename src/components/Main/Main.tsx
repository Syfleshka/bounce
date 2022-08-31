import classes from './Main.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Bounce from './Bounce/Bounce'
import Options from './Options/Options'
import Controls from './Controls/Controls'
import { BallPosition } from '../../interface'

function Main() {
  const [ballSize, setBallSize] = useState(60)
  const [gravity, setGravity] = useState(9.8)
  const [bounceForce, setBounceForce] = useState(0.85)
  const [startVelocity, setStartVelocity] = useState({
    x: 20,
    y: 0.1,
  })
  const [velocityLoss, setVelocityLoss] = useState({
    x: 0.02,
    y: 0.02,
  })
  const [startPosition, setStartPosition] = useState({
    x: 40,
    y: 40,
  })

  const [showOptions, setShowOptions] = useState(false)

  const BOUNCE_CONTAINER = useRef<HTMLDivElement>(null)
  const BOUNCE_BALL = useRef<HTMLDivElement>(null)

  const [intervalID, setIntervalID] = useState(0)
  const [savedParams, setSavedParams] = useState({
    ballPosition: structuredClone(startPosition),
    velocity: structuredClone(startVelocity),
  })

  let ballPosition = savedParams.ballPosition
  let velocity = savedParams.velocity

  const resetParams = () => {
    ballPosition = structuredClone(startPosition)
    velocity = structuredClone(startVelocity)
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
  const changeBallSize = (newBallSize: number) => {
    if (BOUNCE_BALL.current) {
      BOUNCE_BALL.current.style.width = newBallSize + 'px'
      BOUNCE_BALL.current.style.height = newBallSize + 'px'
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
      velocity.y = -velocity.y * bounceForce
    }
    if (
      ballPosition.y <= bounceContainer.height - ballSize &&
      ballPosition.y >= 0
    ) {
      const newBallPosition = ballPosition.y + gravity * velocity.y
      if (newBallPosition >= bounceContainer.height - ballSize) {
        ballPosition.y = bounceContainer.height - ballSize
        changeDirectionY()
      } else if (newBallPosition <= 0) {
        ballPosition.y = 0
        changeDirectionY()
      } else {
        ballPosition.y = newBallPosition
      }
      velocity.y < 1
        ? (velocity.y += velocityLoss.y)
        : (velocity.y -= velocityLoss.y)
      changeBallPosition(ballPosition)
    } else {
      velocity.y = -velocity.y * bounceForce
      ballPosition.y = ballPosition.y + gravity * velocity.y
      changeBallPosition(ballPosition)
    }

    // X Movement
    const changeDirectionX = () => {
      velocity.x = -velocity.x * bounceForce
    }
    if (
      ballPosition.x <= bounceContainer.width - ballSize &&
      ballPosition.x >= 0
    ) {
      const newBallPosition = ballPosition.x + velocity.x
      if (newBallPosition >= bounceContainer.width - ballSize) {
        ballPosition.x = bounceContainer.width - ballSize
        changeDirectionX()
      } else if (newBallPosition <= 0) {
        ballPosition.x = 0
        changeDirectionX()
      } else {
        ballPosition.x = newBallPosition
      }
      if (velocity.x >= 0) {
        velocity.x - velocityLoss.x > 0
          ? (velocity.x -= velocityLoss.x)
          : (velocity.x = 0)
      } else {
        velocity.x + velocityLoss.x < 0
          ? (velocity.x += velocityLoss.x)
          : (velocity.x = 0)
      }
      changeBallPosition(ballPosition)
    } else {
      velocity.x = -velocity.x * bounceForce
      ballPosition.x = ballPosition.x + velocity.x
      changeBallPosition(ballPosition)
    }
    // Stop if velocity too slow
    if (
      velocity.x === 0 &&
      velocity.y < 0.2 &&
      velocity.y > -0.2 &&
      ballPosition.x === bounceContainer.height - ballSize
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
    changeBallPosition(startPosition)
    resetParams()
    ballPosition = structuredClone(startPosition)
    clearInterval(intervalID)
  }

  useEffect(() => {
    changeBallPosition(startPosition)
    changeBallSize(ballSize)
  }, [
    ballSize,
    gravity,
    bounceForce,
    startVelocity,
    velocityLoss,
    startPosition,
  ])

  return (
    <main className={classes.main}>
      <Options
        showOptions={showOptions}
        setShowOptions={setShowOptions}
        resetSimulation={resetSimulation}
        ballSize={ballSize}
        setBallSize={setBallSize}
        gravity={gravity}
        setGravity={setGravity}
        bounceForce={bounceForce}
        setBounceForce={setBounceForce}
        startVelocity={startVelocity}
        setStartVelocity={setStartVelocity}
        velocityLoss={velocityLoss}
        setVelocityLoss={setVelocityLoss}
        startPosition={startPosition}
        setStartPosition={setStartPosition}
        BOUNCE_CONTAINER={BOUNCE_CONTAINER}
      />
      <Controls
        start={startSimulation}
        pause={pauseSimulation}
        reset={resetSimulation}
        options={pauseSimulation}
        showOptions={showOptions}
        setShowOptions={setShowOptions}
      />
      <Bounce
        BOUNCE_CONTAINER={BOUNCE_CONTAINER}
        BOUNCE_BALL={BOUNCE_BALL}
        ballSize={ballSize}
        ballPosition={ballPosition}
      />
    </main>
  )
}
export default Main
