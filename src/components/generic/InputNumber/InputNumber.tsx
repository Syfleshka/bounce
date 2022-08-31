import React, { ChangeEvent, useState } from 'react'
import classes from './InputNumber.module.scss'

function InputNumber(props: {
  children?: React.ReactNode
  id?: string
  name?: string
  value?: number
  helperText?: string
  min?: number
  max?: number
  step?: number
  onChange?: Function
}) {
  const [value, setValue] = useState(props.value || 0)

  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value))
    if (props.onChange) props.onChange(Number(e.target.value))
  }
  return (
    <label htmlFor={props.id} className={classes.wrapper}>
      <input
        className={classes.input}
        type="number"
        id={props.id}
        name={props.name}
        value={value}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={(e) => handleValue(e)}
      />
      <span className={classes.span}>{props.children}</span>
      <p className={classes.helper}>{props.helperText}</p>
    </label>
  )
}
export default InputNumber
