import React from 'react'
import Layout from '../../Components/LayOut/layout'
import Carousel from '../../Components/Carousel/img/carousel'
import Category from '../../Components/Category/Category'
import Product from '../../Components/Product/product'

function Landing() {
  return (
    <Layout>
      <Carousel/>
      <Category/>
      <Product/>
    </Layout>
  )
}

export default Landing