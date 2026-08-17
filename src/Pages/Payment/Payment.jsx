import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { doc, setDoc } from 'firebase/firestore'
import { axiosInstance } from '../../Api/axios'
import Layout from '../../Components/LayOut/layout'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import { Type } from '../../Utility/action.type'
import { db } from '../../Utility/firebase'
import classes from './Payment.module.css'

function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext)
  const navigate = useNavigate()
  const stripe = useStripe()
  const elements = useElements()

  const [cardError, setCardError] = useState('')
  const [processing, setProcessing] = useState(false)

  const total = basket?.reduce((amount, item) => item.price * item.amount + amount, 0) || 0

  const handleChange = (event) => {
    setCardError(event.error ? event.error.message : '')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!stripe || !elements) return

    setProcessing(true)

    try {
      const amountInCents = Math.round(total * 100)

      const response = await axiosInstance.post(
        `/payment/create?total=${amountInCents}`
      )
      const clientSecret = response.data.clientSecret

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user?.email || ''
          }
        }
      })

      if (user?.uid) {
        await setDoc(
          doc(db, 'users', user.uid, 'orders', paymentIntent.id),
          {
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created
          }
        )
      }

      dispatch({ type: Type.EMPTY_BASKET })
      setProcessing(false)

      navigate('/orders', {
        state: {
          message: 'Your order has been placed successfully!',
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount
        }
      })
    } catch (error) {
      setCardError(error.message)
      setProcessing(false)
    }
  }

  return (
    <Layout>
      <div className={classes.payment}>
        <div className={classes.payment__header}>
          Checkout ({basket?.length || 0}) items
        </div>

        <section className={classes.section}>
          {/* Delivery address */}
          <div className={classes.flex}>
            <h3>Delivery Address</h3>
            <div>
              <div>{user?.email}</div>
              <div>123 React Lane</div>
              <div>Chicago, IL</div>
            </div>
          </div>
          <hr />

          {/* Review items */}
          <div className={classes.flex}>
            <h3>Review items and delivery</h3>
            <div className={classes.payment__items}>
              {basket?.map((item) => (
                <div key={item.id} className={classes.payment__item}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <p>{item.title}</p>
                    <small>${item.price}</small>
                    <p>Qty: {item.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr />

          {/* Payment methods */}
          <div className={classes.flex}>
            <h3>Payment methods</h3>
            <div className={classes.payment__card__container}>
              <form onSubmit={handleSubmit}>
                {cardError && (
                  <small style={{ color: 'red' }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />

                <div className={classes.payment__price}>
                  <div>
                    <span>Total Order | </span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <button type="submit" disabled={processing || !stripe}>
                    {processing ? 'Processing...' : 'Pay Now'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Payment