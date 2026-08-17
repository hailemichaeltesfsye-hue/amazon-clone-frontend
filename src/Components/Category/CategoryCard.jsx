import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CategoryCard.module.css'

function CategoryCard({ data }) {
  return (
    <div className={styles.card}>
      <Link to={`/category/${data.name}`} className={styles.cardLink}>
        <h2 className={styles.title}>{data.title}</h2>
        <div className={styles.imgWrapper}>
          <img src={data.imgLink} alt={data.name} className={styles.img} />
        </div>
        <p className={styles.shopNow}>Shop now</p>
      </Link>
    </div>
  )
}

export default CategoryCard