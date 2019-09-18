import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {IntlProvider } from 'react-intl';

const appStringResources = require(`./locales/translations.json`);

ReactDOM.render(
    <IntlProvider locale={'en-GB'} messages={appStringResources}>
        <App />
    </IntlProvider>, 
    document.getElementById('root')
);

// Online / Offline
serviceWorker.unregister();
