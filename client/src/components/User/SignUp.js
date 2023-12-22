import {Img, Button, Container, Heading, Input, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import Profile from "../image/profile.png"
import "./SignUp.css";

import {useDispatch, useSelector} from "react-redux";
import { clearErrors, signup } from '../../actions/userAction';

const Signup = () => {
  const dispatch = useDispatch();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })

    const {name, email, password} = user;

    const [avatar, setAvatar] = useState("../image/profile.png");
    const [avatarPreview, setAvatarPreview] = useState("../image/profile.png")
    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('password', password);
        myForm.set('avatar', avatar);
        console.log("SignUp for subbmited")
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
    
          reader.readAsDataURL(e.target.files[0]);
        } else {
          setUser({ ...user, [e.target.name]: e.target.value });
        }
      };
    
  return (
    <Container maxW={'container.xl'} h={'100vh'} p={'16'}>
      <form className='signUpName'
      encType='multipart/form-data'
      onSubmit={registerSubmit}>
        <VStack
          alignItems={'stretch'}
          spacing={'8'}
          w={["full", "96"]}
          m={'auto'}
          my={'16'}
        >
          <Heading style= {{'textAlign':'center'}}>Welcome to Ecommerce</Heading>
          <div id='registerImage' colorscheme={'purple'}>
            <Img src={Profile} alt='Avatar Preview'/>
            <Input  type='file' name='avatar' accept='image/*' onChange={registerDataChange}/>
          </div>
          <Input
            placeholder={'Name'}
            type={'text'}
            required
            focusBorderColor={'purple.500'}
            
            name='name'
            value={name}
            onChange={registerDataChange}
          />
          <Input
            placeholder={'Email'}
            type={'email'}
            required
            focusBorderColor={'purple.500'}
            name='email'
            value={email}
            onChange={registerDataChange}
          />
          <Input
            placeholder={'Password'}
            type={'password'}
            required
            focusBorderColor={'purple.500'}
            name='password'
            value={password}
            onChange={registerDataChange}
          />
          <Button colorScheme={'purple'} type={'submit'} value='Register' className='signUpBtn'>Sign Up</Button>
        <Text textAlign={'right'}
        >Already Signed Up?{' '} 
        <Button variant={'link'} colorScheme={'purple'}>
            <Link to={'/login'}>Log In</Link>
          </Button>
        </Text>
        </VStack>
      </form>
    </Container>
  );
};



export default Signup