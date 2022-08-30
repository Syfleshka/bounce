import classes from './Header.module.scss'
import React from 'react'

function Header() {
  return (
    <header className={classes.header}>
      <h1 className={classes.header__text}>Bounce</h1>
    </header>
  )
}
export default Header
