import React from 'react'
import { Link } from 'react-router-dom'

function Page404() {
  return (
    <div className="vh-70 d-flex flex-column justify-content-center align-items-center text-center">
      <h1>Page 404</h1>
      <Link to="/" className='text-white btn btn-success'>Home</Link>
    </div>
  )
}

export default Page404