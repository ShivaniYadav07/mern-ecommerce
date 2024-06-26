import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import img from "../../image/rays.426980b9.png";

export default function App() {
  const { colorMode } = useColorMode();

  // Define a variable to store the background color based on the color mode
  // const footerBgColor = colorMode === 'current' ? 'current' : 'ghost';
  const fontColor = useColorModeValue('black', '#bfb1d9');
  const homeBgColor =
  colorMode === 'dark'
    ? 'conic-gradient(from 45deg at 90% 0%, #050505, #1d1d37)'
    : 'linear-gradient(to right, #565697, #bebef8)';

  return (
    <MDBFooter style={{ background: homeBgColor, color: fontColor }} className='text-center  text-lg-start text-muted'>
      <div style={{ position: 'relative' }}>
        {/* Image at the top with z-index -1 */}
        <Image
          src={img} // Replace with your actual image URL
          alt="Footer Image"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%', // Ensure the image covers the entire footer
            zIndex: 2, // Set z-index to -1 so that content appears on top
            objectFill: 'cover', // Maintain the aspect ratio without stretching
          }}
        />

        <section className='d-flex justify-content-center justify-content-lg-between border-bottom'>
          <div className='me-5 d-none d-lg-block'>
            <span style={{ color: fontColor }}>Get connected with us on social networks:</span>
          </div>

          <div style={{ color: fontColor }}>
            {/* Social media icons */}
          </div>
        </section>

        <section>
          <MDBContainer className='text-center text-md-start mt-5' style={{ color: fontColor }}>
            <MDBRow className='mt-3'>
              <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4' style={{ color: fontColor }}>
                  <MDBIcon icon='gem' className='me-3' />
                  Company name
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit
                  amet, consectetur adipisicing elit.
                </p>
              </MDBCol>

              <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4' style={{ color: fontColor }}>Products</h6>
                <p>
                  <a href='#!' className='text-reset'>
                    Angular
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    React
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Vue
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Laravel
                  </a>
                </p>
              </MDBCol>

              <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4' style={{ color: fontColor }}>Useful links</h6>
                <p>
                  <a href='#!' className='text-reset'>
                    Pricing
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Settings
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Orders
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Help
                  </a>
                </p>
              </MDBCol>

              <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4' style={{ color: fontColor }}>Contact</h6>
                <p>
                  <MDBIcon icon='home' className='me-2' style={{ color: fontColor }} />
                  New York, NY 10012, US
                </p>
                <p>
                  <MDBIcon icon='envelope' className='me-3' style={{ color: fontColor }} />
                  info@example.com
                </p>
                <p>
                  <MDBIcon icon='phone' className='me-3' style={{ color: fontColor }} /> + 01 234 567 88
                </p>
                <p>
                  <MDBIcon icon='print' className='me-3' style={{ color: fontColor }} /> + 01 234 567 89
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </div>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', color: fontColor }}>
        © 2024 Copyright
        <a className='text-reset fw-bold' rel="noreferrer" target='_blank' href='https://shivaniyadav.online'>
          || Shivani Yadav
        </a>
      </div>
    </MDBFooter>
  );
}
