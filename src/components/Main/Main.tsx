import classes from './Main.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Bounce from './Bounce/Bounce'
import Options from './Options/Options'
import Controls from './Controls/Controls'
import { BallPosition, SavedParams } from '../../interface'

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
  const [fps, setFps] = useState(60)

  const [showOptions, setShowOptions] = useState(false)

  const BOUNCE_CONTAINER = useRef<HTMLDivElement>(null)
  const BOUNCE_BALL = useRef<HTMLDivElement>(null)

  const [intervalID, setIntervalID] = useState(0)

  const calcSaved: SavedParams = {
    ballPosition: {
      x: startPosition.x,
      y: startPosition.y,
    },
    velocity: {
      x: startVelocity.x * (60 / fps),
      y: startVelocity.y * (60 / fps),
    },
    gravity: gravity,
    velocityLoss: {
      x: velocityLoss.x * (60 / fps) * (60 / fps),
      y: velocityLoss.y * (60 / fps) * (60 / fps),
    },
  }
  const [saved, setSaved] = useState<SavedParams>(calcSaved)

  const resetParams = () => {
    setSaved((prevValue) => ({
      ...prevValue,
      ...calcSaved,
    }))
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

  const simulation = (props: { interval: number }) => {
    const bounceContainer = {
      element: BOUNCE_CONTAINER.current,
      width: BOUNCE_CONTAINER.current?.offsetWidth || 0,
      height: BOUNCE_CONTAINER.current?.offsetHeight || 0,
    }

    // Y movement
    const changeDirectionY = () => {
      saved.velocity.y = -saved.velocity.y * bounceForce
    }
    if (
      saved.ballPosition.y <= bounceContainer.height - ballSize &&
      saved.ballPosition.y >= 0
    ) {
      const newBallPosition =
        saved.ballPosition.y + saved.gravity * saved.velocity.y
      if (newBallPosition >= bounceContainer.height - ballSize) {
        const diff = newBallPosition - bounceContainer.height + ballSize
        saved.ballPosition.y = bounceContainer.height - diff - ballSize
        changeDirectionY()
      } else if (newBallPosition <= 0) {
        saved.ballPosition.y = -newBallPosition
        changeDirectionY()
      } else {
        saved.ballPosition.y = newBallPosition
      }

      saved.velocity.y += saved.velocityLoss.y
      changeBallPosition(saved.ballPosition)
    } else {
      saved.velocity.y = -saved.velocity.y * bounceForce
      saved.ballPosition.y =
        saved.ballPosition.y + saved.gravity * saved.velocity.y
      changeBallPosition(saved.ballPosition)
    }

    // X Movement
    const changeDirectionX = () => {
      saved.velocity.x = -saved.velocity.x * bounceForce
    }
    if (
      saved.ballPosition.x <= bounceContainer.width - ballSize &&
      saved.ballPosition.x >= 0
    ) {
      const newBallPosition = saved.ballPosition.x + saved.velocity.x
      if (newBallPosition >= bounceContainer.width - ballSize) {
        const diff = newBallPosition - bounceContainer.width + ballSize
        saved.ballPosition.x = bounceContainer.width - diff - ballSize
        changeDirectionX()
      } else if (newBallPosition <= 0) {
        saved.ballPosition.x = -newBallPosition
        changeDirectionX()
      } else {
        saved.ballPosition.x = newBallPosition
      }
      if (saved.velocity.x >= 0) {
        saved.velocity.x - saved.velocityLoss.x > 0
          ? (saved.velocity.x -= saved.velocityLoss.x)
          : (saved.velocity.x = 0)
      } else {
        saved.velocity.x + saved.velocityLoss.x < 0
          ? (saved.velocity.x += saved.velocityLoss.x)
          : (saved.velocity.x = 0)
      }
      changeBallPosition(saved.ballPosition)
    } else {
      saved.velocity.x = -saved.velocity.x * bounceForce
      saved.ballPosition.x = saved.ballPosition.x + saved.velocity.x
      changeBallPosition(saved.ballPosition)
    }

    // Stop if saved.velocity too slow
    if (
      saved.velocity.x === 0 &&
      saved.velocity.y < 0.1 &&
      saved.velocity.y > -0.1 &&
      saved.ballPosition.y === bounceContainer.height - ballSize
    ) {
      clearInterval(props.interval)
    }
  }

  const startSimulation = () => {
    clearInterval(intervalID)
    const interval = window.setInterval(
      () => simulation({ interval }),
      1000 / fps
    )
    setIntervalID(interval)
  }
  const pauseSimulation = () => {
    clearInterval(intervalID)
  }
  const resetSimulation = () => {
    changeBallPosition(startPosition)
    resetParams()
    saved.ballPosition = structuredClone(startPosition)
    clearInterval(intervalID)
  }

  useEffect(() => {
    resetParams()
    changeBallPosition(startPosition)
    changeBallSize(ballSize)
    // todo fix deps array
    // eslint-disable-next-line
  }, [
    ballSize,
    gravity,
    bounceForce,
    startVelocity,
    velocityLoss,
    startPosition,
    fps,
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
        fps={fps}
        setFps={setFps}
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
        ballPosition={saved.ballPosition}
      />
    </main>
  )
}
export default Main
