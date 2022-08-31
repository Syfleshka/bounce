import classes from './Button.module.scss'
import React, { MouseEventHandler } from 'react'

function Button(props: {
  onClick?: MouseEventHandler<HTMLButtonElement>
  children?: string
  type?: 'button' | 'submit' | 'reset' | undefined
}) {
  return (
    <button
      type={props.type}
      className={classes.button}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
export default Button
