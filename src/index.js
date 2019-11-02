import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {IntlProvider } from 'react-intl';

if (!Intl.PluralRules) {
    require('@formatjs/intl-pluralrules/polyfill');
    // require('@formatjs/intl-pluralrules/dist/locale-data/sp'); // Add locale data for sp
    require('@formatjs/intl-pluralrules/dist/locale-data/en'); // Add locale data for en
  }
  
if (!Intl.RelativeTimeFormat) {
require('@formatjs/intl-relativetimeformat/polyfill');
// require('@formatjs/intl-relativetimeformat/dist/locale-data/sp'); // Add locale data for sp
require('@formatjs/intl-relativetimeformat/dist/locale-data/en'); // Add locale data for en
}
  

const appStringResources = require(`./locales/translations.json`);

ReactDOM.render(
    <IntlProvider locale={'en-GB'} messages={appStringResources}>
        <App />
    </IntlProvider>, 
    document.getElementById('root')
);

// Online / Offline
serviceWorker.unregister();
