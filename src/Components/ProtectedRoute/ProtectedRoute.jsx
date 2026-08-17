import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider'

function ProtectedRoute({ children }) {
  const [{ user }] = useContext(DataContext)
  const location = useLocation()

  if (!user) {
    const pageName = location.pathname === '/orders' ? 'orders' : 'this page'
    return (
      <Navigate
        to="/auth"
        state={{ message: `you must log in to view ${pageName}` }}
        replace
      />
    )
  }

  return children
}

export default ProtectedRoute