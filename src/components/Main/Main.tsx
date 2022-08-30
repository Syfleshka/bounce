import classes from './Main.module.scss'
import React, { useState } from 'react'
import Bounce from './Bounce/Bounce'

function Main() {
  const [ballSize, setBallSize] = useState(60)
  const [gravity, setGravity] = useState(9.8)
  const [bounceForce, setBounceForce] = useState(0.85)
  const [velocity, setVelocity] = useState({
    x: 20,
    y: 0.1,
  })
  const [ballPosition, setBallPosition] = useState({
    x: 40,
    y: 40,
  })

  return (
    <main className={classes.main}>
      <Bounce
        ballSize={ballSize}
        gravity={gravity}
        bounceForce={bounceForce}
        velocity={velocity}
        ballPosition={ballPosition}
      />
    </main>
  )
}
export default Main
