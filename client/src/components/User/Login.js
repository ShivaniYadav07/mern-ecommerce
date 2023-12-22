import { Button, Container, Heading, Input, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {useDispatch, useSelector} from "react-redux";
import { clearErrors, login } from '../../actions/userAction';
const Login = () => {
  const dispatch = useDispatch();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const loginSubmit = () => {
        console.log("Login Form Submitted")
    }

    const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
  })

  const {name, email, password} = user;


  return (
    <Container maxW={'container.xl'} h={'100vh'} p={'16'}>
      <form onSubmit={loginSubmit} className='loginForm'>
        <VStack
          alignItems={'stretch'}
          spacing={'8'}
          w={["full", "96"]}
          m={'auto'}
          my={'16'}
        >
          <Heading>Welcome Back</Heading>
          <Input
            placeholder={'Email'}
            type={'email'}
            required
            focusBorderColor={'purple.500'}
            
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <Input
            placeholder={'Password'}
            type={'password'}
            required
            focusBorderColor={'purple.500'}
            
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />

          <Button variant={'link'} alignSelf={'flex-end'}>
            <Link to={'/password/forget'}>Forget Password?</Link>
          </Button>
          <Button colorScheme={'purple'} type={'submit'}  value={'Login'} className='loginButton'>Log In</Button>
        <Text textAlign={'right'}
        >New User?{' '} 
        <Button variant={'link'} colorScheme={'purple'} type='submit' value='Login'>
            <Link to={'/signup'}>Sign Up</Link>
          </Button>
        </Text>
        </VStack>
      </form>
    </Container>
  );
};

export default Login;