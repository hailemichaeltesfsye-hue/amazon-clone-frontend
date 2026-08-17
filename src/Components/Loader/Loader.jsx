import React from 'react'
import { PulseLoader } from 'react-spinners'
import classes from './Loader.module.css'

function Loader() {
  return (
    <div className={classes.loader__container}>
      <div className={classes.logo__wrapper}>
        <span className={classes.logo__text}>
          amazon
          <svg className={classes.logo__smile} viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 2 Q50 20 95 2" stroke="#ff9900" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M90 2 L98 4 L92 9" stroke="#ff9900" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      <PulseLoader color="#febd69" size={14} speedMultiplier={0.8} />
      <p className={classes.loading__text}>Loading your products...</p>
    </div>
  )
}

export default Loader