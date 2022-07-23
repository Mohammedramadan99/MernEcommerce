import React from 'react'
import { Link } from 'react-router-dom'
import LogoImg from '../../Imgs/logo.png'
export default function Logo()
{
  return (
    <div className="logo">
      <div className="img">
        <img src={LogoImg} alt="" />
      </div>
      <Link to='/' className="logo_link">mrkto</Link>
    </div>
  )
}
