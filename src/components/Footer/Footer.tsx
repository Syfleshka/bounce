import classes from './Footer.module.scss'
import React from 'react'

function Footer() {
  return (
    <footer className={classes.footer}>
      <span className={classes.footer__text}>
        Made by{' '}
        <a
          className={classes['footer-text__href']}
          href="https://syfleshka.github.io/portfolio/#/about"
        >
          Alex D.
        </a>
      </span>
    </footer>
  )
}
export default Footer
