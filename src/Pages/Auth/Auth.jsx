import React, { useState, useContext } from 'react'
import classes from './Auth.module.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { auth } from '../../Utility/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import { Type } from '../../Utility/action.type'
import ClipLoader from 'react-spinners/ClipLoader'

function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false
  })
  const [, dispatch] = useContext(DataContext)
  const navigate = useNavigate()
  const location = useLocation()

  const redirectMessage = location.state?.message

  const authHandler = async (e) => {
    e.preventDefault()
    setError('')

    if (e.target.name === 'signin') {
      setLoading({ ...loading, signIn: true })
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user
          })
          navigate('/')
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading({ ...loading, signIn: false }))
    } else {
      setLoading({ ...loading, signUp: true })
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user
          })
          navigate('/')
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading({ ...loading, signUp: false }))
    }
  }

  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to="/">
        <img
          className={classes.login__logo}
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon logo"
        />
      </Link>

      {/* form */}
      <div className={classes.login__container}>
        <h1>Sign In</h1>

        {redirectMessage && (
          <p className={classes.login__error}>{redirectMessage}</p>
        )}

        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className={classes.login__error}>{error}</p>}

          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={classes.login__signInButton}
            disabled={loading.signIn}
          >
            {loading.signIn ? (
              <ClipLoader size={16} color="#000" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use
          &amp; Sale. Please see our Privacy Notice, our Cookies Notice and
          our Interest-Based Ads Notice.
        </p>

        <button
          name="signup"
          onClick={authHandler}
          className={classes.login__registerButton}
          disabled={loading.signUp}
        >
          {loading.signUp ? (
            <ClipLoader size={16} color="#000" />
          ) : (
            'Create your Amazon Account'
          )}
        </button>
      </div>
    </section>
  )
}

export default Auth