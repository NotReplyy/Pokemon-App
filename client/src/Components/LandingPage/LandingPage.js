import React from 'react'
import imgBack from '../../Images/back-Landing.png'
import { Link } from 'react-router-dom'
import './LandingPage.css'


function Landingpage() {
  return (
    <div className="landing-Class">
      <div>
        <div className='div-img'>
          <img className="img-Class" src={imgBack} alt='Background' />
        </div>       
          <div className='div-buttonLanding'>
            <Link to='/home'>
              <button className="button-Class-lan">Get Into</button>
            </Link>        
        </div>
      </div>
    </div>

  )
}

export default Landingpage