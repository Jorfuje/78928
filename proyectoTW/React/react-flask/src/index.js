import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';


// Componentes
import Navbar from './components/NavBar/NavBar';
import ControlList from './components/Control/ControlList';
import ControlForm from './components/Control/ControlForm';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar />
    <div className='container my-4'>
      <Switch>
        <Route exact path='/' component={ControlList} />
        <Route path='/controlForm' component={ControlForm} />
        <Route path='/updateControl/:id' component={ControlForm} />
      </Switch>

    </div>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
