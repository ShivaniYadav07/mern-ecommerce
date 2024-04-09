import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate } from "react-router-dom";
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); const { colorMode } = useColorMode();

  const homeBgColor =
    colorMode === 'dark'
      ? 'conic-gradient(from 45deg at 90% 0%, #050505, #1d1d37)'
      : 'linear-gradient(to right, #565697, #bebef8)';
  const fontColor = useColorModeValue('black', '#bfb1d9');

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");

      navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer" style={{ background: homeBgColor, color: fontColor }} >
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading" style={{ color: fontColor }}>Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
                
              >
                <div className="loginPassword"  style={{ background: homeBgColor, color: fontColor }}>
                  <VpnKeyIcon style={{ color: fontColor }} />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    style={{ background: homeBgColor, color: fontColor }}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon style={{ color: fontColor }} />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ background: homeBgColor, color: fontColor }}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon style={{ color: fontColor }} />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ background: homeBgColor, color: fontColor }}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;