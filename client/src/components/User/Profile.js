import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import "./Profile.css";
const Profile = () => {
    const navigate = useNavigate();
    const { colorMode } = useColorMode();
    const homeBgColor =
    colorMode === 'dark'
      ? 'conic-gradient(from 45deg at 90% 0%, #050505, #1d1d37)'
      : 'linear-gradient(to right, #565697, #bebef8)';
  const fontColor = useColorModeValue('black', '#bfb1d9');

    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if(isAuthenticated === false) {
            navigate('/login')
        }
    }, [navigate, isAuthenticated])
  return (
    <Fragment>

        { loading ? (<Loader />) : (
        <Fragment>
        <MetaData title={`${user.name}'s Profile`}/>
        <div className='profileContainer'  style={{ background: homeBgColor, color: fontColor }}>
            <div>
                <h1 style={{color: fontColor }}>My Profile</h1>
                <img src={user.avatar.url} alt={user.name}/>
                <Link to='/me/update'>Edit Profile</Link>
            </div>
        
        <div>
            <div>
            <h4 style={{color: fontColor }}>Full Name</h4>
            <p style={{color: fontColor }}>{user.name}</p>
        </div>
        <div>
            <h4 style={{color: fontColor }}>Email</h4>
            <p style={{color: fontColor }}>{user.email}</p>
        </div>
        <div>
            <h4 style={{color: fontColor }}>Joined on</h4>
            <p style={{color: fontColor }}>{String(user.createdAt).substr(0, 10)}</p>
        </div>
        <div >
            <Link style={{ background: homeBgColor, color: fontColor }} to='/orders'>My Orders</Link>
            <Link style={{ background: homeBgColor, color: fontColor }} to='/password/update'>Change Password</Link>
        </div>
            </div>
        </div>
    </Fragment>
    )}
    </Fragment>
  );
};

export default Profile
