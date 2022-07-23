import React from 'react'
import {Link} from 'react-router-dom'
function Success() {
  return (
    <div className='success'>
      <div className="container">
        <p> Success </p>
        <Link to="/orders"> show orders </Link>
      </div>
    </div>
  )
}

export default Success