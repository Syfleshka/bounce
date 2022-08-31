import classes from './Controls.module.scss'
import Button from '../../generic/Button/Button'
import React from 'react'

function Controls(props: {
  start: React.MouseEventHandler<HTMLButtonElement> | undefined
  pause: React.MouseEventHandler<HTMLButtonElement> | undefined
  reset: React.MouseEventHandler<HTMLButtonElement> | undefined
  options: Function
  setShowOptions: Function
  showOptions: boolean
}) {
  const handleOptions = () => {
    props.options()
    props.setShowOptions(!props.showOptions)
  }
  return (
    <div className={classes.controls}>
      <div className={classes.actions}>
        <Button onClick={props.start}>Start</Button>
        <Button onClick={props.pause}>Pause</Button>
        <Button onClick={props.reset}>Reset</Button>
      </div>
      <div className={classes.options}>
        <Button onClick={handleOptions}>Options</Button>
      </div>
    </div>
  )
}

export default Controls
