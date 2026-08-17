import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import Layout from '../../Components/LayOut/layout'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import { db } from '../../Utility/firebase'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import classes from './Orders.module.css'

function Orders() {
  const [{ user }] = useContext(DataContext)
  const location = useLocation()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const successMessage = location.state?.message

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false)
      return
    }

    const ordersRef = collection(db, 'users', user.uid, 'orders')
    const q = query(ordersRef, orderBy('created', 'desc'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setOrders(fetchedOrders)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user])

  return (
    <Layout>
      <div className={classes.container}>
        <h2>Your Orders</h2>

        {successMessage && (
          <div className={classes.success__banner}>{successMessage}</div>
        )}

        {loading ? (
          <p>Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p>You have no past orders.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className={classes.orders_container}>
              <h2>Order ID: {order.id}</h2>
              {order.basket?.map((item, index) => (
                <div key={index} className={classes.order__item}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <p>{item.title}</p>
                    <p>Qty: {item.amount}</p>
                    <CurrencyFormat amount={item.price} />
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </Layout>
  )
}

export default Orders