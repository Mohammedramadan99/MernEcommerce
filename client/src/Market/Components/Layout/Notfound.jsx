import React from 'react'
import { Link } from 'react-router-dom'
import notFoundImg from '../../Imgs/notFound_4.png'

export default function NotFound()
{
  return (
    <div className='notFound'>
      <div className="img">
        <img src={notFoundImg} alt="" />
      </div>
      <p>page Not found</p>
      <Link to="/home-v1"> back to <span> home </span> </Link>

    </div>
  )
}
