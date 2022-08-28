import React from 'react'
import { Link } from 'react-router-dom'
function NewArrivals()
{

  return (
    <div className='arraivals'>
      <div className="container">
        <Link className="box" data-aos="fade-top" to="/product/630b39c5199753597210e557">
          <div className="left">
            <div className="info">
              <p>new arraivals</p>
              <div className="h3">Classic Sunglasses</div>
            </div>
            <div className="box-btn">
              shop now
            </div>
          </div>
          <div className="right">
            <div className="img">
              <img src="https://res.cloudinary.com/dtmjc8y9z/image/upload/v1652989219/ecommerce/vsdvpvqtxux0bibtticz.png" alt="" />
            </div>
          </div>
        </Link>
        <Link className="box" data-aos="fade-bottom" to="/product/630b38735ab7cd6e2cdcbfde">
          <div className="left">
            <div className="info">
              <p>new arraivals</p>
              <div className="h3">Black leather Bag</div>
            </div>
            <div className="box-btn">
              shop now
            </div>
          </div>
          <div className="right">
            <div className="img">
              <img src="https://res.cloudinary.com/dtmjc8y9z/image/upload/v1652988621/ecommerce/e7hipxnks4fcewc9ysjx.png" alt="" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default NewArrivals