import React, { useContext } from 'react'
import Layout from '../../Components/LayOut/layout'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/productCard'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import { Type } from '../../Utility/action.type'
import { Link } from 'react-router-dom'
import classes from './Cart.module.css'
import { IoIosArrowDown } from 'react-icons/io'
import { IoIosArrowUp } from 'react-icons/io'

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext)

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount
  }, 0)

  const totalItems = basket.reduce((sum, item) => sum + item.amount, 0)

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item
    })
  }

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id
    })
  }

  return (
    <Layout>
      <section className={classes.cart__section}>
        <div className={classes.cart__left}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />

          {basket?.length === 0 ? (
            <p>Opps! No item in your cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section key={i} className={classes.cart__cardContainer}>
                  <ProductCard
                    product={item}
                    renderDesc={true}
                    renderAdd={false}
                    flex={true}
                  />
                  <div className={classes.cart__quantity}>
                    <IoIosArrowUp onClick={() => increment(item)} />
                    <p>{item.amount}</p>
                    <IoIosArrowDown onClick={() => decrement(item.id)} />
                  </div>
                </section>
              )
            })
          )}
        </div>

        {basket?.length !== 0 && (
          <div className={classes.cart__right}>
            <div>
              <p>Subtotal ({totalItems} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to={user ? '/payments' : '/auth'}>
              {user ? 'Continue to checkout' : 'Sign in to checkout'}
            </Link>
          </div>
        )}
      </section>
    </Layout>
  )
}

export default Cart