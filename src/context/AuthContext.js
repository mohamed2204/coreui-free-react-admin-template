/* eslint-disable prettier/prettier */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth'
import { React, useContext, useState, useEffect, createContext } from 'react'
import jwt_decode from 'jwt-decode'
const swal = require('sweetalert2')
import { useNavigate } from 'react-router-dom'

import auth from '../firebase'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  // const [User, setUser] = useState()
  const [loading, setLoading] = useState(true)

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null,
  )

  const [User, setUser] = useState(() =>
    localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null,
  )

  // const [loading, setLoading] = useState(true)

  //   const history = useHistory()
  const navigate = useNavigate()

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  // const login = (email, password) => {
  //   return signInWithEmailAndPassword(auth, email, password)
  // }

  const logout = () => {
    return signOut(auth)
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }
  const updateUserEmail = (email) => {
    return updateEmail(auth.currentUser, email)
  }
  const updateUserPassword = (password) => {
    return updatePassword(auth.currentUser, password)
  }

  const login = async (email, password) => {
    const response = await fetch('http://127.0.0.1:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data = await response.json()
    console.log(data)

    if (response.status === 200) {
      console.log('Logged In')
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data))
      // history.push('/')
      navigate('/')

      swal.fire({
        title: 'Login Successful',
        icon: 'success',
        toast: true,
        timer: 6000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      })
    } else {
      console.log(response.status)
      console.log('there was a server issue')
      swal.fire({
        title: 'Username or passowrd does not exists',
        icon: 'error',
        toast: true,
        timer: 6000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      })
    }
  }

  const registerUser = async (email, username, password, password2) => {
    const response = await fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        username,
        password,
        password2,
      }),
    })
    if (response.status === 201) {
      history.push('/login')
      swal.fire({
        title: 'Registration Successful, Login Now',
        icon: 'success',
        toast: true,
        timer: 6000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      })
    } else {
      console.log(response.status)
      console.log('there was a server issue')
      swal.fire({
        title: 'An Error Occured ' + response.status,
        icon: 'error',
        toast: true,
        timer: 6000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      })
    }
  }

  const logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    history.push('/login')
    swal.fire({
      title: 'YOu have been logged out...',
      icon: 'success',
      toast: true,
      timer: 6000,
      position: 'top-right',
      timerProgressBar: true,
      showConfirmButton: false,
    })
  }

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setCurrentUser(user)
  //     setLoading(false)
  //   })
  //   return () => {
  //     unsubscribe()
  //   }
  // }, [])

  const contextData = {
    User,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    login,
    logoutUser,
  }

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access))
    }
    setLoading(false)
  }, [authTokens, loading])

  return (
    <AuthContext.Provider
      value={{
        // currentUser,
        login,
        // signup,
        // logout,
        // resetPassword,
        // updateUserEmail,
        // updateUserPassword,
        User,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        logoutUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => {
  return useContext(AuthContext)
}

// /* eslint-disable react/react-in-jsx-scope */
// /* eslint-disable react/prop-types */
// /* eslint-disable prettier/prettier */
// import { createContext, useState, useEffect } from 'react';
// import jwt_decode from 'jwt-decode';
// // import  useHistory  from 'react-router-dom'
// import { useNavigate } from "react-router-dom";
// const swal = require('sweetalert2');

// const AuthContext = createContext();

// export default AuthContext;

// export const AuthProvider = ({ children }) => {
//   const [authTokens, setAuthTokens] = useState(() =>
//     localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null,
//   )

//   const [currentUser, setCurrentUser] = useState(() =>
//     localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null,
//   )

//   const [loading, setLoading] = useState(true)

// //   const history = useHistory()
//   const navigate = useNavigate();

//   const loginUser = async (email, password) => {
//     const response = await fetch('http://127.0.0.1:8000/api/token/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     })
//     const data = await response.json()
//     console.log(data)

//     if (response.status === 200) {
//       console.log('Logged In')
//       setAuthTokens(data)
//       setUser(jwt_decode(data.access))
//       localStorage.setItem('authTokens', JSON.stringify(data))
//       history.push('/')
//       navigate('/')

//       swal.fire({
//         title: 'Login Successful',
//         icon: 'success',
//         toast: true,
//         timer: 6000,
//         position: 'top-right',
//         timerProgressBar: true,
//         showConfirmButton: false,
//       })
//     } else {
//       console.log(response.status)
//       console.log('there was a server issue')
//       swal.fire({
//         title: 'Username or passowrd does not exists',
//         icon: 'error',
//         toast: true,
//         timer: 6000,
//         position: 'top-right',
//         timerProgressBar: true,
//         showConfirmButton: false,
//       })
//     }
//   }

//   const registerUser = async (email, username, password, password2) => {
//     const response = await fetch('http://127.0.0.1:8000/api/register/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email,
//         username,
//         password,
//         password2,
//       }),
//     })
//     if (response.status === 201) {
//       history.push('/login')
//       swal.fire({
//         title: 'Registration Successful, Login Now',
//         icon: 'success',
//         toast: true,
//         timer: 6000,
//         position: 'top-right',
//         timerProgressBar: true,
//         showConfirmButton: false,
//       })
//     } else {
//       console.log(response.status)
//       console.log('there was a server issue')
//       swal.fire({
//         title: 'An Error Occured ' + response.status,
//         icon: 'error',
//         toast: true,
//         timer: 6000,
//         position: 'top-right',
//         timerProgressBar: true,
//         showConfirmButton: false,
//       })
//     }
//   }

//   const logoutUser = () => {
//     setAuthTokens(null)
//     setUser(null)
//     localStorage.removeItem('authTokens')
//     history.push('/login')
//     swal.fire({
//       title: 'YOu have been logged out...',
//       icon: 'success',
//       toast: true,
//       timer: 6000,
//       position: 'top-right',
//       timerProgressBar: true,
//       showConfirmButton: false,
//     })
//   }

//   const contextData = {
//     currentUser,
//     setCurrentUser,
//     authTokens,
//     setAuthTokens,
//     registerUser,
//     loginUser,
//     logoutUser,
//   }

//   useEffect(() => {
//     if (authTokens) {
//       setUser(jwt_decode(authTokens.access))
//     }
//     setLoading(false)
//   }, [authTokens, loading])

//   return (
//     <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>
//   )
// }
