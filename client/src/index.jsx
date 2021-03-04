import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

/* --- Import CSS files --- */
import './css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

render(<App />, document.getElementById('app'));
