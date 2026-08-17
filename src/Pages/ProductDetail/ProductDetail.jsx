import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Layout from '../../Components/LayOut/layout'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import Loader from '../../Components/Loader/Loader'
import classes from './ProductDetail.module.css'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
useEffect(() => {
  setIsLoading(true)
  axios.get(`https://fakestoreapi.com/products/${id}`)
    .then((res) => {
      setTimeout(() => {
        setProduct(res.data)
        setIsLoading(false)
      }, 1000)
    })
    .catch((err) => {
      console.log(err)
      setIsLoading(false)
    })
}, [id])

  if (isLoading || !product) {
    return (
      <Layout>
        <Loader />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className={classes.detail__container}>
        <div className={classes.image__section}>
          <img src={product.image} alt={product.title} className={classes.image} />
        </div>
        <div className={classes.info__section}>
          <h1 className={classes.title}>{product.title}</h1>
          <div className={classes.ratingRow}>
            <span className={classes.stars}>
              {'★'.repeat(Math.round(product.rating?.rate || 0))}
              {'☆'.repeat(5 - Math.round(product.rating?.rate || 0))}
            </span>
            <span className={classes.ratingCount}>{product.rating?.count} ratings</span>
          </div>
          <p className={classes.category}>Category: {product.category}</p>
          <hr />
          <p className={classes.description}>{product.description}</p>
        </div>
        <div className={classes.buy__section}>
          <div className={classes.price}>
            <CurrencyFormat amount={product.price} />
          </div>
          <p className={classes.inStock}>In Stock</p>
          <button className={classes.addToCart}>Add to Cart</button>
          <button className={classes.buyNow}>Buy Now</button>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetail