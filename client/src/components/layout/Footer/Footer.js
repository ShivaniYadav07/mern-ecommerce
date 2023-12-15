import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <footer id='footer'>
        <div className='leftFooter'>
            <h4>Download Our App</h4>
            <p>Download App for Android and IOS mobile phone</p>
            <img src='' alt='playstore'/>
            <img src='' alt='Appstore'/>

        </div>
        <div className='middleFooter'>
            <h1>Ecommerce</h1>
            <p>High quality is our priority</p>

            <p>Copyright 2023 &copy; priority</p>
        </div>
        <div className='rightFooter'>
            <h4>Follow us</h4>
            <a href='/'>Facebook</a>
            <a href='/'>Facebook</a>
            <a href='/'>Facebook</a>
        </div>
    </footer>
  )
}

export default Footer
