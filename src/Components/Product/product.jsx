import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './productCard'
import Loader from '../Loader/Loader'
import classes from './product.module.css'

function Product() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
  setIsLoading(true)
  axios.get('https://fakestoreapi.com/products')
    .then((res) => {
      setTimeout(() => {
        setProducts(res.data)
        setIsLoading(false)
      }, 1000)
    })
    .catch((err) => {
      console.log(err)
      setIsLoading(false)
    })
}, [])

  return (
    <>
      {
        isLoading ? (
          <Loader />
        ) : (
          <section className={classes.products_container}>
            {
              products?.map((singleProduct) => {
                return <ProductCard product={singleProduct} key={singleProduct.id} />
              })
            }
          </section>
        )
      }
    </>
  )
}

export default Product