import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import ColorModeSwitcher from './ColorModeSwitcher ';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {Provider} from "react-redux";
import store from "./Store"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme} >
      <ColorModeSwitcher />
    <App />
    </ChakraProvider>
  </React.StrictMode>
  </Provider>
);

