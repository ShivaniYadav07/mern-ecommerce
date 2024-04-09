import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import { useColorMode, useColorModeValue } from '@chakra-ui/react';


const UpdateProfile = () => {
    const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.user);
  const {error, loading, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] =useState()
  const [email, setEmail] =useState()

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("");
  const { colorMode } = useColorMode();

  const homeBgColor =
    colorMode === 'dark'
      ? 'conic-gradient(from 45deg at 90% 0%, #050505, #1d1d37)'
      : 'linear-gradient(to right, #565697, #bebef8)';
  const fontColor = useColorModeValue('black', '#bfb1d9');

  const updateProfileSubmit = (e) => {
    e.preventDefault();
  
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm))
  };

  const updateProfileDataChange = (e) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {

if(user){
    setName(user.name)
    setEmail(user.email)
    setAvatarPreview(user.avatar.url)
}
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
        alert.success("Profile Updated Successfully");
        dispatch(loadUser());
      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      })
    }
  }, [dispatch, error, alert, navigate,user, isUpdated]);


  return (
    <Fragment>{loading ? (<Loader />) : (<Fragment>
        <MetaData title='Update Profile'/>
    <div className="updateProfileContainer"  style={{ background: homeBgColor, color: fontColor }}>
                <div className="updateProfileBox">
                    <h2 className="updateProfileHeading">Update Profile</h2>
                <form
                    className="updateProfileForm"
                    encType="multipart/form-data"
                    onSubmit={updateProfileSubmit}
                  >
                    <div className="updateProfileName">
                      <FaceIcon style={{ color: fontColor }} />
                      <input
                        type="text"
                        placeholder="Name"
                        required
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ background: homeBgColor, color: fontColor }}
                      />
                    </div>
                    <div className="updateProfileEmail">
                      <MailOutlineIcon style={{ color: fontColor }} />
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ background: homeBgColor, color: fontColor }}
                      />
                    </div>
                    <div id="updateProfileImage" >
                      <img src={avatarPreview} alt="Avatar Preview" />
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={updateProfileDataChange}
                        style={{ background: homeBgColor, color: fontColor }}
                        
                      />
                    </div>
                    <input type="submit" value="update" className="updateProfileBtn" />
                  </form>
                </div>
                  </div>
        </Fragment>
        )}
        </Fragment>
  );
}

export default UpdateProfile
