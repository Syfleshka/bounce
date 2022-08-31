import classes from './Options.module.scss'
import React, { RefObject, useLayoutEffect, useState } from 'react'
import Button from '../../generic/Button/Button'
import InputNumber from '../../generic/InputNumber/InputNumber'
import { BallPosition, Velocity } from '../../../interface'

function Options(props: {
  showOptions: boolean
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>
  ballSize: number
  setBallSize: React.Dispatch<React.SetStateAction<number>>
  gravity: number
  setGravity: React.Dispatch<React.SetStateAction<number>>
  bounceForce: number
  setBounceForce: React.Dispatch<React.SetStateAction<number>>
  startVelocity: Velocity
  setStartVelocity: React.Dispatch<React.SetStateAction<Velocity>>
  velocityLoss: Velocity
  setVelocityLoss: React.Dispatch<React.SetStateAction<Velocity>>
  startPosition: BallPosition
  setStartPosition: React.Dispatch<React.SetStateAction<BallPosition>>
  BOUNCE_CONTAINER: RefObject<HTMLDivElement> | undefined
  resetSimulation: Function
}) {
  const [ballSize, setBallSize] = useState(props.ballSize)
  const [gravity, setGravity] = useState(props.gravity)
  const [bounceForce, setBounceForce] = useState(props.bounceForce)
  const [startVelocity, setStartVelocity] = useState(props.startVelocity)
  const [velocityLoss, setVelocityLoss] = useState(props.velocityLoss)
  const [startPosition, setStartPosition] = useState(props.startPosition)

  const setStartVelocityX = (value: number) => {
    setStartVelocity((prevValue) => ({
      ...prevValue,
      x: value,
    }))
  }
  const setStartVelocityY = (value: number) => {
    setStartVelocity((prevValue) => ({
      ...prevValue,
      y: value,
    }))
  }
  const setVelocityLossX = (value: number) => {
    setVelocityLoss((prevValue) => ({
      ...prevValue,
      x: value,
    }))
  }
  const setVelocityLossY = (value: number) => {
    setVelocityLoss((prevValue) => ({
      ...prevValue,
      y: value,
    }))
  }

  const setStartPositionX = (value: number) => {
    setStartPosition((prevValue) => ({
      ...prevValue,
      x: value,
    }))
  }
  const setStartPositionY = (value: number) => {
    setStartPosition((prevValue) => ({
      ...prevValue,
      y: value,
    }))
  }

  const [bounceContainer, setBounceContainer] = useState({
    x: 0,
    y: 0,
  })

  useLayoutEffect(() => {
    const updateBounceContainer = () => {
      if (props.BOUNCE_CONTAINER?.current !== null) {
        setBounceContainer((prevValue) => ({
          ...prevValue,
          x:
            (props.BOUNCE_CONTAINER?.current as HTMLDivElement).offsetWidth ||
            0,
          y:
            (props.BOUNCE_CONTAINER?.current as HTMLDivElement).offsetHeight ||
            0,
        }))
      }
    }
    window.addEventListener('resize', updateBounceContainer)
    updateBounceContainer()
    return () => window.removeEventListener('resize', updateBounceContainer)
  }, [props.BOUNCE_CONTAINER])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.setBallSize(ballSize)
    props.setGravity(gravity)
    props.setBounceForce(bounceForce)
    props.setStartVelocity(startVelocity)
    props.setVelocityLoss(velocityLoss)
    props.setStartPosition(startPosition)
    props.setShowOptions(false)
    props.resetSimulation()
  }
  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    props.setShowOptions(false)
  }
  return (
    <div
      className={`${classes.options} ${
        props.showOptions ? null : classes.disabled
      }`}
    >
      <h2 className={classes.header}>Options</h2>
      <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={classes.optionList}>
          <InputNumber
            helperText={`Horizontal. min = 0, max = ${
              bounceContainer.x - ballSize
            }, default = 0.02`}
            id="startPositionX"
            name="startPositionX"
            value={startPosition.x}
            min={0}
            max={bounceContainer.x - ballSize}
            step={1}
            onChange={setStartPositionX}
          >
            Start position X
          </InputNumber>
          <InputNumber
            helperText={`Vertical. min = 0, max = ${
              bounceContainer.y - ballSize
            }, default = 0.02`}
            id="startPositionY"
            name="startPositionY"
            value={startPosition.y}
            min={0}
            max={bounceContainer.y - ballSize}
            step={1}
            onChange={setStartPositionY}
          >
            Start position Y
          </InputNumber>
          <InputNumber
            helperText="min = 20, max = 100, default = 60"
            id="ballSize"
            name="ballSize"
            value={ballSize}
            min={20}
            max={100}
            step={1}
            onChange={setBallSize}
          >
            Ball Diameter
          </InputNumber>
          <InputNumber
            helperText="min = 1, max = 100, default = 9.8"
            id="gravity"
            name="gravity"
            value={gravity}
            min={1}
            max={100}
            step={0.1}
            onChange={setGravity}
          >
            Gravity force
          </InputNumber>
          <InputNumber
            helperText="Sets horizontal velocity. min = 0, max = 60, default = 20"
            id="startVelocityX"
            name="startVelocityX"
            value={startVelocity.x}
            min={0}
            max={60}
            step={0.1}
            onChange={setStartVelocityX}
          >
            Start velocity X
          </InputNumber>
          <InputNumber
            helperText="Sets vertical velocity. min = 0, max = 10, default = 0.2"
            id="startVelocityY"
            name="startVelocityY"
            value={startVelocity.y}
            min={0}
            max={10}
            step={0.01}
            onChange={setStartVelocityY}
          >
            Start velocity Y
          </InputNumber>
          <InputNumber
            helperText="Horizontal. min = 0, max = 10, default = 0.02"
            id="velocityLossX"
            name="velocityLossX"
            value={velocityLoss.x}
            min={0}
            max={10}
            step={0.01}
            onChange={setVelocityLossX}
          >
            Velocity loss X
          </InputNumber>
          <InputNumber
            helperText="Vertical. min = 0, max = 10, default = 0.02"
            id="velocityLossY"
            name="velocityLossY"
            value={velocityLoss.y}
            min={0}
            max={10}
            step={0.01}
            onChange={setVelocityLossY}
          >
            Velocity loss Y
          </InputNumber>
          <InputNumber
            helperText="min = 0.01, max = 1, default = 0.85"
            id="bounceForce"
            name="bounceForce"
            value={bounceForce}
            min={0.01}
            max={1}
            step={0.01}
            onChange={setBounceForce}
          >
            Wall bounce force
          </InputNumber>
        </div>
        <div className={classes.buttons}>
          <Button type="submit">Save</Button>
          <Button onClick={(e) => handleClose(e)}>Close</Button>
        </div>
      </form>
    </div>
  )
}
export default Options
