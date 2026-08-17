import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import classes from './product.module.css'
import { DataContext } from '../DataProvider/DataProvider'
import { Type } from '../../Utility/action.type'

function ProductCard({ product, flex, renderDesc, renderAdd = true }) {
  const { image, title, id, rating, price, description, amount } = product
  const [, dispatch] = useContext(DataContext)

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description }
    })
  }

  const removeFromCart = () => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id
    })
  }

  if (flex) {
    return (
      <div className={classes.card__container__flex}>
        <img src={image} alt={title} className={classes.img_container__flex} />
        <div className={classes.info__flex}>
          <h3>{title}</h3>
          {renderDesc && <p className={classes.desc__flex}>{description}</p>}
          <div className={classes.rating}>
            <span className={classes.stars}>
              {'★'.repeat(Math.round(rating?.rate || 0))}
              {'☆'.repeat(5 - Math.round(rating?.rate || 0))}
            </span>
            <small>{rating?.count}</small>
          </div>
          <div>
            <CurrencyFormat amount={price} />
          </div>
          {renderAdd && (
            <button className={classes.button__flex} onClick={addToCart}>add to cart</button>
          )}
          {!renderAdd && (
            <div className={classes.qty__controls}>
              <button className={classes.qty__btn} onClick={addToCart}>+</button>
              <p>{amount}</p>
              <button className={classes.qty__btn} onClick={removeFromCart}>-</button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={classes.card__container}>
      <Link to={`/products/${id}`} className={classes.card__link}>
        <img src={image} alt={title} className={classes.img_container} />
        <div>
          <h3>{title}</h3>
          <div className={classes.rating}>
            <span className={classes.stars}>
              {'★'.repeat(Math.round(rating?.rate || 0))}
              {'☆'.repeat(5 - Math.round(rating?.rate || 0))}
            </span>
            <small>{rating?.count}</small>
          </div>
          <div>
            <CurrencyFormat amount={price} />
          </div>
        </div>
      </Link>
      <button className={classes.button} onClick={addToCart}>add to cart</button>
    </div>
  )
}

export default ProductCard