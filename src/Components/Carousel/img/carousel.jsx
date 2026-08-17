import React from 'react'
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { img } from './data'
import styles from './carousel.module.css'

function Carousel() {
  return (
    <div className={styles.carouselOuter}>
      <ResponsiveCarousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        interval={3000}
      >
        {img.map((imageItemLink, index) => {
          return (
            <div key={index}>
              <img
                src={imageItemLink}
                alt={`banner-${index}`}
                className={styles.carouselImg}
              />
            </div>
          )
        })}
      </ResponsiveCarousel>
      <div className={styles.fadeOverlay}></div>
    </div>
  )
}

export default Carousel