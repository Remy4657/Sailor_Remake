import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/css/style.css'
//import "./pages/admin/css/styles_admin.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from 'react-toastify';

// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap/dist/css/bootstrap.min.css";
//import 'bootstrap/dist/js/bootstrap.js'; jjj 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <App />
      {/* <div className='message'><a href="http://127.0.0.1:5000/" target="_blank"><i class="fa-regular fa-paper-plane fa-spin"></i></a></div> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseonFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>

);

