import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPints'
import ProductCard from '../../Components/Product/productCard'
import classes from './Results.module.css'

function Results() {
  const [results, setResults] = useState([])
  const { categoryName } = useParams()

  useEffect(() => {
    axios.get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [categoryName])

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
        <div className={classes.products__container}>
          {results?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
    </LayOut>
  )
}

export default Results