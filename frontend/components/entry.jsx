import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store.js';
import Main from './main.jsx';
import io from 'socket.io-client';
const socket = io('http://localhost:8080');
 socket.emit('established');
 socket.on('updaterooms',()=>{
   alert('establishing');
 })

render(
  <Provider store={store}><Main/></Provider>,
   document.getElementById('app')
);
