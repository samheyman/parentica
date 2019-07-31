import React, { Component } from 'react';
import './styles/App.scss';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
// const store = ConfigureStore();

class App extends Component {
  
  render() {
    return (
      // <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      // </Provider>
    );
  }
}

export default App;
