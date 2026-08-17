import React from 'react'
import { categoryInfos } from './categoryFullInfos'
import CategoryCard from './CategoryCard'
import styles from './Category.module.css'

function Category() {
  return (
    <section className={styles.category__container}>
      {categoryInfos.map((infos, index) => (
        <CategoryCard data={infos} key={index} />
      ))}
    </section>
  )
}

export default Category