import classes from './Bounce.module.scss'
import React from 'react'
import { BallPosition } from '../../../interface'

function Bounce(props: {
  BOUNCE_CONTAINER: React.LegacyRef<HTMLDivElement> | undefined
  BOUNCE_BALL: React.LegacyRef<HTMLDivElement> | undefined
  ballSize: number
  ballPosition: BallPosition
}) {
  return (
    <>
      <div className={classes.bounce} ref={props.BOUNCE_CONTAINER}>
        <div
          className={classes.ball}
          style={{
            width: props.ballSize,
            height: props.ballSize,
            left: props.ballPosition.x,
            top: props.ballPosition.y,
          }}
          ref={props.BOUNCE_BALL}
        >
          {}
        </div>
      </div>
    </>
  )
}
export default Bounce
