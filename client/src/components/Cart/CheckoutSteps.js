import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./CheckoutSteps.css";
import { useColorMode, useColorModeValue } from '@chakra-ui/react';

const CheckoutSteps = ({ activeStep }) => {
  const { colorMode } = useColorMode();

  const homeBgColor =
    colorMode === 'dark'
      ? 'conic-gradient(from 45deg at 90% 0%, #050505, #1d1d37)'
      : 'linear-gradient(to right, #565697, #bebef8)';
  const fontColor = useColorModeValue('black', '#bfb1d9');
  const steps = [
    {
      label: <Typography  style={{ background: homeBgColor, color: fontColor }}>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography  style={{ background: homeBgColor, color: fontColor }}>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography  style={{ background: homeBgColor, color: fontColor }}>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  // const stepStyles = {
  //   boxSizing: "border-box",
  // };

  return (
    <Fragment >
      <Stepper alternativeLabel activeStep={activeStep}  style={{ background: homeBgColor, color: fontColor }}  >
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
            style={{ background: homeBgColor, color: fontColor }}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "#330b7e" : "#bfb1d9",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;