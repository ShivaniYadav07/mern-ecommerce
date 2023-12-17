import React, { Fragment } from 'react';
import { Button } from '@chakra-ui/react';
import "./Home.css"

const Home = () => {
  return (
    <Fragment >
        <div className='banner'>
            <p>Welcome to Ecommerce</p>
            <h1>Find Amazing Products Below</h1>

            <a href='#container'>
            <Button colorScheme='teal'>Scroll</Button>
            </a>
        </div>
    </Fragment>
  )
}

export default Home
